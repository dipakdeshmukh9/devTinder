const mongoose = require("mongoose");

const connectDB = async () => {
await mongoose.connect(
    "mongodb+srv://dipakdeshmukh1911:8QTybw6R7u4oqxnd@cluster0.gkbxsu9.mongodb.net/devTinder"
);
};

module.exports = connectDB;