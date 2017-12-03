var db = require('../models');


module.exports = function(app) {

  app.get('/api/user/:id', function(request, response) {
  	var partner = parseInt(request.params.id)
  	console.log(partner)

    db.User.findOne({
      where: {
        id: partner
      }
    }).then(function(dbPartner) {
      	response.json(dbPartner);
    });
  });
}
