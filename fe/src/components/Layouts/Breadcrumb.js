import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import "./Breadcrumb.css";

const Breadcrumb = ({ calendarName }) => {
  const location = useLocation();
  const { calendarId } = useParams();

  const isCalendarPage = location.pathname === "/calendars";
  const isDetailPage =
    location.pathname.startsWith("/calendars/") && calendarId;

  return (
    <nav aria-label="breadcrumb" className="">
      <ol className="breadcrumb breadcrumb-container">
        <li>
          <Link to="/" activeClassName="active-link">
            Trang chủ
          </Link>
        </li>
        {isCalendarPage && (
          <>
            <i className="bi bi-chevron-right"></i>
            <li className={isCalendarPage ? "active" : ""}>
              <Link to="/calendars" className={isCalendarPage ? "active" : ""}>
                Bộ lịch
              </Link>
            </li>
          </>
        )}
        {isDetailPage && (
          <>
            <i className="bi bi-chevron-right"></i>
            <li>
              <Link to="/calendars" className="">
                Bộ lịch
              </Link>
            </li>
            <i className="bi bi-chevron-right"></i>
            <li>
              <Link to={`/calendars/${calendarId}`} className="active">
                {calendarName}
              </Link>
            </li>
          </>
        )}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
