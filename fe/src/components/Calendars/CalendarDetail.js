import { React, useContext, useEffect, useState } from "react";
import "../../assets/root.css";
import Breadcrumb from "../Layouts/Breadcrumb";
import { Button, Carousel, Flex, Image, Table, Tag, Typography } from "antd";
import Title from "antd/es/typography/Title";
import { getColorByPackageType } from "../../utils/GetColor";
import { notification } from "antd";
import { UserContext } from "../../context/AuthContext";
import AuthModal from "../Sections/AuthModal";
const { Column } = Table;
const { Text } = Typography;

const CalendarDetail = ({ calendarDetail }) => {
  const [selectedRowKey, setSelectedRowKey] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [carouselImages, setCarouselImages] = useState([]);
  const { email } = useContext(UserContext);

  // const handleOrderClick = () => {
  //     navigate("/payment", { state: { calendarDetail } });
  // };

  const handleAddToCartClick = () => {
    if (!email) {
      setModalOpen(true);
      return;
    }

    const item = {
      calendarDetail: JSON.stringify(calendarDetail),
      selectedRow: JSON.stringify(selectedRow),
    };
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const isItemInCart = cart.some((cartItem) => {
      const cartItemCalendarDetail = JSON.parse(cartItem.calendarDetail);
      const itemCalendarDetail = JSON.parse(item.calendarDetail);

      return (
        cartItemCalendarDetail.calendarId === itemCalendarDetail.calendarId
      );
    });

    if (isItemInCart) {
      notification.error({
        message: "Bộ lịch đã có trong giỏ hàng",
        duration: 3,
      });
    } else {
      cart.push(item);
      localStorage.setItem("cart", JSON.stringify(cart));
      notification.success({
        message: "Thêm vào giỏ hàng thành công",
        duration: 3,
      });
    }
  };

  useEffect(() => {
    if (selectedRowKey !== null && calendarDetail) {
      const foundRow = calendarDetail.packages.find(
        (pkg) => pkg.id === selectedRowKey
      );
      setSelectedRow(foundRow);
    }
  }, [selectedRowKey, calendarDetail]);

  useEffect(() => {
    if (calendarDetail) {
      const images = [calendarDetail.image, ...calendarDetail.images];
      setCarouselImages(images);
    }
  }, [calendarDetail]);

  return (
    <div className="custom-container my-4">
      {calendarDetail && (
        <div className="row gx-4 gx-lg-5 justify-content-around">
          <div className="col-md-12 my-5">
            <Breadcrumb calendarName={calendarDetail.title} />
          </div>
          <div className="col-md-6">
            <Carousel autoplay arrows effect="fade">
              {carouselImages.map((imageUrl, index) => (
                <Image
                  width={"100%"}
                  height={350}
                  key={index}
                  src={imageUrl}
                  alt={`Calendar Image ${index + 1}`}
                />
              ))}
            </Carousel>
            <Image.PreviewGroup>
              <Flex
                gap={"middle"}
                justify="flex-start"
                style={{ marginTop: 30 }}
              >
                {carouselImages.map((imageUrl, index) => (
                  <Image
                    key={index}
                    width={100}
                    height={100}
                    src={imageUrl}
                    alt={`Calendar Image ${index + 1}`}
                    style={{ cursor: "pointer" }}
                  />
                ))}
              </Flex>
            </Image.PreviewGroup>
          </div>
          <div className="col-md-6">
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
                title="Loại"
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
                title="Đơn vị"
                dataIndex="packageDurationUnit"
                key="packageDurationUnit"
              />
              <Column
                title="Thời gian"
                dataIndex="durationValue"
                key="durationValue"
              />
              <Column
                title="Giá"
                dataIndex="price"
                key="price"
                render={(price) => price.toLocaleString("de-DE") + " VNĐ"}
              />
            </Table>

            <div className="d-flex">
              {/* <Button type="primary" size="large" onClick={handleOrderClick}>
                Mua ngay
              </Button> */}
              <Button
                type="primary"
                size="large"
                onClick={handleAddToCartClick}
                disabled={selectedRowKey === null}
              >
                Cho vào giỏ
              </Button>
            </div>
          </div>
        </div>
      )}

      <AuthModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
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
