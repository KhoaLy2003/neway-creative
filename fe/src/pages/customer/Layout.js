import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import Header from "../../components/Layouts/Header";
import FooterComponent from "../../components/Layouts/Footer";
const { Content } = Layout;

const RootLayout = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header />
      <Content>
        <Outlet />
      </Content>
      <FooterComponent />
    </Layout>
  );
};

export default RootLayout;
