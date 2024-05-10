import React, { useContext, useState } from "react";
import { Modal, Space, Spin, Tabs } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import Title from "antd/es/typography/Title";
import RegisterForm from "./RegisterForm";
import TabPane from "antd/es/tabs/TabPane";
import LoginForm from "./LoginForm";
import OtpVerifyForm from "./OtpVerifyForm";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/AuthContext";

const AuthModal = ({ modalOpen, setModalOpen }) => {
  const [showOTPForm, setShowOTPForm] = useState(false);
  const [email, setCreatedAccountEmail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const navigate = useNavigate();
  const { login } = useContext(UserContext);

  const handleTabChange = (activeKey) => {
    setActiveTab(activeKey);
  };

  const handleRegisterSuccess = (registeredEmail) => {
    setCreatedAccountEmail(registeredEmail);
    setShowOTPForm(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setActiveTab("login");
  };

  const handleLoginSuccess = (customer) => {
    setModalOpen(false);

    const user = {
      name: customer?.name,
      email: customer?.email,
      role: customer?.role,
    };

    if (customer?.token) {
      login(user, customer?.token);
    }
    if (user.role === "ADMIN") {
      navigate("/admin");
    } else if (user.role === "CUSTOMER") {
      navigate("/");
    }
  };

  return (
    <Modal
      title={<Title level={2}>Welcome to IDEASY</Title>}
      centered
      open={modalOpen}
      onOk={() => setModalOpen(false)}
      onCancel={() => setModalOpen(false)}
      style={{ textAlign: "center" }}
      footer={null}
      afterClose={() => {
        setActiveTab("login");
      }}
    >
      {!showOTPForm ? (
        <Tabs
          activeKey={activeTab}
          onChange={handleTabChange}
          tabBarStyle={{ margin: "0 auto" }}
        >
          <TabPane tab="Register" key="register">
            <RegisterForm
              onSuccess={handleRegisterSuccess}
              setLoading={setLoading}
            />
          </TabPane>
          <TabPane tab="Login" key="login">
            <LoginForm onSuccess={handleLoginSuccess} setLoading={setLoading} />
          </TabPane>
        </Tabs>
      ) : (
        <OtpVerifyForm
          email={email}
          setLoading={setLoading}
          onClose={handleCloseModal}
          onSuccess={() => {
            setShowOTPForm(false);
            setLoading(false);
          }}
        />
      )}

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
    </Modal>
  );
};

export default AuthModal;
