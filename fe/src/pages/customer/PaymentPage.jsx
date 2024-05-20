import { React, useContext, useEffect, useState } from "react";
import {
  Card,
  Button,
  message,
  Steps,
  Form,
  Input,
  Flex,
  Row,
  Col,
  Table,
  Tag,
  Descriptions,
} from "antd";
import Meta from "antd/es/card/Meta";
import Column from "antd/es/table/Column";
import { getColorByPackageType } from "../../utils/GetColor";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/AuthContext";
import { createPayment, saveOrder, updateOrder } from "../../api/payment";

const steps = [
  {
    title: "Information",
    content: "First-content",
  },
  {
    title: "Verification",
    content: "First-content",
  },
  {
    title: "Payment",
    content: "First-content",
  },
  {
    title: "Done",
    content: "First-content",
  },
];

function PaymentPage() {
  const [form] = Form.useForm();
  const location = useLocation();
  const navigate = useNavigate();
  const { calendarDetail } = location.state || {};
  const [selectedRowKey, setSelectedRowKey] = useState(null);
  const [current, setCurrent] = useState(0);
  const [isNavigating, setIsNavigating] = useState(false);
  const { name, email } = useContext(UserContext);
  const [order, setOrder] = useState(null);
  const [orderInfo, setOrderInfo] = useState([]);

  console.log("Calendar", calendarDetail);

  useEffect(() => {
    if (!calendarDetail) {
      console.log("HERE");
      setIsNavigating(true);
      navigate("/calendars");
    }
  }, [calendarDetail, navigate]);

  const next = async () => {
    if (current === 0) {
      const orderDto = {
        price: calendarDetail.packages.find((pkg) => {
          return pkg.id === selectedRowKey;
        }).price,
        packageId: selectedRowKey,
        email: email,
      };

      console.log(orderDto);

      try {
        const response = await saveOrder(orderDto);
        const data = response.data;
        const orderInfoItems = [
          {
            key: "1",
            label: "Name",
            children: <p>{data.name}</p>,
          },
          {
            key: "2",
            label: "Email",
            children: <p>{data.email}</p>,
          },
          {
            key: "3",
            label: "Calendar Title",
            children: <p>{calendarDetail.title}</p>,
          },
          {
            key: "4",
            label: "Package Type",
            children: <p>{data.packageType}</p>,
          },
          {
            key: "5",
            label: "Price",
            children: <p>{data.price}</p>,
          },
        ];

        setOrder(data);
        setOrderInfo(orderInfoItems);
      } catch (error) {
        console.log(error);
        throw error;
      }
    }

    if (current === 1) {
      const orderDto = {
        orderId: order.orderId,
        status: "WAITING",
      };

      const response = await updateOrder(orderDto);
      const data = response.data;

      console.log(data);
    }

    if (current === 2) {
      const paymentDto = {
        orderId: order.orderId,
        amount: order.price,
        orderInfo: `${order.packageType} ${calendarDetail.title}`,
      };

      const response = await createPayment(paymentDto);
      const payload = response.data;

      window.location.href = payload["redirect_url"];
    }

    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  useEffect(() => {
    if (selectedRowKey !== null && calendarDetail) {
      const selectedRow = calendarDetail.packages.find(
        (pkg) => pkg.id === selectedRowKey,
      );
      console.log("Selected Row:", selectedRow);
    }
  }, [selectedRowKey, calendarDetail]);

  if (isNavigating || !calendarDetail) {
    return <div>Loading...</div>;
  }

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
          <div style={{ lineHeight: 260, textAlign: "center", marginTop: 50 }}>
            {
              <>
                <Row gutter={40}>
                  <Col span={3}></Col>
                  <Col span={8}>
                    <Form
                      layout="vertical"
                      form={form}
                      name=""
                      labelCol={{
                        span: 5,
                      }}
                      style={{
                        maxWidth: 600,
                        marginTop: 20,
                      }}
                      initialValues={{
                        name: name,
                        email: email,
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
                        <Input disabled />
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
                        <Input disabled />
                      </Form.Item>
                    </Form>
                  </Col>
                  <Col span={4}></Col>
                  <Col span={6}>
                    <Card
                      cover={
                        <div style={{ overflow: "hidden", height: "200px" }}>
                          <img
                            alt="example"
                            style={{ height: "100%", width: "100%" }}
                            src={calendarDetail.image}
                          />
                        </div>
                      }
                    >
                      <Meta
                        title={calendarDetail.title}
                        style={{ textAlign: "center" }}
                      />
                    </Card>
                  </Col>
                  <Col span={3}></Col>
                </Row>

                <Row style={{ marginTop: 40 }}>
                  <Col span={3}></Col>
                  <Col span={18}>
                    <Table
                      dataSource={calendarDetail.packages}
                      pagination={false}
                      style={{ marginBottom: 20, marginTop: 20 }}
                      rowKey="id"
                      rowSelection={{
                        type: "radio",
                        selectedRowKeys: [selectedRowKey],
                        onChange: (selectedRowKeys) => {
                          setSelectedRowKey(selectedRowKeys[0]);
                        },
                      }}
                    >
                      <Column
                        defaultSortOrder={"descend"}
                        title="Type"
                        dataIndex="packageType"
                        key="packageType"
                        render={(packageType) => (
                          <>
                            <Tag color={getColorByPackageType(packageType)}>
                              {packageType.toUpperCase()}
                            </Tag>
                          </>
                        )}
                      />
                      <Column
                        title="Unit"
                        dataIndex="packageDurationUnit"
                        key="packageDurationUnit"
                      />
                      <Column
                        title="Duration"
                        dataIndex="durationValue"
                        key="durationValue"
                      />
                      <Column title="Price" dataIndex="price" key="price" />
                    </Table>
                  </Col>
                  <Col span={3}></Col>
                </Row>
              </>
            }
          </div>
        )}
        {current === 1 && (
          <div style={{ lineHeight: 260, textAlign: "center", marginTop: 50 }}>
            <Row>
              <Col span={3}></Col>
              <Col span={18}>
                <Descriptions title="Order Info" items={orderInfo} bordered />
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
            {current < steps.length - 1 && (
              <Button
                type="primary"
                onClick={() => next()}
                disabled={!selectedRowKey}
              >
                Next
              </Button>
            )}
            {current === steps.length - 1 && (
              <Button
                type="primary"
                onClick={() => message.success("Processing complete!")}
              >
                Done
              </Button>
            )}
            {current > 0 && (
              <Button
                style={{
                  margin: "0 8px",
                }}
                onClick={() => prev()}
              >
                Previous
              </Button>
            )}
          </Flex>
        </div>
      </Card>
    </div>
  );
}

export default PaymentPage;
