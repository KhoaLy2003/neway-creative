import React, { Fragment, useState } from "react";

function PaymentMethod({ options }) {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const paymentOptions = options.map((item) => {
    return (
      <label key={item.id} className="mt-3 mb-3 mr-3">
        <input
          type="radio"
          value={item.value}
          checked={selectedOption === item.value}
          onChange={handleOptionChange}
        />
        <img width="140px" height="140px" src={item.imgUrl} alt={item.value} />
      </label>
    );
  });

  return (
    <Fragment>
      <h2 className="mb-3 mt-3 text-center">Payment method</h2>

      <div className="mt-3 d-flex justify-content-center">{paymentOptions}</div>
    </Fragment>
  );
}

export default PaymentMethod;
