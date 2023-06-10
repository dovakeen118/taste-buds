import React from "react";

import RadioButton from "../helpers/RadioButton";

const TierOptions = ({ handleChange, recipeTier }) => {
  const tiers = [
    { name: "quick", description: "< 10" },
    { name: "average", description: "10 - 20" },
    { name: "extended", description: "> 20" },
  ];
  const tierOptions = tiers.map((tier) => {
    return (
      <RadioButton
        key={tier.name}
        name="tier"
        value={tier.name}
        labelText={`${tier.name} ( ${tier.description} minutes )`}
        handleChange={handleChange}
        checked={recipeTier === tier.name}
      />
    );
  });
  return <div>{tierOptions}</div>;
};

export default TierOptions;
