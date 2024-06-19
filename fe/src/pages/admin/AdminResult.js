import { useLocation } from "react-router-dom";
import ResultContent from "../../components/Layouts/ResultContent";
import { Layout, Space } from "antd";

const AdminResult = () => {
  const location = useLocation();
  const { status, title, subTitle, btnText, path } = location.state;

  return (
    <Layout>
      <Space
        size={20}
        direction="vertical"
        style={{
          margin: "24px 16px 0",
        }}
      >
        <ResultContent
          status={status}
          title={title}
          subTitle={subTitle}
          btnText={btnText}
          path={path}
        />
      </Space>
    </Layout>
  );
};

export default AdminResult;
