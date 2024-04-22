import React from "react";

import About from "../components/Layouts/About";
import PageHeading from "../components/Layouts/PageHeading";
import LatestCalendars from "../components/Sections/LatestCalendars";

const HomePage = () => {
  return (
    <React.Fragment>
      <PageHeading />
      <LatestCalendars />
      <About />
    </React.Fragment>
  );
};

export default HomePage;
