import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Modal,
  Carousel,
  Image,
  Descriptions,
  Collapse,
  Divider,
  Tag,
} from "antd";
import Link from "antd/es/typography/Link";
import { fetchCalendarDetailInAdminRole } from "../../api/calendar";
import AdminCalendarForm from "./AdminCalendarForm";
import { getColorByDurationUnit, getColorByPackageType } from "../../utils/GetColor";
import { UserContext } from "../../context/AuthContext";

const AdminCalendarModal = ({ modalOpen, setModalOpen, calendarId }) => {
  const [loading, setLoading] = useState(false);
  const [calendarData, setCalendarData] = useState(null);
  const [modalFormOpen, setModalFormOpen] = useState(false);
  const { token } = useContext(UserContext);

  useEffect(() => {
    const fetchCalendarData = async () => {
      setLoading(true);
      try {
        const data = await fetchCalendarDetailInAdminRole(calendarId, token);
        setCalendarData(data);
      } catch (error) {
        console.error("Error fetching calendar detail:", error.message);
      } finally {
        setLoading(false);
      }
    };

    if (modalOpen && calendarId) {
      fetchCalendarData();
    }
  }, [modalOpen, calendarId]);

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setModalOpen(false);
    }, 3000);
  };
  const handleCancel = () => {
    setModalOpen(false);
  };

  const calendars = [
    {
      key: "1",
      label: "Calendar",
      children: calendarData?.title,
    },
    {
      key: "2",
      label: "Status",
      children: (
        // <Badge status="processing" text={calendarData?.delete.toString()} />
        <Tag color={calendarData?.delete ? "red" : "green"}>
          {calendarData?.delete ? "Deleted" : "Active"}
        </Tag>
      ),
      span: 3,
    },
    {
      key: "3",
      label: "Category",
      children: calendarData?.category.name,
    },
    {
      key: "4",
      label: "Description",
      children: calendarData?.description,
    },
  ];

  const packages = calendarData?.packages.map((pkg, index) => ({
    key: `${index}`,
    label: `Package ${index + 1}`,
    children: (
      <>
        <Descriptions.Item label="Price">{pkg.price}</Descriptions.Item>
        <Descriptions.Item label="Type">
          {/* {pkg.packageType} */}
          <Tag color={getColorByPackageType(pkg.packageType)}>
            {pkg.packageType.toUpperCase()}
          </Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Duration unit">
          {/* {pkg.packageDurationUnit} */}
          <Tag color={getColorByDurationUnit(pkg.packageDurationUnit)}>
            {pkg.packageDurationUnit.toUpperCase()}
          </Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Duration value">
          {pkg.durationValue}
        </Descriptions.Item>
        <Descriptions.Item label="Notion">
          <Link href={pkg.linkNotion} target="_blank">
            {pkg.linkNotion}
          </Link>
        </Descriptions.Item>
      </>
    ),
  }));

  const handleOpenCalendarForm = () => {
    setModalFormOpen(true);
    setModalOpen(false);
  };

  return (
    <>
      <Modal
        width={"60%"}
        title={calendarData?.title}
        centered
        open={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Return
          </Button>,
          // <Button
          //   key="submit"
          //   type="primary"
          //   loading={loading}
          //   // onClick={handleOk}
          //   onClick={() => handleOpenCalendarForm()}
          // >
          //   Update
          // </Button>,
        ]}
      >
        <Carousel autoplay style={{ textAlign: "center" }}>
          <div>
            <Image width={200} src={calendarData?.image} />
          </div>
        </Carousel>
        {/* <Descriptions title="Calendar Infomation" bordered items={calendars} /> */}
        <Descriptions title="Calendar Infomation" bordered>
          {calendars.map((item) => (
            <Descriptions.Item label={item.label} key={item.key}>
              {item.children}
            </Descriptions.Item>
          ))}
        </Descriptions>
        <Divider />
        {/* <Collapse
          accordion
          items={packageLayout}
          defaultActiveKey={["1"]}
          style={{ marginBottom: 25 }}
        /> */}
        <Collapse accordion style={{ marginBottom: 25 }}>
          {packages &&
            packages.map((pkg) => (
              <Collapse.Panel header={pkg.label} key={pkg.key}>
                <Descriptions title="Package Information" bordered>
                  {pkg.children}
                </Descriptions>
              </Collapse.Panel>
            ))}
        </Collapse>
      </Modal>

      <AdminCalendarForm
        modalOpen={modalFormOpen}
        setModalOpen={setModalFormOpen}
        calendar={calendarData}
      />
    </>
  );
};

export default AdminCalendarModal;
