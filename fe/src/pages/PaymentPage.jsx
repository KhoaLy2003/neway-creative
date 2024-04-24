import { Fragment, React, useState } from "react";

import About from "../components/Layouts/About";
import PageHeading from "../components/Layouts/PageHeading";
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
