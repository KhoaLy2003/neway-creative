import React, { useEffect, useState } from "react";
import "../../assets/root.css";
import "../Calendars/Calendar.css";
import Calendar from "../Calendars/Calendar";

const RelatedCalendars = ({ calendarId }) => {
  const [calendars, setCalendars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  useEffect(() => {
    const fetchCalendars = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/calendars/${calendarId}/related`
        );

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
    <div className="custom-container">
      <div className="row">
        <div className="col-md-12">
          <div className="section-heading text-center">
            <h2>Related Products</h2>
          </div>
        </div>
        {calendars.map((calendar) => (
          <Calendar key={calendar.calendarId} calendar={calendar} />
        ))}
      </div>
    </div>
  );
};

export default RelatedCalendars;
