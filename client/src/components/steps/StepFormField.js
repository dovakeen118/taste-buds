import React from "react";

export const StepFormField = ({
  step,
  handleStepChange,
  handleRemoveStep,
  numSteps,
  index,
  errors,
}) => {
  return (
    <div className="callout secondary">
      <label htmlFor="body">
        Step {index + 1} {errors[`Step ${index + 1} Body`] ? <span>*</span> : null}
        <textarea
          id="body"
          name="body"
          value={step.body}
          onChange={handleStepChange}
          className="input-field"
        />
      </label>

      {numSteps ? (
        <button type="button" onClick={() => handleRemoveStep(index)} className="button alert">
          Remove
        </button>
      ) : null}
    </div>
  );
};
