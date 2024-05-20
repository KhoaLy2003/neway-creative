import React, { useState } from "react";
import { Button, Form, Space, Statistic, Typography, notification } from "antd";
import { InputOTP } from "antd-input-otp";
import { regenerateOtp, verify } from "../../api/customer";
const { Text } = Typography;
const { Countdown } = Statistic;

const OtpVerifyForm = ({
  email,
  onClose,
  onSuccess,
  setLoading,
  onBackToRegister,
}) => {
  const [form] = Form.useForm();
  const [error, setError] = useState("");
  const deadline = Date.now() + 5 * 60 * 1000;

  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type, message) => {
    api[type]({
      message: message,
      duration: 3,
    });
  };

  const handleVerifyOtp = async (values) => {
    setLoading(true);
    let { otp } = values;
    if (
      !otp ||
      otp.includes(undefined) ||
      otp.includes("") ||
      otp.length !== 4
    ) {
      setLoading(false);
      return form.setFields([
        {
          name: "otp",
          errors: ["OTP không hợp lệ."],
        },
      ]);
    }

    otp = otp.join("");
    const verifyRequest = {
      email,
      otp,
    };

    console.log(verifyRequest);
    let response = null;
    try {
      response = await verify(verifyRequest);

      if (response.status === 200) {
        //console.log("DONE ", response);
        openNotificationWithIcon("success", response.message);
        form.resetFields();
        setLoading(false);
        onSuccess();
        onClose();
      }

      if (response.status === 400) {
        //console.log("Verify failed ", response);
        setError(response.message);
        form.resetFields();
        setLoading(false);
      }
    } catch (error) {
      console.error("Error sending data to backend:", error);
    }
  };

  const handleRegenerateOtp = async () => {
    setError("");
    setLoading(true);
    try {
      const response = await regenerateOtp(email);

      if (response.status === 200) {
        openNotificationWithIcon("success", response.message);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error regenerating OTP:", error);
      setError("Tạo mới OTP thất bại, vui lòng thử lại");
      setLoading(false);
    }
  };

  return (
    <>
      {error && <Text type="danger">{error}</Text>}
      <Countdown value={deadline} />
      <Form
        form={form}
        style={{
          maxWidth: 600,
          marginTop: 40,
        }}
      >
        <Form.Item
          name="otp"
          className="center-error-message"
          rules={[{ validator: async () => Promise.resolve() }]}
        >
          <InputOTP autoFocus inputType="numeric" length={4} />
        </Form.Item>

        <Space direction="vertical" size={"large"}>
          <Text underline>Mã OTP đã được gửi đến {email}</Text>

          <Form.Item>
            <Space size={"large"}>
              <Button onClick={onBackToRegister}>Quay về đăng ký</Button>
              <Button key="regenerate" onClick={handleRegenerateOtp}>
                Tạo mới OTP
              </Button>
              <Button
                key="submit"
                type="primary"
                onClick={() => {
                  form
                    .validateFields()
                    .then((values) => {
                      handleVerifyOtp(values);
                      // console.log(values);
                    })
                    .catch((info) => {
                      console.log("Validate Failed:", info);
                    });
                }}
              >
                Xác nhận
              </Button>
            </Space>
          </Form.Item>
        </Space>
      </Form>

      {contextHolder}
    </>
  );
};

export default OtpVerifyForm;
