import { StepInfoCCnMandatory } from "../../common/InfosCCn";
import data from "@cdt/data...preavis-demission/data.json";

import { isNotYetProcessed } from "../../common/situations.utils";

StepInfoCCnMandatory.validate = values => {
  const errors = {};
  const { ccn } = values;
  if (Object.keys(values).length === 0) {
    errors.ccn = "Veuillez renseigner votre convention collective ?";
  }
  if (ccn && isNotYetProcessed(data, ccn.num)) {
    errors.ccn =
      "Nous n’avons pas encore traité votre convention collective mais nous vous invitons à poursuivre la simulation afin d’obtenir le montant défini par le Code du travail.";
  }
  return errors;
};

export const StepInfoCCn = StepInfoCCnMandatory;
