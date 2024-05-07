import React, { Fragment, useState } from "react";
import { Button } from "antd";
import { createPayment } from "../../api/payment";

function PaymentDetails() {
  const [formData, setFormData] = useState({
    amount: 0,
    orderInfo: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const paymentDto = {
      amount: formData.amount,
      orderInfo: formData.orderInfo,
    };

    const response = await createPayment(paymentDto);

    const payload = response.data;

    window.location.href = payload["redirect_url"];
  };

  return (
    <Fragment>
      <h3>Payment Details</h3>

      <form onSubmit={handleSubmit} method="POST">
        <input
          className="form-control mb-3"
          type="number"
          name="amount"
          placeholder="Enter the amount"
          onChange={handleChange}
        />
        <input
          className="form-control mb-3"
          type="text"
          name="orderInfo"
          placeholder="Enter Description"
          onChange={handleChange}
        />

        <Button style={{ marginRight: "3rem" }} type="default">
          Back
        </Button>
        <Button type="primary" htmlType="submit">
          Confirm Payment
        </Button>
      </form>
    </Fragment>
  );
}

export default PaymentDetails;
