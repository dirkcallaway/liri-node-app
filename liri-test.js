var dotenv = require("dotenv").config();
var Spotify = require("node-spotify-api");
var keys = require("./keys")
var spotify = new Spotify(keys.spotify);

var inquirer = require("inquirer");
var axios = require("axios");
var fs = require("fs");

var findMovie = function(){
  inquirer.prompt([

    {
      type: "input",
      name: "movie",
      message: "What movie are you searching for?"
    }

  ]).then(function (movie) {
    if (movie.movie == "") {
      var movieTitle = "Mr.+Nobody";
    } else {
      movieFullName = movie.movie;
      var movieName = movieFullName.split(" ");
      var movieTitle = movieName.join("+");
    }

    var movieQuery = "http://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=short&apikey=trilogy";
    axios.get(movieQuery).then(
      function (response) {

        console.log("---------------------------------");
        console.log("\n" + response.data.Title);
        console.log("Released in: " + response.data.Year);
        console.log("IMDB Rating: " + response.data.Ratings[0].Value);
        console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
        console.log("Produced in: " + response.data.Country);
        console.log("Plot Summary: " + response.data.Plot);
        console.log("Actors: " + response.data.Actors);

      }

    );

  });
};


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
            if (response.data.length > 0) {
              console.log("\n" + artistFullName + " are playing the following shows:");
              for (var i = 0; i < response.data.length; i++) {
                console.log("---------------------------------");
                console.log("Venue Name: " + response.data[i].venue.name);
                console.log("Venue Location: " + response.data[0].venue.city + ", " + (response.data[0].venue.region));
                console.log("Event Date: " + response.data[0].datetime);
              }
            } else {
              console.log("\n" + artistFullName + " have no shows scheduled.");
            }
          }

        );
      });
      break;
    case "What song is this?":
      inquirer.prompt([

        {
          type: "input",
          name: "song",
          message: "What song are you listening to?"
        }

      ]).then(function (song) {

      if (song.song == "") {
        var songName = "The Sign ace of base";
      } else {
        songName = song.song;
      }

      spotify.search({ type: 'track', query: songName, limit: 1 }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
        
      console.log("\nArtist: " + data.tracks.items[0].artists[0].name);
      console.log("Track: " + data.tracks.items[0].name);
      console.log("Preview: " + data.tracks.items[0].preview_url);
      console.log("Album: " + data.tracks.items[0].album.name);
      });
        
      });
      break;
      //Movie Search
    case "Find a movie.":
      findMovie();
      break;

    case "Do what it says.":
    fs.readFile("random.txt", "utf8", function(error, data) {

      // If the code experiences any errors it will log the error to the console.
      if (error) {
        return console.log(error);
      }

      console.log(data.split(","));
    
    });
      break;
  }
});