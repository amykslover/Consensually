
$(document).ready(function(){

	startEncounter();

	function startEncounter() {

		var newEncounter = { 
	    	encounterStatus: 'created'
	    };
	    
	    createEncounter(newEncounter);
		
	}

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
		getPartnerCode(encounterPartnerId);
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


	$('.pincode-input1').pincodeInput({hidedigits:true,inputs:4,complete:function(value, e, errorElement){
		//get codes 
	    if(value.length!=4){
	        $(errorElement).html("Please enter in all 4 digits");
	    } 
	    else{
	    	console.log('User Entered Value');
	    	console.log(value);
	    	compareCodes(value,'1234');

	    }
		
	}});

	$('.pincode-input2').pincodeInput({hidedigits:true,inputs:4,complete:function(value, e, errorElement){
			


		    if(value.length!=4){
		        $(errorElement).html("Please enter in all 4 digits");
		    } 
		    else{
		    	console.log('Partner Entered Value');
		    	console.log(value);
		    	compareCodes(value,'1111');
		    }
			
	}});

	function compareCodes(userCodeEntered, userCodeStored) {
		if(userCodeEntered === userCodeStored) {
			alert('Code Correct')
			return true
		} else {
			alert('Code Incorrect')
			return false
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
