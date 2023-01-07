import React from "react";
import { Route, Routes } from "react-router-dom";
import Auth from "../auth/Auth";

const TestRoutes = () => {
	return (
		<Routes>
			<Route
				path="auth"
				element={<Auth />}
			></Route>
		</Routes>
	);
};

export default TestRoutes;
