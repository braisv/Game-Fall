const express = require("express");
const userRouter = express.Router();
const User = require("../models/User");

userRouter.get("/:id", (req, res, next) => {
  const id = req.params.id;
  User.findById(id).then(data => {
    res.status(200).json(data);
  })
  .catch(err => console.log(err));
})

userRouter.put("/update/:id", (req, res, next) => {
  const id = req.params.id;
  const data = req.body;
  console.log(data)
  User.findByIdAndUpdate(id, data, { new: true })
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => console.log(err));
});



module.exports = userRouter;