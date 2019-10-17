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
  companies: true,
  screenshots: true,
  similars: true,
  price: true,
  category: true,
  stock: true
}


gameRouter.post('/new', (req, res, next) => {
  const { name, platform, release, genre, image, description, companies, screenshots, similars, category, stock, price } = req.body;
  Game
    .create({ name, platform, release, genre, image, description, companies, screenshots, similars, category, stock, price })
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

gameRouter.get('/game/:id', (req, res, next) => {
  const gameID = req.params.id
  Game
    .findById(gameID)
    .select(selectionObject)
    .then(game => res.json(game))
});

gameRouter.post('/update', (req, res, next) => {
  const { amount, id } = req.body;
  Game
    .findByIdAndUpdate({ _id:id}, { $set: { amount:amount }}, { new: true })
    .then(theGame => res.json(theGame))
});

// gameRouter.post('/remove', (req, res, next) => {
//   const { id } = req.body;
//   Game
//     .findByIdAndRemove({ _id : id})
//     .then(theGame => res.json(theGame))
// });



module.exports = gameRouter;