const express = require('express');
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.use(express.json());

app.post("/signup" , async (req , res) => {

   const user =  new User(req.body);
  try{
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

app.patch("/user" , async (req , res) => {

   const userId =  req.body.userId;
   const data = req.body;
  try{
    await User.findByIdAndUpdate({ _id: userId } , data);
  res.send("user udated successfully...");
  }
  catch (err) {
   res.status(400).send("something went wrong :" );
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
