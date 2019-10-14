import React from "react";
import PropTypes from "prop-types";
import { Toast } from "@socialgouv/react-ui";

import { SectionTitle } from "../../common/stepStyles";
import { ccCriterionName, filterSituations, recapSituation } from "./situation";

function StepResult({ form }) {
  const { values } = form.getState();
  const possibleSituations = filterSituations(values);
  switch (possibleSituations.length) {
    case 1: {
      const [situation] = possibleSituations;
      const { id, label: ccLabel } = situation.criteria[ccCriterionName];
      if (id === "0000") {
        return (
          <>
            <p>
              Le code du travail ne prévoit pas une durée précise du préavis de
              démission. Il prévoit qu’une convention collective ou un accord
              d’entreprise, voire un usage, en prévoit les durées et modalités.
            </p>
            {situation.ref && situation.refUrl && getRef(situation)}
          </>
        );
      }
      return (
        <>
          <SectionTitle>Durée du préavis</SectionTitle>
          <p>
            En cas de démission, la {ccLabel} ({id}) prévoit le respect d’un
            préavis d’une durée de <strong>{situation.answer}</strong> pour un
            salarié {recapSituation(situation.criteria)}.
          </p>
          {situation.ref && situation.refUrl && getRef(situation)}
          <Toast variant="info">
            Si le contrat de travail, un accord collectif d’entreprise ou un
            usage prévoit une durée de préavis différente, il faut appliquer la
            durée la plus courte.
          </Toast>
        </>
      );
    }
    default:
      return null;
  }
}

StepResult.propTypes = {
  form: PropTypes.shape({
    getState: PropTypes.func.isRequired
  })
};

export { StepResult };

function getRef({ ref, refUrl }) {
  return (
    <p>
      <a href={refUrl} title={`Consultez l’${ref.toLowerCase()}`}>
        {ref}
      </a>
    </p>
  );
}
