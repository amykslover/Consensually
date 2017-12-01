var passport = require('passport');
var express  = require('express');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
//Setting up the EXPRESS application
var app = express();
var PORT = process.env.PORT || 3000;

//Requiring our SEQUELIZE models for syncing
var db = require('./models');

//View engine setup. Put handlebars or jade here if we are using a templating engine

//APP.USE means that the middleware will all be run during every url request.
//You can pass other middleware functions into requests on an ad hoc basis by calling them like this:
//app.get('/', midfunction1, midfunction2)


//Session stores the express-session package
app.use(session({
    secret: 'amysecret', // session secret
    resave: true,
    saveUninitialized: true
}));

//Morgan will log every request to the console, including the amount of time to get to the routes
app.use(morgan('dev'));

//Body Parser allows us to use the request.body to retrieve data from the front end (form data or objects)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

//Gives us access to the public folder so we can use the css, js, etc
app.use(express.static('public'));


require('./config/auth.js');
require('./config/passport.js')(passport); // pass passport for configuration
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
//Must mount cookieParser before session. This will read cookies (needed for auth)
app.use(cookieParser());


require('./routes/apiFacebook.js')(app, passport);
require('./routes/apiUser.js')(app); // load our routes and pass in our app and fully configured passport

//Require all of the routes written for this app
require('./routes/html.js')(app);
require('./routes/apiCodes.js')(app);
// require('./routes/apiEncounters.js')(app);

//Syncing sequelize models and then starting Express app
db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log("LISTENING ON PORT: " + PORT);
  });
});
