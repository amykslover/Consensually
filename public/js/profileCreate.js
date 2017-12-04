
$(document).ready(function(){
    
    getCodes();


	function getCodes() {
		$.ajax({
	      method: "GET",
	      url: '/api/codes'
	    })
	    .done(function(data) {
	      console.log("GET CODES", data);
	      var codeLength = data.length;
	      displayCode(codeLength,data);
	    });
	};

	function displayCode(codeLength,data) {
		console.log(codeLength)
		console.log(data);
	    
	    switch (codeLength) {
	      case 0 :
	      	$('#edit1').remove();
	      	$(".pincode-input-text").val("");
	        break;
	      case 1:
		    $(".pincode-input-text").val("•");
		    $('#save1').remove();
		    
		    var $editButton = $('<input type="submit" id="edit1" value="Edit"/>');

		    $editButton.on("click", function(event) {
		    	deleteCode((data[0].id))
			});
		    $editButton.appendTo($(".buttonarea"));

		    
		    var $createButton = $('<input type="submit" id="create" value="Create"/>');

		    $createButton.on("click", function(event) {
		    	createPage()
			});

			$createButton.appendTo($(".newencounter"));

	        break;
	      default:
	        return;
	    }
	}




		// $("#consent").addClass("pincode-input1");
	$('.pincode-input1').pincodeInput({hidedigits:false,complete:function(value, e, errorElement){
	    
	    //Figure out the desired user flow, do you want a user to enter all their codes and then submit?
	    //Need to add validation to make sure that none of the codes are the same as each other
	    if(value.length!=4){
	        $(errorElement).html("Please enter in all 4 digits");
	    } 
	    else{
	    	var $saveButton = $('<input type="submit" id="save1" value="Save"/>');


			$saveButton.on("click", function(event) {
				event.preventDefault();

			    var newCode = {
			    	code: parseInt($("#consent").val().trim()), 
			    	type: 'consent'
			    }; //Sample Value: { code: '2222', type: 'consent' }

				sendCode(newCode);
				getCodes();
			});
	    }
		
		$saveButton.appendTo($(".buttonarea"));
	}});


	function sendCode(codeSent) {
		
		$.ajax({
	      method: "POST",
	      url: '/api/codes',
	      data: codeSent
	    })
	    .done(function() {
	      console.log('CODE ADDED')
	    });
	}

	function deleteCode(codeId) {
	    $.ajax({
	      method: "DELETE",
	      url: "/api/codes/" + codeId
	    })
	    .done(function() {
	      console.log('CODE DELETED')
	      getCodes();
	    });
	}

	function createPage() {
		window.location.href = "/create";
	}

	function historyPage() {
		window.location.href = "/history";
	}


});

