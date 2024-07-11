import React, { useEffect, useState } from "react";
import {
  UserOutlined,
  CalendarOutlined,
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
  Table,
  Spin,
} from "antd";
import { fetchCustomerForAdmin } from "../../api/customer";
import { getLatestCalendars } from "../../api/calendar";
import { fetchOrderHistoryAdmin } from "../../api/order";
import OrderHistoryChart from "./OrderHistoryChart";

const { Content } = Layout;

const AdminDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
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
        setCustomerCount(customers.data.customers.length);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    const fetchCalendar = async () => {
      try {
        const calendar = await getLatestCalendars();
        setCalendarCount(calendar.data.length);
      } catch (error) {
        console.error("Error fetching calendar:", error);
      }
    };

    const fetchOrder = async () => {
      try {
        const order = await fetchOrderHistoryAdmin();
        setOrderCount(order.data.orderList.length);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

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

          if (!acc[formattedDate]) {
            acc[formattedDate] = 1;
          } else {
            acc[formattedDate]++;
          }

          return acc;
        }, {});

        setOrderHistory(ordersByDate);
        setOrderTable(orderForTable);
        setTotalElements(orderForTable.length);
      } catch (error) {
        console.error("Error fetching order history:", error);
      }
    };

    const fetchAllData = async () => {
      setIsLoading(true);
      await Promise.all([
        fetchCustomers(),
        fetchCalendar(),
        fetchOrder(),
        fetchData(),
      ]);
      setIsLoading(false);
    };

    fetchAllData();
  }, []);

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
        <Spin spinning={isLoading}>
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
                  <CalendarOutlined
                    style={{
                      color: "purple",
                      backgroundColor: "rgba(0,255,255,0.25)",
                      borderRadius: 20,
                      fontSize: 24,
                      padding: 8,
                    }}
                  />
                }
                title={"Calendar"}
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
        </Spin>
      </Space>
      <Content
        style={{
          margin: "24px 16px 0",
        }}
      >
        <Spin spinning={isLoading}>
          <Card title="">
            <div
              style={{
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
                padding: 24,
              }}
            >
              <OrderHistoryChart data={orderHistory} />
            </div>
          </Card>
        </Spin>
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
