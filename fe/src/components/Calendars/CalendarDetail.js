import React from "react";
import "../../assets/root.css";
import FillButton from "../Layouts/FillButton";
import Breadcrumb from "../Layouts/Breadcrumb";

const CalendarDetail = ({ calendarDetail }) => {
  return (
    <div className="py-5">
      <div className="custom-container my-5">
        {calendarDetail && (
          <div className="row gx-4 gx-lg-5 align-items-center justify-content-center">
            <div className="col-md-12 my-5">
              <Breadcrumb calendarName={calendarDetail.title} />
            </div>
            <div className="col-md-5">
              <img
                className="card-img-top mb-5 mb-md-0"
                src={calendarDetail.image}
                alt={calendarDetail.title}
              />
            </div>
            <div className="col-md-5">
              <h1 className="display-5 fw-bolder">{calendarDetail.title}</h1>
              <div className="fs-5 mb-5">
                {/* <span className="text-decoration-line-through">
                  ${calendarDetail.previousPrice}
                </span> */}
                <span>${calendarDetail.price}</span>
              </div>
              <p className="lead">{calendarDetail.description}</p>
              <div className="d-flex">
                <FillButton href={"#"} children={"Order"} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarDetail;
