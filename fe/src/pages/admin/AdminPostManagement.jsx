import React, { Fragment } from "react";
import AdminPostEditor from "../../components/Admin/AdminPostEditor";
import { Layout, Space, Typography } from "antd";
function AdminPostManagement() {
  return (
    <Fragment>
      <Layout>
        <Space
          size={20}
          direction="vertical"
          style={{
            margin: "24px 16px 0",
          }}
        >
          <Typography.Title level={4}>Admin Post Editor</Typography.Title>
          <AdminPostEditor />
        </Space>
      </Layout>
    </Fragment>
  );
}

export default AdminPostManagement;
