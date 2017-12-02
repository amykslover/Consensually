var db = require('../models');


module.exports = function(app) {

  //GET route for getting all of the codes for a given user
  app.get('/api/codes', function(request, response) {
    
    var query = {};

    if (req.query.user_id) {
      query.UserID = req.query.user_id;
    }

    db.Codes.findAll({
      where: query,
      include: [db.User]
    }).then(function(dbCodes) {
      res.json(dbCodes);
    });
  });


  app.get("/api/posts", function(req, res) {
    var query = {};
    if (req.query.author_id) {
      query.AuthorId = req.query.author_id;
    }
    db.Post.findAll({
      where: query
    }).then(function(dbPost) {
      res.json(dbPost);
    });
  });





  //GET rotue for retrieving a single code given the database id
  app.get('/api/codes/:id', function(req, res) {
    db.Codes.findOne({
      where: {
        id: req.params.id
      },
      include: [db.User]
    }).then(function(dbCodes) {
      res.json(dbCodes);
    });
  });

  //POST route for creating a new code
  app.post('/api/codes', function(request, response) {
    console.log('======================Post')
    console.log(request.body)

    db.Code.create({
      code: request.body.code,
      codeType: request.body.type,
      UserId: '1',
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
