import React, { Fragment } from "react";
import PageHeading from "../../components/Layouts/PageHeading";
import ResultContent from "../../components/Layouts/ResultContent";

export default function PaymentSuccessPage() {
  return (
    <Fragment>
      <PageHeading />

      <ResultContent
        status="success"
        title="Payment Completed"
        subTitle="Calendar has been added"
        btnText="Back To Home"
        path="/"
      />
    </Fragment>
  );
}
