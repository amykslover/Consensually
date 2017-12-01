var path = require("path");
var passport = require('passport');
var passportFacebook = require('passport-facebook');

module.exports = function(app) {

  app.get("/", function(req, res) {
  	console.log("HOMEPAGE")

  	passport.use(new FacebookStrategy({
	    clientID: '1376574052470030',
    	clientSecret: '774037ff78c23a030f3ca83dc1b6bb0f',
    	callbackURL: "http://localhost:3000/auth/facebook/callback",
	    
	  },
	  function(accessToken, refreshToken, profile, cb) {
		//The method findOrCreate can be used to check if a certain element already exists in the database. 
		//If that is the case the method will result in a respective instance. 
		//If the element does not yet exist, it will be created.
	    User.findOrCreate({ facebookId: profile.id }, function (error, user) {
	    	console.log(user + "---------------------------------------------")
	    	if(error) {
	    		return cb(error);
	    	}
	    	else {
	    		console.log(user);
	    		return cb(user);
	    		//We need to use this information to create the user in the users model
	    	}
	    });
	  }
	));
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  app.get("/profile", function(req, res) {
  	res.sendFile(path.join(__dirname, "../public/profile.html"));
  })
  app.get("/encounters", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/encounters.html"));
  });
  
};
