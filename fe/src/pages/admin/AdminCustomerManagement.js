import { Layout, Space, Table, Typography, Tag } from "antd";
import { useState, useEffect } from "react";
import { fetchCustomerForAdmin } from "../../api/customer";

const AdminCustomerMangment = () => {
  const [customerData, setCustomerData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchCustomerForAdmin();
        console.log(data);
        setCustomerData(data.data);
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
      title: 'Customer ID',
      dataIndex: 'customerId',
      key: 'customerId',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Email',
      dataIndex: 'emailAddress',
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
        switch (status.toUpperCase()) {
          case 'ACTIVE':
            color = 'green';
            break;
          case 'INACTIVE':
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
        {customerData && (
          <Table
            columns={columns}
            dataSource={customerData}
            pagination={{
              position: ["bottomCenter"],
              showSizeChanger: false,
              pageSize: 7, 
              total: customerData.length,
              onChange: (page) => setCurrentPage(page),
            }}
            loading={isLoading}
          />
        )}
      </Space>
    </Layout>
  );
};

export default AdminCustomerMangment;
