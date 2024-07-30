require("dotenv").config();
const passport = require("passport");
const express = require("express");
const router = express.Router(); // Use express.Router()
const gUser = require("../models/googleshcema");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { encrypt } = require("../utils/utils");

const Oauth2schema = require("../models/Oauth2shcema");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GClientID,
      clientSecret: process.env.GClientSecret,
      callbackURL: process.env.GREDIRECT_URI,
    },
    async function (accessToken, refreshToken, profile, done) {
      const encryptedAccessToken = encrypt(accessToken).toString();
      const encryptedRefreshToken = encrypt(refreshToken).toString();
      try {
        const { id, displayName, emails } = profile;
        console.log(profile);

        let user = await gUser.findOne({ googleId: id });

        if (!user) {
          user = await gUser.create({
            name: displayName,
            googleId: id,
            email: emails[0].value,
            email_verified: emails[0].verified || false,
          });
        }

        let findCredentials = await Oauth2schema.findOneAndUpdate(
          {
            googleId: id,
          },
          {
            accesstoken: encryptedAccessToken,
            refreshtoken: encryptedRefreshToken,
          }
        );
        if (!findCredentials) {
          console.log("did not find credentials");
          await Oauth2schema.create({
            googleId: id,
            accesstoken: encryptedAccessToken,
            refreshtoken: encryptedRefreshToken,
          });
        }

        return done(null, user);
      } catch (error) {
        console.error("Error during Google authentication", error);
        return done(error, null);
      }
    }
  )
);

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/api/redirect", // Ensure this route matches your Google Console setting
  passport.authenticate("google", { failureRedirect: "/auth/google" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.send("Successful Authorization");
  }
);

module.exports = router;
