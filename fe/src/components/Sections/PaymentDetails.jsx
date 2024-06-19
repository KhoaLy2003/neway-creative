import React, { Fragment, useState } from "react";
import { Button, Select } from "antd";
import { createPayment } from "../../api/payment";
import { useLocation } from "react-router-dom";
import Title from "antd/es/typography/Title";

function PaymentDetails() {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const location = useLocation();
  const { calendarDetail } = location.state || {};

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

  const handlePackageChange = (value) => {
    console.log(value);
    const selected = calendarDetail.packages.find(
      (pkg) => pkg.packageType === value,
    );
    setSelectedPackage(selected);

    console.log(calendarDetail);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(selectedPackage);

    const paymentDto = {
      amount: selectedPackage.price,
      orderInfo: formData.orderInfo,
    };

    const response = await createPayment(paymentDto);

    const payload = response.data;

    window.location.href = payload["redirect_url"];
  };

  return (
    <Fragment>
      <h2 className="mb-3 mt-3 text-center">Payment Details</h2>

      <form onSubmit={handleSubmit} method="POST">
        {/* <input */}
        {/*   className="form-control mb-3" */}
        {/*   type="number" */}
        {/*   name="amount" */}
        {/*   placeholder="Enter the amount" */}
        {/*   onChange={handleChange} */}
        {/* /> */}

        <Title level={4}>{calendarDetail.title}</Title>

        <Select
          placeholder="Select a package"
          style={{ width: "100%", marginTop: 20, marginBottom: 20 }}
          onChange={handlePackageChange}
        >
          {calendarDetail.packages.map((pkg) => (
            <Select.Option key={pkg.id} value={pkg.packageType}>
              {pkg.packageType} - ${pkg.price}
            </Select.Option>
          ))}
        </Select>

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
