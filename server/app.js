const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");

const isAuth = require("./middleware/is-auth");
const { signUp, logIn } = require("./controllers/authentication");
const { cupload, displayImage } = require("./controllers/uploadImages");

const MONGODB_URL =
  "mongodb+srv://divyansh:divyansh@college-byypw.mongodb.net/socialMediaApp?retryWrites=true&w=majority";

app.use(cors());
app.use(express.json());

app.use(multer({}).array("file", 10));

app.get("/homepage", isAuth, (req, res) => {
  res.json({ home: "hello world" });
});

app.get("/temp", isAuth, (req, res) => {
  res.json({ temp: "Inside Temp" });
});

app.post("/signup", signUp);
app.post("/login", logIn);
app.get("/logout", (req, res) => {
  res.set(200).json("logout");
  console.log("logout");
});
app.get("/checktokenexpiry", isAuth, (req, res) => {
  res.set(200).json("valid");
});

app.get("/cloud/:userId", displayImage);
app.post("/cloud", cupload);

mongoose
  .connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log("connected");
    app.listen(4000);
  })
  .catch((err) => {
    console.log(err);
  });
