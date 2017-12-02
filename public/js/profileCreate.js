
$(document).ready(function(){
    

    $.get("/api/codes", function(data) {
      console.log("GET CODES", data);
     });

	$('.pincode-input1').pincodeInput({hidedigits:false,complete:function(value, e, errorElement){
	    
	    //Figure out the desired user flow, do you want a user to enter all their codes and then submit?
	    //Need to add validation to make sure that none of the codes are the same as each other
	    if(value.length!=4){
	        $(errorElement).html("Please enter in all 4 digits");
	    } 
	    else{
	        $("input[type='submit']").removeAttr("disabled");
	    }
	}});

	function sendCode(codeSend) {
		$.post('/api/codes', codeSend);
	}

	$("#save1").on("click", function(event) {
		event.preventDefault();

	    var newCode = {
	    	code: parseInt($("#consent").val().trim()), 
	    	type: 'consent'
	    }; //Sample Value: { code: '2222', type: 'consent' }

		sendCode(newCode);
	});
		
	$("#save2").on("click", function(event) {
		event.preventDefault();

	    var newCode = {
	    	code: parseInt($("#assist").val().trim()), 
	    	type: 'assist'
	    }; //Sample Value: { code: '2222', type: 'assist' }

		sendCode(newCode);
	});

	$("#save3").on("click", function(event) {
		event.preventDefault();

	    var newCode = {
	    	code: parseInt($("#emergency").val().trim()), 
	    	type: 'emergency'
	    }; //Sample Value: { code: '2222', type: 'assist' }

		sendCode(newCode);
	});

})