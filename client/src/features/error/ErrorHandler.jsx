import React from "react";
import { Route, Routes } from "react-router-dom";
import NotFound from "./NotFound";

function ErrorHandler(props) {
  return <NotFound />;
}

export default ErrorHandler;
