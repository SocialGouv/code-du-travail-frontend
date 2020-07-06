const { SOURCES, getSourceByRoute } = require("@socialgouv/cdtn-sources");
const { DOCUMENTS } = require("@cdt/data/indexing/esIndexName");
const { vectorizeQuery } = require("@cdt/data/indexing/vectorizer");

const elasticsearchClient = require("../../conf/elasticsearch.js");
const getSearchBody = require("./searchBySourceSlug.elastic");
const getSemBody = require("../search/search.sem");
const utils = require("../search/utils");
const getRelatedItemsBody = require("./relatedItems.elastic");
const { logger } = require("../../utils/logger");

const MAX_RESULTS = 5;

const ES_INDEX_PREFIX = process.env.ES_INDEX_PREFIX || "cdtn";
const index = `${ES_INDEX_PREFIX}_${DOCUMENTS}`;

function mapSource(reco, source) {
  return (({
    action,
    description,
    icon,
    slug,
    source,
    subtitle,
    title,
    url,
  }) => ({
    action,
    description,
    icon,
    slug,
    source,
    subtitle,
    title,
    url,
    reco,
  }))(source);
}

async function getRelatedItems({ title, settings, slug, covisits }) {
  // console.log(covisits);
  if (covisits) {
    // covisits as related items
    // console.log(covisits);

    const body = covisits
      .map(({ link }) => {
        const source = getSourceByRoute(link.split("/")[0]);
        const slug = link.split("/")[1];
        if (!(slug && source)) {
          logger.error(`Unknown covisit : ${link}`);
          return [];
        } else {
          return [{ index }, getSearchBody({ slug, source })];
        }
      })
      .flat();

    const esCovisits = await elasticsearchClient
      .msearch({
        body,
      })
      .then((resp) =>
        resp.body.responses
          .map((r) => r.hits.hits[0])
          // deal with errors
          .filter((r) => r)
      )
      .catch((err) => {
        logger.error(
          "Error when querying covisits : " + JSON.stringify(err.meta.body)
        );
        return [];
      });

    const covisitedItems = esCovisits
      // do we really want this ?
      // .filter(({ _source }) => !_source.slug.startsWith(rootSlug))
      // we filter fields and add some info about recommandation type for evaluation purpose
      .map(({ _source }) => mapSource("covisits", _source));

    // console.log(covisitedItems);
    return covisitedItems;
  } else {
    // standard related items :
    const sources = [
      SOURCES.TOOLS,
      SOURCES.SHEET_SP,
      SOURCES.SHEET_MT,
      SOURCES.LETTERS,
      SOURCES.CONTRIBUTIONS,
      SOURCES.EXTERNALS,
    ];

    const relatedItemBody = getRelatedItemsBody({ settings, sources });
    const requestBodies = [{ index }, relatedItemBody];

    const query_vector = await vectorizeQuery(title.toLowerCase()).catch(
      (error) => {
        logger.error(error.message);
      }
    );

    if (query_vector) {
      const semBody = getSemBody({
        query_vector,
        // we +1 the size to remove the document source that should match perfectly for the given vector
        size: MAX_RESULTS + 1,
        sources,
      });
      // we use relatedItem query _source to have the same prop returned
      // for both request
      // semBody._source = relatedItemBody._source;
      requestBodies.push({ index }, semBody);
    }

    const {
      body: {
        responses: [esResponse = {}, semResponse = {}],
      },
    } = await elasticsearchClient.msearch({ body: requestBodies });

    const { hits: { hits: semanticHits } = { hits: [] } } = semResponse;
    const { hits: { hits: fullTextHits } = { hits: [] } } = esResponse;
    const [rootSlug] = slug.split("#");

    // eslint-disable-next-line no-unused-vars
    const res = utils
      .mergePipe(fullTextHits, semanticHits, MAX_RESULTS)
      .filter(({ _source }) => !_source.slug.startsWith(rootSlug))
      // we filter fields and add some info about recommandation type for evaluation purpose
      .map(({ _source }) => mapSource("search", _source));

    // we only return covisites for testing purpose
    return [];
  }
}

module.exports = {
  getRelatedItems,
};
