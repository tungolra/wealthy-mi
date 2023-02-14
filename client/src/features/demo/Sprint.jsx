import React from "react";

function SprintList({ sprint, children }) {
  const features = sprint.features.map((feature, index) => {
    var isFinished = feature.finished === "true";
    return (
      <div
        key={"feature" + index}
        className="d-flex flex-row justify-content-start"
      >
        <div>
          {isFinished
            ? <i className="fa-regular fa-square-check"></i>
            : <i className="fa-regular fa-square"></i>}
        </div>
        <div>&nbsp; &nbsp;{feature.name}</div>
      </div>
    );
  });

  return (
    <>
      <div className="d-flex justify-content-center">
        <hr className="divider text-white w-75" />
      </div>
      <div className="text-white px-5">
        <h4>Sprint {sprint.number}</h4>
        {features}
      </div>
    </>
  );
}

export default SprintList;
