import React from "react";
import Topbar from "../topbar/Topbar";

function Page(props) {
	return (
		<>
			<div
				id="content-wrapper"
				className="d-flex flex-column"
			>
				<div id="content">
					<Topbar></Topbar>
					<div className="container-fluid">{props.children}</div>
				</div>
			</div>
		</>
	);
}

export default Page;
