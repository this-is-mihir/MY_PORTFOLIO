import React from "react";
import Banner from "./Banner";
import Skills from "./Skills";
import Projects from "./Projects";
import CoreValues from "./CoreValue";
import BlogSection from "./Blogs";
import Curriculum from "./AcademicCarriculam";
import Contact from "./Contacts";
import CertificationAwards from "./CertificationAwards";
import Services from "./Services";

const Home = () => {
  return (
    <div>
      <Banner />
      <Skills />
      <Projects />
      <CoreValues />
      <BlogSection />
      <Curriculum />
      <Services />
      <CertificationAwards />
      <Contact />
    </div>
  );
};

export default Home;
