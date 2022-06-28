// Import the Express module
var express = require('express');

// Import the 'path' module (packaged with Node.js)
var path = require('path');

// Create a new instance of Express
var app = express();

// Import the Trivia game file.
var trivia = require('./trivia');

// Create a simple Express application
app.configure(function() {
    // Turn down the logging activity
    app.use(express.logger('dev'));

    // Serve static html, js, css, and image files from the 'public' directory
    app.use(express.static(path.join(__dirname,'public')));
});

// Create a Node.js based http server on port 8082
var port = process.env.PORT || 8082;
var server = require('http').createServer(app).listen([port]);

// Create a Socket.IO server and attach it to the http server
var socketio = require('socket.io');
var io = socketio(server);

console.log('Listening in port ' + port);

// Reduce the logging output of Socket.IO
//io.set('log level',1);

// Soap services

/*
const soapRequest = require('easy-soap-request');

const url = "https://www.siette.org/siette/services/External";
const sampleHeaders = {
    'Content-Type': 'text/xml;charset=UTF-8',
    SOAPAction: 'https://www.siette.org/siette/services/External?method=hasExpiredSIETTESession',
};

var xml = 
`
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:web="https://www.siette.org/siette/services/External">
    <soapenv:Body>
        <web:hasExpiredSIETTESession>
            <web:credentialIdentifier>80860053637196455697288092132893341243</web:credentialIdentifier>
        </web:hasExpiredSIETTESession>
    </soapenv:Body>
</soapenv:Envelope>
`;

var siette = {
    soapRequest

}
var xml2js = require('xml2js');

var parser = xml2js.Parser();

*/


// Authenticate
/*
io.use(async function(socket, next) {
    //var joinServerParameters = JSON.parse(socket.handshake.query.joinServerParameters);
    /*
    try {
        const { response } = await soapRequest({ url: url, headers: sampleHeaders, xml: xml, timeout: 1000 }); // Optional timeout parameter(milliseconds)
        const { headers, body, statusCode } = response;
        console.log(headers);
        parser.parseString(body, function (err, result) {
            console.log(result['soapenv:Envelope']['soapenv:Body'][0].multiRef[0]._);
        });
        console.log(statusCode);
    } catch (error) {
        console.log(error);
    }
    
    
    /*if (joinServerParameters.token == "xxx" ){
        next();          
    } else {
        next(new Error('Authentication error'));                  
    }
    next();
});
*/


// Listen for Socket.IO Connections. Once connected, start the game logic.
io.sockets.on('connection', function (socket) {
    console.log('Client connected: ' + socket.id);
    trivia.initGame(io, socket);
});


