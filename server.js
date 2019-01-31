// Require our dependencies
var express = require("express");
var mongoose = require ("mongoose");
var expressHandlebars = require("express-handlebars");
// var bodyParser = require("body-parser");

// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var axios = require("axios");
var cheerio = require("cheerio");

// Require all models
var db = require("./models");

// Set up our port to be either the host's designated port, or 3000
var PORT = process.env.PORT || 3000;

// Instantiate our Express App
var app = express();

// Set up an Express Router
var router = express.Router();

// Designate our public folder as a static directory
app.use(express.static(__dirname + "/public"));

// Connect Handlebars to our Express app
app.engine("handlebars", expressHandlebars({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");

// Use bodyParser in our app
// app.use(bodyParser.urlencoded({
//     extended: false
// }));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Have every request go through our router middleware
app.use(router);

// If deployed, use the deployed database.  Otherwise use the local mongoHeadlines database
var db = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// Connect mongoose to our database
mongoose.connect(db, { useNewUrlParser: true }, function(error) {
    // Log any errors connecting with mongoose
    if (error) {
        console.log(error);
    }
    // Or log a success message
    else {
        console.log("mongoose connection is successful");
    }
});

//  Listen on the port
app.listen(PORT, function() {
    console.log("Server listening on: http://localhost:" + PORT);
});