import synonyms from "../dataset/synonyms";
import stopwords from "../dataset/stop_words";

const filter = {
  // Normalize acronyms so that no matter the format, the resulting token will be the same.
  // E.g.: SmiC => S.M.I.C. => SMIC => smic.
  french_acronyms: {
    type: "word_delimiter",
    catenate_all: true,
    generate_word_parts: false,
    generate_number_parts: false,
  },
  // Remove elision (l'avion => avion)
  // ne prend pas en compte la casse (L'avion = l'avion = avion)
  french_elision: {
    type: "elision",
    articles_case: true,
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
  },
  // liste de termes et leurs synonymes
  french_synonyms: {
    type: "synonym",
    expand: true,
    synonyms: synonyms,
  },
  // Il existe 3 stemmer pour le francais french, light_french, minimal_french
  // light french et le median
  french_stemmer: {
    type: "stemmer",
    language: "light_french",
  },
  french_stop: {
    type: "stop",
    stopwords: stopwords,
  },
};

const analyzer = {
  idcc_ape: {
    tokenizer: "whitespace",
  },

  // improve match_phrase_prefix query
  // using a keyword analyser on type:text field
  // in order to match results with query as prefix
  // (as opposite to match "in the middle")
  sugg_prefix: {
    tokenizer: "icu_tokenizer",
    filter: ["lowercase", "icu_folding"],
    char_filter: ["startwith"],
  },

  // used at index time to generate ngrams
  // for all suggestion
  // see below, ngram from tokens
  autocomplete: {
    tokenizer: "autocomplete",
    filter: ["lowercase", "icu_folding"], //, "french_stop"]
  },

  // at search time, we only consider
  // the entire query (no ngrams)
  autocomplete_search: {
    tokenizer: "lowercase",
    filter: "icu_folding",
  },

  french_with_synonyms: {
    tokenizer: "icu_tokenizer",
    char_filter: ["html_strip"],
    filter: [
      "french_elision",
      "icu_folding",
      "lowercase",
      "french_synonyms",
      "french_stop",
      "french_stemmer",
    ],
  },
  french: {
    tokenizer: "icu_tokenizer",
    filter: [
      "french_elision",
      "icu_folding",
      "lowercase",
      "french_stop",
      "french_stemmer",
    ],
  },
  french_indexing: {
    tokenizer: "icu_tokenizer",
    char_filter: ["startwith"],
    filter: [
      "french_elision",
      "icu_folding",
      "lowercase",
      "french_stop",
      "french_stemmer",
    ],
  },
  article_id_analyzer: {
    tokenizer: "article_id_tokenizer",
    filter: ["lowercase", "french_acronyms"],
  },
};

const char_filter = {
  startwith: {
    type: "pattern_replace",
    pattern: "^(.*)",
    replacement: "__start__ $1",
  },
};

const tokenizer = {
  article_id_tokenizer: {
    type: "simple_pattern",
    pattern: "[0123456789]{4}-[0123456789]{1,3}-?[0123456789]{1,3}?",
  },
  autocomplete: {
    type: "edge_ngram",
    min_gram: 2,
    max_gram: 10,
    token_chars: ["letter"],
  },
};

export { char_filter, analyzer, filter, tokenizer };
