import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import AuthModal from "../Sections/AuthModal";
import { UserContext } from "../../context/AuthContext";
import logo from "../../assets/ideasy.png";
import { Header } from "antd/es/layout/layout";
import { Button, Dropdown, Flex, Menu } from "antd";

const CustomHeader = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const { name, logout } = useContext(UserContext);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const menu = (
    <Menu>
      <Menu.Item key="1">
        <Button type="link" onClick={handleLogout}>
          Logout
        </Button>
      </Menu.Item>
    </Menu>
  );

  return (
    <Header className="header">
      <div className="custom-container">
        <Flex justify="space-between" align="center">
          <Link className="navbar-brand" to="/" style={{ padding: 0 }}>
            <img
              src={logo}
              alt="Logo"
              style={{
                width: 150,
                height: "auto",
                objectFit: "cover",
              }}
            />
          </Link>

          <Menu mode="horizontal" className="menu">
            <Menu.Item key="1">
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/calendars">Our Products</Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/posts">Posts</Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Link to="/about-us">About Us</Link>
            </Menu.Item>
            <Menu.Item key="5" style={{ width: 100 }}>
              {!name && (
                <Button
                  type="link"
                  onClick={handleModalOpen}
                  style={{ padding: 0 }}
                >
                  Login
                </Button>
              )}
              {name && (
                <Dropdown
                  overlay={menu}
                  trigger={["hover"]}
                  placement="top"
                >
                  <Button type="link" style={{ padding: 0 }}>
                    {name}
                  </Button>
                </Dropdown>
              )}
            </Menu.Item>
          </Menu>
          <AuthModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
        </Flex>
      </div>
    </Header>
  );
};

export default CustomHeader;
