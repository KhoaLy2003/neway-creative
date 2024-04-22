import { Suspense } from "react";
import { useRouteLoaderData, json, defer, Await } from "react-router-dom";

import CalendarDetail from "../components/Calendars/CalendarDetail";
import RelatedCalendars from "../components/Sections/RelatedCalendars";

const DetailPage = () => {
  const { calendar } = useRouteLoaderData("calendar-detail");

  return (
    <div>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={calendar}>
          {(loadedCalendar) => (
            <CalendarDetail calendarDetail={loadedCalendar} />
          )}
        </Await>
      </Suspense>
      <RelatedCalendars calendarId={calendar.calendarId}/>
    </div>
  );
};

export default DetailPage;

async function loadCalendar(id) {
  const response = await fetch("http://localhost:8080/api/calendars/" + id);

  if (!response.ok) {
    throw json(
      { message: "Failed to fetch data" },
      {
        status: 400,
      }
    );
  } else {
    const resData = await response.json();
    return resData.data;
  }
}

export async function loader({ params }) {
  const id = params.calendarId;

  return defer({
    calendar: await loadCalendar(id),
  });
}
