import React, { useEffect, useState } from "react";
import { Link as ScrollLink } from "react-scroll";
import { Link, useRouteMatch } from "react-router-dom";
import {
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
  FaTelegramPlane
} from "react-icons/fa";

const headerData = {
  name: "Fachrurozy",
  designation: "Cybersecurity Analyst",
  imageThumb: "/images/logo.png",
  social: {
    instagram: "https://www.instagram.com/rizkyfachrurozy",
    linkedin: "https://www.linkedin.com/in/rizkyfachrurozy",
    github: "https://github.com/in/masabed",
    telegram: "https://t.me/",
  },
};

function Header({ toggleHeader, toggleHandler }) {
  const [currentPath, setCurrentPath] = useState("");
  const match = useRouteMatch();

  useEffect(() => {
    setCurrentPath(match.path);
  }, [match]);

  return (
    <>
      <div
        className={
          toggleHeader
            ? "mobile-header py-2 px-3 mt-4 push"
            : "mobile-header py-2 px-3 mt-4"
        }
      >
        <button className="menu-icon mr-2" onClick={toggleHandler}>
          <span></span>
          <span></span>
          <span></span>
        </button>
        <Link to="/" className="logo">
          <img src={headerData.imageThumb} alt={headerData.name} />
        </Link>
        <Link to="/" className="site-title dot ml-2">
          {headerData.name}
        </Link>
      </div>

      <header
        className={
          toggleHeader
            ? "left float-left shadow-dark open"
            : "left float-left shadow-dark"
        }
      >
        <button
          type="button"
          className="close"
          aria-label="Close"
          onClick={toggleHandler}
        >
          <span aria-hidden="true">&times;</span>
        </button>
        <div className="header-inner d-flex align-items-start flex-column">
          <Link to="/">
            <img src={headerData.imageThumb} alt={headerData.name} />
          </Link>
          <Link to="/" className="site-title dot mt-3">
            {headerData.name}
          </Link>

          <span className="site-slogan">{headerData.designation}</span>

          <nav>
            <ul className="vertical-menu scrollspy">
              <li>
                {currentPath === "/" ? (
                  <ScrollLink
                    activeClass="active"
                    to="section-home"
                    spy={true}
                    smooth={true}
                    offset={-50}
                    duration={500}
                  >
                    <i className="icon-home"></i>Home
                  </ScrollLink>
                ) : (
                  <Link to="/">
                    <i className="icon-home"></i>Home
                  </Link>
                )}
              </li>
              <li>
                {currentPath === "/" ? (
                  <ScrollLink
                    activeClass="active"
                    to="section-about"
                    spy={true}
                    smooth={true}
                    offset={-50}
                    duration={500}
                  >
                    <i className="icon-user"></i>About
                  </ScrollLink>
                ) : (
                  <Link to="/">
                    <i className="icon-user"></i>About
                  </Link>
                )}
              </li>
              <li>
                {currentPath === "/" ? (
                  <ScrollLink
                    activeClass="active"
                    to="section-educations" // ✅ Fixed Working Experience
                    spy={true}
                    smooth={true}
                    offset={-50}
                    duration={500}
                  >
                    <i className="icon-graduation"></i>Educations
                  </ScrollLink>
                ) : (
                  <Link to="/">
                    <i className="icon-graduation"></i>Educations
                  </Link>
                )}
              </li>
              <li>
                {currentPath === "/" ? (
                  <ScrollLink
                    activeClass="active"
                    to="section-experiences" // ✅ Fixed Working Experience
                    spy={true}
                    smooth={true}
                    offset={-50}
                    duration={500}
                  >
                    <i className="icon-briefcase"></i>Working Experiences
                  </ScrollLink>
                ) : (
                  <Link to="/">
                    <i className="icon-briefcase"></i>Working Experiences
                  </Link>
                )}
              </li>
              <li>
                {currentPath === "/" ? (
                  <ScrollLink
                    activeClass="active"
                    to="section-clients"
                    spy={true}
                    smooth={true}
                    offset={-50}
                    duration={500}
                  >
                    <i className="icon-bulb"></i>Certifications
                  </ScrollLink>
                ) : (
                  <Link to="/">
                    <i className="icon-bulb"></i>Certifications
                  </Link>
                )}
              </li>
              <li>
                {currentPath === "/" ? (
                  <ScrollLink
                    activeClass="active"
                    to="section-funfacts" 
                    spy={true}
                    smooth={true}
                    offset={-50}
                    duration={500}
                  >
                    <i className="icon-graduation"></i>Portofolio
                  </ScrollLink>
                ) : (
                  <Link to="/">
                    <i className="icon-graduation"></i>Portofolio
                  </Link>
                )}
              </li>
              <li>
                {currentPath === "/" ? (
                  <ScrollLink
                    activeClass="active"
                    to="section-blogs"
                    spy={true}
                    smooth={true}
                    offset={-50}
                    duration={500}
                  >
                    <i className="icon-grid"></i>Project & Blogs
                  </ScrollLink>
                ) : (
                  <Link to="/">
                    <i className="icon-grid"></i>Project & Blogs
                  </Link>
                )}
              </li>
              <li>
                {currentPath === "/" ? (
                  <ScrollLink
                    activeClass="active"
                    to="section-contact"
                    spy={true}
                    smooth={true}
                    offset={-50}
                    duration={500}
                  >
                    <i className="icon-phone"></i>Contact
                  </ScrollLink>
                ) : (
                  <Link to="/">
                    <i className="icon-phone"></i>Contact
                  </Link>
                )}
              </li>
            </ul>
          </nav>

          <div className="footer mt-auto">
            <ul className="social-icons list-inline">
              {!headerData.social.github ? null : (
                <li className="list-inline-item">
                  <a href={headerData.social.github}>
                    <FaGithub />
                  </a>
                </li>
              )}
              {!headerData.social.linkedin ? null : (
                <li className="list-inline-item">
                  <a href={headerData.social.linkedin}>
                    <FaLinkedinIn />
                  </a>
                </li>
              )}
              {!headerData.social.instagram ? null : (
                <li className="list-inline-item">
                  <a href={headerData.social.instagram}>
                    <FaInstagram />
                  </a>
                </li>
              )}
              {!headerData.social.telegram ? null : (
                <li className="list-inline-item">
                  <a href={headerData.social.telegram}>
                    <FaTelegramPlane />
                  </a>
                </li>
              )}
            </ul>

            <span className="copyright">
              &copy; {new Date().getFullYear()} RIZKY FACHRUROZY
            </span>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
