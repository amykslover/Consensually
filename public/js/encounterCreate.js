
$(document).ready(function(){
	//Look up the partner the user has entered for this encounter


	$('#partnersearch').on("click", function(event) {
		event.preventDefault();
		encounterPartner = parseInt($("#encounterpartner").val().trim());

		findUser(encounterPartner);
	});

	$('.pincode-input2').pincodeInput({hidedigits:true,inputs:4,complete:function(value, e, errorElement){
	    $(".pincode-callback").html("Complete callback from 4-digit test: Current value: " + value);

            $(errorElement).html("Incorrect Code");
		
	}})


	function findUser(partnerId) {

		$.ajax({
	      method: "GET",
	      url: "/api/user/" + partnerId
	    }).done(function(partner) {
	    	$("#searchpartner").empty();

			var $partnerIdDiv = $('<div id="partnerIdDiv"></div>');
	    	var $partnerNameDiv = $('<div id="partnerNameDiv"></div>');

	    	$("#partnerIdDiv").append($("<h3>").text(partner.id));
	    	$("#partnerNameDiv").append($("<h3>").text(partner.userName));
	    	
	    	$partnerIdDiv.appendTo('.encounterpartner');
	    	$partnerNameDiv.appendTo('.encounterpartner');
	    });
	};
});
