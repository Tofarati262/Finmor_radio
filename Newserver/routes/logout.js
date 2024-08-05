const express = require("express");
const router = express.Router();

router.post("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.status(200).json({ message: "Logged out successfully" });
    console.log("logged out");
  });
});

module.exports = router;
