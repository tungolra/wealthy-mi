import React from "react";
import BrandHeader from "./BrandHeader";
import NavDivider from "./NavDivider";
import { Accordion } from "react-bootstrap";
import NavItem from "./NavItem";
import { Link } from "react-router-dom";

export default function Sidebar(props) {
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
        <Link
          className="nav-link"
          to="/app/dashboard"
        >
          <i className="fas fa-fw fa-tachometer-alt"></i>
          <span>Dashboard</span>
        </Link>
      </li>

      <NavItem
        {...{
          "title": "My Accounts",
          "path": "#!",
          "iconClass": "fas fa-layer-group",
          "subTitle": "Manage My Accounts",
          "subNavItems": [
            {
              "title": "Incomes",
              "path": "/app/income",
            },
            {
              "title": "Expense Tracker",
              "path": "/app/expense",
            },
            {
              "title": "Assets and Liabilities",
              "path": "/app/asset-liability",
            },
          ],
        }}
      />
      <li
        key="Goals"
        className="nav-item"
      >
        <a className="nav-link" href="#" onClick={() => props.conAlert()}>
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
        <Link to="guide" className="nav-link">
          <i className="fa fa-map-signs"></i>
          <span>Guide</span>
        </Link>
      </li>
    </Accordion>
  );
}
