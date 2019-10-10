const express = require('express');
const dbRouter  = express.Router();
const APIHandler = require("../helper/APIhandler.js");
const dbAPI = new APIHandler;

dbRouter.get('/game/:id', (req,res,next) => {
  const GameID = req.params.id;
  dbAPI.getGame(GameID)
    .then(genres => res.json(genres))
})

dbRouter.get('/search', (req, res, next) => {
  const {query} = req.query;
  dbAPI.getName(query)
    .then(games => {
      res.json(games)
    })
})

dbRouter.get('/genres/:id', (req,res,next) => {
  const GameID = req.params.id;
  dbAPI.getGenres(GameID)
    .then(genres => res.json(genres))
})

dbRouter.get('/platforms/:id', (req,res,next) => {
  const GameID = req.params.id;
  dbAPI.getPlatforms(GameID)
    .then(genres => res.json(genres))
})

dbRouter.get('/screenshots/:id', (req,res,next) => {
  const GameID = req.params.id;
  dbAPI.getScreenshots(GameID)
    .then(genres => res.json(genres))
})

dbRouter.get('/collections/:id', (req,res,next) => {
  const GameID = req.params.id;
  dbAPI.getCollections(GameID)
    .then(genres => res.json(genres))
})

dbRouter.get('/covers/:id', (req,res,next) => {
  const GameID = req.params.id;
  dbAPI.getCovers(GameID)
    .then(genres => res.json(genres))
})

dbRouter.get('/franchises/:id', (req,res,next) => {
  const GameID = req.params.id;
  dbAPI.getFranchises(GameID)
    .then(genres => res.json(genres))
})

dbRouter.get('/companies/:id', (req,res,next) => {
  const GameID = req.params.id;
  dbAPI.getCompanies(GameID)
    .then(genres => res.json(genres))
})

dbRouter.get('/similars/:id', (req,res,next) => {
  const GameID = req.params.id;
  dbAPI.getSimilars(GameID)
    .then(genres => res.json(genres))
})


dbRouter.get('/try/:query', (req, res, next) => {
  const name = req.params.query
  dbAPI.getName(name)
  .then( game => res.json(game))
})


module.exports = dbRouter;
