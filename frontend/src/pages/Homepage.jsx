import React, { useEffect } from "react";
import { Element } from "react-scroll";
import Layout from "../components/Layout/Layout";
import About from "../components/Sections/About";
import Clients from "../components/Sections/Clients";
import Herosection from "../components/Sections/Herosection";
import SectionHeading from "../components/Items/SectionHeading";
import Funfacts from "../components/Sections/Funfacts";
import Services from "../components/Sections/Services";
import Experiences from "../components/Sections/Experiences";
import Blogs from "../components/Sections/Blogs";
import Contact from "../components/Sections/Contact";
import Educations from "../components/Sections/Educations"; 


function Homepage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Layout>
      <Element name="section-home">
        <Herosection />
      </Element>

      <Element name="section-about">
        <section className="shadow-blue white-bg padding">
          <SectionHeading title="About Me" />
          <About />
        </section>
      </Element>

    
      <Element name="section-educations">
        <section className="shadow-blue white-bg padding">
          <SectionHeading title="Education" />
          <Educations />
        </section>
      </Element>

      <Element name="section-experiences">
        <section className="shadow-blue white-bg padding">
          <SectionHeading title="Working Experiences" />
          <Experiences />
        </section>
      </Element>

      <Element name="section-clients">
        <Clients />
      </Element>
     

      <Element name="section-services">
        <section className="shadow-blue white-bg padding">
          <SectionHeading title="Skills and Certifications" />
          <Services />
        </section>
      </Element>
      
      <Element name="section-funfacts">
        <Funfacts />
      </Element>
      
      <Element name="section-blogs">
        <section className="shadow-blue white-bg padding">
          <SectionHeading title="Project Portofolio and Blogs" />
          <Blogs />
        </section>
      </Element>

      <Element name="section-contact">
        <section className="shadow-blue white-bg padding">
          <SectionHeading title="Get in touch" />
          <Contact />
        </section>
      </Element>
    </Layout>
  );
}

export default Homepage;
