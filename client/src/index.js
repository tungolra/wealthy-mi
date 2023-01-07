import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import store from "./app/store";
import Test from "./features/test/test";
import reportWebVitals from "./reportWebVitals";
import App from "./App";
import Auth from "./features/auth/Auth";
import ErrorHandler from "./features/error/ErrorHandler";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
	<Provider store={store}>
		<BrowserRouter>
			<Routes>
				<Route
					path="/test/*"
					element={<Test />}
				/>
				<Route
					path="app/auth"
					element={<Auth />}
				/>
				<Route
					path="app/*"
					element={<App />}
				/>
				<Route
					path="*"
					element={<ErrorHandler />}
				/>
			</Routes>
		</BrowserRouter>
	</Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
