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

	//Is this where we redirect the user to their profile page if they are successfully authenticated?
    res.sendFile(path.join(__dirname, "../public/profile.html"));
  });


  app.get("/profile", function(req, res) {
  	res.sendFile(path.join(__dirname, "../public/profile.html"));
  })

  app.get("/encounters", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/encounters.html"));
  });
  
};








  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads view.html
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/view.html"));
  });

  // add route loads the add.html page, where users can enter new books to the db
  app.get("/add", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/add.html"));
  });

  // all route loads the all.html page, where all books in the db are displayed
  app.get("/all", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/all.html"));
  });

  // short route loads the short.html page, where short books in the db are displayed
  app.get("/short", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/short.html"));
  });

  // long route loads the long.html page, where long books in the db are displayed
  app.get("/long", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/long.html"));
  });

