const express = require("express");
const app = express();
app.use("/hello", (req, res) => {
    res.send("Hello, from hello!");
});

app.use("/test", (req, res) => {
    res.send("Hello, World from the test!");
});

app.use("/", (req, res) => {
    res.send("Hello, from dashboard!");
});

app.listen(7777, () => {
     console.log("Server is running on port 7777");
});