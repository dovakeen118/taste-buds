import React from "react";

import { StepFormField } from "./StepFormField";

export const StepFormSection = ({
  addToArray,
  defaultStep,
  errors,
  handleStepChange,
  handleRemoveStep,
  steps,
}) => {
  const stepFields = steps.map((step, index) => {
    return (
      <StepFormField
        key={index}
        step={step}
        numSteps={steps.length > 1}
        handleStepChange={(event) => handleStepChange(event, index)}
        handleRemoveStep={handleRemoveStep}
        index={index}
        errors={errors}
      />
    );
  });

  return (
    <div className="cell medium-6 callout recipe-column">
      <h3>Steps</h3>
      {stepFields}
      <button className="button" type="button" onClick={() => addToArray("steps", defaultStep)}>
        Add step
      </button>
    </div>
  );
};
