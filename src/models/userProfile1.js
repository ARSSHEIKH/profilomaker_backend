const mongoose = require("mongoose");

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

const userProfile_Schema1 = new mongoose.Schema({
    user_id: {
        type: ObjectId,
        required: true,
        unique: [true, "user is present"]
    },
    fname: {
        type: String,
        required: true,
    },
    lname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true,
    },
    dob: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    postalcode: {
        type: String,
        required: true,
    },
    phone1: {
        type: String,
        required: true,
    },
    phone2: {
        type: String,
        required: false,
    },
})
const UserProfiles1 = new mongoose.model(
    "profileUsers_details", userProfile_Schema1
);
module.exports = UserProfiles1;
