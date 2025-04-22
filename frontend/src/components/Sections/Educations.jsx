import React from "react";
import Education from "../Items/Education";

const educationsData = [
  {
    id: 1,
    year: "2017 - 2021",
    degree: "National Cyber and Crypto Polytechnic of Indonesia",
    content: "Bachelor's Degree in Cyber Security Engineering",
  },
  {
    id: 2,
    year: "2025 - 2027",
    degree: "Johns Hopkins University",
    content: "Master of Science in Security Informatic, Whiting School of Engineering ",
  },
];

function Educations() {
  return (
    <div className="timeline">
      {educationsData.map((education) => (
        <Education education={education} key={education.id} />
      ))}
      <span className="timeline-line"></span>
    </div>
  );
}

export default Educations;
