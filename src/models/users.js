const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: [true, "Email Address is present"],
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email")
            }
        }
    },
    password: {
        type: String,
        required: true,
    },
    verified: {
        type: Boolean,
        required: true,
    },
    profile_url:{
        type: String,
        required: true,
    }
})
const User = new mongoose.model("profileUsers", userSchema);
module.exports = User;
