import React, { useEffect, useState } from "react";
import "../../assets/root.css";
import "../Calendars/Calendar.css";
import Calendar from "../Calendars/Calendar";
import { Link } from "react-router-dom";
import { getLatestCalendars } from "../../api/calendar";
import { Spin } from "antd";
import { LoadingOutlined } from '@ant-design/icons';

const LatestCalendars = () => {
  const [calendars, setCalendars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  useEffect(() => {
    const fetchCalendars = async () => {
      try {
        const data = await getLatestCalendars();

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
    return (
      <Spin
        indicator={
          <LoadingOutlined
            style={{
              fontSize: 24,
            }}
            spin
          />
        }
      />
    );
  }

  if (httpError) {
    return <p className="text-center">Error: {httpError}</p>;
  }

  return (
    <div className="latest-products">
      <div className="custom-container">
        <div className="row">
          <div className="col-md-12">
            <div className="section-heading">
              <h2>IDEASY Calendar</h2>
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
