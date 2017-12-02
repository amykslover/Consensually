'use strict';

var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var db = require('../models/index.js');
var configAuth = require('./auth');

module.exports = function(passport) {

    passport.use(new FacebookStrategy({

        // pull in our app id and secret from our auth.js file
        clientID: configAuth.facebookAuth.clientID,
        clientSecret: configAuth.facebookAuth.clientSecret,
        callbackURL: configAuth.facebookAuth.callbackURL,
        profileFields: configAuth.facebookAuth.profileFields,
        passReqToCallback: true
    },
    
    function(request, token, refreshToken, profile, done) {
      // console.log('All the arguments')
      // console.log(profile);

        if (!request.user) {
          db.User.findOne({ where :{ 'userFacebookID' : profile.id }}).then (function (user) {
            if (user) { // if there is a user id already but no token (user was linked at one point and then removed)
              if (!user.userToken) {
                user.userToken = token;
                user.userName  = profile.displayName;
                user.userEmail = profile.emails[0].value;
                user.save().then( function() {return done(null, user);}).catch (function(e) {});
              } 
              
              else {
                return done(null, user);
              }
          } else {
                 // if there is no user, create them
              var newUser = db.User.build ({
                  userFacebookID: profile.id,
                  userToken: token,
                  userName: profile.displayName,
                  userEmail: profile.emails[0].value
                });
                   
                newUser.save().then( function(error,user) {
                  if(error) throw error
                    return done(null, user);
                  }).catch (function(e) {});
              }
        });
          } else { // user already exists and is logged in, we have to link accounts
              var user = request.user; // pull the user out of the session
                  user.userFacebookID = profile.id;
                  user.userToken = token;
                  user.userName = profile.displayName;
                  user.userEmail = profile.emails[0].value;
                  user.save().then( function() {return done(null, user);}).catch (function(e) {});
            }
            return
      }));

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        return done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
      db.User.findById(id).then(function(user){
        return done(null, user);
      }).catch(function(e){
        return done(e, false);
      });
    })  
};