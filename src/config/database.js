
const mongoose = require('mongoose');
const dns = require("dns");
dns.setServers(["1.1.1.1" , "8.8.8.8"]);
const connectDB = async () => {
    await mongoose.connect("mongodb+srv://dipakdeshmukh1911:aHFlEJSbsOAQlkLl@namstenode.peus8wo.mongodb.net/devTinder");
}
module.exports = connectDB;