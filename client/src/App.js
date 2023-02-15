import React from "react";
import "./styles/css/styles.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Sidebar from "./components/sidebar/Sidebar";
import { Navigate, Route, Routes } from "react-router-dom";
import Demo from "./features/demo/Demo";
import ConstructionAlert from "./components/ConstructionAlert";
import Expenses from "./features/expenses/Expenses";
import Guide from "./features/guide/Guide";
import Income from "./features/income/Income";
import Goal from "./features/goals/Goals";
import Dashboard from "./features/dashboard/Dashboard";
import Liability from "./features/liability/Liabilities";
import Account from "./features/my-accounts/Accounts";
import AssetLiabilityView from "./features/asset-liability/Asset-Liability";

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
        <Route path="demo" element={<Demo />}></Route>
        <Route path="guide" element={<Guide />}></Route>
        <Route path="account" element={<Account />}></Route>
        <Route path="expense" element={<Expenses />}></Route>
        <Route path="income" element={<Income />}></Route>
        <Route path="goal" element={<Goal />}></Route>
        <Route path="dashboard" element={<Dashboard />}></Route>
        <Route path="asset-liability" element={<AssetLiabilityView />}></Route>
        <Route path="liability" element={<Liability />}></Route>
        <Route path="*" ErrorHandling></Route>
      </Routes>
    </div>
  );
}

export default App;
