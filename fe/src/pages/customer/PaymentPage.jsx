import { React, useEffect, useState } from "react";
import {
  Card,
  Button,
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
import QRImg from "../../assets/Example-QR-code.png";

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
        span: 4,
      },
    ];

    const packageInfoItems = orderDetail.packages
      .map((pkg, index) => [
        {
          key: `package-${index + 1}-title`,
          label: `Tên bộ lịch`,
          children: pkg.calendarTitle,
        },
        {
          key: `package-${index + 1}-type`,
          label: `Loại gói`,
          children: (
            <Tag color={getColorByPackageType(pkg.packageType)}>
              {pkg.packageType.toUpperCase()}
            </Tag>
          ),
        },
        {
          key: `package-${index + 1}-price`,
          label: `Giá gói`,
          children: pkg.price.toLocaleString("de-DE") + " VNĐ",
        },
      ])
      .flat();

    const totalPrice = [
      {
        key: "4",
        label: "Tổng",
        children: orderDetail.price.toLocaleString("de-DE") + " VNĐ",
      },
    ];

    const allInfoItems = [
      ...orderInfoItems,
      ...packageInfoItems,
      ...totalPrice,
    ];

    setOrderInfo(allInfoItems);
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
            orderInfo: orderDetail.email,
          };
          // const paymentResponse = await createPayment(paymentDto);
          // const payload = paymentResponse.data;
          // window.location.href = payload["redirect_url"];

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
        notification.error({
          message: "Đơn hàng của bạn được hủy",
          duration: 2,
        });
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const complete = () => {
    navigate("/");
    notification.success({
      message: "Cảm ơn bạn đã sử dụng sản phẩm của chúng tôi!",
      duration: 3,
    });
  }

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
              lineHeight: "1.5",
              textAlign: "center",
              marginTop: 50,
            }}
          >
            <Row justify="center">
              <Col span={18}>
                <Row justify="center">
                  <Col>
                    <img
                      style={{ width: "300px", height: "auto" }}
                      src={QRImg}
                      alt="QR"
                    />
                  </Col>
                </Row>
                <Row justify="center">
                  <Col>
                    <h4>
                      <strong>Tên chủ tài khoản:</strong> Nguyễn Văn A
                    </h4>
                  </Col>
                </Row>
                <Row justify="center">
                  <Col>
                    <h4>
                      <strong>Số tiền chuyển khoản:</strong>{" "}
                      {orderDetail.price.toLocaleString("de-DE") + " VNĐ"}
                    </h4>
                  </Col>
                </Row>
              </Col>
            </Row>

            <Row justify="center" style={{marginTop: "30px"}}>
              <Col span={18}>
                <h1 style={{ fontWeight: "bold", marginBottom: "20px" }}>
                  Hướng dẫn thanh toán sản phẩm
                </h1>
                <div style={{ textAlign: "left", marginLeft: "70px" }}>
                  <p>
                    <strong>Bước 1:</strong> Mở ứng dụng hỗ trợ thanh toán sử
                    dụng mã QR
                    {"("}Momo, Bank, v.v{")"}
                  </p>
                  <p>
                    <strong>Bước 2:</strong> Thực hiện nhập số tiền cần thanh
                    toán
                  </p>
                  <p>
                    <strong>Bước 3:</strong> Chụp hình xác nhận giao dịch thành
                    công qua fanpage. {" "}
                    <a
                      href="https://www.facebook.com/ideasylichytuong"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <strong>Link fanpage IDEASY</strong>
                    </a>
                  </p>
                
                  <p>
                    <strong>Bước 4:</strong> Admin xác nhận giao dịch thành công
                    và bạn nhận bộ lịch IDEASY qua email!
                  </p>
                </div>
              </Col>
            </Row>
          </div>
        )}

        <div
          style={{
            marginTop: 24,
          }}
        >
          <Flex justify="center">
            <>
              {current === 0 && (
                <Button type="primary" onClick={() => next()}>
                  Tiếp tục
                </Button>
              )}
              {current === 1 && (
                <Button type="primary" onClick={() => complete()}>
                Hoàn tất
              </Button>
              )}
              <Button 
                type="primary"
                danger
                style={{
                  margin: "0 20px",
                }}
                onClick={() => prev()}
              >
                Hủy thanh toán
              </Button>
            </>
          </Flex>
        </div>
      </Card>
    </div>
  );
}

export default PaymentPage;
