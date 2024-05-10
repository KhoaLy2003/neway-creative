import React from "react";
import { Button, Form, Input } from "antd";
import { register } from "../../api/customer";

const RegisterForm = ({ onSuccess, setLoading }) => {
  const [form] = Form.useForm();

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
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input your name!",
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
              message: "Please input your email address!",
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
                  handleRegister(values);
                })
                .catch((info) => {
                  console.log("Validate Failed:", info);
                });
            }}
          >
            Register
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default RegisterForm;
