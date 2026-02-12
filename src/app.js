const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
app.post("/signup", async(req, res) => { 
    const user = new User({
        firstName : "Dipak",
        lastName : "Deshmukh",
        emailId : "dipak.deshmukh1911@gmail.com",
        password : "Dipak@123"
     });
 try{
     await user.save();
     res.send("User added successfully");
}catch(err){
     res.status(400).send("Error saving the user:", err.message); 
    }
    });
connectDB()
 .then(() => {
    console.log("Database connnection establised");
app.listen(7777, () => {
     console.log("Server is successfully listening");
}); 
    
})
.catch((err)=>{
    console.error("database cannot be connected");
});
