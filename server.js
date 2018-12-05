// require dependencies  
var http = require("http");
var fs = require("fs");
var express = require("express");
var path = require("path");

// Sets up the Express App
var app = express();

// set port to 8080
var PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// tables (DATA)
var friends = 
    [{
        name: "Donald",
        photo: "http://specials-images.forbesimg.com/imageserve/5849e26b31358e698adb6d0c/416x416.jpg?background=000000&cropX1=98&cropX2=704&cropY1=56&cropY2=662",
        scores: [5, 1, 3, 4, 5, 2, 2, 5, 4, 1]
    },
    {
        name: "Julia",
        photo: "https://a57.foxnews.com/global.fncstatic.com/static/managed/img/Entertainment/0/0/Julia%20Louis-Dreyfus%20Reuters%20660.JPG",
        scores: [1, 3, 4, 5, 2, 2, 5, 4, 1, 4]
    },
    {
        name: "Robert",
        photo: "https://pixel.nymag.com/imgs/daily/vulture/2017/03/20/20-robert-downey-jr.w330.h330.jpg",
        scores: [3, 4, 2, 1, 2, 5, 5, 3, 2, 3]
    },
    {
        name: "Lupita",
        photo: "http://www.jamesmurua.com/wp-content/uploads/2016/09/Lupita-Nyongo.jpg",
        scores: [2, 1, 2, 5, 5, 3, 2, 3, 5, 4]
    },
    {
        name: "Dev",
        photo: "https://www.filmibeat.com/img/2017/01/dev-patel-overwhelmed-by-his-new-found-heartthrobe-status-31-1485864939.jpg",
        scores: [4, 2, 1, 2, 2, 5, 3, 2, 3, 1]
    } 
]  

// allow html images to be routed
app.use(express.static("app/public"));

// basic route that sends the user to the home page
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "/app/public/home.html"));
});

//route that sends the api containing json data for all of the user inputs
app.get("/api/friends", function(req, res) {
    return res.json(friends);
  });

  // Displays a single character, or returns false
app.get("/api/friends/:friend", function(req, res) {
    var chosen = req.params.friend;
    console.log(chosen);
    for (var i = 0; i < friends.length; i++) {
        if (chosen === friends[i].name) {
        return res.json(friends[i]);
        }
    }
    return res.json(false);
});

// route to the survey page
app.get("/survey", function(req, res) {
    res.sendFile(path.join(__dirname, "/app/public/survey.html"));
});

// create new friend - takes in JSON input
app.post("/api/friends", function(req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    var newFriend = req.body;
  
    // Using a RegEx Pattern to remove spaces from newCharacter
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
    newFriend.name = newFriend.name.replace(/\s+/g, "").toLowerCase();
    
    console.log(newFriend);
    friends.push(newFriend);
    res.json(newFriend);
  });

// starts the server
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });