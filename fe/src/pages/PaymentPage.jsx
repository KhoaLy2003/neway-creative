import { React, Fragment } from "react";

import PageHeading from "../components/Layouts/PageHeading";
import About from "../components/Layouts/About";
import PaymentMethod from "../components/Sections/PaymentMethod";

function PaymentPage() {
  const options = [
    { value: "momo", label: "Momo", imageSrc: "../assets/momo.png" },
    { value: "vn-pay", label: "VN Pay", imageSrc: "../assets/vn-pay.png" },
  ];

  return (
    <Fragment>
      <PageHeading />

      <div className="container">
        <div className="col-md-6">
          <PaymentMethod options={options} />
        </div>
      </div>

      <About />
    </Fragment>
  );
}

export default PaymentPage;
