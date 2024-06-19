import React from "react";
import { Button, Form, Input, notification } from "antd";
import { register } from "../../api/customer";

const RegisterForm = ({ onSuccess, setLoading }) => {
  const [form] = Form.useForm();

  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type, message) => {
    api[type]({
      message: message,
      duration: 3,
    });
  };

  const handleRegister = async (values) => {
    setLoading(true);
    console.log(values);

    const { name, email, password } = values;
    const registerRequest = {
      name,
      email,
      password,
    };

    let response = null;
    try {
      response = await register(registerRequest);

      if (response.status === 400) {
        openNotificationWithIcon("error", response.message);
        setLoading(false);
      }

      if (response.status === 201) {
        //console.log("DONE ", response);
        form.resetFields();
        setLoading(false);
        onSuccess(response.data);
      }
    } catch (error) {
      console.error("Error sending data to backend:", error);
    }
  };

  return (
    <>
      <Form
        form={form}
        name="registerForm"
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
          label="Tên"
          name="name"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên của bạn",
            },
          ]}
        >
          <Input />
        </Form.Item>

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
                  handleRegister(values);
                })
                .catch((info) => {
                  console.log("Validate Failed:", info);
                });
            }}
          >
            Đăng ký
          </Button>
        </Form.Item>
      </Form>

      {contextHolder}
    </>
  );
};

export default RegisterForm;
