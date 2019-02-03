// require("dotenv").config();

// var spotify = new Spotify(keys.spotify);

var inquirer = require("inquirer");

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
      console.log("Concerts...");
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