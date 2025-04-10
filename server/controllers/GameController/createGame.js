const express = require("express");
const gameRouter = express.Router();
const Game = require("../models/Game");
const { catchAsync } = require("../../middlewares/errorHandler");

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
  stock: true,
};

exports.createGame = catchAsync((req, res, next) => {
  const { name, platform, release, genre, image, description, companies, screenshots, similars, category, stock, price } = req.body;
  Game.create({ name, platform, release, genre, image, description, companies, screenshots, similars, category, stock, price }).then((newGame) => {
    Game.findById(newGame._id)
      .select(selectionObject)
      .then((theNewGame) => res.json(theNewGame));
  });
});
