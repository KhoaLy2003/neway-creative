import React from "react";
import "./About.css";
import "../../assets/root.css";
import featureImage from "../../assets/feature-image.jpg";
import { Button, Typography } from "antd";

const About = () => {
  return (
    <div className="best-features">
      <div className="custom-container">
        <div className="row">
          <div className="col-md-12">
            <div className="section-heading">
              <h2>About Ideasy Calendar</h2>
            </div>
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
                  <a href="#">More About Us</a>
                </li>
                <li>
                  <a href="#">What do we offer</a>
                </li>
                <li>
                  <a href="#">Where to start</a>
                </li>
                <li>
                  <a href="#">Interesting facts</a>
                </li>
                <li>
                  <a href="#">How to use calendar</a>
                </li>
              </ul>
              {/* <FillButton href={"#"} children={"Try Free Version"} /> */}
              <Button type="primary" size="large">
                Try Free Version
              </Button>
            </div>
          </div>
          <div className="col-md-6">
            <div className="right-image">
              <img src={featureImage} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
