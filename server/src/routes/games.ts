import express from "express";
import Game from "../models/game.model.js";

const gameRouter = express.Router();

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

gameRouter.post("/new", (req, res, next) => {
  const { name, platform, release, genre, image, description, companies, screenshots, similars, category, stock, price } = req.body;
  Game.create({ name, platform, release, genre, image, description, companies, screenshots, similars, category, stock, price }).then((newGame) => {
    Game.findById(newGame._id)
      .select(selectionObject)
      .then((theNewGame) => res.json(theNewGame));
  });
});

gameRouter.get("/", (req, res, next) => {
  Game.find()
    .select(selectionObject)
    .then((allTheGames) => {
      console.log({ allTheGames });
      res.json(allTheGames);
    })
    .catch((e) => console.log("ERROR GETTING GAMES", { e }));
});

gameRouter.get("/:id", (req, res, next) => {
  const gameID = req.params.id;
  Game.findById(gameID)
    .select(selectionObject)
    .then((game) => res.json(game));
});

gameRouter.post("/update", (req, res, next) => {
  const { amount, id } = req.body;
  Game.findByIdAndUpdate({ _id: id }, { $set: { amount: amount } }, { new: true }).then((theGame) => res.json(theGame));
});

gameRouter.post("/remove/:id", (req, res, next) => {
  const gameID = req.params.id;
  Game.findByIdAndRemove({ _id: gameID }).then((theGame) => res.json(theGame));
});

gameRouter.post("/edit/:id", (req, res, next) => {
  const { name, platform, release, genre, image, description, companies, screenshots, similars, category, stock, price } = req.body;
  const gameID = req.params.id;
  Game.findByIdAndUpdate(
    { _id: gameID },
    { $set: { name, platform, release, genre, image, description, companies, screenshots, similars, category, stock, price } },
    { new: true }
  ).then((theGame) => res.json(theGame));
});

export default gameRouter;
