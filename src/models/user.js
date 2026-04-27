
const mongoose = require("mongoose");
const validator = require("validator");
const bycrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 30,
    },
    lastName: {
        type: String,
    },
    emailId: {
        type: String,
        lowercase: true,
        required: true,
        unique: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid email address" + value);
            }
        }
    },
    password: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isStrongPassword(value)) {
                throw new Error("Enter a strong password" + value);
            }
        }
    },
    age: {
        type: Number,
        min: 18,
    },
    gender: {
        type: String,
        validate(value) {
            if(!["male" , "female" , "other"].includes(value.toLowerCase())){
                throw new Error("Invalid gender value");
            }
        }
    },
    photoUrl: {
        type: String,
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
        validate(value) {
            if (!validator.isURL(value)) {
                throw new Error("Invalid photo URL" + value);
            }
        }
    },
    about: {
        type: String,
        default: "Hey there! I am using this app."
    },
    skills: {
        type: [String]
    },

}
, {
    timestamps: true,
}
);
userSchema.methods.getJWT = async function() {
    const user = this;
    const token = await jwt.sign({ _id: user._id} , "DEV@Tinder$790" , {
        expiresIn: "7d",
    });
    return token;
};

userSchema.methods.validatePassword = async function(passwordInputByUser) {
    const user = this;
    const passwordHash = user.password;

    const isPasswordValid = await bycrypt.compare(passwordInputByUser, passwordHash);
    return isPasswordValid;
}
module.exports =  mongoose.model("User" , userSchema);
