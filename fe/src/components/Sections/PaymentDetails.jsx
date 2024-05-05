import React, { Fragment } from "react";
import { Button } from "antd";

function PaymentDetails() {
  return (
    <Fragment>
      <h3>Payment Details</h3>

      <form method="POST">
        <input
          className="form-control mb-3"
          type="text"
          placeholder="Enter Name on Card"
        />
        <input
          className="form-control mb-3"
          type="text"
          placeholder="Card Number"
        />
        <input
          className="form-control mb-3"
          type="date"
          placeholder="Expiration"
        />
        <input
          className="form-control mb-3"
          type="text"
          placeholder="Enter Name on Card"
        />
        <input className="form-control mb-3" type="text" placeholder="CVV" />

        <Button style={{ marginRight: "3rem" }} type="default">
          Back
        </Button>
        <Button type="primary">Confirm Payment</Button>
      </form>
    </Fragment>
  );
}

export default PaymentDetails;
