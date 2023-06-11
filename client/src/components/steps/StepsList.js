import React from "react";

export const StepList = ({ steps }) => {
  const stepTiles = steps.map((step) => {
    return <li key={step.id}>{step.body}</li>;
  });

  return (
    <div className="cell medium-6 callout">
      <h3>Steps</h3>
      {steps.length > 0 ? <ol>{stepTiles}</ol> : <p>No steps for this recipe</p>}
    </div>
  );
};
