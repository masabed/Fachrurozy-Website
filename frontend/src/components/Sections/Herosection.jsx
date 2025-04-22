import React from "react";
import { Link as ScrollLink } from "react-scroll";
import { GrDocumentDownload } from "react-icons/gr";

const herosectionData = {
  name: "Fachrurozy",
  aboutMe:
    "Cybersecurity Consultant with a passion for offensive security & Blue Team, experienced in Penetration Testing and Network Security",
};

function Herosection() {
  return (
    <section
      className="hero background parallax shadow-dark d-flex align-items-center"
      style={{ backgroundImage: "url(/images/rozy.png)" }}
    >
      <div className="cta mx-auto mt-2">
        <h1 className="mt-0 mb-4">
          I’m {herosectionData.name}
          <span className="dot"></span>
        </h1>
        <p className="mb-4">{herosectionData.aboutMe}</p>
        <ScrollLink
          activeClass="active"
          to="section-portfolios"
          spy={true}
          smooth={true}
          duration={500}
          offset={50}
          className="btn btn-default btn-lg mr-3"
        >
          <GrDocumentDownload size={20} className="mr-2" /> Download Resume
        </ScrollLink>
        <div
          className="spacer d-md-none d-lg-none d-sm-none"
          data-height="10"
        ></div>
        <ScrollLink
          activeClass="active"
          to="section-contact"
          spy={true}
          smooth={true}
          duration={500}
          offset={50}
          className="btn btn-border-light btn-lg"
        >
          <i className="icon-envelope"></i>Get in Touch
        </ScrollLink>
      </div>
      <div className="overlay"></div>
    </section>
  );
}

export default Herosection;
