var http = require('http');
var express = require('express');
var twilio = require('twilio');
var firebase = require("firebase");

// Twilio Credentials
const accountSid = 'AC158a18c88afd9974315afc095b5e5675';
const authToken = '215b80a805b815ea08684fde29e7c1c8';

// require the Twilio module and create a REST client
const client = require('twilio')(accountSid, authToken);


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
});

app.get('/list', function(req, res) {
	var a = database.ref('users/').orderByChild('time').limitToLast(1).once('value').then(function(snapshot) {
		console.log(snapshot.val())
		console.log(snapshot.val().johnsmith)
		console.log(snapshot.val().johnsmith.number)

		message = "Hola";
		client.messages.create(
		  {
		    to: '+1' + snapshot.val().johnsmith.number,
		    from: '+18562724416',
		    body: message,
		  },
		  (err, message) => {
		    console.log(message);
		  }
		);
				
	});
	console.log(a);
});

app.post('/alert', function(req, res) {

	var safe = req.body.safe;
	console.log(safe);

	var message = "";
	if (safe) {
		message = "I am in an active shooter situation.  I am safe right now, please don't worry.  The SAFE app has notified authorities.";
	}
	else {
		message = "I am in the active shooting zone.  I am NOT safe.  The SAFE app has notified authorities.";
	}



	client.messages.create(
	  {
	    to: '+12672105999',
	    from: '+18562724416',
	    body: message,
	  },
	  (err, message) => {
	    console.log(message.sid);
	  }
	);


	console.log("text sent");

});


app.post('/register', function(req, res) {

	var username = req.body.username;
	var fullname = req.body.fullname;
	var phonenum = req.body.number;
	var timeAdded = firebase.database.ServerValue.TIMESTAMP;

	database.ref('users/' + username).set({
	    name: fullname,
	    number: phonenum,
	    time: timeAdded,
	    test: true
	}).then(function() {
		res.sendfile('./index.html')
	});
});


http.createServer(app).listen(1337, function () {
  console.log("Express server listening on port 1337");
});