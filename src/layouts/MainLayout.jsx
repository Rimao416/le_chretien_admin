import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useState } from "react";

const Location = ({ category, active }) => (
  <span className="location">
    {category} {active && <span className="location__active">{active}</span>}
  </span>
);

function MainLayout({ title, subtitle, children }) {
  const [inactive, setInactive] = useState(false);
  return (
    <div className="layout">
      <Sidebar inactive={inactive} />
      <Navbar inactive={inactive} setInactive={setInactive} />
      <div
        className={`layout__container ${
          inactive ? "layout__container--inactive" : ""
        }`}
      >
        <div className={`main ${inactive ? "main--inactive" : ""}`}>
          <div className="main__title">
            <div className="main__title--wrapper">
              <h2>{title}</h2>
            </div>
            <div className="main__title--wrapper">{subtitle}</div>
          </div>
          <div className="main__container">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default MainLayout;
