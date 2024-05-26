import React, { Fragment, useState, useEffect, useContext } from "react";
import { Layout, Space, Table, Typography, Tag } from "antd";
import { fetchOrderHistory } from "../../api/order";
import { UserContext } from "../../context/AuthContext";

export default function ViewOrderHistory() {
  const [currentPage, setCurrentPage] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [orderHistory, setOrderHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { id } = useContext(UserContext);

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
    </Fragment>
  );
}
