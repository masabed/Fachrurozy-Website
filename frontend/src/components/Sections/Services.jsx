import React from "react";
import Service from "../Items/Service";
import { FaNetworkWired, FaGlobe, FaCode, FaShieldAlt, FaUserShield } from "react-icons/fa"; 

const servicesData = [
  {
    id: 1,
    name: "Penetration Test",
    content: "",
    icon: <FaGlobe />, // ✅ Correct way to store React icons
  },
  {
    id: 2,
    name: "Network Security",
    content: "",
    icon: <FaNetworkWired />, 
  },
  {
    id: 3,
    name: "Backend Developer",
    content: "",
    icon: <FaCode />,
  },
  {
    id: 4,
    name: "Cyber threat Analyst",
    content: "",
    icon: <FaShieldAlt />,
  },
  {
    id: 5,
    name: "Compromise Assessments",
    content: "",
    icon: <FaUserShield />,
  },
];

function Services() {
  return (
    <div className="row justify-content-center -mt-20">
      {servicesData.map((service) => (
        <div key={service.id} className="col-md-4 col-sm-6 mt-20 d-flex justify-content-center">
          <Service service={service} /> {/* ✅ Pass service data correctly */}
        </div>
      ))}
    </div>
  );
}

export default Services;
