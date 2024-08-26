require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const passport = require("passport");
const mongoose = require("mongoose");
const dUser = require("./models/schemadb");
const gUser = require("./models/googleshcema");
const Router = require("./routes/discordauth");
const session = require("express-session");
const gRouter = require("./routes/googleauth");
const LogoutRouter = require("./routes/logout");

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true });
app.use(express.json());

const corsOptions = {
  origin: "http://localhost:3000", // Allow only requests from this origin
  methods: "GET,POST", // Allow only these methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allow only these headers
};

// Use CORS middleware with specified options
app.use(cors(corsOptions));

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
app.use("/logout", LogoutRouter);

db.on("error", (error) => console.error(error));
db.once("open", () => console.log("database is live"));

app.listen(
  process.env.PORT,
  console.log("The app is running on port ", process.env.PORT)
);
