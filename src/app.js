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

connectDB().then(() => {
    console.log("Database connected successfully");
    app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
})
.catch((err) => {
    console.error("Database connection failed", err);
});
