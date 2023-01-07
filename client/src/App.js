import React from "react";
import "./styles/css/styles.css";
import "./styles/css/afterStyle.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Sidebar from "./components/sidebar/Sidebar";

function App() {
	return (
		<div id="wrapper">
			<Sidebar></Sidebar>
			<div
				id="content-wrapper"
				className="d-flex flex-column"
			></div>
		</div>
	);
}

export default App;
