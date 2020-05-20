const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

const isAuth = require('./middleware/is-auth');
const user = require('./models/user');
const { signUp, logIn } = require('./controllers/authentication');

const MONGODB_URL =
    "mongodb+srv://divyansh:divyansh@college-byypw.mongodb.net/socialMediaApp?retryWrites=true&w=majority";

app.use(cors());
app.use(express.json());

app.get("/homepage",isAuth,(req,res) => {
    res.json({home: "hello world"});
});

app.get("/temp",isAuth,(req,res) => {
    res.json({temp: "Inside Temp"});
});

app.post("/signup", signUp);
app.post("/login", logIn);
app.get("/logout",isAuth,(req,res) => {
    res.set(200).json("logout");
    console.log("logout");
});

mongoose
    .connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        console.log('connected');
        app.listen(4000);
    })
    .catch((err) => {
        console.log(err);
    })

