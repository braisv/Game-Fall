const express = require("express");
const userRouter = express.Router();
const User = require("../models/User");


userRouter.post("/updateChart", (req, res, next) => {
  const updatedUserObj = req.body.updatedUserObj;
  User.findByIdAndUpdate(req.user._id, {$push:{chart:updatedUserObj}} , { new: true })
  .then(data => {
    res.status(200).json(data);
  })
  .catch(err => console.log(err));
});

userRouter.post("/updateWish", (req, res, next) => {
  const updatedUserObj = req.body.updatedUserObj;
  User.findByIdAndUpdate(req.user._id, {$push:{wishlist:updatedUserObj}} , { new: true })
  .then(data => {
    console.log('ADDED WISH', data)
    res.status(200).json(data);
  })
  .catch(err => console.log(err));
});

userRouter.get("/cart", (req, res, next) => {
  let userId = req.user._id
  User
      .findById(userId)
      .populate('chart')
      .then(user => {
            res.json(user)
        })
        .catch(err => console.log('ERROR FROM BACK', err))
  })

userRouter.get("/wish", (req, res, next) => {
  let userId = req.user._id
  User
      .findById(userId)
      .populate('wishlist')
      .then(user => {
            res.json(user)
        })
        .catch(err => console.log('ERROR FROM BACK', err))
  })
  
  userRouter.get("/:id", (req, res, next) => {
    const id = req.params.id;
    User.findById(id).then(data => {
      res.status(200).json(data);
    })
    .catch(err => console.log(err));
  })

  userRouter.post("/removeFromCart", (req, res, next) => {
    const game = req.body.game;
    User.findByIdAndUpdate(req.user._id, {$pull:{chart:game._id}} , { multi: true })
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => console.log(err));
  });

  userRouter.post("/removeWish", (req, res, next) => {
    const { game } = req.body;
    User.findByIdAndUpdate(req.user._id, {$pull:{wishlist:game}} , { new: true })
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => console.log(err));
  });
  
  
  module.exports = userRouter;