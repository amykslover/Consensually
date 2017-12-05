var db = require('../models');


module.exports = function(app) {

  //GET route for getting all of the encounters for a given user
  app.get('/api/encounters', function(request, response) {

    console.log('TRYING TO GET ENCOUNTERS')
  	var sessionUser = request.session.passport.user.toString();
    console.log(sessionUser);
    var query = {};
		query['id'] = sessionUser;
    console.log(query)

    db.Encounter.findAll({
      include: [{
      	where: query,
        model: db.User,
      }]
    }).then(function(dbEncounter) {
    	console.log(dbEncounter);
    	response.json(dbEncounter);
    });
  });

  //Get the most recent encounter to be updated by the PUT request
  app.get('/api/encounter', function(request, response) {

    db.Encounter.findAll({
      limit: 1,
      order: [ [ 'createdAt', 'DESC' ]]
    }).then(function(dbEncounter){
      response.json(dbEncounter);
    });     
  })


  app.post('/api/encounters', function(request, response) {

  	var sessionUser = request.session.passport.user;
    console.log(sessionUser)

    var requestBody = request.body.encounterStatus;
    console.log(requestBody)

    db.Encounter.create({
      encounterStatus: requestBody
    }).then(function(dbEncounter) {
      console.log(dbEncounter);
      db.UserEncounter.create({
        UserId: sessionUser,
        EncounterId: dbEncounter.dataValues.id
      }).then(function(pair) {
        response.json(dbEncounter);
      })
    });
  });

  app.put('/api/encounter/:id', function(request,response) {
    var encounterId = request.params.id;
    var requestObject = request
    console.log('DOES THIS WORK?============================================')

      // db.Encounter.update(
      // { 
      //   where: {id: encounterId} 
      // }).
  
  });


 app.get('/api/partner/:id', function(request, response) {
 	var partnerUser = request.params.id
 	console.log(partnerUser)

 	db.User.findOne({ where: {id: partnerUser}}).then(function(dbPartner){
 		response.json(dbPartner);
 	})
 })

}
