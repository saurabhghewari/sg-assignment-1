/*
*Primary file for the Api
*
*/

// Dependencies
var fs = require('fs');
var url = require('url');
var http = require('http');
var https = require('https');
var Config = require('./config');
var stringDecoder = require('string_decoder').StringDecoder;

// Instatiating the http server
var httpServer = http.createServer(function(req, res){
    unifiedServer(req, res);
});

// Start the server, and have it listen on port 3000
httpServer.listen(Config.httpPort, function(){
    console.log(`Server is listening on port ${ Config.httpPort }`);
});

// Instatiating the https server
var httpsServerOptions = {
    'key' : fs.readFileSync('./https/key.pem'),
    'cert' : fs.readFileSync('./https/cert.pem')
}

// Start the https server, and have it listen on httpsPort from config.
var httpsServer = https.createServer(httpsServerOptions, function(req, res){
    unifiedServer(req, res);
});

httpsServer.listen(Config.httpsPort, function(){
    console.log(`Server is listening on port ${ Config.httpsPort }`);
});

// All the server logic for both http and https server
var unifiedServer = function(req, res) {
    
    // Get the URL and parse it
    var parsedUrl = url.parse(req.url, true);
    
    // Get the path
    var path = parsedUrl.pathname;
    var trimmedPath = path.replace(/^\/+|\/+$/g, '');

    // Get QueryString as an Object
    var queryStringObject = parsedUrl.query;

    // get the HTTP Method
    var method =  req.method.toLowerCase();

    // Get the hearder as an object
    var headers = req.headers;

    // Get the payload, if any
    var decoder = new stringDecoder('utf-8');
    var buffer = '';
    req.on('data', function(data){
        buffer += decoder.write(data);
    });
    req.on('end', function(){
        buffer += decoder.end();

        // Choose the handler this request should go to. If one is not found, use the notFound handler
        var chosendHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;

        // Construct the data object to send to the handler
        var data = {
            'trimmedPath' : trimmedPath,
            'queryStringObject' : queryStringObject,
            'method' : method,
            'headers' : headers,
            'payload' : buffer
         };

         // Route the request to the handler specified in the router
         chosendHandler(data, function(statusCode, payload){
            
            // Use the status code called back by the handler, or default to 200
            statusCode = typeof(statusCode) == 'number' ? statusCode : 200;

            // Use the payload called back by the handler, or default to {}
            payload = typeof(payload) == 'object' ? payload : {};

            // Convert the payload to a string
            var payloadString = JSON.stringify(payload);

            // Return the response
            res.setHeader('Content-type', 'application/json');
            res.writeHead(statusCode);
            res.end(payloadString);
        });
    });
}

// Define the handlers
var handlers = {};

// Ping handler
handlers.hello = function(data, callback) {

    // Callback a http status code, and a error message
    return callback(200, { message: 'Welcome to Nodejs World!!!' });
};

// Not found handler
handlers.notFound = function(data, callback) {
    callback(404, { 'message' : 'Not Found' });
};

// Define a request router
var router = {
    'hello' : handlers.hello
}