// Dependencies
const express = require("express");
const mongoose = require("mongoose");

// Create an express server and set up port with environment variables
const app = express();
const PORT = process.env.PORT || 8080;

// Middleware to handle data parsing and serve files in "public" folder
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'))

// Test route
app.get("/", (req, res) => {
    res.send("GTFO motherfucker")
})






// Instruct server to listen on correct environment port
app.listen(PORT, function () {
    console.log("App listening on PORT: " + PORT);
});