var http = require('http');
var express = require('express');
var twilio = require('twilio');

var app = express();



// Twilio Credentials
const accountSid = 'AC158a18c88afd9974315afc095b5e5675';
const authToken = '215b80a805b815ea08684fde29e7c1c8';

// require the Twilio module and create a REST client
const client = require('twilio')(accountSid, authToken);

app.post('/sms', function(req, res) {
  var twilio = require('twilio');
  var twiml = new twilio.TwimlResponse();
  twiml.message('The Robots are coming! Head for the hills!');
  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});



client.messages.create(
  {
    to: '+12672105999',
    from: '+18562724416',
    body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
  },
  (err, message) => {
    console.log(message.sid);
  }
);

http.createServer(app).listen(1337, function () {
  console.log("Express server listening on port 1337");
});