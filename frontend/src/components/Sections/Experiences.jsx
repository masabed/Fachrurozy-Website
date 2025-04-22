import React from "react";
import Experience from "../Items/Experience";

const experiencesData = [
  {
    id: 1,
    year: "2020-present",
    degree: "Bug Hunter freelancer",
    content:
      "Hackerone,Bugcrowd, and Indonesian's platforms ",
  },
  {
    id: 2,
    year: "2021-present",
    degree: "National Cyber and Crypto Agency of Indonesia",
    content:
      "Cybersecurity Analyst and Penetration Tester",
  },
  {
    id: 3,
    year: "2024 - 2025",
    degree: "KRES.ID",
    content:
      "Freelance as Remote Jobs in Penetration Test",
  },
];

function Experiences() {
  return (
    <div className="timeline">
      {experiencesData.map((experience) => (
        <Experience experience={experience} key={experience.id} />
      ))}
      <span className="timeline-line"></span>
    </div>
  );
}

export default Experiences;
