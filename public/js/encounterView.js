$(document).ready(function(){

	var encounterContainer = $(".encountercontainer");

	function initializeRows() {
		encounterContainer.empty();
	    var encountersToAdd = [];
	    
	    for (var i = 0; i < encounters.length; i++) {
	    	encountersToAdd.push(createNewRow(encounters[i]));
	    }
	    encounterContainer.append(encountersToAdd);
	}



	getEncounters()

	function getEncounters() {
		$.ajax({
	      method: "GET",
	      url: '/api/encounters'
	    })
	    .done(function(data) {

	      if (data.length < 1) {

	      }
	      else {
		
		  var tableWhole = $('<table class="table table-striped" id="encounter-table"><tbody></tbody></table>')
		  var tableHeaderRow = $('<tr id="table-header-row">')
			
		  var tableHeader0 = $('<th>').text('ID');
		  var tableHeader1 = $('<th>').text('Participant(s)');
		  var tableHeader2 = $('<th>').text('Status');
		  var tableHeader3 = $('<th>').text('Created');

		  //Fill out the header row with the relevant headers, then append the header to the table
		  tableHeaderRow.append(tableHeader0);
		  tableHeaderRow.append(tableHeader1);
		  tableHeaderRow.append(tableHeader2);
		  tableHeaderRow.append(tableHeader3);

		  
		  $('#encountercontainer').append(tableWhole)
		  $('#encounter-table').append(tableHeaderRow);

	      for (var i = 0; i < data.length; i++) {
	      	console.log(data[i]);
	      	var userArray = [];

	      	for (var j = 0; j < data[i].Users.length; j++) {
	      		userArray.push(data[i].Users[j].userName);

	      		// console.log(data[i].Users[j].userName);
	      	}
	      	console.log(userArray)

	      	var tableRow = $('<tr class="encounter-row">');
	      	var tableData0 = $('<td class="encounter-id">').text(data[i].id)

	     	var tableData1 = $('<td class="encounter-partners">').text(userArray)
	     	var tableData2 = $('<td class="encounter-status">').text(data[i].encounterStatus)
	     	var tableData3 = $('<td class="encounter-date">').text(data[i].createdAt.substring(0,10))


	     	tableRow.append(tableData0);
	     	tableRow.append(tableData1);
	     	tableRow.append(tableData2);
	     	tableRow.append(tableData3);

          $('#encounter-table').append(tableRow);
	      }

      }
	      
	      
	    });
	};
})