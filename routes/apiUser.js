var passport = require('passport');
// var passportFacebook = require('passport-facebook');
// console.log(passportFacebook);
var User = require('../models/user');
var Encounters = require('../models/encounters');
var Codes = require('../models/codes');
// var configAuth = require('../config/auth');

module.exports = function(app) {


	//These routes are getting data from the Facebook sign on
	app.get('/auth/facebook',
		passport.authenticate('facebook'));

	app.get('/auth/facebook/callback',
		passport.authenticate('facebook', { failureRedirect: '/login' }),

		function(req, res) {
	    // Successful authentication, redirect home.
	    res.redirect('/');
	    console.log(res);
	    
	});

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
  	app.post('/api/user', function(req, res) {

	  	console.log('Creating a NEW User')
	    
	    db.User.create(req.body).then(function(dbUser) {
	    	res.json(dbUser);
	    });
	});

  //Delete a user with a specific identifier
  	app.delete('/api/user/:id', function(req, res) {
    
	    db.User.destroy({
	    	where: {
	    		id: req.params.id
	    	}
	    }).then(function(dbUser) {
	    	res.json(dbUser);
	    });
	});

}