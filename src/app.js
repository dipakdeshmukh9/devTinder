const express = require('express');
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const { validateSignupData } = require("./utils/validation");
const bycrypt = require("bcrypt");

app.use(express.json());

app.post("/signup" , async (req , res) => {
 try{
    validateSignupData(req);
    const {firstName, lastName, emailId, password} = req.body;

    const passwordHash = await bycrypt.hash(password , 10);

    console.log(passwordHash);
   const user =  new User({
    firstName,
    lastName,
    emailId,
    password: passwordHash,
   });
  
  await user.save();
  res.end("user saved sucessfully...")
  }
  catch (err) {
   res.status(400).send("error saving the user :" + err.message);
  }
})


app.get("/user" , async (req , res) => {
    const userEmail = req.body.emailId;
    try{
        console.log(userEmail);
        const user = await User.findOne({});
        // if(user.length === 0){
        //     return res.status(404).send("User not found");
        // }else{
            res.send(user);
        // }

    }catch(err){
        res.status(400).send("Something Went Wrong");
    }
})

app.delete("/user" , async (req , res) => {

   const userId =  req.body.userId;
  try{
 const user = await User.findByIdAndDelete(userId);
  res.end("user deleted successfully...")
  }
  catch (err) {
   res.status(400).send("something went wrong :" );
  }
})

app.patch("/user/:userId" , async (req , res) => {

   const userId =  req.params?.userId;
   const data = req.body;
  try{
    const ALLOWED_UPDATES = ["photoUrl" , "about" , "gender" , "age" , "skills"];
    const isUpdateAllowed = Object.keys(data).every((k) =>
         ALLOWED_UPDATES.includes(k));
    if (!isUpdateAllowed) {
        return res.status(400).send("Invalid update fields");
    }
    if(data?.skills.length > 10){
    throw new Error("Skills cannot be more than 10");
    }
 const user = await User.findByIdAndUpdate({ _id: userId } , data , {
        returnDocument: "after",
        runValidators: true,
    });
  res.send("user udated successfully...");
  }
  catch (err) {
   res.status(400).send("Update failed :" + err.message);
  }
})

app.get("/feed" , async (req , res) => {
    try{
        const users = await User.find({});
        res.send(users);
    }catch(err){
        res.status(400).send("Something Went Wrong");
    }
});

connectDB().then(() => {
    console.log("Database connected successfully");
    app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
})
.catch((err) => {
    console.error("Database connection failed", err);
});
