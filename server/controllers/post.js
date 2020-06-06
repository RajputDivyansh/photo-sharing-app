const Post = require('../models/post');
const Userprofile = require('../models/userProfile');
const Friends = require('../models/friendlist');

exports.addPost = (req,res,next) => {
    const userId = req.body.userId;
    console.log(req.body);
    const image = req.files[0];

    let caption = '';
    if(req.body.caption) {
        caption = req.body.caption;
    }
    else {
        caption = '';
    }
    console.log(caption);
    const postData = new Post({
        userID: userId,
        image: image.buffer,
        caption: caption
    });

    postData.save()
        .then((result) => {
            console.log(result);
            return res.status(201).json(result);
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json("post not created");
        })
}

exports.getUsersPost = (req,res,next) => {
    const userId = req.params.userId;
    Post.find({userID: userId}).sort({createdAt: -1})
        .then((posts) => {
        if(posts.length) {
            console.log(posts);
            return res.status(200).json(posts);
        }
        else {
            return res.status(503).json('no posts available');
        }
    })
}

exports.getFriendsPost = (req,res,next) => {
    const userId = req.params.userId;
    let resultArray = [];
    Friends.findOne({userID: userId})
        .then((result) => {
            console.log(result);
            if(result) {
                result.friendsID.forEach((friendId) => {
                    console.log(friendId)
                    Post.find({userID: friendId})
                        .then((posts) => {
                            if(posts.length) {
                                Userprofile.findOne({userID: friendId})
                                    .populate("userID")
                                    .then((profileData) => {
                                        if(profileData) {
                                            console.log('inside push post and profile');
                                            resultArray.push({posts: posts, profileData: {username: profileData.userID.username, image: profileData.image}});
                                        }
                                        else {
                                            return res.status(500).json("not found");
                                        }
                                        if(result.friendsID.length === resultArray.length) {
                                            console.log("inside response if");
                                            return res.status(200).json(resultArray);
                                        }
                                        else {
                                            console.log("inside response else");
                                        }
                                    })
                            }
                            else {
                                console.log('inside no post available');
                                resultArray.push({posts: "no posts available"})
                                if(result.friendsID.length === resultArray.length) {
                                    console.log("inside response if");
                                    return res.status(200).json(resultArray);
                                }
                                else {
                                    console.log("inside response else");
                                }
                            }
                        })
               }) 
            }
            else {
                return res.status(500).json("no friends found");
            }
        })
}