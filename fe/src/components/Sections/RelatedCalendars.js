import React, { useEffect, useState } from "react";
import "../../assets/root.css";
import "../Calendars/Calendar.css";
import { Card, List } from "antd";
import Meta from "antd/es/card/Meta";
import Link from "antd/es/typography/Link";
import { getRelatedCalendars } from "../../api/calendar";

const RelatedCalendars = ({ calendarId }) => {
  const [calendars, setCalendars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  useEffect(() => {
    const fetchCalendars = async () => {
      try {
        const data = await getRelatedCalendars(calendarId);

        setCalendars(data.data);
        setIsLoading(false);
      } catch (error) {
        setHttpError(error.message);
        setIsLoading(false);
      }
    };

    fetchCalendars();
  }, [calendarId]);

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
            <h2>Bộ lịch cùng chủ đề</h2>
          </div>
        </div>
        <List
          grid={{
            gutter: 16,
            column: 4,
          }}
          dataSource={calendars}
          renderItem={(item) => (
            <List.Item>
              <Link href={`/calendars/${item.calendarId}`}>
                <Card
                  hoverable
                  cover={
                    <div style={{ overflow: "hidden", height: "200px" }}>
                      <img
                        alt="example"
                        style={{ height: "100%", width: "100%" }}
                        src={item.image}
                      />
                    </div>
                  }
                >
                  <Meta title={item.title} style={{ textAlign: "center" }} />
                </Card>
              </Link>
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default RelatedCalendars;
