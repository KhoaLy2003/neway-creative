import React from "react";
import './About.css';
import "../../assets/root.css";
import featureImage from "../../assets/feature-image.jpg";
import FillButton from "./FillButton";

const About = () => {
  return (
    <div className="best-features">
      <div className="custom-container">
        <div className="row">
          <div className="col-md-12">
            <div className="section-heading">
              <h2>About Sixteen Clothing</h2>
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
                  This template
                </a>{" "}
                is free to use for your business websites. However, you have no
                permission to redistribute the downloadable ZIP file on any
                template collection website.{" "}
                <a rel="nofollow" href="https://templatemo.com/contact">
                  Contact us
                </a>{" "}
                for more info.
              </p>
              <ul className="featured-list">
                <li>
                  <a href="#">Lorem ipsum dolor sit amet</a>
                </li>
                <li>
                  <a href="#">Consectetur an adipisicing elit</a>
                </li>
                <li>
                  <a href="#">It aquecorporis nulla aspernatur</a>
                </li>
                <li>
                  <a href="#">Corporis, omnis doloremque</a>
                </li>
                <li>
                  <a href="#">Non cum id reprehenderit</a>
                </li>
              </ul>
              <FillButton href={"#"} children={"Read More"}/>
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
