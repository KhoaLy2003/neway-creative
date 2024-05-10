import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import FooterComponent from "../../components/Layouts/Footer";
import Header from "../../components/Layouts/Header";
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
