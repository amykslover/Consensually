
$(document).ready(function(){

	getUserCode()
	// populatePartnerFromSession()

	function getUserCode(userId) {

		if(userId){
			$.ajax({
		      method: "GET",
		      url: '/api/codes/' + userId
		    })
		    .done(function(data) {
			    
			    var pStoredIdentifier = data[0].UserId;
				sessionStorage.setItem('pStoredId', pStoredIdentifier);
		      	pStoredId  = sessionStorage.getItem('pStoredId');
		      	
		      	var pStoredCodeConsent = data[0].code;
		      	sessionStorage.setItem('pStoredCode', pStoredCodeConsent);
				pStoredCode = sessionStorage.getItem('pStoredCode');

				console.log(pStoredId,pStoredCode);
		    });
		}
		else {

			$.ajax({
		      method: "GET",
		      url: '/api/codes'
		    })
		    .done(function(data) {

		    	var uStoredIdentifier = data[0].UserId;
				sessionStorage.setItem('uStoredId', uStoredIdentifier);
		    	
		    	var uStoredCodeConsent = data[0].code;
				sessionStorage.setItem('uStoredCode', uStoredCodeConsent);
			
				uStoredId = sessionStorage.getItem('uStoredId');
				uStoredCode = sessionStorage.getItem('uStoredCode');
				console.log(uStoredId,uStoredCode);

		    });
		}

	};


	function startEncounter() {

		var newEncounter = { 
	    	encounterStatus: 'Created'
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


	$('#partnersearch').on("click", function(event) {
		event.preventDefault();
		startEncounter();

		var encounterPartnerId;
		encounterPartnerId = parseInt($("#encounterpartner").val().trim());
		//AJAX call with partner's user identifier as the argument passed
		findUser(encounterPartnerId);
	});


	var uGuessCount = 3;
	$('.pincode-input2').pincodeInput({hidedigits:true,inputs:4,complete:function(value, e, errorElement){

		    if(value.length!=4){
		        $(errorElement).html("Please enter in all 4 digits");
		    }
		    else{

		    	var pCodeEntered = value;

		    	var partnerOutcome = (compareCodes(pStoredId,pCodeEntered,pStoredCode));

		    	if(partnerOutcome) {
		    		alert('Code Entered Correctly, Encounter Verified');
		    		console.log('GET ENCOUNTER & UPDATE============================================')
		    		
		    		getEncounter(pStoredId,'Verified');
		    	}
		    	else {
		    		uGuessCount --
	    			console.log(uGuessCount);
		    		alert('Incorrect Code, You Have ' + uGuessCount + ' More Attempts');

		    		if(uGuessCount > 0) {
		    			$(".pincode-input-text").val("");
		    		}
		    		else {
		    			alert('The wrong code has been entered too many times.')
		    			console.log('GET ENCOUNTER & UPDATE============================================')
		    			getEncounter(pStoredId,'Unverified');
		    			// window.location.href = "/";
		    		}
		    	}
		    }
		}
	});




	var pGuessCount = 3;
	$('.pincode-input1').pincodeInput({hidedigits:true,inputs:4,complete:function(value, e, errorElement){

	    if(value.length!=4){
	        $(errorElement).html("Please enter in all 4 digits");
	    } 
	    else{
	    	var uCodeEntered = value;
	    	console.log('User Entered Value');
	    	console.log(uCodeEntered);

	    	var userOutcome = (compareCodes(uStoredId,uCodeEntered,uStoredCode));

	    	if(userOutcome) {
	    		alert('Code Entered Correctly');
	    		getEncounter(uStoredId,'User 1 Verified')
	    		
	    	}
	    	else {
	    		pGuessCount --
	    		console.log(pGuessCount);
	    		alert('Incorrect Code, You Have ' + pGuessCount + ' More Attempts');

		    		if(pGuessCount > 0) {
		    			$(".pincode-input-text").val("");
		    		}
		    		else {
		    			alert('The wrong code has been entered too many times.')
		    			getEncounter(uStoredId,'User 1 Failed Verification')
		    			// window.location.href = "/";
		    		}
	    	}
	    }
		
	}});


	function compareCodes(userId, userCodeEntered, userCodeStored) {
		if(userCodeEntered === userCodeStored) {
			return true
		} else {
			return false
		}
	};


	function findUser(partnerId) {

		$.ajax({
	      method: "GET",
	      url: "/api/partner/" + partnerId
	    }).done(function(partner) {
	    	$("#searchpartner").empty();
	    	

	    	var partnerId = partner.id;
	    	getUserCode(partnerId);
			
	    	
	    	var pStoredName = partner.userName;
				sessionStorage.setItem('pStoredName', pStoredName);
		      	partnerName  = sessionStorage.getItem('pStoredName');
		      	console.log('SESSION PARTNER NAME');
		      	console.log(partnerName);

			var $partnerName = $('<p id="partner-name"/>');
			$partnerName.text(partnerName);
	    	$partnerName.appendTo('#partnerProfileInfo');

	    	var $userCode = $('<div id="user-code-box/>')
	    	$userCode.appendTo('.encounteruser')


	    });
	};

	function getEncounter(userId,currentStatus) {

		$.ajax({
	      method: "GET",
	      url: '/api/encounter'
	    }).done(function(encounter) {
	    	console.log('getEncounter: userId');
	    	console.log(userId);
	    	console.log('getEncounter: currentStatus');
	    	console.log(currentStatus);


	    	console.log('getEncounter: lastEncounter');
	    	var lastEncounter = encounter[0].id;
	    	console.log(lastEncounter);

	    	updateEncounter(userId,lastEncounter,currentStatus)
	    });

	};

	function updateEncounter(userId,lastEncounter,currentStatus) {

		var encounterObject = {
			currentEncounterId: lastEncounter,
			currentEncounterUser: userId,
			currentEncounterStatus: currentStatus
		};

		console.log(encounterObject);

		$.ajax({
	      method: "PUT",
	      url: '/api/encounter',
	      data: encounterObject
	    })
	    .done(function(data) {
	    	console.log(data);
	      	console.log('ENCOUNTER UPDATED')
	    });	
	}
	
});
