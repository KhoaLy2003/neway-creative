import { Suspense } from "react";
import { useRouteLoaderData, defer, Await } from "react-router-dom";

import CalendarDetail from "../../components/Calendars/CalendarDetail";
import RelatedCalendars from "../../components/Sections/RelatedCalendars";
import { fetchCalendarDetail } from "../../api/calendar";

const DetailPage = () => {
    const { calendar } = useRouteLoaderData("calendar-detail");

    return (
        <div>
            <Suspense
                fallback={<p style={{ textAlign: "center" }}>Loading...</p>}
            >
                <Await resolve={calendar}>
                    {(loadedCalendar) => (
                        <CalendarDetail calendarDetail={loadedCalendar} />
                    )}
                </Await>
            </Suspense>
            <RelatedCalendars calendarId={calendar.calendarId} />
        </div>
    );
};

export default DetailPage;

export async function loader({ params }) {
    const id = params.calendarId;

    return defer({
        calendar: await fetchCalendarDetail(id),
    });
}
