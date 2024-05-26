import { Layout, Space, Table, Typography, Tag } from "antd";
import { useState, useEffect } from "react";
import { fetchOrderHistoryAdmin } from "../../api/order";

// TODO:
// - Fetch api
// - Set state list with fetched data
// - Define column title
// - Set datasource

const AdminTransactionManagement = () => {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [orderHistory, setOrderHistory] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchOrderHistoryAdmin();

        const ordersWithFormattedDate = data.data.orderList.map((order) => {
          // Assuming orderDate is in [year, month, day] format
          const [year, month, day] = order.orderDate;
          const formattedDate = `${day}/${month}/${year}`;
          return { ...order, formattedDate };
        });

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

  const columns = [
    {
      title: "Customer ID",
      dataIndex: "customerId",
      key: "customerId",
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
    },
    {
      title: "Packages",
      dataIndex: "numOfPackages",
      key: "numOfPackages",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (status) => {
        let color;
        switch (status.toLowerCase()) {
          case "completed":
            color = "green";
            break;
          case "cancelled":
            color = "red";
            break;
          case "pending":
            color = "blue";
            break;
          case "waiting":
            color = "yellow";
            break;
          case "failed":
            color = "red";
            break;
          default:
            color = "default";
        }

        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: "Action",
    
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
          loading={isLoading}
          onChange={(pagination) => setCurrentPage(pagination.current - 1)}
        />
      </Space>
    </Layout>
  );
};

export default AdminTransactionManagement;
