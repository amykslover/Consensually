var passport = require('passport');
var express  = require('express');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var path = require('path');
var moment = require('moment');
//Setting up the EXPRESS application
var app = express();
var PORT = process.env.PORT || 3000;

//Requiring our SEQUELIZE models for syncing
var db = require('./models');

//View engine setup. Put handlebars or jade here if we are using a templating engine
require('ejs')
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

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

//Must mount cookieParser before session. This will read cookies (needed for auth)
app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
require('./config/auth.js');
require('./config/passport.js')(passport); // pass passport for configuration

// load our routes and pass in our app and fully configured passport
require('./routes/apiFacebook.js')(app, passport);


//Require all of the routes written for this app
require('./routes/apiCodes.js')(app);
require('./routes/apiEncounters.js')(app);

//Syncing sequelize models and then starting Express app
db.sequelize.sync({ force: true }).then(function() {

  app.listen(PORT, function() {
    console.log("LISTENING ON PORT: " + PORT);
  });

  db.User.bulkCreate([
		{
			userFacebookID: "66665923578584641",
	        userToken: "ZMKFWPMA9njQ4BAJ1z0OQ9iM7ZA0xWi0zmZCeHuX58xZAFR2wiLtBrgXT04RvDuCUcmJUlDWn8iifcLFZB9jc9Qjtylyy7Ipwzmkl7m3PkDwa2H7TTUxZAoBddEnwrPvANRHEZCbPIe2nu7ngOmk5ggOdRgF1TMfdaaa",
	       	userName: "Thomas Smith",
	        userEmail: "thomas.smith@mail.com"
		},
		{
			userFacebookID: "4198419381928447",
	        userToken: "ODJOAFP9njQ4BAJ1z0OQ9iM7ZA0xWi0zmZCeHuX58xZAFR2wiLtBrgXT04RvDuCUcmJUlDWn8iifcLFZB9jc9Qjtylyy7Ipwzmkl7m3PkDwa2H7TTUxZAoBddEnwrPvANRHEZCbPIe2nu7ngOmk5ggOdRgF1TMRrew",
	       	userName: "Cayden McQuerry",
	        userEmail: "cayden_mcqeury@mail.com"
		},
		{
			userFacebookID: "10241703491093419",
	        userToken: "AFJAODSFJAnjQ4BAJ1z0OQ9iM7ZA0xWi0zmZCeHuX58xZAFR2wiLtBrgXT04RvDuCUcmJUlDWn8iifcLFZB9jc9Qjtylyy7Ipwzmkl7m3PkDwa2H7TTUxZAoBddEnwrPvANRHEZCbPIe2nu7ngOmk5ggOdRgF1TMRhhbs",
	       	userName: "Jason Miller",
	        userEmail: "jay.miller@mail.com"
		}
	])

  db.Code.bulkCreate([
		{
			code: "1111",
	        codeType: "consent",
	       	UserId: "1"
		},
		{
			code: "2222",
	        codeType: "consent",
	       	UserId: "2"
		},
		{
			code: "3333",
	        codeType: "consent",
	       	UserId: "3"
		}
	])

});
