import React from "react";
import Topbar from "../topbar/Topbar";
import ConstructionAlert from "../ConstructionAlert";

function Page({ children, showTopbar = true }) {
  let showConAlert = () => {};

  const getConAlertHandle = (alertHandle) => {
    showConAlert = alertHandle;
  };

  return (
    <>
      <ConstructionAlert onMount={getConAlertHandle} />
      <div
        id="content-wrapper"
        className="d-flex flex-column"
      >
        <div id="content">
          {showTopbar ? <Topbar conAlert={() => showConAlert(true)} /> : <></>}
          <div className="container-fluid">{children}</div>
        </div>
      </div>
    </>
  );
}

export default Page;
