const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');

const isAuth = require('./middleware/is-auth');
const { signUp, logIn } = require('./controllers/authentication');
const { cupload, deleteImage, displayImage } = require('./controllers/uploadImages');
const { getUser, postProfile, searchUser } = require('./controllers/searchUser');
const { changePassword, deleteAccount, userAccount } = require('./controllers/Account');
const { getNotifications, saveNotification, deleteRequest } = require('./controllers/notification');
const { addFriend, displayFriends, removeFriend } = require('./controllers/friends');
const { addPost, getUsersPost, getFriendsPost } = require('./controllers/post');

const MONGODB_URL =
    "mongodb+srv://divyansh:divyansh@college-byypw.mongodb.net/socialMediaApp?retryWrites=true&w=majority";

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use(multer({}).array('file',10));


app.get("/homepage",isAuth,(req,res) => {
    res.json({home: "hello world"});
});

app.get("/temp",isAuth,(req,res) => {
    res.json({temp: "Inside Temp"});
});

app.post("/signup", signUp);
app.post("/login", logIn);
app.get("/logout",(req,res) => {
    res.set(200).json("logout");
    console.log("logout");
});
app.get("/checktokenexpiry",isAuth,(req,res) => {
    res.set(200).json("valid");
})

//cloud routes
app.get("/cloud/:userId", isAuth, displayImage);
app.post("/cloud", isAuth, cupload);
app.post("/cloud/delete/:imageId", deleteImage);

//Photo App routes
app.post("/searchuser", searchUser);
app.post("/getProfile/:userId", isAuth, getUser);
app.post("/profile/:userId", isAuth, postProfile);
app.get("/useraccount/:userId", isAuth, userAccount);
app.post("/change-password", changePassword);
app.post("/delete-everything", deleteAccount);
app.post("/notification", saveNotification);
app.get("/notification/:id", getNotifications);
app.post("/delete-request", deleteRequest);
app.post("/add-friend", addFriend);
app.get("/friends/:userId", displayFriends);
app.post("/deletefriend", removeFriend);
app.post("/addpost", addPost);
app.get("/getuserposts/:userId", getUsersPost);
app.get("/getfriendspost/:userId", getFriendsPost);

mongoose
.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        console.log('connected');
        app.listen(4000);
    })
    .catch((err) => {
        console.log(err);
    })

