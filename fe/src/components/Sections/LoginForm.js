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

      if (response.status === 404 || response.status === 400) {
        openNotificationWithIcon("error", response.message);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error sending data to backend:", error);
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
              message: "Vui lòng nhập địa chỉ email của bạn",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Mật khẩu"
          name="password"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mật khẩu của bạn",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button
            style={{ marginTop: 20 }}
            size="large"
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
            Đăng nhập
          </Button>
        </Form.Item>
      </Form>

      {contextHolder}
    </>
  );
};

export default LoginForm;
