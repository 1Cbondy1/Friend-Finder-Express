// require dependencies  
var http = require("http");
var fs = require("fs");

// set port to 8080
var PORT = 8080;

var server = http.createServer(handleRequest);

function handleRequest(req, res) {

    // capture the url to which the request is made
    var path = req.url;

    // when we visit different urls, read and respond with different files
    switch (path) {
        case "/index":
        return fs.readFile(__dirname + "/app/public/home.html", function(err, data) {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(data);
        });
        case "/survey":
        return fs.readFile(__dirname + "/app/public/survey.html", function(err, data) {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(data);
        });
        default:
        return fs.readFile(__dirname + "/app/public/home.html", function(err, data) {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(data);
        });
    }   
}

// starts the server
server.listen(PORT, function() {
    console.log("Server is listening on PORT: " + PORT);
});