const mongoose = require("mongoose");

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

const userProfile_Schema2 = new mongoose.Schema({
    user_id: {
        type: ObjectId,
        required: true,
        unique: [true, "user is present"]
    },
    degreeLevel: {
        type: String,
        required: true,
    },
    careerLevel: {
        type: String,
        required: true,
    },
    experience: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true,
    },
    pfCity: {
        type: String,
        required: true,
    },
    salary: {
        type: String,
        required: true,
    },
    fbProfile: {
        type: String,
        required: false,
    },
    inProfile: {
        type: String,
        required: false,
    },
    twtProfile: {
        type: String,
        required: false,
    },
    otherProfile: {
        type: String,
        required: false,
    },
})
const UserProfiles2 = new mongoose.model(
    "profileUsers_details2", userProfile_Schema2
);
module.exports = UserProfiles2;
