import React, { Fragment, useState } from "react";

function PaymentMethod({ options }) {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  return (
    <Fragment>
      <h3>Payment method</h3>

      <div className="payment-methods">
        {options.map((option) => (
          <label key={option.value} className="payment-option">
            <input
              type="radio"
              value={option.value}
              checked={selectedOption === option}
              onChange={() => handleOptionChange(option)}
            />
            <img src={option.imageSrc} alt={option.label} />
          </label>
        ))}
      </div>
    </Fragment>
  );
}

export default PaymentMethod;
