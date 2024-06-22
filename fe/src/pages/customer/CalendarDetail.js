import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import CalendarDetail from "../../components/Calendars/CalendarDetail";
import RelatedCalendars from "../../components/Sections/RelatedCalendars";
import { fetchCalendarDetail } from "../../api/calendar";

const DetailPage = () => {
  let { calendarId } = useParams();
  const [calendarData, setCalendarData] = useState(null);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCalendarData = async () => {
      try {
        const data = await fetchCalendarDetail(parseInt(calendarId));
        setCalendarData(data);
        console.log("Calendar: ", data);
      } catch (error) {
        console.error("Error fetching calendar detail:", error.message);
        setError(true);
      }
    };

    fetchCalendarData();
  }, [calendarId]);

  if (error) {
    navigate("/error");
  }

  return (
    <div>
      <CalendarDetail calendarDetail={calendarData} />
      <RelatedCalendars calendarId={calendarId} />
    </div>
  );
};

export default DetailPage;
