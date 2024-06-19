import React, { useEffect, useState } from "react";
import "../../assets/root.css";
import "../Calendars/Calendar.css";
import { getLatestCalendars } from "../../api/calendar";
import { Card, List, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import Link from "antd/es/typography/Link";
import Meta from "antd/es/card/Meta";

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
              <h2>IDEASY - Lịch ý tưởng</h2>
              <Link href="/calendars">Xem tất cả bộ lịch</Link>
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
    </div>
  );
};

export default LatestCalendars;
