import React from "react";
import "./styles/css/styles.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Sidebar from "./components/sidebar/Sidebar";
import PageContent from "./components/page-content/PageContent";
import { Route, Routes } from "react-router-dom";
import Auth from "./features/auth/Auth";
import Demo from "./features/demo/Demo";
import ErrorHandler from "./features/error/ErrorHandler";
import ConstructionAlert from "./components/ConstructionAlert";

function App() {
  let showConAlert = () => {};

  const getConAlertHandle = (alertHandle) => {
    showConAlert = alertHandle;
  };

  return (
    <div id="wrapper">
      <ConstructionAlert onMount={getConAlertHandle} />
      <Sidebar conAlert={() => showConAlert(true)} />
      <Routes>
        <Route
          path="demo"
          element={<Demo />}
        >
        </Route>
        <Route
          path="*"
          ErrorHandling
        >
        </Route>
      </Routes>
    </div>
  );
}

export default App;
