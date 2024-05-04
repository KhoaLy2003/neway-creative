import React, { Fragment, useState } from "react";

function PaymentMethod({ options }) {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const paymentOptions = options.map((item) => {
    return (
      <label key={item.id} className="payment-method mt-3">
        <input
          type="radio"
          value={item.value}
          checked={selectedOption === item.value}
          onChange={handleOptionChange}
        />
        <img
          style={{ width: "5rem", height: "3rem" }}
          src={item.imgUrl}
          alt={item.value}
        />
      </label>
    );
  });

  return (
    <Fragment>
      <h3>Payment method</h3>

      <div className="payment-method mt-3">{paymentOptions}</div>
    </Fragment>
  );
}

export default PaymentMethod;
