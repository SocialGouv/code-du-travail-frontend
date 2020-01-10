import fetch from "node-fetch";
import kaliData from "@socialgouv/kali-data/data/index.json";
import find from "unist-util-find";
import parents from "unist-util-parents";

import contributions from "../contributions/contributions.data.json";
import themes from "./themes.data.json";
import remark from "remark";
import html from "remark-html";
import slugify from "../../slugify";
import { formatIdcc } from "../../lib";

const compiler = remark().use(html, { sanitize: true });

const DATAFILLER_URL =
  process.env.DATAFILLER_URL || "https://datafiller.num.social.gouv.fr";

const RECORDS_URL = `${DATAFILLER_URL}/kinto/v1/buckets/datasets/collections/ccns/records?_sort=title`;
const createSorter = prop => ({ [prop]: a }, { [prop]: b }) => a - b;
async function fetchAgreements() {
  const ccnBlockRecords = await fetch(RECORDS_URL, { params: { _limit: 1000 } })
    .then(res => res.json())
    .then(json => json.data);

  return kaliData
    .sort((a, b) => parseInt(a.num, 10) - parseInt(b.num, 10))
    .map(agreement => {
      const agreementTree = require(`@socialgouv/kali-data/data/${agreement.id}.json`);
      const blocksData = ccnBlockRecords.find(
        data => data.cid === agreement.id
      );
      return {
        ...getCCNInfo(agreement),
        nbTextes: getNbText(agreementTree),
        articlesByTheme:
          blocksData && blocksData.groups
            ? getArticleByBlock(blocksData.groups, agreementTree)
            : [],
        answers: getContributionAnswers(agreement.num)
      };
    });
}

if (require.main === module) {
  fetchAgreements()
    .then(data => console.log(JSON.stringify(data, null, 2)))
    .catch(console.error);
}
/**
 * Get CCn geenral information
 * @param {Object} agreement
 */
function getCCNInfo({ id, num, date_publi, mtime, title, shortTitle, url }) {
  return {
    id,
    slug: slugify(`${num}-${shortTitle}`.substring(0, 80)),
    date_publi,
    mtime,
    title,
    shortTitle,
    url,
    num
  };
}
/**
 * Get CCn detailed informations about articles and texts
 */
function getNbText(agreementTree) {
  const texteDeBase = find(agreementTree, node =>
    node.data.title.startsWith("Texte de base")
  );
  if (!texteDeBase) {
    return;
  }

  return texteDeBase.children.length;
}
/**
 * Return contribution answer for a given idcc
 * param {agreementNum} string
 */
function getContributionAnswers(agreementNum) {
  const transformRef = ({ title, url, category, agreement }) => {
    return {
      title,
      url: url || (agreement && agreement.url),
      category: category
    };
  };
  return contributions
    .map(({ title, slug, index, answers }) => {
      const [answer] = answers.conventions.filter(
        ({ idcc }) => parseInt(idcc) === parseInt(agreementNum)
      );
      const unhandledRegexp = /La convention collective ne prévoit rien sur ce point/i;
      if (answer && !unhandledRegexp.test(answer.markdown)) {
        const slugMatcher = new RegExp(slug);
        const themeFinder = ({ url }) => slugMatcher.test(url);
        const theme = themes.find(theme => theme.refs.some(themeFinder));
        let rootTheme = null;
        if (theme) {
          rootTheme = theme.breadcrumbs
            ? theme.breadcrumbs[0].title
            : theme.title;
        }

        return {
          index,
          question: title.trim(),
          answer: compiler.processSync(answer.markdown).contents,
          theme: rootTheme,
          references: answer.references.map(transformRef),
          slug
        };
      }
    })
    .sort(createSorter("index"))
    .filter(Boolean);
}
/**
 * @param {id:<String>, selection:<String[]>}
 * @param {Object} agreementTree
 */
function getArticleByBlock(groups, agreementTree) {
  const treeWithParents = parents(agreementTree);
  return groups
    .filter(({ selection }) => selection.length > 0)
    .sort(createSorter("id"))
    .map(({ id, selection }) => ({
      bloc: id,
      articles: selection.map(articleId => {
        const node = find(treeWithParents, node => node.data.id === articleId);
        return node
          ? {
              title: node.data.num || "non numéroté",
              id: node.data.id,
              cid: node.data.cid,
              section: node.parent.data.title
            }
          : null;
      })
    }));
}

export { fetchAgreements };
