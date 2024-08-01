require("dotenv").config();
const express = require("express");
const router = express.Router();
const dUser = require("../models/schemadb");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const DiscordStrategy = require("passport-discord").Strategy;
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
router.use(cookieParser());

passport.use(
  new DiscordStrategy(
    {
      clientID: process.env.ClientID,
      clientSecret: process.env.ClientSecret,
      callbackURL: process.env.REDIRECT_URI,
      scope: ["identify", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const { id, username, discriminator, avatar, email, verified } =
          profile;
        console.log(profile);
        let user = await dUser.findOne({ discordId: id });

        if (!user) {
          user = await dUser.create({
            discordId: id,
            discordUsername: username,
            email: email,
            discriminator: discriminator,
            verified: verified,
            accessToken: accessToken,
            refreshToken: refreshToken,
          });
        }
        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

const createAuthTokens = (user) => {
  const refreshToken = jwt.sign(
    { userId: user.id, refreshTokenVersion: user.refreshTokenVersion },
    process.env.REFRESHTOKEN_SECRET,
    {
      expiresIn: "30d",
    }
  );

  const accessToken = jwt.sign({ userId: user.id }, process.env.TOKEN_SECRET, {
    expiresIn: "15min",
  });

  return { refreshToken, accessToken };
};

// __prod__ is a boolean that is true when the NODE_ENV is "production"
const cookieOpts = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/",
  maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
};

const sendAuthCookies = (res, user) => {
  const { accessToken, refreshToken } = createAuthTokens(user);
  res.cookie("id", accessToken, cookieOpts);
  res.cookie("rid", refreshToken, cookieOpts);
};

const verifyRefreshToken = (token) => {
  try {
    return jwt.verify(token, process.env.REFRESHTOKEN_SECRET);
  } catch (error) {
    console.error("Access token verification failed:", error);
    throw error;
  }
};

// Route to refresh tokens

// Routes
router.get("/api/auth/discord", passport.authenticate("discord"));

router.get(
  "/api/auth/discord/redirect",
  passport.authenticate("discord", { failureRedirect: "/" }),
  async (req, res) => {
    sendAuthCookies(res, req.user);

    try {
      verifyRefreshToken(req.cookies.rid);
    } catch (err) {
      res.json({ message: err });
    }
    res.redirect("http://localhost:3000/audioplayer");
  }
);

module.exports = router;
