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


  app.put('/api/encounter', function(request,response) {
    
    var currentEncounterId = request.body.currentEncounterId;
    var currentEncounterUser = request.body.currentEncounterUser;
    var currentEncounterStatus = request.body.currentEncounterStatus;

    console.log('REQUEST DATA FROM PUT============================================')
    console.log(currentEncounterId)
    console.log(typeof currentEncounterId)
    console.log(currentEncounterUser)
    console.log(typeof currentEncounterUser)
    console.log(currentEncounterStatus)

    db.UserEncounter.findOne(
      { where: { EncounterId: currentEncounterId } 
    }).then(function(currentEncounter) { 

      console.log('FOUND ENCOUNTER')
      // console.log(currentEncounter.dataValues.UserId);
      console.log('USER PASSED INTO ENCOUNTER USER SEARCH');
      console.log(currentEncounterUser);

      //NEED TO DO A IF/ELSE STATEMENT
      db.UserEncounter.findAll( 
        { where: { UserId: currentEncounterUser }
      }).then(function(currentUser) {
        console.log(currentEncounterStatus);
        db.Encounter.update(
          { encounterStatus: currentEncounterStatus },
          { where: { id: currentEncounterId } }
        )
      })


    })

    
  })


 app.get('/api/partner/:id', function(request, response) {
 	
  var partnerUser = request.params.id
 	console.log(partnerUser)

 	db.User.findOne(
    { where: {id: partnerUser } }).then(function(dbPartner){
 		response.json(dbPartner);
 	})
 })

}
