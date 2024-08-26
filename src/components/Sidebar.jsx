import React from "react";
import Image from "../assets/Logo.png";
import Image_slim from "../assets/Logo_slim.png";
import Navbar from "./Navbar";
import { HiMiniChevronDoubleLeft } from "react-icons/hi2";
const SidebarItem=()=>{
    return(
        <div className="sidebar__item">
            <span className="sidebar__item--icon">
                <HiMiniChevronDoubleLeft />
            </span>
            <span className="sidebar__item--text">Tableau de Bord</span>
        </div>
    )
}
function Sidebar({inactive}) {
  return (
    <div className={`sidebar ${inactive ? "sidebar--inactive" : ""}`}>
      <div className="sidebar__left">
        <div className="sidebar__left--header">
            {inactive ? <img src={Image_slim} alt="Logo" /> : <img src={Image} alt="Logo" />}
          
        </div>
      </div>
      <div className="sidebar__content">
            <SidebarItem/>
            <SidebarItem/>
            <SidebarItem/>
            <SidebarItem/>
            <SidebarItem/>
            <SidebarItem/>
            <SidebarItem/>
            <SidebarItem/>
            <SidebarItem/>
            <SidebarItem/>
            <SidebarItem/>
            <SidebarItem/>
            <SidebarItem/>
            <SidebarItem/>
            <SidebarItem/>
            <SidebarItem/>
            <SidebarItem/>
            <SidebarItem/>
      </div>
    </div>
  );
}

export default Sidebar;
