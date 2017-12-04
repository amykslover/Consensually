$(document).ready(function(){


	var encounterContainer = $(".encounter-container");

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

	      console.log(data)
	      if (data.length < 1) {
	      	displayEmpty(author);
	      }
	      else {
        initializeRows();
      }
	      
	      for (var i = 0; i < data.length; i++) {
	      	console.log(data[i])
	      }

	      // if(encounters.length = 0) {
	      // 	console.log('No Data')
	      // }
	      // else {
	      // 	console.log(encounters);
	      // }
	      
	    });
	};

// function initializeRows() {
//     blogContainer.empty();
//     var postsToAdd = [];
//     for (var i = 0; i < data.length; i++) {
//       encountersToAdd.push(createNewRow(posts[i]));
//     }
//     blogContainer.append(postsToAdd);
//   }

//   // This function constructs a post's HTML
//   function createNewRow(post) {
//     console.log("creating new row")
//     console.log(post)
//     var formattedDate = new Date(post.createdAt);
//     formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
//     var newPostPanel = $("<div>");
//     newPostPanel.addClass("panel panel-default");
//     var newPostPanelHeading = $("<div>");
//     newPostPanelHeading.addClass("panel-heading");
//     var deleteBtn = $("<button>");
//     deleteBtn.text("x");
//     deleteBtn.addClass("delete btn btn-danger");
//     var editBtn = $("<button>");
//     editBtn.text("EDIT");
//     editBtn.addClass("edit btn btn-info");
//     var contributeBtn = $("<button>").text("Contribute").addClass("contribute btn btn-success");
//     var newPostTitle = $("<h2>");
//     var newPostDate = $("<small>");
//     var newPostAuthor = $("<h5>");
//     newPostAuthor.text(
//       "Original Poster: " 
//     + post.Authors[0].name
//     +";\n Contributers: " 
//     + post.Authors.slice(1).map(v => (v.name)).join(", ") 
//     );
//     newPostAuthor.css({
//       float: "right",
//       color: "blue",
//       "margin-top":
//       "-10px"
//     });
//     var newPostPanelBody = $("<div>");
//     newPostPanelBody.addClass("panel-body");
//     var newPostBody = $("<p>");
//     newPostTitle.text(post.title + " ");
//     newPostBody.text(post.body);
//     newPostDate.text(formattedDate);
//     newPostTitle.append(newPostDate);
//     newPostPanelHeading.append(deleteBtn);
//     newPostPanelHeading.append(editBtn);
//     newPostPanelHeading.append(contributeBtn);
//     newPostPanelHeading.append(newPostTitle);
//     newPostPanelHeading.append(newPostAuthor);
//     newPostPanelBody.append(newPostBody);
//     newPostPanel.append(newPostPanelHeading);
//     newPostPanel.append(newPostPanelBody);
//     newPostPanel.data("post", post);
//     return newPostPanel;
//   }




})