import React, { Fragment, useState } from "react";
import momo from "../../assets/momo.jpg";
import vnPay from "../../assets/vn-pay.jpg";

function PaymentMethod() {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <Fragment>
      <h3>Payment method</h3>

      <div className="payment-method mt-3">
        <label className="payment-method">
          <input
            type="radio"
            value="momo"
            checked={selectedOption === "momo"}
            onChange={handleOptionChange}
          />
          <img
            style={{ width: "5rem", height: "3rem" }}
            src={momo}
            alt="Momo"
          />
        </label>
        <label className="payment-method mt-3">
          <input
            type="radio"
            value="vn-pay"
            checked={selectedOption === "vn-pay"}
            onChange={handleOptionChange}
          />
          <img
            style={{ width: "5rem", height: "3rem" }}
            src={vnPay}
            alt="VN Pay"
          />
        </label>
      </div>
    </Fragment>
  );
}

export default PaymentMethod;
