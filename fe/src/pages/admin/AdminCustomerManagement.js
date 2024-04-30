import { Layout, Space, Table, Typography } from "antd";
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
          //columns={columns}
          pagination={{
            position: ["bottomCenter"],
            total: totalElements,
            showSizeChanger: false,
          }}
          //dataSource={}
          loading={isLoading}
          onChange={(pagination) => setCurrentPage(pagination.current - 1)}
        />
      </Space>
    </Layout>
  );
};

export default AdminCustomerMangment;
