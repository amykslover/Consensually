var db = require('../models/index.js')

module.exports = function(app, passport) {

    //Route for home page
    app.get('/', function(request, response) {
        response.render('index.ejs'); // load the index.ejs file
    });





    //Route for showing the profile page
    app.get('/profile', isLoggedIn, function(request, response) {
        // console.log(request.user)
        response.render('profile.ejs', {
            user : request.user // get the user out of session and pass to template
        });
    });

    app.get("/profile/:id", function(request, response) {
        // console.log('=====================================================================================================')
        // console.log(request.params.id)


        db.User.findAll({
            where: {
                id: request.params.id
            }
        })
        .then(function(data) {
                // console.log('============================', data)
                // // console.log('============================', data.dataValues.userEmail)
                // // console.log('============================', data.dataValues.id)
                // response.json(data)
                // response.render('profile', data);
            });

    });

    // =====================================================================================================
    // FACEBOOK ROUTES =====================================================================================
    // =====================================================================================================

    app.get('/auth/facebook', passport.authenticate('facebook', { 
      scope : ['public_profile', 'email', 'user_birthday']
    }));

    // Handle the callback after facebook has authenticated the user
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect : '/profile',
            failureRedirect : '/'
        })
    );

    // route for logging out
    app.get('/logout', function(request, response) {
        request.logout();
        response.redirect('/');
    });

};
// route middleware to make sure a user is logged in
function isLoggedIn(request, response, next) {

    // if user is authenticated in the session, carry on
    if (request.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    response.redirect('/');
}
