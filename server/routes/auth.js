const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
const passport = require("passport");
const AuthController = require("../controllers/AuthController");

// const login = (req, user) => {
//   return new Promise((resolve, reject) => {
//     req.login(user, (err) => {
//       if (err) {
//         reject(new Error("Something went wrong"));
//       } else {
//         resolve(user);
//       }
//     });
//   });
// };

router.post("/signup", AuthController.register);
router.post("/login", AuthController.login);

// router.post("/login", (req, res, next) => {
//   passport.authenticate("local", (err, theUser, failureDetails) => {
//     // Check for errors
//     if (err) next(new Error("Something went wrong"));
//     if (!theUser) next(failureDetails);

//     // Return user and logged in
//     login(req, theUser).then((user) => res.status(200).json(req.user));
//   })(req, res, next);
// });

router.get("/currentuser", (req, res, next) => {
  if (req.user) {
    res.status(200).json(req.user);
  } else {
    next(new Error("Not logged in"));
  }
});

router.get("/logout", (req, res) => {
  req.logout();
  res.status(200).json({ message: "logged out" });
});

module.exports = router;
