import React from "react";
import "../../assets/root.css";
import About from "../../components/Layouts/About";
import LatestCalendars from "../../components/Sections/LatestCalendars";

const HomePage = () => {
  return (
    <React.Fragment>
      <div className="page-heading"></div>
      <LatestCalendars />
      <About />
    </React.Fragment>
  );
};

export default HomePage;
