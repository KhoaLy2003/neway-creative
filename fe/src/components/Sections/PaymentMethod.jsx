import React, { Fragment, useState } from "react";

function PaymentMethod() {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  return (
    <Fragment>
      <h3>Payment method</h3>

      <div className="payment-method">
        <label className="image-radio">
          <input
            type="radio"
            value="option1"
            checked={selectedOption === "option1"}
            onChange={() => handleOptionChange("option1")}
          />
          <img src="image1.png" alt="Option 1" />
        </label>
        <label className="image-radio">
          <input
            type="radio"
            value="option2"
            checked={selectedOption === "option2"}
            onChange={() => handleOptionChange("option2")}
          />
          <img src="image2.png" alt="Option 2" />
        </label>
      </div>
    </Fragment>
  );
}

export default PaymentMethod;
