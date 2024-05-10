import React from "react";
import { Button, Form, Input, notification } from "antd";
import { login } from "../../api/customer";

const LoginForm = ({ onSuccess, setLoading }) => {
  const [form] = Form.useForm();

  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type, message) => {
    api[type]({
      message: message,
      duration: 3,
    });
  };

  const handleLogin = async (values) => {
    setLoading(true);
    console.log(values);

    const { email, password } = values;
    const loginRequest = {
      email,
      password,
    };

    let response = null;
    try {
      response = await login(loginRequest);

      if (response.status === 200) {
        //console.log("DONE ", response);
        openNotificationWithIcon("success", response.message);
        form.resetFields();
        setLoading(false);
        onSuccess(response.data);
      }
    } catch (error) {
      console.error("Error sending data to backend:", error);
      //Need to fix later
      console.log("Login failed ", error);
      openNotificationWithIcon("error", "Login failed, try again");
      setLoading(false);
    }
  };

  return (
    <>
      <Form
        form={form}
        name="loginForm"
        labelCol={{
          span: 5,
        }}
        style={{
          maxWidth: 600,
          marginTop: 20,
        }}
        initialValues={{
          remember: true,
        }}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email address!",
            },
            {
              type: "email",
              message: "Please enter a valid email address!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button
            key="submit"
            type="primary"
            onClick={() => {
              form
                .validateFields()
                .then((values) => {
                  handleLogin(values);
                })
                .catch((info) => {
                  console.log("Validate Failed:", info);
                });
            }}
          >
            Login
          </Button>
        </Form.Item>
      </Form>

      {contextHolder}
    </>
  );
};

export default LoginForm;
