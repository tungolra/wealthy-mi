import React from "react";
import BrandHeader from "./BrandHeader";
import NavDivider from "./NavDivider";
import { Accordion } from "react-bootstrap";
import NavItem from "./NavItem";
import { Link } from "react-router-dom";
import sideBarContent from "./sideBarContent.json";

export default function Sidebar(props) {
  return (
    <Accordion
      id="accordionSidebar"
      as="ul"
      className="navbar-nav bg-gradient-primary sidebar sidebar-dark"
    >
      <BrandHeader key="brandHeader" />
      <NavDivider />
      <button
        onClick={() => {
          console.log("button was clicked");
          props.conAlert();
        }}
      >
        Con Alert Button
      </button>

      <li
        key="Demo"
        className="nav-item"
      >
        <Link
          className="nav-link"
          to="/app/demo"
        >
          <i className="fas fa-fw fa-tachometer-alt"></i>
          <span>Link Testing : Demo</span>
        </Link>
      </li>

      <li
        key="Dashboard"
        className="nav-item"
      >
        <Link
          className="nav-link"
          to="dashboard"
        >
          <i className="fas fa-fw fa-tachometer-alt"></i>
          <span>Dashboard</span>
        </Link>
      </li>
      <NavDivider />

      <div className="sidebar-heading">Demo Information</div>

      {
        // Array.from(sideBarContent).map()
        sideBarContent.map((navItem, index) => (
          <NavItem {...{ ...navItem, eventKey: index }}></NavItem>
        ))
      }
    </Accordion>
  );
}
