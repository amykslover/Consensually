var db = require('../models');


module.exports = function(app) {

  //GET route for getting all of the codes for the session user
  app.get('/api/codes', function(request, response) {
    var sessionUser = request.session.passport.user;

    db.Code.findAll({ where: {UserId: sessionUser}})
    .then(function(dbCodes) {
      response.json(dbCodes);
    });
  });

  //GET route for getting all of the codes for the passed user
  app.get('/api/codes/:id', function(request, response) {
    var requestUser = request.params.id;

    db.Code.findAll({ where: {UserId: requestUser}})
    .then(function(dbCodes) {
      response.json(dbCodes);
    });
  });

  //POST route for creating a new code
  app.post('/api/codes', function(request, response) {
    var sessionUser = request.session.passport.user;

    db.Code.create({
      code: request.body.code,
      codeType: request.body.type,
      UserId: sessionUser,
    })
    .then(function(dbCodes) {
      response.json(dbCodes);
    });
  });


  //DELETE route for deleting codes when a user wants to remove the codes (the consent code can only be updated though)
  app.delete('/api/codes/:id', function(request, response) {

    db.Code.destroy({
      where: {
        id: request.params.id
      }
    }).then(function(dbCodes) {
      response.json(dbCodes);
    });
  });

  //PUT route for updating codes when a user wantes to change existing codes instead of deleting them
  // app.put('/api/code', function(req, res) {

  // });

};
