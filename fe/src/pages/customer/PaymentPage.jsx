import { React, useEffect, useState } from "react";
import {
  Card,
  Button,
  message,
  Steps,
  Flex,
  Row,
  Col,
  Tag,
  Descriptions,
  notification,
} from "antd";
import { getColorByPackageType } from "../../utils/GetColor";
import { useLocation, useNavigate } from "react-router-dom";
import { createPayment, updateOrder } from "../../api/payment";

const steps = [
  {
    title: "Xác nhận thông tin",
  },
  {
    title: "Thanh toán và Hoàn tất",
  },
];

function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderDetail } = location.state || {};
  const [current, setCurrent] = useState(0);
  const [isNavigating, setIsNavigating] = useState(false);
  const [orderInfo, setOrderInfo] = useState([]);

  useEffect(() => {
    if (!orderDetail) {
      setIsNavigating(true);
      navigate("/calendars");
    }

    const orderInfoItems = [
      {
        key: "1",
        label: "Email",
        children: orderDetail.email,
        span: 2,
      },
      {
        key: "2",
        label: "Tên bộ lịch",
        children: orderDetail.calendarTitle,
      },
      {
        key: "3",
        label: "Loại gói",
        children: (
          <Tag color={getColorByPackageType(orderDetail.packageType)}>
            {orderDetail.packageType.toUpperCase()}
          </Tag>
        ),
        span: 2,
      },
      {
        key: "4",
        label: "Giá",
        children: orderDetail.price.toLocaleString("de-DE") + " VNĐ",
      },
    ];

    setOrderInfo(orderInfoItems);
  }, [orderDetail, navigate]);

  const next = async () => {
    if (current === 0) {
      const orderDto = {
        orderId: orderDetail.orderId,
        status: "WAITING",
      };

      try {
        const response = await updateOrder(orderDto);

        if (response.status === 200) {
          const paymentDto = {
            orderId: orderDetail.orderId,
            amount: orderDetail.price,
            orderInfo: `${orderDetail.packageType} ${orderDetail.title}`,
          };
          const paymentResponse = await createPayment(paymentDto);
          const payload = paymentResponse.data;
          window.location.href = payload["redirect_url"];

          setCurrent(current + 1);
        }
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  };

  const prev = async () => {
    const orderDto = {
      orderId: orderDetail.orderId,
      status: "CANCELED",
    };

    try {
      const response = await updateOrder(orderDto);
      if (response.status === 200) {
        navigate("/");
        notification.success({
          message: "Đơn hàng của bạn được hủy",
        });
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  return (
    <div className="custom-container" style={{ marginTop: 50 }}>
      <Card>
        <Row>
          <Col span={3}></Col>
          <Col span={18}>
            <Steps current={current} items={items} />
          </Col>
          <Col span={3}></Col>
        </Row>

        {current === 0 && (
          <div
            style={{
              lineHeight: 260,
              textAlign: "center",
              marginTop: 50,
            }}
          >
            <Row>
              <Col span={3}></Col>
              <Col span={18}>
                <Descriptions
                  title="Thông tin đơn hàng"
                  items={orderInfo}
                  bordered
                />
              </Col>
              <Col span={3}></Col>
            </Row>
          </div>
        )}

        {current === 1 && (
          <div
            style={{
              lineHeight: 260,
              textAlign: "center",
              marginTop: 50,
            }}
          >
            <Row>
              <Col span={3}></Col>
              <Col span={18}>
                <p>Vui lòng chờ trong khi chúng tôi xử lý thanh toán...</p>
              </Col>
              <Col span={3}></Col>
            </Row>
          </div>
        )}

        <div
          style={{
            marginTop: 24,
          }}
        >
          <Flex justify="center">
            {current === 0 && (
              <>
                <Button type="primary" onClick={() => next()}>
                  Tiếp tục
                </Button>
                <Button
                  style={{
                    margin: "0 20px",
                  }}
                  onClick={() => prev()}
                >
                  Quay lại
                </Button>
              </>
            )}
          </Flex>
        </div>
      </Card>
    </div>
  );
}

export default PaymentPage;
