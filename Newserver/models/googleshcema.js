const mongoose = require("mongoose");
const { cachedDataVersionTag } = require("v8");

const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true,
    unique: true,
  },
  name: String,
  email: String,
  email_verified: Boolean,
  // Add any other fields you expect from Google OAuth here
});
//new car
module.exports = mongoose.model("gUser", userSchema);
