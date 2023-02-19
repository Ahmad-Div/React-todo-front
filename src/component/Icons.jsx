import React from "react";

const Icons = ({ setActiveIcon, activeIcon }) => {
  return (
    <div className="types flex flex-row justify-center align-center w-100 gap-1">
      <span onClick={() => setActiveIcon("fa-house")} className={activeIcon === "fa-house" ? "activeType" : ""}>
        <i className="fa-solid fa-house"></i>
      </span>
      <span onClick={() => setActiveIcon("fa-briefcase")} className={activeIcon === "fa-briefcase" ? "activeType" : ""}>
        <i className="fa-solid fa-briefcase"></i>
      </span>
      <span onClick={() => setActiveIcon("fa-school")} className={activeIcon === "fa-school" ? "activeType" : ""}>
        <i className="fa-solid fa-school"></i>
      </span>
      <span onClick={() => setActiveIcon("fa-notes-medical")} className={activeIcon === "fa-notes-medical" ? "activeType" : ""}>
        <i className="fa-solid fa-notes-medical"></i>
      </span>
      <span onClick={() => setActiveIcon("fa-shuffle")} className={activeIcon === "fa-shuffle" ? "activeType" : ""}>
        <i className="fa-solid fa-shuffle"></i>
      </span>
      <span onClick={() => setActiveIcon("fa-mosque")} className={activeIcon === "fa-mosque" ? "activeType" : ""}>
        <i className="fa-solid fa-mosque"></i>
      </span>
    </div>
  );
};

export default Icons;
