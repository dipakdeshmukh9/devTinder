const express = require('express');

const app = express();


app.use("/hello", (req, res) => {
    res.send('Hello hello hello!');
})
app.use("/test", (req, res) => {
    res.send('Hello test!');
})
app.use("/", (req, res) => {
    res.send('Hello World from the server!');
})
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});