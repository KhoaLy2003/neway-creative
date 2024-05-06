import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import { createPayment } from "../../api/payment";

function PaymentDetails() {
  const [paymentData, setPaymentData] = useState(null);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (paymentCreateDto) => {
    try {
      // const paymentCreateDto = {
      //   amount: 6000,
      //   orderInfo: "payment test",
      // };

      const response = await createPayment(paymentCreateDto);
      setPaymentData(response);

      const url = response["redirect_url"];

      navigate(url);
    } catch (error) {
      setError(error.message);
    }
  };

  console.log(paymentData);
  console.log(error);

  return (
    <Fragment>
      <h3>Payment Details</h3>

      <form onSubmit={handleSubmit} method="POST">
        <input
          className="form-control mb-3"
          type="number"
          placeholder="Enter the amount"
        />
        <input
          className="form-control mb-3"
          type="text"
          placeholder="Enter Description"
        />

        <Button style={{ marginRight: "3rem" }} type="default">
          Back
        </Button>
        <Button
          // href="http://sandbox.vnpayment.vn/tryitnow/Home/CreateOrder"
          type="primary"
          htmlType="submit"
        >
          Confirm Payment
        </Button>
      </form>
    </Fragment>
  );
}

export default PaymentDetails;
