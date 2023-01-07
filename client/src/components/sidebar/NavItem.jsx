import React from "react";
import { Link } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import { useAccordionButton } from "react-bootstrap/AccordionButton";
import NavDivider from "./NavDivider";

const NavItem = (props) => {
	const eventKey = props.title + props.subTitle;
	const singleNav = (
		<>
			<li className="nav-item">
				<Link
					className="nav-link"
					to="#"
					onClick={useAccordionButton(eventKey)}
				>
					<i className={props.iconClass}></i>
					<span>{props.title}</span>
				</Link>
			</li>
		</>
	);

	const multiNav = (
		<>
			<li className="nav-item">
				<a
					className="nav-link collapsed"
					href="#"
					onClick={useAccordionButton(eventKey)}
				>
					<i className="fas fa-ellipsis-vertical"></i>
					<span> {props.title}</span>
				</a>
				<Accordion.Collapse eventKey={eventKey}>
					<div className="bg-white py-2 collapse-inner rounded">
						<h6 className="collapse-header">{props.subTitle}</h6>
						{props.subNavItems.map((subNavItem) => (
							<Link
								className="collapse-item"
								to={subNavItem.path}
							>
								<span>{subNavItem.title}</span>
							</Link>
						))}
					</div>
				</Accordion.Collapse>
			</li>
		</>
	);

	if (props.subTitle) {
		// multiple nav and dropdown case
		return multiNav;
	}

	return singleNav;
};

export default NavItem;
