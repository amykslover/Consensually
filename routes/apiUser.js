// var passport = require('passport');
// console.log(passport);
// var passportFacebook = require('passport-facebook');
var User = require('../models/user');
var Encounters = require('../models/encounter');
var Codes = require('../models/code');
var configAuth = require('../config/auth');
var db = require('../models/index');


module.exports = function(app, passport) {

    var options = {
    	successRedirect : '/profile',
        failureRedirect : '/'
    }

    //ROUTE FOR THE HOME PAGE
    app.get('/', function(req, res) {
        res.render('index.html');
    });

    // route for login form
    // route for processing the login form
    // route for signup form
    // route for processing the signup form

    // route for showing the profile page
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.html', {
            user : req.user // get the user out of session and pass to template
        });
    });

    // =====================================
    // FACEBOOK ROUTES =====================
    // =====================================
    // route for facebook authentication and login
    app.get('/auth/facebook', 
    	passport.authenticate('facebook'
    	// scope : ['public_profile', 'email']
    ));

    // handle the callback after facebook has authenticated the user
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', options));

    // route for logging out
    // app.get('/logout', function(req, res) {
    //     req.logout();
    //     res.redirect('/');
    // });

//This route is getting data from the user model
	app.get('/api/user', function(req, res) {
	    db.User.findAll({
	      include: [{
	      	model: db.Codes
	      }]
	    }).then(function(dbUser) {
	    	res.json(dbUser);
	    });
	});

  	app.get('/api/user/:id', function(req, res) { 		
	    db.User.findOne({
	      where: {
	      	id: req.params.id
	      }
	    }).then(function(dbUser) {
	      res.json(dbUser);
	    });
	});

  //Create a new user with the facebook sign on callback
 //  	app.post('/api/user', function(req, res) {

	//   	console.log('Creating a NEW User')
	    
	//     db.User.create(req.body).then(function(dbUser) {
	//     	res.json(dbUser);
	//     });
	// });

  //Delete a user with a specific identifier
 //  	app.delete('/api/user/:id', function(req, res) {
    
	//     db.User.destroy({
	//     	where: {
	//     		id: req.params.id
	//     	}
	//     }).then(function(dbUser) {
	//     	res.json(dbUser);
	//     });
	// });

};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}