import React, { useEffect, useState } from "react";
import "../../assets/root.css";
import "../Calendars/Calendar.css";
import Calendar from "../Calendars/Calendar";
import { Link } from "react-router-dom";

const LatestCalendars = () => {
  const [calendars, setCalendars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  useEffect(() => {
    const fetchCalendars = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/calendars/latest");

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();

        setCalendars(data.data);
        setIsLoading(false);
      } catch (error) {
        setHttpError(error.message);
        setIsLoading(false);
      }
    };

    fetchCalendars();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (httpError) {
    return <p>Error: {httpError}</p>;
  }

  return (
    <div className="latest-products">
      <div className="custom-container">
        <div className="row">
          <div className="col-md-12">
            <div className="section-heading">
              <h2>Latest Products</h2>
              <Link to="/calendars">
                View all products <i className="fa fa-angle-right"></i>
              </Link>
            </div>
          </div>
          {calendars.map((calendar) => (
            <Calendar key={calendar.calendarId} calendar={calendar} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LatestCalendars;
