
$(document).ready(function(){

	// startEncounter();

	// function startEncounter() {

	// 	var newEncounter = { 
	//     	encounterStatus: 'created'
	//     };
	    
	//     createEncounter(newEncounter);
		
	// }

	function createEncounter(encounterObject) {
		$.ajax({
	      method: "POST",
	      url: '/api/encounters',
	      data: encounterObject
	    })
	    .done(function() {
	      console.log('ENCOUNTER ADDED')
	    });	
	}

	var storedUserCodeObject = function getUserCode() {
							var userValidCode = $.ajax({
						      method: "GET",
						      url: '/api/codes'
						    })
						    .done(function(data) {
						    	return data[0].code;

						    });
						    return userValidCode;
						  
							};



	const val = Promise.resolve(storedUserCodeObject()).then(function(v) {

		storedUserCode = v[0].code;
		console.log(storedUserCode);
		return storedUserCode;

	});


	var partnerId = $("#partnerIdDiv");
	var partnerName = $("#partnerIdDiv");

	//Look up the partner the user has entered for this encounter

	$('#partnersearch').on("click", function(event) {
		event.preventDefault();

		var encounterPartnerId;
		encounterPartnerId = parseInt($("#encounterpartner").val().trim());
		//AJAX call with partner's user identifier as the argument passed
		findUser(encounterPartnerId);
	});


	function getPartnerCode(userId) {
		$.ajax({
	      method: "GET",
	      url: '/api/codes/' + userId
	    })
	    .done(function(data) {
	      	var partnerValidCode = data[0].code;
	      	console.log("PARTNER CODE", partnerValidCode);
	      	return partnerValidCode;
	    });
	};

	console.log($('.pincode-input2'));

	$('.pincode-input2').pincodeInput({hidedigits:true,inputs:4,complete:function(value, e, errorElement){

		    if(value.length!=4){
		        $(errorElement).html("Please enter in all 4 digits");
		    } 
		    else{
		    	var partnerCodeEntered = value;
		    	console.log('Partner Entered Value');
		    	console.log(partnerCodeEntered);

		    }		
	}});


	$('.pincode-input1').pincodeInput({hidedigits:true,inputs:4,complete:function(value, e, errorElement){
		//get codes 
	    if(value.length!=4){
	        $(errorElement).html("Please enter in all 4 digits");
	    } 
	    else{
	    	console.log('User Entered Value');
	    	console.log(value);
	    }
		
	}});


	function compareCodes(userId, userCodeEntered, userCodeStored) {
		if(userCodeEntered === userCodeStored) {

			var updateEncounterInfo = { 
			userId: userId,
	    	encounterStatus: 'verified'
	    	};

			updateEncounter(updateEncounterInfo)
			true
		} else {

			var updateEncounterInfo = { 
			userId: userId,
	    	encounterStatus: 'unverified'
	    	};

			updateEncounter(updateEncounterInfo)
			false
		}
	};






	function findUser(partnerId) {

		$.ajax({
	      method: "GET",
	      url: "/api/partner/" + partnerId
	    }).done(function(partner) {
	    	var partnerName = partner.userName;
	    	var partnerId = partner.id;

	    	console.log('PARTNER RESPONSE')
	    	console.log(partnerId)
	    	console.log(partnerName)

	    	$("#searchpartner").empty();
			
			var $partnerName = $('<p id="partner-name"/>');
			$partnerName.text(partnerName);

			var $partnerId = $('<p id="partner-id"/>');
			$partnerId.text(partnerId);

			$partnerId.appendTo('.encounterpartner');
	    	$partnerName.appendTo('.encounterpartner');

	    	var $userCode = $('<div id="user-code-box/>')
	    	$userCode.appendTo('.encounteruser')
	    	
	    	console.log('partnerId inside findUser')
	    	console.log(partnerId)

	    	getPartnerCode(partnerId);

	    });
	};



	function updateEncounter(encounterObject) {
		$.ajax({
	      method: "PUT",
	      url: '/api/encounters',
	      data: encounterObject
	    })
	    .done(function() {
	      console.log('ENCOUNTER UPDATED')
	    });	
	}

});
