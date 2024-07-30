require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const passport = require("passport");
const mongoose = require("mongoose");
const dUser = require("./models/schemadb");
const gUser = require("./models/googleshcema");
const Router = require("./routes/discordauth");
const session = require("express-session");
const gRouter = require("./routes/googleauth");

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true });
app.use(express.json());

app.use(
  session({
    secret: "yourSecretKey",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

const db = mongoose.connection;
app.use("/discordauth", Router);
app.use("/googleauth", gRouter);

app.get("/", (req, res) => {
  res.redirect("/discordauth/api/auth/discord");
});

db.on("error", (error) => console.error(error));
db.once("open", () => console.log("database is live"));

app.listen(
  process.env.PORT,
  console.log("The app is running on port ", process.env.PORT)
);
