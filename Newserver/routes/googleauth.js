require("dotenv").config();
const passport = require("passport");
const express = require("express");
const router = express.Router(); // Use express.Router()
const gUser = require("../models/googleshcema");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { encrypt } = require("../utils/utils");
const jwt = require("jsonwebtoken");
const Oauth2schema = require("../models/Oauth2shcema");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
router.use(cookieParser());

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
const createAuthTokens = (user) => {
  const refreshToken = jwt.sign(
    { userId: user.id, refreshTokenVersion: user.refreshTokenVersion },
    process.env.REFRESHTOKEN_SECRET,
    {
      expiresIn: "7d",
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
passport.serializeUser((user, done) => {
  console.log("serializing user....");
  console.log(user);
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  console.log("deserializing user....");

  try {
    let foundid = await gUser.findById(id);
    if (!foundid) throw new Error("User not found");

    console.log("id was found", foundid);
    done(null, foundid);
  } catch (err) {
    console.error("desrializing failed", err);
    done(err, null);
  }
});

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/api/redirect", // Ensure this route matches your Google Console setting
  passport.authenticate("google", { failureRedirect: "/auth/google" }),
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

router.get("/newpage", (req, res) => {
  if (req.user) {
    console.log(req.user);
    const token = req.cookies.rid;
    try {
      const decoded = verifyRefreshToken(token);
      res.json({ userId: decoded.userId });
    } catch (error) {
      res.status(401).json({ message: "Invalid token" });
    }
  } else {
    res.status(401);
  }
});

module.exports = router;
