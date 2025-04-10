const express = require("express");
const AuthController = require("../controllers/AuthController");
const router = express.Router();

router.post("/signup", AuthController.register);
router.post("/login", AuthController.login);
router.get("/logout", AuthController.logout);
router.get("/currentuser", AuthController.getCurrentUser);

module.exports = router;
