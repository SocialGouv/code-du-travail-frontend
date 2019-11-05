const Router = require("koa-router");
const API_BASE_URL = require("../v1.prefix");

const elasticsearchClient = require("../../conf/elasticsearch.js");
const getModeleBody = require("./search.elastic");

const index =
  process.env.ELASTICSEARCH_DOCUMENT_INDEX || "code_du_travail_numerique";

const router = new Router({ prefix: API_BASE_URL });

/**
 * Return documents matching the given query.
 *
 * @example
 * http://localhost:1337/api/v1/modeles
 *
 * @returns {Object} An object containing the models.
 */
router.get("/modeles", async ctx => {
  const body = getModeleBody();
  const response = await elasticsearchClient.search({ index, body });
  ctx.body = response.body;
});

module.exports = router;
