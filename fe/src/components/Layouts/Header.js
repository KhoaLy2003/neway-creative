import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import AuthModal from "../Sections/AuthModal";
import { UserContext } from "../../context/AuthContext";
import logo from "../../assets/ideasy.png";
import { Header } from "antd/es/layout/layout";
import { Button, Dropdown, Flex, Menu, Drawer, Space, Spin } from "antd";
import {
  LoadingOutlined,
  LogoutOutlined,
  ShoppingCartOutlined,
  FileSearchOutlined,
} from "@ant-design/icons";
import { saveOrder } from "../../api/payment";

const CustomHeader = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();
  const { name, logout, email, id } = useContext(UserContext);
  
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

  const handleOrderPayment = async (cart) => {
    setLoading(true);
    if (cart) {
      console.log("HERE", cart);

      const ids = cart.map(item => {
        try {
          const selectedRow = JSON.parse(item.selectedRow);
    
          return selectedRow.id;
        } catch (e) {
          console.error("Error parsing item properties:", e);
          return null;
        }
      }).filter(id => id !== null);
    
      console.log("Extracted IDs:", ids);

      const orderDto = {
        packageIds: ids,
        email: email,
      };

      try {
        const response = await saveOrder(orderDto);
        console.log(response);

        if (response.status === 200) {
          setLoading(false);
          setDrawerVisible(false);
          const orderDetail = response.data;
          navigate("/payment", { state: { orderDetail } });
        }
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  };

  const handleViewOrderHistory = () => {
    navigate(`/order-history`);
  }

  const menu = (
    <Menu>
      <Menu.Item key="1">
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Space direction="vertical">
            <Button type="link" onClick={handleLogout}>
              <LogoutOutlined />
              Đăng xuất
            </Button>
            <Button type="link" onClick={handleViewCart}>
              <ShoppingCartOutlined /> Giỏ hàng
            </Button>
            <Button type="link" onClick={handleViewOrderHistory}>
              <FileSearchOutlined /> Lịch sử mua hàng
            </Button>
          </Space>
        </div>
      </Menu.Item>
    </Menu>
  );

  return (
    <>
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
                <Link to="/">Trang chủ</Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/calendars">Sản phẩm</Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link to="/posts">Bài đăng</Link>
              </Menu.Item>
              <Menu.Item key="4">
                <Link to="/about-us">Về chúng tôi</Link>
              </Menu.Item>
              <Menu.Item key="5" style={{ width: 100 }}>
                {!name && (
                  <Button
                    type="link"
                    onClick={handleModalOpen}
                    style={{ padding: 0 }}
                  >
                    Đăng nhập
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
          title="Giỏ hàng của tôi"
          placement="right"
          onClose={handleDrawerClose}
          visible={drawerVisible}
          width={450}
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
                      style={{ margin: 0 }}
                    >{`Type: ${packageDetail.packageType}`}</p>
                    <p
                      style={{
                        margin: 0,
                        fontWeight: "bold",
                        marginTop: "10px",
                      }}
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
                      Xóa
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
              onClick={() => handleOrderPayment(cart)}
              block
              size="large"
              disabled={cart.length === 0}
            >
              Thanh toán
            </Button>
          </div>
        </Drawer>
      </Header>

      {loading && (
        <Spin
          fullscreen={true}
          indicator={
            <LoadingOutlined
              style={{
                fontSize: 40,
              }}
              spin
            />
          }
        />
      )}
    </>
  );
};

export default CustomHeader;
