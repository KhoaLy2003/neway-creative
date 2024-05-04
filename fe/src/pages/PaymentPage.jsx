import { Fragment, React, useState } from "react";

import About from "../components/Layouts/About";
import PageHeading from "../components/Layouts/PageHeading";
import PaymentDetails from "../components/Sections/PaymentDetails";
import PaymentMethod from "../components/Sections/PaymentMethod";
import momo from "../assets/momo.jpg";
import vnPay from "../assets/vn-pay.jpg";

function PaymentPage() {
  const paymentOptions = [
    { id: 1, value: "momo", imgUrl: momo },
    {
      id: 2,
      value: "vn-pay",
      imgUrl: vnPay,
    },
  ];

  return (
    <Fragment>
      <PageHeading />

      <div className="container">
        <div className="col-md-12">
          <PaymentMethod options={paymentOptions} />
          <PaymentDetails />
        </div>
      </div>

      <About />
    </Fragment>
  );
}

export default PaymentPage;
