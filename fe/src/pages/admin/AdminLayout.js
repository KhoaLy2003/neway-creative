import React, { useEffect, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  AppstoreOutlined,
  MailOutlined,
  AreaChartOutlined,
  UserOutlined,
  TransactionOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, Badge, theme, Flex } from "antd";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Content } from "antd/es/layout/layout";
const { Sider, Header, Footer } = Layout;

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const items = [
  getItem("Dashboard", "/admin", <AreaChartOutlined />),
  getItem("Calendar", "/admin/calendars", <AppstoreOutlined />),
  getItem("Customer", "/admin/customers", <UserOutlined />),
  getItem("Transaction", "/admin/transactions", <TransactionOutlined />),
  getItem("Post", "/admin/posts", <EditOutlined />),
];

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mailOpen, setMailOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedKeys, setSelectedKeys] = useState("/");
  useEffect(() => {
    const pathName = location.pathname;
    setSelectedKeys(pathName);
    console.log(pathName);
  }, [location.pathname]);

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKeys]}
          items={items}
          onClick={(item) => {
            navigate(item.key);
          }}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            position: "sticky",
            top: 0,
            zIndex: 1,
            width: "100%",
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Flex justify="space-between" align="center">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: 16,
                width: 64,
                height: 64,
              }}
            />
            <Button
              type="text"
              style={{
                width: 64,
                height: 64,
              }}
            >
              {" "}
              <Badge count={9} dot>
                <MailOutlined
                  style={{ fontSize: 20 }}
                  onClick={() => {
                    setMailOpen(true);
                  }}
                />
              </Badge>
            </Button>
          </Flex>
        </Header>
        <Content>
          <Outlet />
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          IDEASY Calendar ©{new Date().getFullYear()}: Neway Creative
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
