const Router = require("koa-router");
const { DOCUMENTS } = require("@cdt/data/indexing/esIndexName");

const API_BASE_URL = require("../v1.prefix");
const elasticsearchClient = require("../../conf/elasticsearch.js");
const { getRelatedItems } = require("../items/getRelatedItems");
const { getSheetMTQuery } = require("./search.elastic.js");

const ES_INDEX_PREFIX = process.env.ES_INDEX_PREFIX || "cdtn";
const index = `${ES_INDEX_PREFIX}_${DOCUMENTS}`;

const router = new Router({ prefix: API_BASE_URL });

/**
 * Return the sheet-mt that match a given slug
 *
 * @example
 * http://localhost:1337/api/v1/sheets-mt/:slug
 *
 * @returns {Object} An object containing the matching sheet-mt .
 */

router.get("/sheets-mt/:slug", async (ctx) => {
  const { slug } = ctx.params;
  const body = getSheetMTQuery({ slug });
  const response = await elasticsearchClient.search({
    index,
    body,
  });
  if (response.body.hits.hits.length === 0) {
    ctx.throw(404, `there is no sheet mt that match ${slug}`);
  }

  const sheetMT = response.body.hits.hits[0];

  // // several items matching for mt sheet, get the one with the covisit
  // const covisitsMatch = response.body.hits.hits.find(
  //   (hit) => hit._source.covisits
  // );
  // const covisits = covisitsMatch ? covisitsMatch._source.covisits : undefined;

  // console.log(JSON.stringify(sheetMT, null, 2));

  const relatedItems = await getRelatedItems({
    slug,
    title: sheetMT._source.title,
    covisits: sheetMT._source.covisits,
    settings: sheetMT._source.title,
  });

  ctx.body = {
    ...sheetMT,
    relatedItems,
  };
});

module.exports = router;
