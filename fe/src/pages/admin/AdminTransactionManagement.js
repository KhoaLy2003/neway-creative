import {
  Layout,
  Space,
  Table,
  Typography,
  Select,
  Button,
  notification,
  Modal,
} from "antd";
import { useState, useEffect } from "react";
import {
  fetchOrderHistoryAdmin,
  fetchCustomerOrderDetail,
} from "../../api/order";
import { updateOrder } from "../../api/payment";

// TODO:
// - Fetch api
// - Set state list with fetched data
// - Define column title
// - Set datasource

const { Option } = Select;

const AdminTransactionManagement = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [orderHistory, setOrderHistory] = useState([]);
  const [error, setError] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [orderDetail, setOrderDetail] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchOrderHistoryAdmin();

        const ordersWithFormattedDate = data.data.orderList.map((order) => {
          const transactionCode = "IDEASY(" + order.orderId + ")";
          const [year, month, day] = order.orderDate;
          const formattedDate = `${day}/${month}/${year}`;
          return { ...order, transactionCode, formattedDate };
        });
        console.log(ordersWithFormattedDate);
        setOrderHistory(ordersWithFormattedDate);
        setTotalElements(ordersWithFormattedDate.length);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [currentPage]);

  const handleDetailClick = async (customerId, orderId) => {
    try {
      const data = await fetchCustomerOrderDetail(customerId, orderId);

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

  const handleStatusChange = (orderId, selectedStatus) => {
    setSelectedOrderId(orderId);
    setSelectedStatus(selectedStatus);
  };

  const handleConfirm = async () => {
    setIsLoading(true);
    const orderDto = {
      orderId: selectedOrderId,
      status: selectedStatus,
    };

    const response = await updateOrder(orderDto);
    if (response.status === 200) {
      notification.success({
        message: "Status updated success",
        duration: 2,
      });

      setIsLoading(false);
    }
  };
  const columns = [
    // {
    //   title: "Customer ID",
    //   dataIndex: "customerId",
    //   key: "customerId",
    // },
    {
      title: "Transaction Code",
      dataIndex: "transactionCode",
      key: "transactionCode",
    },
    {
      title: "Name",
      dataIndex: "customerName",
      key: "customerName",
    },
    {
      title: "Email",
      dataIndex: "customerEmail",
      key: "customerEmail",
    },
    {
      title: "Order Date",
      dataIndex: "formattedDate",
      key: "formattedDate",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => (
        <span style={{ color: "green", fontWeight: "bold" }}>
          {price.toLocaleString("de-DE") + " VNĐ"}
        </span>
      ),
    },
    {
      title: "Packages",
      dataIndex: "numOfPackages",
      key: "numOfPackages",
    },

    {
      title: "Status",
      key: "status",

      render: (_, record) => (
        <Select
          defaultValue={record.status}
          style={{
            width: 150,
          }}
          onChange={(selectedStatus) =>
            handleStatusChange(record.orderId, selectedStatus)
          }
        >
          <Option value="COMPLETED" style={{ color: "green" }}>
            Completed
          </Option>
          <Option value="CANCELLED" style={{ color: "red" }}>
            Cancelled
          </Option>
          <Option value="PENDING" style={{ color: "blue" }}>
            Pending
          </Option>
          <Option value="WAITING" style={{ color: "black" }}>
            Waiting
          </Option>
          <Option value="FAILED" style={{ color: "red" }}>
            Failed
          </Option>
        </Select>
      ),
    },
    {
      title: "Action",
      render: () => (
        <Button type="primary" onClick={handleConfirm}>
          Confirm
        </Button>
      ),
    },
    {
      title: "Order Detail",
      render: (record) => (
        <Button
          onClick={() => handleDetailClick(record.customerId, record.orderId)}
          type="primary"
        >
          View
        </Button>
      ),
    },
  ];
  return (
    <Layout>
      <Space
        size={20}
        direction="vertical"
        style={{
          width: "95%",
          margin: "0 auto",
        }}
      >
        <Typography.Title level={2} style={{ marginTop: "30px" }}>
          Order history
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
          loading={isLoading}
          onChange={(pagination) => setCurrentPage(pagination.current - 1)}
        />
      </Space>
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
    </Layout>
  );
};

export default AdminTransactionManagement;
