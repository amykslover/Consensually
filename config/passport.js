// var localStrategy = require('passport-local').Strategy;
// // var configAuth = require('../config/auth');
// var User = require('../models/user');

// module.exports = function(passport) {

// 	passport.use(new FacebookStrategy({
// 	    clientID: '1376574052470030',
//     	clientSecret: '774037ff78c23a030f3ca83dc1b6bb0f',
//     	callbackURL: "http://localhost:3000/auth/facebook/callback",
	    
// 	  },
// 	  function(accessToken, refreshToken, profile, cb) {
// 		//The method findOrCreate can be used to check if a certain element already exists in the database. 
// 		//If that is the case the method will result in a respective instance. 
// 		//If the element does not yet exist, it will be created.
// 	    User.findOrCreate({ facebookId: profile.id }, function (error, user) {
// 	    	console.log(user + "-------------------")
// 	    	if(error) {
// 	    		return cb(error)
// 	    	}
// 	    	else {
// 	    		return cb(user)
// 	    		//We need to use this information to create the user in the users model
// 	    	}
// 	    });
// 	  }
// 	));
// }
