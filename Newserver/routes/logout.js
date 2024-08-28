require("dotenv").config();
const express = require("express");
const router = express.Router();
const passport = require("passport");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
router.use(cookieParser());

// Route to check if the user is logged in
router.get("/status", (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json({ loggedIn: true });
  } else {
    res.status(200).json({ loggedIn: false });
  }
});

// Route to handle user logout
router.post("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.session.destroy(err => {
      if (err) {
        return next(err);
      }
      res.clearCookie("id");
      res.clearCookie("rid");
      res.status(200).json({ message: "Logged out successfully", loggedIn: false });
    });
  });
});

module.exports = router;
