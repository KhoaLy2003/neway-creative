import React, { useContext, useEffect, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  AppstoreOutlined,
  MailOutlined,
  AreaChartOutlined,
  UserOutlined,
  TransactionOutlined,
  EditOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, Badge, theme, Flex } from "antd";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Content } from "antd/es/layout/layout";
import { UserContext } from "../../context/AuthContext";
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
  getItem("Order", "/admin/orders", <TransactionOutlined />),
  getItem("Post", "/admin/post", <EditOutlined />),
  getItem("Logout", "/logout", <LogoutOutlined />, null, "logout"),
];

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mailOpen, setMailOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useContext(UserContext);

  const [selectedKeys, setSelectedKeys] = useState("/");
  useEffect(() => {
    const pathName = location.pathname;
    setSelectedKeys(pathName);
    console.log(pathName);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

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
        style={{ background: colorBgContainer }}
      >
        <div className="demo-logo-vertical" />
        <Menu
          // theme="dark"
          style={{ background: colorBgContainer }}
          mode="inline"
          selectedKeys={[selectedKeys]}
          items={items}
          onClick={(item) => {
            if (item.key === "/logout") {
              handleLogout();
            } else {
              navigate(item.key);
            }
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
