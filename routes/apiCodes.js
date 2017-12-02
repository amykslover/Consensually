var db = require('../models');


module.exports = function(app) {

  //GET route for getting all of the codes for a given user
  app.get('/api/codes', function(request, response) {
    var sessionUser = request.session.passport.user;

    db.Code.findAll({ where: {UserId: sessionUser}})
    .then(function(dbCodes) {
      response.json(dbCodes);
    });
  });

  //POST route for creating a new code
  app.post('/api/codes', function(request, response) {
    var sessionUser = request.session.passport.user;
    console.log(sessionUser)

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
  app.delete('/api/codes/:id', function(req, res) {
    db.Codes.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbCodes) {
      res.json(dbCodes);
    });
  });

  //PUT route for updating codes when a user wantes to change existing codes instead of deleting them
  app.put('/api/codes', function(req, res) {
    db.Codes.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function(dbCodes) {
        res.json(dbCodes);
      });
  });
};
