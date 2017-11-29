var express = require("express");
var bodyParser = require("body-parser");

//Setting up the EXPRESS application
var app = express();
var PORT = process.env.PORT || 3000;

//Requiring our SEQUELIZE models for syncing
var db = require('./models');

//Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

//Static directory
app.use(express.static('public'));

//Require all of the routes written for this app
require('./routes/html.js')(app);
require('./routes/apiUser.js')(app);
require('./routes/apiCodes.js')(app);
// require('./routes/apiEncounters.js')(app);

//Syncing sequelize models and then starting Express app
db.sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, function() {
    console.log("LISTENING ON PORT: " + PORT);
  });
});
