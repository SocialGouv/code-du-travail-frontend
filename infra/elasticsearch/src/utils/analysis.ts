//

// NOTE(douglasduteil): disable naming-convention for elasticsearch mapping
// As the mapping files are following the elasticsearch explicit mapping format
// https://www.elastic.co/guide/en/elasticsearch/reference/current/explicit-mapping.html
// we do not want to enfore a external naming convention here.
/* eslint-disable @typescript-eslint/naming-convention */

import { stopwords } from "@socialgouv/cdtn...dataset...stop-words";
import { synonyms } from "@socialgouv/cdtn...dataset...synonyms";

export const filter = {
  // Normalize acronyms so that no matter the format, the resulting token will be the same.
  // E.g.: SmiC => S.M.I.C. => SMIC => smic.
  french_acronyms: {
    catenate_all: true,
    generate_number_parts: false,
    generate_word_parts: false,
    type: "word_delimiter",
  },
  // Remove elision (l'avion => avion)
  // ne prend pas en compte la casse (L'avion = l'avion = avion)
  french_elision: {
    articles: [
      "l",
      "m",
      "t",
      "qu",
      "n",
      "s",
      "j",
      "d",
      "c",
      "jusqu",
      "quoiqu",
      "lorsqu",
      "puisqu",
      "parce qu",
      "parcequ",
      "entr",
      "presqu",
      "quelqu",
    ],
    articles_case: true,
    type: "elision",
  },

  // Il existe 3 stemmer pour le francais french, light_french, minimal_french
  // light french et le median
  french_stemmer: {
    language: "light_french",
    type: "stemmer",
  },

  french_stop: {
    stopwords: stopwords,
    type: "stop",
  },
  // liste de termes et leurs synonymes
  french_synonyms: {
    expand: true,
    synonyms: synonyms,
    type: "synonym",
  },
};

export const analyzer = {
  article_id_analyzer: {
    filter: ["lowercase", "french_acronyms"],
    tokenizer: "article_id_tokenizer",
  },

  // used at index time to generate ngrams
  // for all suggestion
  // see below, ngram from tokens
  autocomplete: {
    filter: ["lowercase", "icu_folding"],
    tokenizer: "autocomplete", //, "french_stop"]
  },

  // at search time, we only consider
  // the entire query (no ngrams)
  autocomplete_search: {
    filter: "icu_folding",
    tokenizer: "lowercase",
  },

  french: {
    filter: [
      "french_elision",
      "icu_folding",
      "lowercase",
      "french_stop",
      "french_stemmer",
    ],
    tokenizer: "icu_tokenizer",
  },

  french_indexing: {
    char_filter: ["startwith"],
    filter: [
      "french_elision",
      "icu_folding",
      "lowercase",
      "french_stop",
      "french_stemmer",
    ],
    tokenizer: "icu_tokenizer",
  },

  french_with_synonyms: {
    char_filter: ["html_strip"],
    filter: [
      "french_elision",
      "icu_folding",
      "lowercase",
      "french_synonyms",
      "french_stop",
      "french_stemmer",
    ],
    tokenizer: "icu_tokenizer",
  },

  idcc_ape: {
    tokenizer: "whitespace",
  },
  // improve match_phrase_prefix query
  // using a keyword analyser on type:text field
  // in order to match results with query as prefix
  // (as opposite to match "in the middle")
  sugg_prefix: {
    char_filter: ["startwith"],
    filter: ["lowercase", "icu_folding"],
    tokenizer: "icu_tokenizer",
  },
};

export const char_filter = {
  startwith: {
    pattern: "^(.*)",
    replacement: "__start__ $1",
    type: "pattern_replace",
  },
};

export const tokenizer = {
  article_id_tokenizer: {
    pattern: "[0123456789]{4}-[0123456789]{1,3}-?[0123456789]{1,3}?",
    type: "simple_pattern",
  },
  autocomplete: {
    max_gram: 10,
    min_gram: 2,
    token_chars: ["letter"],
    type: "edge_ngram",
  },
};