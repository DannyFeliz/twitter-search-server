const express = require("express");
const cors = require("cors");
const app = express();

const axios = require("axios");
const _ = require("lodash");

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.get("/search", async (req, res) => {
  /** @see https://developer.twitter.com/en/docs/tweets/search/api-reference/get-search-tweets **/

  const query = _.pick(req.query, [
    "q",
    "geocode",
    "lang",
    "locale",
    "result_type",
    "count",
    "until",
    "since_id",
    "max_id",
    "include_entities"
  ]);

  axios({
    method: "GET",
    url: "https://api.twitter.com/1.1/search/tweets.json",
    params: query,
    headers: {
      Authorization:
        "Bearer AAAAAAAAAAAAAAAAAAAAAOxgTQAAAAAAg5KReN8W9Mz%2BuQKF%2FAuMYRk%2FEgo%3DbJAQrKcj56baFthshPEbS5rJCCnkh3u9g5UJuiC0oyhLa3Yqw7"
    }
  })
    .then(({ data: tweets }) => {
      res.json({ tweets });
    })
    .catch(err => {
      res.json({ error: err });
    });
});

app.listen(3000, () => {
  console.log("App running at: http://localhost:3000");
});
