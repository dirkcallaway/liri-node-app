// require("dotenv").config();

// var spotify = new Spotify(keys.spotify);

var inquirer = require("inquirer");
var axios = require("axios");

inquirer.prompt([

  {
    type: "list",
    name: "command",
    message: "What would you like me to do?",
    choices: ["Find concerts.", "What song is this?", "Find a movie.", "Do what it says."]
  }

]).then(function (liri) {


  // Split case based on response above
  switch (liri.command) {
    case "Find concerts.":
      inquirer.prompt([

        {
          type: "input",
          name: "band",
          message: "What band are you searching for?"
        }

      ]).then(function (band) {
        var artistFullName = band.band;
        var bandName = artistFullName.split(" ");
        var artist = bandName.join("%20");
        var bandQuery = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
        axios.get(bandQuery).then(
          function (response) {
            if(response.data.length > 0){
            console.log("\n" + artistFullName + " are playing the following shows:");
            for (var i = 0; i < response.data.length; i++) {
              console.log("---------------------------------");
              console.log("Venue Name: " + response.data[i].venue.name);
              console.log("Venue Location: " + response.data[0].venue.city + ", " + (response.data[0].venue.region));
              console.log("Event Date: " + response.data[0].datetime);
            }
          }else {
            console.log("\n" + artistFullName + " have no shows scheduled.");
          }
          }
        );
      });
      break;
    case "What song is this?":
      text = "Song...";
      break;
    case "Find a movie.":
      text = "Movie...";
      break;
    case "Do what it says.":
      text = "Do this...";
      break;
  }
});