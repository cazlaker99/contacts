var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var flash = require('connect-flash');
var expressValidator = require('express-validator');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(expressValidator());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(flash());
app.use(app.router);
app.use(require('stylus').middleware('./public'));
app.use(express.static(path.join(__dirname, 'public')));

app.locals.pretty = true;

// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

if ('test' == app.get('env')) {
	mongoose.connect('mongodb://localhost:27017/contact_test');
} else {
	mongoose.connect('mongodb://localhost:27017/contact');
}

require('./routes')(app);

module.exports = app;

if (!module.parent) {
	app.listen(app.get('port'), function(){
		console.log('Express server listening on port ' + app.get('port'));
	});
}