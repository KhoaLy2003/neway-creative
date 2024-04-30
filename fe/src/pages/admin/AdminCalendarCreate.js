import { Layout, Space, Typography } from "antd";
import AdminCalendarForm from "./AdminCalendarForm";

const AdminCalendarCreate = () => {
  return (
    <Layout>
      <Space
        size={20}
        direction="vertical"
        style={{
          margin: "24px 16px 0",
        }}
      >
        <Typography.Title level={4}>Create new calendar</Typography.Title>
        <AdminCalendarForm />
      </Space>
    </Layout>
  );
};

export default AdminCalendarCreate;
