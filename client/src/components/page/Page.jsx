import React from "react";
import Topbar from "../topbar/Topbar";

function Page({ children, showTopbar = true }) {
  return (
    <>
      <div
        id="content-wrapper"
        className="d-flex flex-column"
      >
        <div id="content">
          {showTopbar ? <Topbar></Topbar> : <></>}
          <div className="container-fluid">{children}</div>
        </div>
      </div>
    </>
  );
}

export default Page;
