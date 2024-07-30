const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  discordId: {
    type: String,
    required: true,
  },
  discordUsername: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  discriminator: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    required: true,
  },
  accessToken: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: String,
    required: true,
  },
});
/*
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);

    next();
  }
});
*/
userSchema.methods.comparePassword = async function (candidatepassword) {
  const password2 = await bcrypt.hash(candidatepassword, 10);
  return bcrypt.compare(candidatepassword, password2);
};
module.exports = mongoose.model("dUser", userSchema);
