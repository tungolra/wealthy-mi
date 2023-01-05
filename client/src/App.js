import React from "react";
import Auth from "./pages/Auth/Auth";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <p>App</p>
      <Routes>
        <Route path="/test/auth" element={<Auth />} />
      </Routes>
    </div>
  );
}

export default App;
