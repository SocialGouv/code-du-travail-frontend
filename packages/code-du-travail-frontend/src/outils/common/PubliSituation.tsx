import React from "react";

import { RuleType, SituationElement } from "../publicodes";
import { reverseValues } from "../publicodes/Utils";
import { SectionTitle } from "./stepStyles";
import { FormContent } from "./type/WizardType";

type PublicodesInputProps = {
  element: SituationElement;
  form: FormContent;
};

function SituationInput({ element, form }: PublicodesInputProps): JSX.Element {
  if (element.name === "contrat salarié - convention collective") {
    return <>{form.ccn.shortTitle}</>;
  }
  switch (element.rawNode.cdtn?.type) {
    case RuleType.Liste:
      return <>{reverseValues(element.rawNode.cdtn.valeurs)[element.value]}</>;
    case RuleType.OuiNon:
      return <>{element.value === "oui" ? "Oui" : "Non"}</>;
  }
  return (
    <>
      {element.value} {element.rawNode.unité}
    </>
  );
}

type Props = {
  situation: SituationElement[];
  form: FormContent;
};

const PubliSituation: React.FC<Props> = ({ situation, form }) => (
  <>
    <SectionTitle>Récapitulatif des éléments saisis</SectionTitle>
    <ul>
      {situation.map((element) => (
        <li key={element.name}>
          {element.rawNode.titre}:{" "}
          <b>
            <SituationInput element={element} form={form} />
          </b>
        </li>
      ))}
    </ul>
  </>
);

export default PubliSituation;
