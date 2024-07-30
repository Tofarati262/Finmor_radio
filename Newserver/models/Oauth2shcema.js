const mongoose = require("mongoose");

const Oauth2schema = new mongoose.Schema({
  accesstoken: {
    type: String,
    required: true,
    unique: true,
  },

  googleId: {
    type: String,
    required: true,
  },

  refreshtoken: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model("Oauth2schema", Oauth2schema);
