import React from "react";
import Calendar from "./Calendar";
import "../../pages/customer/CalendarPage.css";
import "../../assets/root.css";

const CalendarList = ({ calendars }) => {
  return (
    <div className="col-md-12">
      <div className="filters-content">
        <div className="row grid">
          {calendars.map((calendar) => (
            <Calendar key={calendar.calendarId} calendar={calendar} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CalendarList;
