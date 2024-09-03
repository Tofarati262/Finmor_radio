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
const {main} = require("./utils/Awspresingner");
const multer = require("multer");

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

const storage = multer.memoryStorage(); // Store files in memory as Buffer
const upload = multer({ storage: storage });


app.post("/uploads", upload.single("file"), async (req, res) => {
  try {
    const file = req.file; // Get the uploaded file from multer
    const UserId = req.user?.id; // Ensure UserId is obtained from the authenticated user

    if (!file || !UserId) {
      return res.status(400).send("No file uploaded or user not authenticated.");
    }

    console.log(`User ${UserId} ${file.originalname} has been received`);
    const sent = await main(file, UserId); // Pass UserId to the main function

    if (sent) {
      res.send(`File ${file.originalname} has been uploaded successfully.`);
    } else {
      res.status(500).send("File upload failed.");
    }
  } catch (error) {
    res.status(500).send("An error occurred while uploading the file.");
    console.error("Error in /uploads:", error);
  }
});


app.listen(
  process.env.PORT,
  console.log("The app is running on port ", process.env.PORT)
);
