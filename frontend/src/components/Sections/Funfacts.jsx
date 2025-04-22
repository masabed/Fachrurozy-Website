import React from "react";
import TrackVisibility from "react-on-screen";
import Funfact from "../Items/Funfact";

const funfactData = [
  {
    id: 1,
    title: "Web Application",
    count: 35,
    icon: "icon-graduate",
  },
  {
    id: 2,
    title: "Mobile Application",
    count: 15,
    icon: "icon-gi",
  },
  {
    id: 3,
    title: "Banking Systems",
    count: 3,
    icon: "icon-graduate",
  },
  {
    id: 4,
    title: "Network Infrastructure",
    count: 5,
    icon: "icon-graduate",
  }
];

function Funfacts() {
  return (
    <section className="shadow-dark color-white background parallax padding-50">
      <div className="row relative z-1 -mt-50 justify-content-center">
        {funfactData.map((funfact) => (
          <div className="col-md-3 col-sm-6 mt-50" key={funfact.id}>
            <TrackVisibility once>
              <Funfact funfact={funfact} />
            </TrackVisibility>
          </div>
        ))}
      </div>
      <div className="overlay"></div>
    </section>
  );
}

export default Funfacts;
