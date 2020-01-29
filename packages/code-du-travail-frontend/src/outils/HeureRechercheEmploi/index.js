import React from "react";

import { Wizard } from "../common/Wizard";
import { initialState, stepReducer } from "./stepReducer";

function HeureRechercheEmploi({ icon, title }) {
  return (
    <Wizard
      icon={icon}
      title={title}
      initialState={initialState}
      stepReducer={stepReducer}
    />
  );
}

export { HeureRechercheEmploi };
