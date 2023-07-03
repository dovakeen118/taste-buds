import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export const StepFormField = ({
  step,
  handleStepChange,
  handleRemoveStep,
  numSteps,
  index,
  errors,
}) => {
  return (
    <div className="grid-x callout primary">
      <label htmlFor="body" className="cell small-11">
        Step {index + 1} {errors[`Step ${index + 1} Body`] ? <span>*</span> : null}
      </label>
      {numSteps ? (
        <FontAwesomeIcon
          icon={faXmark}
          className="cell small-1 x-icon"
          onClick={() => handleRemoveStep(index)}
        />
      ) : null}
      <textarea
        id="body"
        name="body"
        value={step.body}
        onChange={handleStepChange}
        className="input-field"
      />
    </div>
  );
};
