const bcrypt = require('bcryptjs');

const User = require('../models/user');
const UserProfile = require('../models/userProfile');
const { validateChangePassword } = require('../middleware/validator');

exports.userAccount = (req,res,next) => {
    const userId = req.params.userId;
    UserProfile.findOne({userID: userId})
        .populate("userID")
        .then((result) => {
            if(result) {
                console.log(`result\n${result}`)
                let data = {};
                data.image = result.image;
                data.name = result.name;
                data.website = result.website;
                data.bio = result.bio;
                data.username = result.userID.username;

                return res.status(200).json(data);
            }
            else {
                return res.status(500).json('user not found'); 
            }
        })
}

exports.changePassword = (req,res,next) => {
    userId = req.body.userId;
    password = req.body.oldPassword;
    newPassword = req.body.newPassword;
    const passwordData = {
        oldPassword: req.body.oldPassword,
        newPassword: req.body.newPassword,
        confirmPassword: req.body.confirmPassword
    }

    const { valid, errors } = validateChangePassword(passwordData);
    if (!valid) return res.status(400).json(errors);

    console.log(userId);
    User.findById(userId)
        .then((user) => {
            console.log('inside findby id');
            if(!user) {
                return res.status(400).json({user: 'user does not exit'});
            }
            else {
                loadUser = user;
                bcrypt.compare(password,user.password)
                    .then((match) => {
                        if(match) {
                            console.log('inside match');
                            return bcrypt
                                    .hash(newPassword,12)
                                        .then((hashedpswd) => {
                                            return User.findOneAndUpdate({_id: userId}, {password: hashedpswd}, {new: true, useFindAndModify: false})
                                        })
                                        .then((result) => {
                                            return res.status(200).json({general: "Password changed Succesfuly"});
                                        })
                                        .catch((err) => {
                                            console.log(`inside passwordnot change catch\n${err}`);
                                            return res.status(400).json({general: "Error in Changing Password"});
                                        })
                        }
                        else {
                            console.log('inside else match');
                            return res.status(401).json({oldPassword: 'wrong Password'});
                        }
                    })
                    .catch((err) => {
                        console.log(`inside bcrytp catch\n${err}`);
                        return res.status(500).json('something went wrong1');
                    })
                }
            })
            .catch((err) => {
                console.log(`inside findby id catch${err}`);
                return res.status(501).json('something went wrong2');
            })
}

exports.deleteAccount = (req,res,next) => {
    const userId = req.body.userId;
    UserProfile.findOneAndDelete({userID: userId})
        .then((result) => {
            console.log(result);
            return User.findByIdAndDelete(userId)
                    .then((result) => {
                        console.log(result);
                        return res.status(200).json("deleted");
                    })
                    .catch((err) => {
                        console.log(err);
                        return res.status(500).json("something went wrong");
                    })
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json("something went wrong");
        })
}