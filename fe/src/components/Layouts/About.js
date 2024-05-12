import React from "react";
import "./About.css";
import "../../assets/root.css";
import featureImage from "../../assets/feature-image.jpg";
import { Col, Divider, Row, Space } from "antd";

const About = () => {
  return (
    <div className="best-features">
      <div className="custom-container">
        <div className="row">
          <div className="col-md-12">
            <Divider orientation="left" orientationMargin="0">
              <h2 style={{ color: "#000000" }}>About Ideasy Calendar</h2>
            </Divider>
          </div>
          <div className="col-md-6">
            <div className="left-content">
              <h4>Looking for the best products?</h4>
              <p>
                <a
                  rel="nofollow"
                  href="https://templatemo.com/tm-546-sixteen-clothing"
                  target="_parent"
                >
                  Ideasy
                </a>{" "}
                is a place where you can access many content calendars for your
                work and daily life. Here, we provide calendars that are
                customized for each person.{" "}
                <a rel="nofollow" href="https://templatemo.com/contact">
                  Contact us
                </a>{" "}
                for more info.
              </p>
              <ul className="featured-list">
                <li>
                  <a href="#about-us">More About Us</a>
                </li>
                <li>
                  <a href="#what-we-offer">What do we offer</a>
                </li>
                <li>
                  <a href="#how-to-use">How to use calendar</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-md-6">
            <div className="right-image">
              <img src={featureImage} alt="" />
            </div>
          </div>

          {/* About us */}
          <section id="about-us" style={{ marginTop: 20 }}>
            <Row>
              <Divider>
                <h3 style={{ color: "#000000" }}>About Us</h3>
              </Divider>
              <Space direction="vertical" size={"large"}>
                <Col span={12} style={{ margin: "auto" }}>
                  <img src={featureImage} alt="About Us Thumbnail" />
                </Col>
                <Col span={24} style={{ margin: "auto" }}>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nullam ut ante nec leo consequat elementum. Cras sagittis
                    libero sit amet justo fermentum, at fringilla libero
                    accumsan. Sed auctor lectus sit amet augue fermentum
                    blandit. Nullam fermentum magna eu fermentum ultrices. Morbi
                    convallis bibendum magna, eget feugiat lorem hendrerit non.
                    Curabitur pulvinar, nisl nec dignissim vulputate, libero
                    magna maximus nulla, nec tempor arcu purus eget justo. Ut ut
                    nulla quam.
                  </p>
                </Col>
              </Space>
            </Row>
          </section>
          {/* What we offer */}
          <section id="about-us">
            <Row justify={"space-between"}>
              <Divider orientation="left" orientationMargin="0">
                <h3 style={{ color: "#000000" }}>What We Offer</h3>
              </Divider>
              <Col span={11}>
                <img src={featureImage} alt="What We Offer Thumbnail" />
              </Col>
              <Col span={11}>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam ut ante nec leo consequat elementum. Cras sagittis
                  libero sit amet justo fermentum, at fringilla libero accumsan.
                  Sed auctor lectus sit amet augue fermentum blandit. Nullam
                  fermentum magna eu fermentum ultrices. Morbi convallis
                  bibendum magna, eget feugiat lorem hendrerit non. Curabitur
                  pulvinar, nisl nec dignissim vulputate, libero magna maximus
                  nulla, nec tempor arcu purus eget justo. Ut ut nulla quam.
                </p>
              </Col>
            </Row>
          </section>
          {/* How to use */}
          <section id="how-to-use" style={{ marginTop: 20 }}>
            <Row justify={"space-between"}>
              <Divider orientation="right" orientationMargin="0">
                <h3 style={{ color: "#000000" }}>How to Use Calendar</h3>
              </Divider>
              <Col span={11}>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam ut ante nec leo consequat elementum. Cras sagittis
                  libero sit amet justo fermentum, at fringilla libero accumsan.
                  Sed auctor lectus sit amet augue fermentum blandit. Nullam
                  fermentum magna eu fermentum ultrices. Morbi convallis
                  bibendum magna, eget feugiat lorem hendrerit non. Curabitur
                  pulvinar, nisl nec dignissim vulputate, libero magna maximus
                  nulla, nec tempor arcu purus eget justo. Ut ut nulla quam.
                </p>
              </Col>
              <Col span={11}>
                <img src={featureImage} alt="How to Use Calendar Thumbnail" />
              </Col>
            </Row>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;
