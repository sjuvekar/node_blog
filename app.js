// set up ======================================================================
// get all the tools we need
var express  = require('express');
var app      = express();
var passport = require('passport');
var flash    = require('connect-flash');
var favicon  = require('serve-favicon');
var path     = require('path');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

var app = express();

// configuration ===============================================================
// connect to our database
require('./config/connection').mongoInit();

// pass passport for configuration
require('./config/passport')(passport);

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({ secret: 'JenkinsUbuntuGerrit',
                  saveUninitialized: true,
                  resave: true}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// Paths for views and public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// routes ======================================================================
require('./routes/index.js')(app, passport); // load our routes and pass in our app and fully configured passport


module.exports = app;
