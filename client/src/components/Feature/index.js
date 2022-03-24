import React from "react";
import { FeatureContainer, FeatureButton } from "./FeatureElements";

const Feature = () => {
  return (
    <FeatureContainer>
      <h1>Recipe of the day</h1>
      <p>Thailand Hotpot Noodles</p>
      <FeatureButton>Start Now</FeatureButton>
    </FeatureContainer>
  );
};

export default Feature;
