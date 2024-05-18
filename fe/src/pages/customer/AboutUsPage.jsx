import React, { Fragment } from "react";
import PageHeading from "../../components/Layouts/PageHeading";
import aboutUsHeading from "../../assets/ideasy.jpg";
import aboutUs1 from "../../assets/idasy-vision.jpg";
import aboutUs2 from "../../assets/about-us-2.jpg";
import teamMember1 from "../../assets/Add a heading (1).png";
import teamMember2 from "../../assets/Add a heading.png";
import teamMember3 from "../../assets/Add a heading (2).png";
import teamMember4 from "../../assets/Add a heading (3).png";
import teamMember5 from "../../assets/Add a heading (4).png";
import teamMember6 from "../../assets/Add a heading (5).png";
import "./AboutUsPage.css";
import { Flex } from "antd";

const AboutUsPage = () => {
  return (
    <Fragment>
      <PageHeading />
      <div className="container">
        <div
          style={{
            marginTop: "30px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {/* <h3>What is Content Calendar</h3> */}
          <img
            src={aboutUsHeading}
            alt="About Us Heading"
            style={{ width: "90%", height: "250px", objectFit: "cover" }}
          />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "50px",
          }}
        >
          <div className="vision mb-5">
            <div className="row">
              <div className="col-md-6">
                <h1 style={{ fontWeight: "bold" }} className="mb-5">
                  Our Vision
                </h1>

                {/* <h5>What is our vision ?</h5> */}
                <p style={{ fontSize: "20px" }}>
                  Our vision is ambitious yet straightforward: we envision a
                  world where everyone has the tools and resources to become a
                  content creator. By democratizing content creation, we empower
                  individuals and businesses alike to share their stories,
                  ideas, and passions with the world, enriching lives and
                  shaping communities in the process. At Neway Creative, we
                  believe that every voice matters, and we are committed to
                  providing the support and guidance necessary to unleash the
                  creative potential within each of us. Together, let's pave the
                  way to a future where creativity knows no bounds, and everyone
                  has the opportunity to make their mark on the world.
                </p>
              </div>
              <div class="col-md-6">
                <img
                  src={aboutUs1}
                  alt="About Us 1"
                  className="img-fluid"
                  style={{ width: "95%", height: "95%", objectFit: "cover" }}
                />
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "30px",
          }}
        >
          <div className="mission mb-5">
            <div className="row">
              <div className="col-md-6">
                <img
                  src={aboutUs1}
                  alt="About Us 1"
                  className="img-fluid"
                  style={{ width: "95%", height: "95%", objectFit: "cover" }}
                />
              </div>
              <div className="col-md-6">
                <h1 style={{ fontWeight: "bold" }} className="mb-5">
                  Our Mission
                </h1>

                {/* <h3>What is our mission ?</h3> */}
                <p style={{ fontSize: "20px" }}>
                  At Neway Creative, our mission is clear: to bridge the gap
                  between businesses and consumers through captivating content.
                  We understand the power of storytelling and strive to harness
                  it to build meaningful connections that drive engagement,
                  loyalty, and growth. In a world inundated with information, we
                  aim to cut through the noise and deliver content that
                  resonates with your audience, leaving a lasting impression and
                  fostering genuine relationships between brands and their
                  customers.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="team-members mb-5">
          <div style={{ display: "flex", justifyContent: "center" }}>
            <h1 style={{ fontWeight: "bold" }} className="mb-5">
              Meet the team members !
            </h1>
          </div>

          <div className="row" style={{ marginBottom: "20px" }}>
            <div className="col-md-4">
              <img
                src={teamMember1}
                alt="1st Team Member"
                className="img-fluid"
              />
            </div>
            <div className="col-md-4">
              <img
                src={teamMember2}
                alt="2nd Team Member"
                className="img-fluid"
              />
            </div>
            <div className="col-md-4">
              <img
                src={teamMember3}
                alt="3rd Team Member"
                className="img-fluid"
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-4">
              <img
                src={teamMember4}
                alt="4th Team Member"
                className="img-fluid"
              />
            </div>
            <div className="col-md-4">
              <img
                src={teamMember5}
                alt="5th Team Member"
                className="img-fluid"
              />
            </div>
            <div className="col-md-4">
              <img
                src={teamMember6}
                alt="6th Team Member"
                className="img-fluid"
              />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AboutUsPage;
