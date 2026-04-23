const express = require('express');

const app = express();


app.get("/user", (req, res) => {
    res.send({firstname: "Dipak", lastname: "Deshmukh"});
});

app.post("/user", (req, res) => {
    res.send('User created!');
});
app.delete("/user", (req, res) => {
    res.send('User deleted!');
});
app.get("/user", (req, res) => {
    res.send('Hello user!');
})
app.get("/test", (req, res) => {
    res.send('Hello test!');
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});