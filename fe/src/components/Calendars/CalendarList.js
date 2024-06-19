import React from "react";
import "../../pages/customer/CalendarPage.css";
import "../../assets/root.css";
import { Card, List } from "antd";
import Link from "antd/es/typography/Link";
import Meta from "antd/es/card/Meta";

const CalendarList = ({ calendars }) => {
  return (
    <div className="col-md-12">
      <div className="filters-content">
        <div className="row grid">
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

export default CalendarList;
