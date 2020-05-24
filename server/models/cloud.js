const mongoose= require("mongoose");

const Schema= mongoose.Schema;

const cloudSchema= new Schema({
    image: {
        type: Buffer,
        required: true
    },
    userID: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true
    }
    // time: {
    //     type: ,
    //     required: true
    // }
});
module.exports= mongoose.model("cloud",cloudSchema);