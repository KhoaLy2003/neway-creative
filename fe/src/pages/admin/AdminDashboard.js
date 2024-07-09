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
} from "antd";
import { Line } from "react-chartjs-2";
import { fetchCustomerForAdmin } from "../../api/customer";
import { getLatestCalendars } from "../../api/calendar";
import { fetchOrderHistoryAdmin } from "../../api/order";

const { Content } = Layout;

const AdminDashboard = () => {
  const [customerCount, setCustomerCount] = useState(0);
  const [calendarCount, setCalendarCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [orderHistory, setOrderHistory] = useState({});

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
        
        const chartData = {
          labels: 'Dataset',
          datasets: [
            {
              label: "Number of Orders",
              data: null,
              fill: false,
              borderColor: "rgb(75, 192, 192)",
              tension: 0.1,
            },
          ],
        };

        setOrderHistory(chartData);
      } catch (error) {
        console.error("Error fetching order history:", error);
        setOrderHistory({}); // Handle error state by setting orderHistory to an empty object
      }
    };

    fetchData();
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
          <div
            style={{
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              padding: 24,
            }}
          >
            <Line data={orderHistory} />
          </div>
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
