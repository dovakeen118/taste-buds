import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

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
    <div className="cell medium-6 recipe-column">
      <h3 className="text-center">Steps</h3>
      <div className="callout">
        {stepFields}
        <button
          className="button expanded"
          type="button"
          onClick={() => addToArray("steps", defaultStep)}
        >
          <FontAwesomeIcon icon={faPlus} /> step
        </button>
      </div>
    </div>
  );
};
