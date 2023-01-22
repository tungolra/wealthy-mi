import React from "react";
import { Link } from "react-router-dom";
const NotFound = (props) => {
  return (
    <>
      <div className="text-center">
        <div className="error mx-auto">
          404
          <div className="error-before">404</div>
          <div className="error-after">404</div>
        </div>
        <p className="lead text-gray-800 mb-4">Page not Found</p>
        <p className="text-gray-500 mb-0">
          There's a glitch in the matrix...
        </p>
        <Link to="/app/demo">Back to demo</Link>
      </div>
    </>
  );
};

export default NotFound;
