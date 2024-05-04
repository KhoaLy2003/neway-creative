import React, { useEffect, useState } from "react";
import { Layout, Space, Table, Tag, Typography, Image, Button } from "antd";
import { fetchCalendarsInAdminRole } from "../../api/calendar";

const AdminCalendarManagement = () => {
  const [calendars, setCalendars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  useEffect(() => {
    const fetchCalendars = async () => {
      try {
        const data = await fetchCalendarsInAdminRole(currentPage);

        setCalendars(data.content);
        setTotalElements(data.totalElements);
        console.log(data.totalElements);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };

    fetchCalendars();
  }, [currentPage]);

  return (
    <Layout>
      <Space
        size={20}
        direction="vertical"
        style={{
          margin: "24px 16px 0",
        }}
      >
        <Typography.Title level={4}>Calendar List</Typography.Title>
        <Table
          columns={columns}
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
      </Space>
    </Layout>
  );
};

const columns = [
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
    title: "Update",
    key: "update",
    render: () => <Button>Update</Button>,
  },
  {
    title: "Change Status",
    key: "change",
    render: (_, record) => (
      <>
        {record.status === "false" ? (
          <Button type="primary">Activate</Button>
        ) : (
          <Button danger>Deactivate</Button>
        )}
      </>
    ),
  },
];

export default AdminCalendarManagement;
