$(document).ready(function() {
  // Getting references to the name inout and author container, as well as the table body
  var nameInput = $("#user-name");
  var tokenInput = $("#user-token");
  var emailInput = $("#user-email");

  console.log(nameInput);
  console.log(tokenInput);
  console.log(emailInput);
  

  // Adding event listeners to the form to create a new object, and the button to delete
  // an Author
  $(document).on("submit", "#user-form", handleUserFormSubmit);


  // A function to handle what happens when the form is submitted to create a new Author
  function handleUserFormSubmit(event) {
    event.preventDefault();
    // Don't do anything if the name fields hasn't been filled out
    if (!nameInput.val().trim().trim()) {
      return;
    }
    // Calling the upsertAuthor function and passing in the value of the name input
    upsertUser({
      name: nameInput
        .val()
        .trim()
    });
  }

  // A function for creating an author. Calls getAuthors upon completion
  function upsertUser(userData) {
    $.post("/api/users", userData)
      .then(getUsers);
  }

});
