var path = require("path");

module.exports = function(app) {
  //This is the homepage where a user will log in or will be shown upon logout
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  //This is the page where a user will be able to set up, edit or delete their previously input codes
  //They will also be able to create an encounter here too
  app.get("/profile/", function(req, res) {
  	res.sendFile(path.join(__dirname, "../public/profile.html"));
  });

  //This is the page where a user will be able to enter data about the encounter they are creating
  app.get("/create", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/create.html"));
  });

  //This is the page where a user will be able to see a summary of their past encounters
  app.get("/encounters", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/encounters.html"));
  });
  
};






// var passport = require('passport');
// var passportFacebook = require('passport-facebook');


//   app.get("/", function(req, res) {
//     console.log("HOMEPAGE")

//     passport.use(new FacebookStrategy({
//       clientID: '1376574052470030',
//       clientSecret: '774037ff78c23a030f3ca83dc1b6bb0f',
//       callbackURL: "http://localhost:3000/auth/facebook/callback",
      
//     },
//     function(accessToken, refreshToken, profile, cb) {
//     //The method findOrCreate can be used to check if a certain element already exists in the database. 
//     //If that is the case the method will result in a respective instance. 
//     //If the element does not yet exist, it will be created.
//       User.findOrCreate({ facebookId: profile.id }, function (error, user) {
//         console.log(user + "---------------------------------------------")
//         if(error) {
//           return cb(error);
//         }
//         else {
//           console.log(user);
//           return cb(user);
//           //We need to use this information to create the user in the users model
//         }
//       });
//     }
//   ));

//   //Is this where we redirect the user to their profile page if they are successfully authenticated?
//     res.sendFile(path.join(__dirname, "../public/profile.html"));
//   });
