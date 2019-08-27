
var axios = require("axios");
var moment = require("moment");
// Store all of the arguments in an array
var nodeArgs = process.argv;
var userInput = "";
// Create an empty variable for holding the movie name
var movieName = "";
// Create an empty variable for holding the band name
var bandName = "";
// Create an empty variable for holding the song name
var songName = "";

// Loop through all the words in the node argument
// And do a little for-loop magic to handle the inclusion of "+"s
for (var i = 3; i < nodeArgs.length; i++) {

  if (i > 3 && i < nodeArgs.length) {
    userInput = userInput + "+" + nodeArgs[i];
  } else {
    userInput += nodeArgs[i];
  }
}

    // OMDB CODE ---------------------------------------------------------------------------***

if (nodeArgs[2] === "movie"){
// Assign input to movieName variable
movieName = userInput;
// Then run a request with axios to the OMDB API with the movie specified
var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
// This line is just to help us debug against the actual URL.
console.log(queryUrl);

axios.get(queryUrl).then(
  function(response) {
    console.log("Title: " + response.data.Title);
    console.log("Release Year: " + response.data.Year);
    console.log("IMDB Rating: " + response.data.imdbRating);
    console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
    console.log("Country: " + response.data.Country);
    console.log("Language: " + response.data.Language);
    console.log("Plot: " + response.data.Plot);
    console.log("Actors/Actresses: " + response.data.Actors);
  })
  .catch(function(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log("---------------Data---------------");
      console.log(error.response.data);
      console.log("---------------Status---------------");
      console.log(error.response.status);
      console.log("---------------Status---------------");
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an object that comes back with details pertaining to the error that occurred.
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
    console.log(error.config);
  });

    // SPOTIFY CODE ---------------------------------------------------------------------------***
} else if (nodeArgs[2] === "song"){

    //Checking to make sure that the spotify "if" is working.
    console.log('spotify');
    songName = userInput;
    // //if hiding keys using dotenv use:---------------------------***
    // require("dotenv").config();
    // var keys = require("./keys.js");

    var Spotify = require('node-spotify-api');

    // // //if using my keys js file use:
    // var spotify = new Spotify(keys.spotify);
    // Non-Secret Key Storage ---------------------------------------***
    var spotify = new Spotify({
    id: "2e68a0802eba4dd9a2c18510242adca6",
    secret: "afeea05adc444a3e9e95eeff0580c608"
    });

    spotify.search({ type: 'track', query: songName }, function(err, data) {
    if (err) {
        return console.log('Error occurred: ' + err);
    }
    console.log("ARTIST NAME: " + data.tracks.items[0].artists[0].name); 
    console.log("SONG NAME: " + data.tracks.items[0].name);
    console.log("URL TO PREVIEW SONG: " + data.tracks.items[0].preview_url);
    console.log("ALBUM NAME: " + data.tracks.items[0].album.name);
    });
}

    // BiT CODE ---------------------------------------------------------------------------***

    else if (nodeArgs[2] === "band"){
        // Assign input to movieName variable
        bandName = userInput;
        // Then run a request with axios to the OMDB API with the movie specified
        var queryUrl = "https://rest.bandsintown.com/artists/" + bandName + "/events?app_id=codingbootcamp";
        
        // This line is just to help us debug against the actual URL.
        console.log(queryUrl);
        
        axios.get(queryUrl).then(
          function(response) {
            console.log("ARTIST NAME: " + response.data[0].lineup);
            console.log("VENUE NAME: " + response.data[0].venue.name);
            console.log("CITY/STATE: " + response.data[0].venue.city + ", " + response.data[0].venue.region);
            console.log("DATE/TIME OF SHOW: " + moment(response.data[0].datetime, "YYYY-MM-DDTHH:mm").format("MM/DD/YYYY"));
            // console.log("VENUE NAME: " + response.data[0].venue[0].name);
          })
          .catch(function(error) {
            if (error.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              console.log("---------------Data---------------");
              console.log(error.response.data);
              console.log("---------------Status---------------");
              console.log(error.response.status);
              console.log("---------------Status---------------");
              console.log(error.response.headers);
            } else if (error.request) {
              // The request was made but no response was received
              // `error.request` is an object that comes back with details pertaining to the error that occurred.
              console.log(error.request);
            } else {
              // Something happened in setting up the request that triggered an Error
              console.log("Error", error.message);
            }
            console.log(error.config);
          });
    
        } else {
            console.log("please enter a first value of song, band, or movie")
    }
    // if (nodeArgs[2] === "band"){
    //     // Then run a request with axios to the OMDB API with the movie specified
    //     var BandsInTownEvents = require('bandsintown-events');
    //     var Events = new BandsInTownEvents();
 
    //     //set options for instance
    //     //app_id and artists are required
    //     Events.setParams({
    //       "app_id":"myappname", //can be anything
    //       "artists":[ //accepts string for single artist or an array of artist names
    //         "Wilco",
    //         "Yeah Yeah Yeahs"
    //       ]
    //     });
         
    //     //get your events with success and error callbacks
    //     Events.getEvents(function(events){
    //       for(var i = 0; i < events.length; i++){
    //         console.log( events[i].venue.city + ", " + events[i].venue.region );
    //       }
    //     });
// IMPORTANT INFO!!!!!!!!!!!!!!!!!!!!!!!!!!!!!-------------------------------------
// // SPOTIFY_ID=2e68a0802eba4dd9a2c18510242adca6
// // SPOTIFY_SECRET=afeea05adc444a3e9e95eeff0580c608

// // OMDB: http://www.omdbapi.com/?i=tt3896198&apikey=6ce8e360;

// RELATED WORK -----------------------------------------------------------------
// var nodeGeocoder = require('node-geocoder');

// var options = {
//     provider: 'mapquest',
//     apiKey: 'AA69G0GEQvViZOedpwYXzzMXmXXYjIFc'
// };

// var geocoder = nodeGeocoder(options);

// // var city = process.argv[2];
// // var state = process.argv[3];

// var address = process.argv.slice(2).join(' ');

// console.log(address);

// geocoder.geocode(address, function(err, data) {
//     console.log(JSON.stringify(data, null, 2));
// });

