import { React, useEffect, useState } from "react";
import "../../assets/root.css";
import Breadcrumb from "../Layouts/Breadcrumb";
import { Button, Table, Tag, Typography } from "antd";
import Title from "antd/es/typography/Title";
import { useNavigate } from "react-router-dom";
import { getColorByPackageType } from "../../utils/GetColor";
import { notification } from "antd";

const { Column } = Table;
const { Text } = Typography;

const CalendarDetail = ({ calendarDetail }) => {
  const navigate = useNavigate();

  const handleOrderClick = () => {
    navigate("/payment", { state: { calendarDetail } });
  };

  // const handleAddToCartClick = () => {
  //   const item = {
  //     calendarDetail: JSON.stringify(calendarDetail),
  //     selectedRow: JSON.stringify(selectedRow),
  //   };

  //   let cart = JSON.parse(localStorage.getItem("cart")) || [];
  //   cart.push(item);
  //   localStorage.setItem("cart", JSON.stringify(cart));
  // };

  const handleAddToCartClick = () => {
    const item = {
      calendarDetail: JSON.stringify(calendarDetail),
      selectedRow: JSON.stringify(selectedRow),
    };
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    // alert(
    //   `${JSON.stringify(calendarDetail)}` +
    //     `Selected Row:" + ${JSON.stringify(selectedRow)}`
    // );
    // Check for dup
    const isItemInCart = cart.some(
      (cartItem) =>
        cartItem.calendarDetail === item.calendarDetail &&
        cartItem.selectedRow === item.selectedRow
    );

    if (isItemInCart) {
      notification.error({
        message: "Item already in cart",
        description: "This item is already in your cart.",
      });
    } else {
      cart.push(item);
      localStorage.setItem("cart", JSON.stringify(cart));
      notification.success({
        message: "Item added to cart",
        description: "The item has been successfully added to your cart.",
      });
    }
  };

  const [selectedRowKey, setSelectedRowKey] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);

  // useEffect(() => {
  //   if (selectedRowKey !== null && calendarDetail) {
  //     const selectedRow = calendarDetail.packages.find(
  //       (pkg) => pkg.id === selectedRowKey
  //     );
  //   }
  // }, [selectedRowKey, calendarDetail]);

  useEffect(() => {
    if (selectedRowKey !== null && calendarDetail) {
      const foundRow = calendarDetail.packages.find(
        (pkg) => pkg.id === selectedRowKey
      );
      setSelectedRow(foundRow);
    }
  }, [selectedRowKey, calendarDetail]);

  return (
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
              dataSource={calendarDetail?.packages?.sort(customSort) || []}
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

            <div className="d-flex">
              <Button type="primary" size="large" onClick={handleOrderClick}>
                Order
              </Button>
              <Button
                type="primary"
                size="large"
                onClick={handleAddToCartClick}
                disabled={selectedRowKey === null}
                style={{ marginLeft: "30px" }}
              >
                Add to cart
              </Button>
            </div>
          </div>
        </div>
      )}
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

export default CalendarDetail;
