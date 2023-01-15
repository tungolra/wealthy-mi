import React from "react";
import { Route, Routes } from "react-router-dom";
import Auth from "../auth/Auth";
import Expenses from "../expenses/Expenses"

const TestRoutes = () => {
  return (
    <Routes>
      <Route path="auth" element={<Auth />}></Route>
      <Route path="expenses" element={<Expenses />}></Route>
    </Routes>
  );
};

export default TestRoutes;
