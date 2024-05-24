import { Layout, Space, Table, Typography, Tag } from "antd";
import { useState } from "react";

// TODO:
// - Fetch api
// - Set state list with fetched data
// - Define column title
// - Set datasource

const AdminCustomerMangment = () => {
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  const columns = [
    {
      title: 'Customer ID',
      dataIndex: 'customerId',
      key: 'customerId',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'First Join',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Full Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (status) => {
        let color;
        switch (status) {
          case 'Active':
            color = 'green';
            break;
          case 'Inactive':
            color = 'red';
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
      customerId: '1',
      createdAt: '1/1/2024',
      email: 'abc@gmail.com',
      name: 'Nguyễn Văn A',
      status: 'Active'
    },
    {
      key: '2',
      customerId: '2',
      createdAt: '1/1/2024',
      email: 'xyz@gmail.com',
      name: 'Lê Văn B',
      status: 'Inactive'
    },
    {
      key: '3',
      customerId: '3',
      createdAt: '1/1/2024',
      email: 'ggg@gmail.com',
      name: 'Ronaldo',
      status: 'Active'
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
        <Typography.Title level={4}>Customer List</Typography.Title>
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

export default AdminCustomerMangment;
