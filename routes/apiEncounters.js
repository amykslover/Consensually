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


  app.post("/api/encounters", function(request, response) {
  	// console.log('API Encounters POST');
  	// console.log(request);

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

  // app.post("/api/encounters/:id", function(req, res){
    
  //   console.log('Adding to an existing encounter')
  //   var requestBody = request.body.encounterStatus;
  //   console.log(requestBody)

  //   var user = request.params.id;
  //   console.log(user)

  //   db.Encounter.update({
  //      encounterStatus: requestBody
  //     },{ 
  //       where: {
  //         id:  req.query.post_id
  //       },
  //       include: [db.Author]
  //     }
  //   ).then(function(num){
  //     //Checking to see if we need to modify AuthorPost
  //     db.AuthorPost.findAll({
  //       where: {
  //         PostId: req.query.post_id
  //       }
  //     }).then(function(AuthorPosts1){
  //       console.log("found pairs: ",AuthorPosts1)
  //       if (AuthorPosts1.reduce(function(acc, v){
  //         // console.log(`is ${v.dataValues.AuthorId} equal to ${req.body.AuthorId}?`)
  //         return v.dataValues.AuthorId == req.body.AuthorId || acc;
  //       }, false)){
  //         //same author, so no need to create new entry to AuthorPost
  //         // console.log("same author!")
  //         res.json({})
  //       } else {
  //         //new author, need to create new entry to AuthorPost
  //         db.AuthorPost.create({
  //           AuthorId: req.body.AuthorId,
  //           PostId: req.query.post_id
  //         }).then(function(){
  //           res.json({})
  //         })
  //       }
  //     })
  //   })
  // })


 app.get('/api/partner/:id', function(request, response) {
 	var partnerUser = request.params.id
 	console.log(partnerUser)

 	db.User.findOne({ where: {id: partnerUser}}).then(function(dbPartner){
 		response.json(dbPartner);
 	})
 })

}
