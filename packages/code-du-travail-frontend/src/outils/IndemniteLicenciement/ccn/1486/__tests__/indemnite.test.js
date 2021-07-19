import { ERROR_LABEL, getIndemniteConventionnelle } from "../indemnite";

const initialValues = {
  anciennete: 13.083333333333334,
  branche: "1486",
  contrat: "cdi",
  dateEntree: "2006-06-15",
  dateNotification: "2019-07-18",
  dateSortie: "2019-07-29",
  fauteGrave: false,
  hasAbsenceProlonge: false,
  hasSameSalaire: true,
  hasTempsPartiel: false,
  inaptitude: false,
  salaire: "4500",
  salaires: [],
};
const tests = [
  {
    data: {
      ...initialValues,
      brancheCategorie: "ETAM",
      brancheContrat: {
        considered: true,
        duration: "12",
        indemnite: "200",
      },
      hasBrancheContrat: true,
    },
    result: 15643.75,
    title: "ETAM avec contrats précédents",
  },
  {
    data: {
      ...initialValues,
      brancheCategorie: "ETAM",
      brancheContrat: {
        considered: true,
        duration: "12",
        indemnite: "200",
      },
      brancheNewRegularSalaire: "3000",
      hasBrancheContrat: true,
      hasBrancheNewRegularSalaire: true,
      hasBrancheNewSalaire: true,
    },
    result: 10362.5,
    title: "ETAM avec contrats précédents et ajustement salaire",
  },
  {
    data: {
      ...initialValues,
      brancheCategorie: "IC",
      hasBrancheContrat: false,
    },
    result: 19625,
    title: "IC sans contrats précédents",
  },
  {
    data: {
      ...initialValues,
      brancheCategorie: "CEI",
      hasBrancheContrat: false,
    },
    result: 11775,
    title: "CEI",
  },
  {
    data: {
      ...initialValues,
      brancheCategorie: "CENI",
      brancheNewIrregularSalaire: [
        {
          label: "juillet 2019",
          salary: 2300,
        },
        {
          label: "juin 2019",
          salary: 2300,
        },
        {
          label: "mai 2019",
          salary: 2300,
        },
        {
          label: "avril 2019",
          salary: 2300,
        },
        {
          label: "mars 2019",
          salary: 2300,
        },
        {
          label: "février 2019",
          salary: 4000,
        },
        {
          label: "janvier 2019",
          salary: 2300,
        },
        {
          label: "décembre 2018",
          salary: 2300,
        },
        {
          label: "novembre 2018",
          salary: 2300,
        },
        {
          label: "octobre 2018",
          salary: 2300,
        },
        {
          label: "septembre 2018",
          salary: 2300,
        },
        {
          label: "août 2018",
          salary: 2300,
        },
      ],
      hasBrancheNewRegularSalaire: false,
      hasBrancheNewSalaire: true,
    },
    result: 7986.28,
    title: "CENI avec ajustement salaire",
  },
];
describe("getIndemnite", () => {
  tests.forEach(({ title, data, result }) => {
    //eslint-disable-next-line jest/valid-title
    it(title, () => {
      const { indemniteConventionnelle, infoCalculConventionnel } =
        getIndemniteConventionnelle(data);
      expect(indemniteConventionnelle).toBe(result);
      expect(infoCalculConventionnel).toMatchSnapshot();
    });
  });
  it("should return an error for anciennete < 2", () => {
    const { error } = getIndemniteConventionnelle({
      ...initialValues,
      anciennete: 0.5,
      brancheCategorie: "ETAM",
      hasBrancheContrat: false,
    });

    expect(error).toBe(ERROR_LABEL);
  });
});
