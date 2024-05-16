import React from "react";
import "../../assets/root.css";
import Breadcrumb from "../Layouts/Breadcrumb";
import { Button, Table, Tag, Typography } from "antd";
import Title from "antd/es/typography/Title";
import { useNavigate } from "react-router-dom";
const { Column } = Table;
const { Text } = Typography;

const CalendarDetail = ({ calendarDetail }) => {
  const navigate = useNavigate();

  const handleOrderClick = () => {
    navigate("/payment", { state: { calendarDetail } });
  };

  return (
    <div className="py-5">
      <div className="custom-container my-5">
        {calendarDetail && (
          <div className="row gx-4 gx-lg-5 align-items-center justify-content-center">
            <div className="col-md-12 my-5">
              <Breadcrumb calendarName={calendarDetail.title} />
            </div>
            <div className="col-md-5">
              <img
                className="card-img-top mb-5 mb-md-0"
                src={calendarDetail.image}
                alt={calendarDetail.title}
              />
            </div>
            <div className="col-md-5">
              <Title level={1}>{calendarDetail.title}</Title>
              <Text>{calendarDetail.description}</Text>
              <Table
                dataSource={calendarDetail.packages.sort(customSort)}
                pagination={false}
                style={{ marginBottom: 20, marginTop: 20 }}
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

              <div className="d-flex">
                <Button type="primary" size="large" onClick={handleOrderClick}>
                  Order
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const customSort = (a, b) => {
  const order = ["BASIC", "ADVANCED", "PREMIUM"];
  const indexA = order.indexOf(a.packageType);
  const indexB = order.indexOf(b.packageType);

  if (indexA === -1 || indexB === -1) {
    return a.packageType.localeCompare(b.packageType);
  }

  return indexA - indexB;
};

const getColorByPackageType = (packageType) => {
  switch (packageType) {
    case "BASIC":
      return "green";
    case "ADVANCED":
      return "geekblue";
    case "PREMIUM":
      return "gold";
    default:
      return "gray";
  }
};

export default CalendarDetail;
