import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import AuthModal from "../Sections/AuthModal";
import { UserContext } from "../../context/AuthContext";
import logo from "../../assets/ideasy.png";
import { Header } from "antd/es/layout/layout";
import { Button, Dropdown, Flex, Menu, Drawer } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";

const CustomHeader = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();
  const { name, logout } = useContext(UserContext);

  useEffect(() => {
    if (drawerVisible) {
      const cartData = JSON.parse(localStorage.getItem("cart")) || [];
      setCart(cartData);
    }
  }, [drawerVisible]);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleViewCart = () => {
    setDrawerVisible(true);
  };

  const handleDrawerClose = () => {
    setDrawerVisible(false);
  };

  const handleDeleteItem = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleOrderPayment = () => {

  }
  const menu = (
    <Menu>
      <Menu.Item key="1">
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Button type="link" onClick={handleLogout}>
            Logout
          </Button>
          <Button type="link" onClick={handleViewCart}>
            <ShoppingCartOutlined /> My cart
          </Button>
        </div>
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
                <Dropdown overlay={menu} trigger={["hover"]} placement="top">
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
      <Drawer
        title="My Cart"
        placement="right"
        onClose={handleDrawerClose}
        visible={drawerVisible}
        width={500}
      >
        <ul style={{ listStyle: "none", padding: 0 }}>
          {cart.map((item, index) => {
            const calendarDetail = JSON.parse(item.calendarDetail);
            const packageDetail = JSON.parse(item.selectedRow);
            return (
              <li
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "30px",
                  borderBottom: "1px solid #e8e8e8",
                  paddingBottom: "10px",
                }}
              >
                {calendarDetail.image && (
                  <img
                    src={calendarDetail.image}
                    alt={calendarDetail.title}
                    style={{
                      width: "120px",
                      height: "120px",
                      objectFit: "cover",
                      marginRight: "20px",
                    }}
                  />
                )}
                <div style={{ flex: 1, overflow: "hidden" }}>
                  <p
                    style={{ margin: 0, fontWeight: "bold" }}
                  >{`Product: ${calendarDetail.title}`}</p>
                  <p
                    style={{
                      margin: 0,
                      wordWrap: "break-word",
                      whiteSpace: "normal",
                    }}
                  >
                    {`${calendarDetail.description}`}
                  </p>
                  <p
                    style={{ margin: 0 }}
                  >{`Type: ${packageDetail.packageType}`}</p>
                  <p
                    style={{ margin: 0, fontWeight: "bold", marginTop: "10px" }}
                  >{`Price: ${packageDetail.price}`}</p>
                  <Button
                    style={{
                      backgroundColor: "red",
                      borderColor: "red",
                      color: "white",
                    }}
                    type="danger"
                    onClick={() => handleDeleteItem(index)}
                  >
                    Remove
                  </Button>
                </div>
              </li>
            );
          })}
        </ul>
        <div
          style={{
            position: "absolute",
            bottom: 50,
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <Button
            type="primary"
            onClick= {handleOrderPayment}
            block
            style={{ fontSize: "16px", height: "60px", width: '250px' }}
          >
            Head to Payment
          </Button>
        </div>
      </Drawer>
    </Header>
  );
};

export default CustomHeader;
