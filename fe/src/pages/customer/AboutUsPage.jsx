import React, { Fragment } from "react";
import PageHeading from "../../components/Layouts/PageHeading";
import aboutUsHeading from "../../assets/about-us-main.jpg";
import aboutUs1 from "../../assets/about-us-1.jpg";
import aboutUs2 from "../../assets/about-us-2.jpg";
import "./AboutUsPage.css";

const AboutUsPage = () => {
  return (
    <Fragment>
      <PageHeading />
      <div className="container">
        <div className="about-us-heading">
          <h3>What is Content Calendar</h3>
          <img src={aboutUsHeading} alt="About Us Heading" />
        </div>

        <div className="vision mb-5">
          <div className="row">
            <div className="col-md-6">
              <h4>Vision</h4>

              <h5>What is our vision ?</h5>
              <p>
                To empower individuals and businesses to efficiently plan,
                organize, and optimize their content strategies through
                intuitive digital calendaring, fostering creativity,
                collaboration, and success in the digital realm.
              </p>
            </div>
            <div class="col-md-6">
              <img src={aboutUs1} alt="About Us 1" className="img-fluid" />
            </div>
          </div>
        </div>

        <div className="mission mb-5">
          <div className="row">
            <div className="col-md-6">
              <h4>Mission</h4>

              <h5>What is our mission ?</h5>
              <p>
                Our mission is to provide a comprehensive and user-friendly
                digital calendar platform tailored specifically for content
                creators and marketers. We strive to streamline content planning
                processes, enhance collaboration among team members, and
                facilitate strategic decision-making through insightful
                analytics and customizable features. By continuously innovating
                and adapting to the evolving needs of our users, we aim to
                become the indispensable tool for maximizing content
                effectiveness and achieving measurable results in the
                ever-changing digital landscape.
              </p>
            </div>
            <div className="col-md-6">
              <img src={aboutUs2} alt="About Us 2" className="img-fluid" />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AboutUsPage;
