const Cloud = require("../models/cloud");
// const mongoose = require("mongoose");

exports.cupload = (req,res,next) => {
	const file = req.files;
	console.log(req);
	console.log(req.body.file);
	// console.log(req.files[0].buffer);
	
	const documentArray = req.files.map((file) => {
		return {image: file.buffer,userID: req.body.userId};
	});
	// console.log(documentArray);

	Cloud.insertMany(documentArray, { ordered: true })
		.then((result) => {
			console.log(result);
			return res.status(201).json("files uploaded");
		})
		.catch((err) => {
			console.log(err);
			return res.status(400).json({error: "not uploaded"});
		})
}

exports.displayImage = (req,res,next) => {
	const userId = req.params.userId;
	// const imageArray;
	Cloud.find({userID: userId})
		.then((result) => {
			console.log("recieved data");
			const imageArray = result.map((reslt) => {
				return {id: reslt._id, image: reslt.image};
			})
			// console.log(imageArray);
			return res.status(200).json(imageArray);
		})
		.catch((err) => {
			console.log(err);
			return res.status(400).json({error: "something went wrong"});
		})
}