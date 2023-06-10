import React from "react";

const StepList = ({ steps }) => {
  const stepTiles = steps.map((step) => {
    return <li key={step.id}>{step.body}</li>;
  });

  return (
    <div className="cell medium-6">
      <h3>Steps</h3>
      <ol>{stepTiles}</ol>
    </div>
  );
};

export default StepList;
