import React, { Fragment, useState, useEffect } from "react";
import PageHeading from "../../components/Layouts/PageHeading";
import { Layout, Space, Table, Typography, Tag } from "antd";
import { Footer } from "antd/es/layout/layout";
import { getPost } from "../../api/post";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "antd";

export default function ViewOrderHistory() {
  const fetchOrderHistory = async () => {
    try {
    } catch (error) {}
  };

  useEffect(() => {
    fetchOrderHistory();
  }, []);

  const [currentPage, setCurrentPage] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  
  const columns = [
    {
      title: "Order ID",
      dataIndex: "orderId",
      key: "orderId",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Order Date",
      dataIndex: "orderDate",
      key: "orderDate",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (status) => {
        let color;
        switch (status) {
          case "Completed":
            color = "green";
            break;
          case "Cancelled":
            color = "red";
            break;
          case "Pending":
            color = "blue";
            break;
          default:
            color = "default";
        }

        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
  ];
  const data = [
    {
      key: "1",
      orderId: "1",
      orderDate: "1/1/2024",
      price: "300.000",
      status: "Completed",
    },
    {
      key: "2",
      orderId: "2",
      orderDate: "1/1/2024",
      price: "500.000",
      status: "Pending",
    },
    {
      key: "3",
      orderId: "3",
      orderDate: "1/1/2024",
      price: "800.0000",
      status: "Cancelled",
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
            width: '80%',
            margin: '0 auto',
            
          }}
        >
          <Typography.Title level={2} style={{marginTop: '30px'}}>Transaction List</Typography.Title>
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
    </Fragment>
  );
}
