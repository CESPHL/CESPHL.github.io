// Filename - miniert/app.js

const express = require("express");
const app = express();

app.post("/post", (req, res) => {
console.log("Connected to the React");
res.redirect("/");
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
