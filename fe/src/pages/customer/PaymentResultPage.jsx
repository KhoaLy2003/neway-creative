import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ResultContent from "../../components/Layouts/ResultContent";

export default function PaymentResultPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const status = searchParams.get("status");
  const title =
    status === "success" ? "Thanh toán thành công" : "Thanh toán thất bại";
  const subTitle =
    status === "success"
      ? "Bộ lịch đã được gửi qua email của bạn"
      : "Bạn hãy thực hiện thanh toán lại";

  useEffect(() => {
    if (status === "success") {
      localStorage.removeItem("cart");
    }
  }, [status]);


  return (
    <ResultContent
      status={status}
      title={title}
      subTitle={subTitle}
      btnText="Trở về trang chủ"
      path="/"
    />
  );
}
