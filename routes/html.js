var path = require("path");

module.exports = function(app) {
    
    //This is the homepage where a user will log in or will be shown upon logout
    app.get('/', function(request, response) {
        response.render('index.ejs'); // load the index.ejs file
    });
    

    //This is the page where a user will be able to see a summary of their past encounters
     app.get('/encounters', function(request, response) {
        response.render('encounters.ejs'); // load the index.ejs file
    });
  
};