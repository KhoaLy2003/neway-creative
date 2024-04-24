import React, { Fragment, useState } from "react";

function PaymentDetails() {
  return (
    <Fragment>
      <h3>Payment Details</h3>

      <form>
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
      </form>
    </Fragment>
  );
}

export default PaymentDetails;
