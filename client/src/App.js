import React from "react";
import "./styles/css/styles.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Sidebar from "./components/sidebar/Sidebar";
import PageContent from "./components/page-content/PageContent";
import { Routes, Route } from "react-router-dom";
import Auth from "./features/auth/Auth";
import Demo from "./features/demo/Demo";
import ErrorHandler from "./features/error/ErrorHandler";

function App() {
	return (
		<div id="wrapper">
			<Sidebar />
			<Routes>
				<Route
					path="demo"
					element={<Demo />}
				></Route>
				<Route
					path="*"
					ErrorHandling
				></Route>
			</Routes>
		</div>
	);
}

export default App;
