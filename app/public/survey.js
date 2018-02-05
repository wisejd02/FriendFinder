    // Chosen CSS
    objSurvey={
        questions=[
        `Your mind is always buzzing with unexplored ideas and plans.`,
        `Generally speaking, you rely more on your experience than your imagination.`,
        `You find it easy to stay relaxed and focused even when there is some pressure.`,
        `You rarely do something just out of sheer curiosity.`,
        `People can rarely upset you.`,
        `It is often difficult for you to relate to other people’s feelings.`,
        `In a discussion, truth should be more important than people’s sensitivities.`,
        `You rarely get carried away by fantasies and ideas.`,
        `You think that everyone’s views should be respected regardless of whether they are supported by facts or not.`,
        `You feel more energetic after spending time with a group of people.`
    ],
        answers=[]
    }
    var config = {
        '.chosen-select'           : {},
        '.chosen-select-deselect'  : {allow_single_deselect:true},
        '.chosen-select-no-single' : {disable_search_threshold:10},
        '.chosen-select-no-results': {no_results_text:'Oops, nothing found!'},
        '.chosen-select-width'     : {width:"95%"}
      }
      for (var selector in config) {
        $(selector).chosen(config[selector]);
      }
      for(var i=0; i<objSurvey.questions.length; i++)
      $("#divQuestions").append(
        `<h3><strong>Question ${i}</strong></h3>
		<h4>${objSurvey.question[i]}</h4>
	 	<select data-placeholder="" class="chosen-select" id="q1">
	 		<option value=""></option>
            <option value="1">1 (Strongly Disagree)</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5 (Strongly Agree)</option>
      	</select>`
      )
  
      // Capture the form inputs 
      $("#submit").on("click", function(){
        alert('Hello');
          // Form validation
          function validateForm() {
            var isValid = true;
            $('.form-control').each(function() {
              if ( $(this).val() === '' )
                  isValid = false;
            });
  
            $('.chosen-select').each(function() {
  
                if( $(this).val() === "")
                    isValid = false
            })
            return isValid;
          }
  
          // If all required fields are filled
          if (validateForm() == true)
          {
              // Create an object for the user's data
              var userData = {
                  name: $("#name").val(),
                  photo: $("#photo").val(),
                  scores: [$("#q1").val(), $("#q2").val(), $("#q3").val(), $("#q4").val(), $("#q5").val(), $("#q6").val(), $("#q7").val(), $("#q8").val(), $("#q9").val(), $("#q10").val(), ]
              }
  
  
              // Grab the URL of the website
              var currentURL = window.location.origin;
  
              // AJAX post the data to the friends API. 
              $.post(currentURL + "/api/friends", userData, function(data){
  
                  // Grab the result from the AJAX post so that the best match's name and photo are displayed.
                  $("#matchName").text(data.name);
                  $('#matchImg').attr("src", data.photo);
  
                  // Show the modal with the best match 
                  $("#resultsModal").modal('toggle');
  
              });
          }
          else
          {
              alert("Please fill out all fields before submitting!");
          }
          
          return false;
      });