import React, { useEffect, useState } from "react";
import {
  UserOutlined,
  ShoppingOutlined,
  OrderedListOutlined,
} from "@ant-design/icons";
import {
  Space,
  Typography,
  Row,
  Col,
  Card,
  Statistic,
  Layout,
  theme,
  Table
} from "antd";
import { fetchCustomerForAdmin } from "../../api/customer";
import { getLatestCalendars } from "../../api/calendar";
import { fetchOrderHistoryAdmin } from "../../api/order";
import OrderHistoryChart from "./OrderHistoryChart";

const { Content } = Layout;

const AdminDashboard = () => {
  const [customerCount, setCustomerCount] = useState(0);
  const [calendarCount, setCalendarCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [orderHistory, setOrderHistory] = useState({});
  const [totalElements, setTotalElements] = useState(0);
  const [orderTable, setOrderTable] = useState([]);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const customers = await fetchCustomerForAdmin();
        //console.log(customers);
        setCustomerCount(customers.data.customers.length);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    fetchCustomers();
  }, []);

  useEffect(() => {
    const fetchCalendar = async () => {
      try {
        const calendar = await getLatestCalendars();
        //console.log(calendar);
        setCalendarCount(calendar.data.length);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    fetchCalendar();
  }, []);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const order = await fetchOrderHistoryAdmin();
        //console.log(order);
        setOrderCount(order.data.orderList.length);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    fetchOrder();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchOrderHistoryAdmin();
        const orders = response.data.orderList;

        const orderForTable = response.data.orderList.map((order) => {
          const transactionCode = "IDEASY(" + order.orderId + ")";
          const [year, month, day] = order.orderDate;
          const formattedDate = `${day}/${month}/${year}`;
          return { ...order, transactionCode, formattedDate };
        });

        const ordersByDate = orders.reduce((acc, order) => {
          const [year, month, day] = order.orderDate;
          const formattedDate = `${day}/${month}/${year}`;
          console.log(formattedDate);

          if (!acc[formattedDate]) {
            acc[formattedDate] = 1;
          } else {
            acc[formattedDate]++;
          }

          return acc;
        }, {});

        console.log(ordersByDate);
        setOrderHistory(ordersByDate);
        setOrderTable(orderForTable);
        setTotalElements(orderForTable.length);
      } catch (error) {
        console.error("Error fetching order history:", error);
      }
    };

    fetchData();
  }, []);

  const columns = [
    {
      title: "Transaction Code",
      dataIndex: "transactionCode",
      key: "transactionCode",
    },
    {
      title: "Customer Name",
      dataIndex: "customerName",
      key: "customerName",
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
        <Typography.Title level={4}>Dashboard</Typography.Title>
        <Row gutter={16}>
          <Col span={8}>
            <DashboardCard
              icon={
                <UserOutlined
                  style={{
                    color: "purple",
                    backgroundColor: "rgba(0,255,255,0.25)",
                    borderRadius: 20,
                    fontSize: 24,
                    padding: 8,
                  }}
                />
              }
              title={"Customer"}
              value={customerCount}
            />
          </Col>
          <Col span={8}>
            <DashboardCard
              icon={
                <ShoppingOutlined
                  style={{
                    color: "purple",
                    backgroundColor: "rgba(0,255,255,0.25)",
                    borderRadius: 20,
                    fontSize: 24,
                    padding: 8,
                  }}
                />
              }
              title={"Product"}
              value={calendarCount}
            />
          </Col>
          <Col span={8}>
            <DashboardCard
              icon={
                <OrderedListOutlined
                  style={{
                    color: "purple",
                    backgroundColor: "rgba(0,255,255,0.25)",
                    borderRadius: 20,
                    fontSize: 24,
                    padding: 8,
                  }}
                />
              }
              title={"Total Order"}
              value={orderCount}
            />
          </Col>
        </Row>
      </Space>
      <Content
        style={{
          margin: "24px 16px 0",
        }}
      >
        <Card title="Order History Chart">
          <Row gutter={16}>
            <Col span={14}>
              <div
                style={{
                  minHeight: 500,
                  background: colorBgContainer,
                  borderRadius: borderRadiusLG,
                  padding: 24,
                }}
              >
                <OrderHistoryChart data={orderHistory} />
              </div>
            </Col>
            <Col span={10}>
              <div
                style={{
                  minHeight: 360,
                  background: colorBgContainer,
                  borderRadius: borderRadiusLG,
                  padding: 24,
                }}
              >
                <Table
                  columns={columns}
                  pagination={{
                    position: ["bottomCenter"],
                    total: totalElements,
                    showSizeChanger: false,
                    pageSize: 5,
                  }}
                  dataSource={orderTable}
                />
              </div>
            </Col>
          </Row>
        </Card>
      </Content>
    </Layout>
  );
};

function DashboardCard({ title, value, icon }) {
  return (
    <Card>
      <Space direction="horizontal">
        {icon}
        <Statistic title={title} value={value} />
      </Space>
    </Card>
  );
}

export default AdminDashboard;
