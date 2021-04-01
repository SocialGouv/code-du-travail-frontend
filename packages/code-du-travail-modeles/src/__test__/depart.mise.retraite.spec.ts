import Engine from "publicodes";
import { MergeModeles } from "../utils/mergeModeles";

const modeles = new MergeModeles().merge();
const engine = new Engine(modeles);

test.each`
  seniority | expectedNotice
  ${3}      | ${0}
  ${6}      | ${1}
  ${11}     | ${1}
  ${12}     | ${1}
  ${23}     | ${1}
  ${24}     | ${2}
  ${25}     | ${2}
`(
  "Pour un employé possédant $seniority mois d'ancienneté, son préavis de mise à la retraite devrait être $expectedNotice mois",
  ({ seniority, expectedNotice }) => {
    const result = engine
      .setSituation({
        "contrat salarié . ancienneté": seniority,
        "contrat salarié . mise à la retraite": "oui",
      })
      .evaluate("contrat salarié . préavis de retraite");

    expect(result.nodeValue).toEqual(expectedNotice);
    expect(result.unit?.numerators).toEqual(["mois"]);
  }
);


test.each`
  seniority | expectedNotice
  ${3}      | ${0}
  ${6}      | ${1}
  ${11}     | ${1}
  ${12}     | ${1}
  ${23}     | ${1}
  ${24}     | ${2}
  ${25}     | ${2}
`(
  "Pour un employé possédant $seniority mois d'ancienneté, son préavis de départ à la retraite devrait être $expectedNotice mois",
  ({ seniority, expectedNotice }) => {
    const result = engine
      .setSituation({
        "contrat salarié . ancienneté": seniority,
        "contrat salarié . mise à la retraite": "non",
      })
      .evaluate("contrat salarié . préavis de retraite");

    expect(result.nodeValue).toEqual(expectedNotice);
    expect(result.unit?.numerators).toEqual(["mois"]);
  }
);
