import React from "react";
import { HiMiniChevronDoubleLeft } from "react-icons/hi2";
function Navbar({ inactive, setInactive }) {
  return (
    <div className={`navbar ${inactive ? "navbar--inactive" : ""}`}>
      <div className="navbar__left">
        <span className="navbar__left--icon" style={{cursor:'pointer'}} onClick={() => setInactive(!inactive)}>
          <HiMiniChevronDoubleLeft />
        </span>
        <p className="navbar__left--text">Bienvenue dans votre espace</p>
      </div>
      <div className="navbar__right">
        ELEMENT
      </div>
    </div>
  );
}

export default Navbar;
