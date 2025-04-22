import React from "react";

function Service({ service: { name, content, icon } }) {
  return (
    <div className="service-item text-center">
      <div className="icon mb-3" style={{ fontSize: "3rem", color: "#007bff" }}>
        {icon} {/* ✅ Render icon correctly */}
      </div>
      <h4 className="my-3">{name}</h4>
      <p className="mb-0">{content}</p>
    </div>
  );
}

export default Service;
