const express = require("express");
const app = express();
app.get("/user", (req, res) => {
    res.send({ firstname: "Dipak" , lastname: "Deshmukh" });
});
app.post("/user", (req, res) => {
    res.send("Data saved successfully!");
});
app.delete("/user", (req, res) => {
    res.send("Data deleted successfully!");
});

app.use("/test", (req, res) => {
    res.send("Hello, World from the test!");
});

app.listen(7777, () => {
     console.log("Server is running on port 7777");
}); 