import React, { Fragment } from "react";
import Button from "@mui/material/Button";

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

        <Button sx={{ marginRight: "3rem" }} variant="outlined">
          Back
        </Button>
        <Button variant="contained">Confirm Payment</Button>
      </form>
    </Fragment>
  );
}

export default PaymentDetails;
