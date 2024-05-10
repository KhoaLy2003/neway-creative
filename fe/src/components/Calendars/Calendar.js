import React from "react";
import { Link } from "react-router-dom";
import "./Calendar.css";
import "../../assets/root.css";
import Title from "antd/es/typography/Title";

const Calendar = ({ calendar }) => {
  const { title, image, calendarId } = calendar;

  return (
    <div className="col-md-3">
      <div className="product-item">
        <Link to={`/calendars/${calendarId}`}>
          <img src={image} alt={title} />
          <div className="down-content">
            <Title style={{ textAlign: "center" }} level={4}>
              {title}
            </Title>
            {/* Uncomment below if you want to include stars and reviews
          <ul className="stars">
            {[...Array(5)].map((_, index) => (
              <li key={index}>
                <i className="fa fa-star"></i>
              </li>
            ))}
          </ul>
          <span>Reviews (24)</span> */}
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Calendar;
