$(document).ready(function() {


var animals = [
    "dog", "cat", "rabbit", "hamster", "skunk", "goldfish",
    "bird", "ferret", "turtle", "sugar glider", "chinchilla",
    "hedgehog", "hermit crab", "gerbil", "pygmy goat", "chicken",
    "capybara", "teacup pig", "serval", "salamander", "frog"
  ];

  //this funciton makes things into button
  function populateButtons(arrayused, classAdd, area) {
    $(area).empty();

    for (var i = 0; i <arrayused.length; i++){
        var a = $("<button>");
        a.addClass(classAdd);
        a.attr("data-type", arrayused[i]);
        a.text(arrayused[i]);
        $(area).append(a);
    }
  }

  // this funciton adds a dynamic button whenever you click submit
  $("#add-animal").on("click", function(event){
      event.preventDefault();
      var newAnimal = $("input").val();
      console.log(newAnimal);
      animals.push(newAnimal);

      populateButtons(animals, "animal-button", "#animal-buttons");
 
  })

  $(document).on("click", ".animal-button", function(){

        $("#animals").empty();

      var value = $(this).attr("data-type");
      var querURL = "http://api.giphy.com/v1/gifs/search?q=" + value + "&api_key=dc6zaTOxFJmzC&limit=10";

      $.ajax({
          url: querURL,
          method: "GET"
      }). then (function(response){
          var results = response.data;
          console.log(results);

          for (var i = 0; i < results.length; i++){
            var animalDiv = $("<div>");
            var rated = animalDiv.html("<p> Rating: " + results[i].rating + "</p>");

            var gif = results[i].images.fixed_height.url;
            var still = results[i].images.fixed_height_still.url;

            var animalImage = $("<img>").attr("src", still);
            animalImage.attr("data-still", still);
            animalImage.attr("data-animate", gif);
            animalImage.attr("data-state", "still");
            animalImage.addClass("animal-image");
            

            animalDiv.append(rated).append(animalImage);

            // append to animals sectiom
            $("#animals").append(animalDiv);
          }
      })
  });

//dynamic images thats why it is set up this way
  $("#animals").on("click", ".animal-image", function(){
      var type = $(this).attr("data-state");
      
      if( type == "still"){
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
      }
      else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
      }
  })

  populateButtons(animals, "animal-button", "#animal-buttons")

});