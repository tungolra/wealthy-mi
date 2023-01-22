import React from "react";
import { Link } from "react-router-dom";

const BrandHeader = (path = "") => {
	return (
		<Link
			className="sidebar-brand d-flex align-items-center justify-content-center"
			href={path}
		>
			<div className="sidebar-brand-icon rotate-n-15">
				<i className="fa-regular fa-face-smile-beam"></i>
			</div>
			<div className="sidebar-brand-text mx-3">
				Wealthy <sup>Mi</sup>
			</div>
		</Link>
	);
};

export default BrandHeader;
