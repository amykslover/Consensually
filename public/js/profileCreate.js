
$(document).ready(function(){
    
	function createPage() {
		window.location.href = "/create";
	}

	function historyPage() {
		window.location.href = "/history";
	}

	function loginPage() {
		window.location.href = "/";
	}
	
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


	function displayCode(codeLength,data) {
		console.log(codeLength)
		console.log(data);
	    
	    switch (codeLength) {
	      case 0 :
	      	$('#create').remove();
	      	$('#edit1').remove();
	      	$(".pincode-input-text").val("");
	        break;
	      case 1:
		    $(".pincode-input-text").val("•");
		    $('#save1').remove();
		    
		    var $editButton = $('<input class="clickbutton" type="submit" id="edit1" value="Edit"/>');

		    $editButton.on("click", function(event) {
		    	deleteCode((data[0].id))
			});
		    $editButton.appendTo($(".buttonarea"));

		    
		    var $createButton = $('<input class="clickbutton" type="submit" id="create" value="Create"/>');

		    $createButton.on("click", function(event) {

		    	createPage();
			});

			$createButton.appendTo($(".newencounter"));

	        break;
	      default:
	        return;
	    }
	}




	$('.pincode-input1').pincodeInput({hidedigits:false,complete:function(value, e, errorElement){

	    if(value.length!=4){
	        $(errorElement).html("Please enter in all 4 digits");
	    } 
	    else{
	    	var $saveButton = $('<input class="clickbutton" type="submit" id="save1" value="Save"/>');


			$saveButton.on("click", function(event) {
				event.preventDefault();

			    var newCode = {
			    	code: parseInt($("#consent").val().trim()), 
			    	type: 'consent'
			    }; //Sample Value: { code: '2222', type: 'consent' }

				sendCode(newCode);
				getCodes();
				location.reload();
			});
	    }
		
		$saveButton.appendTo($(".buttonarea"));
	}});

});

