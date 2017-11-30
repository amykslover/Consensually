var passport = require('passport');
var express  = require('express');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
//Setting up the EXPRESS application
var app = express();
var PORT = process.env.PORT || 3000;

//Requiring our SEQUELIZE models for syncing
var db = require('./models');


//Use these if handlebars is incorporated into the application
// app.set('views', path.join(__dirname,'views'));
// app.set('view engine','handlebars');

require('./config/passport')(passport); // pass passport for configuration
app.use(session({
    secret: 'amysecret', // session secret
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

//Sets up the Express app to handle data parsing

app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

//Static directory
app.use(express.static('public'));


require('./routes/apiUser.js')(app, passport); // load our routes and pass in our app and fully configured passport

//Require all of the routes written for this app
require('./routes/html.js')(app);
require('./routes/apiCodes.js')(app);
// require('./routes/apiEncounters.js')(app);

//Syncing sequelize models and then starting Express app
db.sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, function() {
    console.log("LISTENING ON PORT: " + PORT);
  });
});
