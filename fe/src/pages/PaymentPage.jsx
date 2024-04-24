import { React, Fragment, useState } from "react";

import PageHeading from "../components/Layouts/PageHeading";
import About from "../components/Layouts/About";
import PaymentMethod from "../components/Sections/PaymentMethod";

function PaymentPage() {
  return (
    <Fragment>
      <PageHeading />

      <div className="container">
        <div className="col-md-6">
          <PaymentMethod />
        </div>
      </div>

      <About />
    </Fragment>
  );
}

export default PaymentPage;
