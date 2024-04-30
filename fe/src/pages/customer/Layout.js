import { Outlet, useNavigation } from "react-router-dom";

import Header from "../../components/Layouts/Header";
import Footer from "../../components/Layouts/Footer";

const RootLayout = () => {
  return (
    <>
      <Header />
      {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
      <Outlet />
      <Footer />
    </>
  );
};

export default RootLayout;
