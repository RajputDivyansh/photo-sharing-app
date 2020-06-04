const Friends = require('../models/friendlist');
const Notifications = require('../models/notification');

exports.addFriend = (req, res, next) => {
    const senderId = req.body.senderId;
    const recieverId = req.body.recieverId;
    // const data1 = {
    //     userID: senderId,
    //     friendsID: [recieverId]
    // }
    updateData1 = {
        $set: {senderID: senderId},
        $addToSet: {friendsID: recieverId}
    }

    Friends.findOneAndUpdate({userID: senderId}, updateData1,{new: true, upsert: true, useFindAndModify: false})
        .then((result) => {
            console.log(result);
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json("not saved in senderlist");
        })
    
    updateData2 = {
        $set: {senderID: recieverId},
        $addToSet: {friendsID: senderId}
    }
    
    Friends.findOneAndUpdate({userID: recieverId}, updateData2,{new: true, upsert: true,useFindAndModify: false})
    .then((result) => {
        console.log(result);
    })
    .catch((err) => {
        console.log(err);
        return res.status(500).json("not saved in reciever list");
    })

    Notifications.findOneAndUpdate({senderID: senderId, recieverID: recieverId},{status: 'accepted'},{new: true, useFindAndModify: false})
        .then((result) => {
            return res.status(201).json(result);
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json("not updated status");
        })
}

