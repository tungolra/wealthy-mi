import React from "react";
import Topbar from "../topbar/Topbar";
import PageHeader from "./PageHeader";

const PageContent = (props) => {
	return (
		<>
			<div className="row">{props.children}</div>
		</>
	);
};

export default PageContent;
