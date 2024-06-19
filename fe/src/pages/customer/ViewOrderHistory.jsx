import React, { Fragment, useState, useEffect, useContext } from "react";
import { Layout, Space, Table, Typography, Tag, Button, Modal } from "antd";
import { fetchOrderHistory, fetchCustomerOrderDetail } from "../../api/order";
import { UserContext } from "../../context/AuthContext";

export default function ViewOrderHistory() {
  const [currentPage, setCurrentPage] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [orderHistory, setOrderHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { id } = useContext(UserContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [orderDetail, setOrderDetail] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchOrderHistory(id);

        const ordersWithFormattedDate = data.data.orders.map((order) => {
          const [year, month, day] = order.orderDate;
          const formattedDate = `${day}/${month}/${year}`;
          return { ...order, formattedDate };
        });

        setOrderHistory(ordersWithFormattedDate);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, [id]);

  const handleDetailClick = async (orderId) => {
    try {
      const data = await fetchCustomerOrderDetail(id, orderId);

      setOrderDetail(data.data); // Set order detail in state
      const [year, month, day] = data.data.orderDate;
      const formattedDate = `${day}/${month}/${year}`;
      data.data.orderDate = formattedDate;
      setModalVisible(true); // Show modal
      console.log("Order Detail:", data);
    } catch (error) {
      console.error("Error fetching customer order detail:", error);
    }
  };
  const columns = [
    {
      title: "Ngày mua hàng",
      dataIndex: "formattedDate",
      key: "formattedDate",
    },
    {
      title: "Giá trị đơn hàng",
      dataIndex: "price",
      key: "price",
      render: (price) => {
        return price.toLocaleString("de-DE") + " VNĐ";
      },
    },
    {
      title: "Số lượng",
      dataIndex: "numOfPackages",
      key: "numOfPackage",
    },
    {
      title: "Trạng thái",
      key: "status",
      dataIndex: "status",
      render: (status) => {
        let color;
        let vietnameseStatus;
        switch (status.toLowerCase()) {
          case "completed":
            color = "green";
            vietnameseStatus = "Hoàn thành";
            break;
          case "cancelled":
            color = "red";
            vietnameseStatus = "Đã hủy";
            break;
          case "failed":
            color = "red";
            vietnameseStatus = "Thất bại";
            break;
          case "waiting":
            color = "blue";
            vietnameseStatus = "Đang chờ";
            break;
          default:
            color = "default";
            vietnameseStatus = "Không xác định";
        }

        return <Tag color={color}>{vietnameseStatus.toUpperCase()}</Tag>;
      },
    },
    {
      title: "Chi tiết",
      render: (record) => (
        <Button
          onClick={() => handleDetailClick(record.orderId)}
          type="primary"
        >
          Chi tiết
        </Button>
      ),
    },
  ];
  return (
    <Fragment>
      <Layout>
        <Space
          size={20}
          direction="vertical"
          style={{
            margin: "24px 16px 0",
            width: "80%",
            margin: "0 auto",
          }}
        >
          <Typography.Title level={2} style={{ marginTop: "30px" }}>
            Lịch sử mua hàng
          </Typography.Title>
          <Table
            columns={columns}
            pagination={{
              position: ["bottomCenter"],
              total: totalElements,
              showSizeChanger: false,
              pageSize: 8,
            }}
            dataSource={orderHistory}
            // loading={isLoading}
            onChange={(pagination) => setCurrentPage(pagination.current - 1)}
          />
        </Space>
      </Layout>
      <Modal
        title={<span style={{ fontSize: "24px" }}>Chi tiết đơn hàng</span>}
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        width={800}
        maskStyle={{ backgroundColor: "rgba(211, 211, 211, 0.5)" }}
      >
        {orderDetail && (
          <div style={{ padding: "16px" }}>
            {" "}
            <p>
              <strong style={{ fontSize: "19px" }}>Ngày mua hàng:</strong>{" "}
              {orderDetail.orderDate}
            </p>
            <p>
              <strong style={{ fontSize: "19px" }}>Giá trị đơn hàng:</strong>{" "}
              {orderDetail.price.toLocaleString("de-DE")} VNĐ
            </p>
            <p>
              <strong style={{ fontSize: "19px" }}>Số lượng gói hàng:</strong>{" "}
              {orderDetail.numOfPackages}
            </p>
            <p>
              <strong style={{ fontSize: "19px" }}>Trạng thái:</strong>{" "}
              <span
                style={{
                  color:
                    orderDetail.status === "WAITING"
                      ? "blue"
                      : orderDetail.status === "COMPLETED"
                      ? "green"
                      : orderDetail.status === "FAILED" ||
                        orderDetail.status === "CANCELLED"
                      ? "red"
                      : "inherit",
                }}
              >
                {(() => {
                  switch (orderDetail.status) {
                    case "PENDING":
                      return "Chưa xác định";
                    case "WAITING":
                      return "Đang chờ thanh toán";
                    case "FAILED":
                      return "Lỗi khi thanh toán";
                    case "COMPLETED":
                      return "Thanh toán hoàn tất";
                    case "CANCELLED":
                      return "Hủy thanh toán";
                    default:
                      return "LỖI";
                  }
                })()}
              </span>
            </p>
            <p style={{ marginTop: "16px" }}>
              <strong style={{ fontSize: "21px" }}>Chi tiết gói hàng:</strong>
            </p>
            <ul style={{ listStyleType: "none", padding: 0 }}>
              {" "}
              {orderDetail.packages.map((packageItem) => (
                <li
                  key={packageItem.id}
                  style={{
                    marginTop: "8px",
                    border: "1px solid #e8e8e8",
                    padding: "12px",
                    borderRadius: "4px",
                  }}
                >
                  {" "}
                  <p>
                    <strong style={{ fontSize: "19px" }}>Tên gói:</strong>{" "}
                    {packageItem.calendarTitle}
                  </p>
                  <p>
                    <strong style={{ fontSize: "19px" }}>Giá:</strong>{" "}
                    {packageItem.price.toLocaleString("de-DE")} VNĐ
                  </p>
                  <p>
                    <strong style={{ fontSize: "19px" }}>Thời lượng:</strong>{" "}
                    {packageItem.durationValue}{" "}
                    {packageItem.packageDurationUnit}
                  </p>
                  <p>
                    <strong style={{ fontSize: "19px" }}>Loại gói:</strong>{" "}
                    <span
                      style={{
                        color:
                          packageItem.packageType === "BASIC"
                            ? "green"
                            : packageItem.packageType === "ADVANCED"
                            ? "blue"
                            : packageItem.packageType === "PREMIUM"
                            ? "purple"
                            : "inherit",
                      }}
                    >
                      {packageItem.packageType}
                    </span>
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Modal>
    </Fragment>
  );
}
