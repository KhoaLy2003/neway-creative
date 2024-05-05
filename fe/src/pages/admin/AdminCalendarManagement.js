import React, { useEffect, useState } from "react";
import {
  Layout,
  Space,
  Table,
  Tag,
  Typography,
  Image,
  Button,
  Flex,
} from "antd";
import { fetchCalendarsInAdminRole } from "../../api/calendar";
import AdminCalendarModal from "../../components/Admin/AdminCalendarModal";
import AdminCalendarForm from "../../components/Admin/AdminCalendarForm";

const AdminCalendarManagement = () => {
  const [calendars, setCalendars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCalendarId, setSelectedCalendarId] = useState(null);
  const [modalFormOpen, setModalFormOpen] = useState(false);

  useEffect(() => {
    const fetchCalendars = async () => {
      try {
        const data = await fetchCalendarsInAdminRole(currentPage);

        setCalendars(data.content);
        console.log(calendars);
        setTotalElements(data.totalElements);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };

    fetchCalendars();
  }, [currentPage]);

  const handleViewCalendar = (calendarId) => {
    setSelectedCalendarId(calendarId);
    setModalOpen(true);
  };

  const handleOpenCalendarForm = () => {
    setModalFormOpen(true);
  };

  return (
    <Layout>
      <Space
        size={20}
        direction="vertical"
        style={{
          margin: "24px 16px 0",
        }}
      >
        <Flex justify="flex-end">
          <Button onClick={() => handleOpenCalendarForm()}>Create</Button>
        </Flex>
        <Typography.Title level={4}>Calendar List</Typography.Title>
        <Table
          // columns={columns}
          columns={columns(handleViewCalendar)}
          pagination={{
            position: ["bottomCenter"],
            total: totalElements,
            showSizeChanger: false,
            pageSize: 8,
          }}
          dataSource={calendars}
          loading={isLoading}
          onChange={(pagination) => setCurrentPage(pagination.current - 1)}
        />

        <AdminCalendarModal
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          calendarId={selectedCalendarId}
        />

        <AdminCalendarForm
          modalOpen={modalFormOpen}
          setModalOpen={setModalFormOpen}
        />
      </Space>
    </Layout>
  );
};

const columns = (handleViewCalendar) => [
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Image",
    dataIndex: "image",
    key: "image",
    render: (image) => (
      <Image.PreviewGroup items={[image]}>
        <Image width={100} src={image} />
      </Image.PreviewGroup>
    ),
  },
  {
    title: "Status",
    key: "status",
    dataIndex: "delete",
    render: (deleteFlag) => (
      <>
        <Tag color={deleteFlag ? "red" : "green"}>
          {deleteFlag ? "Deleted" : "Active"}
        </Tag>
      </>
    ),
  },
  {
    title: "View",
    key: "view",
    render: (_, record) => (
      <Button onClick={() => handleViewCalendar(record.calendarId)}>
        View
      </Button>
    ),
  },
];

export default AdminCalendarManagement;
