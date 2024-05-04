import React from "react";
import "../../assets/root.css";
import FillButton from "../Layouts/FillButton";
import Breadcrumb from "../Layouts/Breadcrumb";
import { Table, Tag } from "antd";
const { Column } = Table;

const CalendarDetail = ({ calendarDetail }) => {
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
              <h1 className="display-5 fw-bolder">{calendarDetail.title}</h1>
              <p className="lead">{calendarDetail.description}</p>
              <Table dataSource={calendarDetail.packages.sort(customSort)} pagination={false}>
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
                <FillButton href={"#"} children={"Order"} />
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
