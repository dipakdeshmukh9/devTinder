const validator = require("validator");

function validateSignupData(req) {
    const { firstName, lastName, emailId, password, age, gender } = req.body;

    // Validate first name
    if (!firstName || firstName.length < 4 || firstName.length > 30) {
        throw new Error("First name must be between 4 and 30 characters");
    }

    // Validate last name
    if (lastName && (lastName.length < 4 || lastName.length > 30)) {
        throw new Error("Last name must be between 4 and 30 characters");
    }

    // Validate email
    if (!emailId || !validator.isEmail(emailId)) {
        throw new Error("Invalid email address");
    }

    // Validate password
    if (!password || !validator.isStrongPassword(password)) {
        throw new Error("Password must be strong");
    }

    // Validate age
    if (age && (age < 18 || age > 120)) {
        throw new Error("Age must be between 18 and 120");
    }

    // Validate gender
    if (gender && !["male", "female", "other"].includes(gender.toLowerCase())) {
        throw new Error("Invalid gender value");
    }
}

module.exports = {
    validateSignupData,
};