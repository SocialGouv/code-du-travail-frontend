import React from "react";
import { YesNoQuestion } from "../../IndemniteLicenciement/components/YesNoQuestion";

function validate(values) {
  const errors = {};
  if (values.ruptureContratFauteGrave === true) {
    errors.ruptureContratFauteGrave =
      "Lorsque le contrat de travail temporaire (contrat d'intérim) est rompu de manière anticipée à l’initiative du salarié, pour faute grave ou en cas de force majeure, le salarié n’a pas le droit à une indemnité de précarité.";
  }
  if (values.propositionCDIFinContrat === true) {
    errors.propositionCDIFinContrat =
      "Le salarié en contrat de travail temporaire (contrat d'intérim) qui est immédiatement embauché en CDI au sein de l'entreprise dans laquelle il effectuait sa mission n’a pas le droit à une indemnité de précarité.";
  }
  if (values.refusSouplesse === true) {
    errors.refusSouplesse =
      "Le salarié en intérim qui refuse la mise en œuvre de la souplesse prévue dans son contrat de travail temporaire n’a pas le droit à une indemnité de précarité.";
  }
  return errors;
}

function StepCTT() {
  return (
    <>
      <YesNoQuestion
        data-testid="ruptureContratFauteGrave"
        name="ruptureContratFauteGrave"
        label="Votre contrat de travail temporaire (contrat d'intérim) a-t-il été rompu avant la fin prévue pour une des raisons suivantes : votre propre initiative, votre faute grave ou en cas de force majeure ?"
      />
      <YesNoQuestion
        data-testid="propositionCDIFinContrat"
        name="propositionCDIFinContrat"
        label="A la fin de votre contrat de travail temporaire (contrat d'intérim), avez-vous été immédiatement embauché en CDI au sein de l'entreprise dans laquelle vous effectuiez votre mission ?"
      />
      <YesNoQuestion
        data-testid="refusSouplesse"
        name="refusSouplesse"
        label="Avez-vous refusé la mise en œuvre de la souplesse prévue dans votre contrat de travail temporaire (contrat d'intérim)"
      />
    </>
  );
}

StepCTT.validate = validate;

export { StepCTT };
