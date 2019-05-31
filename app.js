
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 8765);
app.set('views', path.join(__dirname + '/views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));

app.use(express.json());
app.use(express.urlencoded());


//app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));



app.get('/users', function(req,res){
	
});

const dateDifferenceCalc = function(day1, day2) {
	var timeDiff = day1 - day2;
	return Math.floor(timeDiff / (1000 * 60 * 60 * 24));
}


app.post('/', function(req,res){
	
	let today = new Date();
	let currYear = today.getFullYear();
	let userDate = new Date(req.body.birthday);
	userDate.setYear(currYear);
	
	let diffInDays = dateDifferenceCalc(Date.parse(userDate), Date.parse(today)) + 1;
	if(diffInDays < 0) {
		diffInDays = -dateDifferenceCalc(today, new Date(userDate).setYear('2020')) - 1; 
	}
	
	console.log('Today\'s Date: ' + today + ';\nUser Entered Date: ' + userDate);
	console.log('Number of Days for Next Birthday: ' + diffInDays);
	
	
	let birthday_msg = 'Hello ' + req.body.first_name + ',  You have ' + diffInDays + ' days until your birthday!';
	if(diffInDays == 0) {
		birthday_msg = 'Hello ' + req.body.first_name + ',  Happy Birthday!';
	}
	res.render('bday', {
			birthday_msg: birthday_msg
		}
	);
});


app.get('/', routes.index);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
