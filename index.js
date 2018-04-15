var http = require('http');
var express = require('express');
var twilio = require('twilio');
var firebase = require("firebase");


var app = express();

var config = {
  apiKey: "AIzaSyDMx6n2ycqajZm-AtdgyJG8yxHSSGPAr88",
  authDomain: "activeshooteralert.firebaseapp.com",
  databaseURL: "https://activeshooteralert.firebaseio.com",
  projectId: "activeshooteralert",
  storageBucket: "activeshooteralert.appspot.com",
  messagingSenderId: "887225643974"
};
firebase.initializeApp(config);
var database = firebase.database();
database.ref('users/' + 'test').set({
    username: 'test',
    email: 'test@test.com',
});

var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

app.get('/', function(req, res) {
	res.sendfile('./index.html');
})


app.post('/register', function(req, res) {

	var username = req.body.username;
	var fullname = req.body.fullname;
	var phonenum = req.body.number;

	database.ref('users/' + username).set({
	    name: fullname,
	    number: phonenum,
	}).then(function() {
		res.sendfile('./index.html')
	});
});


http.createServer(app).listen(1337, function () {
  console.log("Express server listening on port 1337");
});