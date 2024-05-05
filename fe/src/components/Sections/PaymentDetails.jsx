import React, { Fragment, useEffect, useState } from "react";
import { Button } from "antd";
import { createPayment } from "../../api/payment";

function PaymentDetails() {
  const [paymentData, setPaymentData] = useState(null);
  const [error, setError] = useState(null);

  const handleClick = async () => {
    try {
      const paymentCreateDto = {
        amount: 6000,
        orderInfo: "payment test",
      };

      const response = await createPayment(paymentCreateDto);
      setPaymentData(response);
    } catch (error) {
      setError(error.message);
    }
  };

  console.log(paymentData);
  console.log(error);

  return (
    <Fragment>
      <h3>Payment Details</h3>

      <form method="POST">
        {/* <input */}
        {/*   className="form-control mb-3" */}
        {/*   type="text" */}
        {/*   placeholder="Enter Name on Card" */}
        {/* /> */}
        {/* <input */}
        {/*   className="form-control mb-3" */}
        {/*   type="text" */}
        {/*   placeholder="Card Number" */}
        {/* /> */}
        {/* <input */}
        {/*   className="form-control mb-3" */}
        {/*   type="date" */}
        {/*   placeholder="Expiration" */}
        {/* /> */}
        {/* <input */}
        {/*   className="form-control mb-3" */}
        {/*   type="text" */}
        {/*   placeholder="Enter Name on Card" */}
        {/* /> */}
        {/* <input className="form-control mb-3" type="text" placeholder="CVV" /> */}

        <Button style={{ marginRight: "3rem" }} type="default">
          Back
        </Button>
        <Button
          href="  http://sandbox.vnpayment.vn/tryitnow/Home/CreateOrder"
          onClick={handleClick}
          type="primary"
        >
          Confirm Payment
        </Button>
      </form>
    </Fragment>
  );
}

export default PaymentDetails;
