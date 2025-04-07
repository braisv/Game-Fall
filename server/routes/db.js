const express = require("express");
const dbRouter = express.Router();
const APIHandler = require("../helper/APIhandler.js");
const dbAPI = new APIHandler();

dbRouter.get("/game/:id", (req, res) => {
  dbAPI
    .getGame(req.params.id)
    .then(res.json)
    .catch((error) =>
      console.error("[API failure:]", {
        method: "getGame",
        error: { status: error.status, statusText: error.statusText, data: error.data },
      })
    );
});

dbRouter.get("/search", (req, res) => {
  const { query } = req.query;
  dbAPI
    .searchGamesByName(query)
    .then(res.json)
    .catch((error) =>
      console.error("[API failure:]", {
        method: "searchGamesByName",
        error,
      })
    );
});

module.exports = dbRouter;
