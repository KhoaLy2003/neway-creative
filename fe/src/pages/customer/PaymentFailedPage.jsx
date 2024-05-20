import React, { Fragment } from "react";
import PageHeading from "../../components/Layouts/PageHeading";
import ResultContent from "../../components/Layouts/ResultContent";

export default function PaymentFailedPage() {
  return (
    <Fragment>
      <PageHeading />

      <ResultContent
        status="error"
        title="Payment Completed"
        subTitle="Calendar has been added"
        btnText="Back To Home"
        path="/"
      />
    </Fragment>
  );
}
