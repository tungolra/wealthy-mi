import React from "react";
import BrandHeader from "./BrandHeader";
import NavDivider from "./NavDivider";
import { Accordion } from "react-bootstrap";
import NavItem from "./NavItem";
import { Link } from "react-router-dom";

export default function Sidebar(props) {
  const sampleDropDown = {
    "title": "Sample Drop Down",
    "path": "#!",
    "iconClass": "fas fa-fw fa-cog",
    "subTitle": "Sample Pages",
    "subNavItems": [
      {
        "title": "Sample Page 1",
        "path": "",
      },
      {
        "title": "Sample Page 2",
        "path": "",
      },
    ],
    "conAlert": props.conAlert,
  };
  /*
    To add construciton alert to any feature, add the following
    onClick = {()=> props.conAlert()}
  */
  return (
    <Accordion
      id="accordionSidebar"
      as="ul"
      className="navbar-nav bg-gradient-primary sidebar sidebar-dark"
    >
      <BrandHeader key="brandHeader" />
      <NavDivider />

      <li
        key="Dashboard"
        className="nav-item"
      >
        <a
          className="nav-link"
          href="#"
          onClick={() => props.conAlert(true)}
        >
          <i className="fas fa-fw fa-tachometer-alt"></i>
          <span>Dashboard</span>
        </a>
      </li>

      <li
        key="Expenses"
        className="nav-item"
      >
        <a className="nav-link" href="#" onClick={() => props.conAlert(true)}>
          <i className="fas fa-layer-group"></i>
          <span>My Expenses</span>
        </a>
      </li>
      <li
        key="Goals"
        className="nav-item"
      >
        <a className="nav-link" href="#" onClick={() => props.conAlert(true)}>
          <i className="fas fa-bullseye"></i>
          <span>My Goals</span>
        </a>
      </li>
      <NavDivider />

      <div className="sidebar-heading">Demo Information</div>

      <li
        key="DemInfo"
        className="nav-item"
      >
        <Link to="demo" className="nav-link">
          <i className="fas fa-fw fa-book"></i>
          <span>Demo Logs</span>
        </Link>
      </li>

      <NavItem {...sampleDropDown} />
    </Accordion>
  );
}
