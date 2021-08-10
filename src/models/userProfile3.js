const mongoose = require("mongoose");

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

const userProfile_Schema3 = new mongoose.Schema({
    user_id: {
        type: ObjectId,
        required: true,
        unique: [true, "user is present"]
    },
    summary: {
        type: String,
        required: false,
    },
    profile_pic: {
        type: Object,
        required: false,
    },
})

const UserProfiles3 = new mongoose.model(
    "profileUsers_details3", userProfile_Schema3
);
module.exports = UserProfiles3;
