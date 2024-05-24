import { Layout, Space, Table, Typography, Tag } from "antd";
import { useState } from "react";

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

  const columns = [
    {
      title: 'Order ID',
      dataIndex: 'orderId',
      key: 'orderId',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Order Date',
      dataIndex: 'orderDate',
      key: 'orderDate',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (status) => {
        let color;
        switch (status) {
          case 'Completed':
            color = 'green';
            break;
          case 'Cancelled':
            color = 'red';
            break;
          case 'Pending':
            color = 'blue';
            break;
          default:
            color = 'default';
        }
    
        return (
          <Tag color={color}>
            {status.toUpperCase()}
          </Tag>
        );
      },
    }
  ];
  const data = [
    {
      key: '1',
      orderId: '1',
      orderDate: '1/1/2024',
      price: '300.000',
      status: 'Completed'
    },
    {
      key: '2',
      orderId: '2',
      orderDate: '1/1/2024',
      price: '500.000',
      status: 'Pending'
    },
    {
      key: '3',
      orderId: '3',
      orderDate: '1/1/2024',
      price: '800.0000',
      status: 'Cancelled'
    }
  ];
  return (
    <Layout>
      <Space
        size={20}
        direction="vertical"
        style={{
          margin: "24px 16px 0",
        }}
      >
        <Typography.Title level={4}>Transaction List</Typography.Title>
        <Table
          columns={columns}
          pagination={{
            position: ["bottomCenter"],
            total: totalElements,
            showSizeChanger: false,
            pageSize: 7,
          }}
          dataSource={data}
          // loading={isLoading}
          onChange={(pagination) => setCurrentPage(pagination.current - 1)}
        />
      </Space>
    </Layout>
  );
};

export default AdminTransactionManagement;

