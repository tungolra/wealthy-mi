import React from "react";
import { Route, Routes } from "react-router-dom";
import Auth from "../auth/Auth";
import Expenses from "../expenses/Expenses";
import Income from "../income/Income";
import Goal from "../goals/Goals";
import Dashboard from "../dashboard/Dashboard";
import Liability from "../liability/Liabilities";

const TestRoutes = () => {
  return (
    <Routes>
      <Route path="auth" element={<Auth />}></Route>
      <Route path="expenses" element={<Expenses />}></Route>
      <Route path="income" element={<Income />}></Route>
      <Route path="goal" element={<Goal />}></Route>
      <Route path="dashboard" element={<Dashboard />}></Route>
      <Route path="liability" element={<Liability />}></Route>
    </Routes>
  );
};

export default TestRoutes;
