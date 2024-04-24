import { Fragment, React, useState } from "react";

import About from "../components/Layouts/About";
import PageHeading from "../components/Layouts/PageHeading";
import PaymentMethod from "../components/Sections/PaymentMethod";
import PaymentDetails from "../components/Sections/PaymentDetails";

function PaymentPage() {
  return (
    <Fragment>
      <PageHeading />

      <div className="container">
        <div className="col-md-6">
          <PaymentMethod />
          <PaymentDetails />
        </div>
      </div>

      <About />
    </Fragment>
  );
}

export default PaymentPage;
