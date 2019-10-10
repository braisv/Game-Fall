const express = require('express');
const gameRouter = express.Router();
const Game = require("../models/Game")

const selectionObject = {
  name: true,
  platform: true,
  release: true,
  genre: true,
  image: true,
  description: true,
  // developer: "",
  // publisher: [],
  // rating: "",
  // price: {
  //   amount: null,
  //   discountInfo: {
  //     discount: null,
  //     dateFrom: Date,
  //     dateTo: Date
  //   },
  //   taxes: null
  // },
  // category: {
  //   type: "",
  //   enum: ["New", "On sale", "Recommended"]
  // },
  // stock: {
  //   quantity: null,
  //   minQuantity: null,
  //   releaseDate: Date

  // }
}


gameRouter.post('/new', (req, res, next) => {
  const { name, platform, release, genre, image, description } = req.body;
  Game
    .create({ name, platform, release, genre, image, description })
    .then((newGame) => {
      Game
        .findById(newGame._id)
        .select(selectionObject)
        .then(theNewGame => res.json(theNewGame))
    })
});

gameRouter.get('/games', (req, res, next) => {
  Game
    .find()
    .select(selectionObject)
    .then(allTheGames => res.json(allTheGames))
});



module.exports = gameRouter;