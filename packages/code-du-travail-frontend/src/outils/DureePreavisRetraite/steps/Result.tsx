import { Alert } from "@socialgouv/cdtn-ui";
import React, { useEffect } from "react";

import { Highlight, SectionTitle } from "../../common/stepStyles";
import { WizardStepProps } from "../../common/type/WizardType";
import { usePublicodes } from "../../publicodes";
import { mapToPublicodesSituation } from "../../publicodes/Utils";

function ResultStep({ form }: WizardStepProps): JSX.Element {
  const publicodesContext = usePublicodes();

  useEffect(() => {
    publicodesContext.setSituation(
      mapToPublicodesSituation(form.getState().values)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form]);

  const notifications = publicodesContext.getNotifications();
  return (
    <>
      <SectionTitle>Durée du préavis</SectionTitle>
      <p>
        À partir des éléments que vous avez saisis, la durée du préavis de
        départ à la retraite est estimée à&nbsp;
        <Highlight>
          {publicodesContext.result.value}{" "}
          {publicodesContext.result.unit.numerators[0]}
        </Highlight>
        .
      </p>
      {notifications.length > 0 && (
        <Alert>
          {publicodesContext.getNotifications().map((notification) => (
            <p key={notification.dottedName}>
              <b>{notification.description}</b>
            </p>
          ))}
        </Alert>
      )}
    </>
  );
}

export { ResultStep };
