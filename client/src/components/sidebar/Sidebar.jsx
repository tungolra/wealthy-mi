import React from "react";
import BrandHeader from "./BrandHeader";
import NavDivider from "./NavDivider";
import { Accordion } from "react-bootstrap";
import NavItem from "./NavItem";
import { useAccordionButton } from "react-bootstrap/AccordionButton";
import { Link } from "react-router-dom";
import sideBarContent from "./sideBarContent.json";

export default function Sidebar() {
	return (
		<Accordion
			id="accordionSidebar"
			as="ul"
			className="navbar-nav bg-gradient-primary sidebar sidebar-dark"
		>
			<BrandHeader key="brandHeader" />
			<hr className="sidebar-divider my-0" />

			<li
				key="Dashboard"
				className="nav-item"
			>
				<Link
					className="nav-link"
					path="#"
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
