const express = require("express");
const userRouter = express.Router();
const User = require("../models/User");


userRouter.post("/update", (req, res, next) => {
  const updatedUserObj = req.body.updatedUserObj;
  User.findByIdAndUpdate(req.user._id, {$push:{chart:updatedUserObj}} , { new: true })
  .then(data => {
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
  
  userRouter.get("/:id", (req, res, next) => {
    const id = req.params.id;
    User.findById(id).then(data => {
      res.status(200).json(data);
    })
    .catch(err => console.log(err));
  })
  
  
  module.exports = userRouter;