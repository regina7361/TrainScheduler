// 1. Initialize Firebase
var config = {
    apiKey: "AIzaSyDrmCLiaQA6AdafE7Dox2FfDsErxDUoWMk",
    authDomain: "classmodule71.firebaseapp.com",
    databaseURL: "https://classmodule71.firebaseio.com",
    projectId: "classmodule71",
    storageBucket: "classmodule71.appspot.com",
    messagingSenderId: "71098067973"
  };
  
  firebase.initializeApp(config);
  
  var database = firebase.database();
  
  // 2. Button for adding trains
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var trainFrequency = $("#frequency-input").val().trim();
    var trainTime = moment($("#time-input").val().trim(), "HH:mm").format("HH:mm"); 
  
    // Creates local "temporary" object for holding train data
    var newTrain = {
      name: trainName,
      destination: trainDestination,
      frequency: trainFrequency,
      time: trainTime,
    };
  
    // Uploads train data to the database
    database.ref().push(newTrain);

  
    alert("Train successfully added");
  
    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#frequency-input").val("");
    $("#time-input").val("");
  });
  
  // 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot) {
       
    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var trainFrequency = childSnapshot.val().frequency;
    var trainTime = childSnapshot.val().time;



   //First time with one year subtracted to make sure it comes before the current time.
   var trainTimeConverted = moment(trainTime, "hh:mm A").subtract(1, "years");

   //Current time
   var currentTime = moment();
   console.log("CURRENT TIME:" + currentTime);

   //Difference between times
   var diffTime = moment().diff(moment(trainTimeConverted), "minutes");

   //Time apart (remainder)
   var tRemainder = diffTime % trainFrequency;

   // Mins until train arrives
   var minutesAway = trainFrequency - tRemainder;

   // Next train arrival time
   var nextArrival = moment().add(minutesAway, "minutes").format("hh:mm A");

  
    // Create the new row
    var newRow = $("<tr scope='row'>").append(
      $("<td>").text(trainName),
      $("<td>").text(trainDestination),
      $("<td>").text(trainFrequency),
      $("<td>").text(nextArrival),
      $("<td>").text(minutesAway)
    );
  
    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
  });


  
//NOTE: Example Time Math - THIS IS SOME OF THE WORK I WAS TRYING TO USE TO 
// FIGURE OUT THE MATH
// -----------------------------------------------------------------------------

//     'use strict'
// console.clear()

// const durations = [
// 	'0:30:50',
// 	'3:40:20'	
// ]

// const totalDurations = durations.slice(1)
// 	.reduce((prev, cur) => moment.duration(cur).subtract(prev),
// 		moment.duration(durations[0]))

// console.log(`Total time is: ${moment.utc(totalDurations.asMilliseconds()).format("HH:mm:ss")}`)

//Add the first train to the frequency to get the next train time then if next time is less than current time, add frequency again, 
//continue adding until next train time is greater than current time
//example - if first train leaves 5:15 am and frequency is set to 60 minutes, current time is 7am - 
//calculate 5:15 + 60 mins = 6:15am this is less than current time
//add frequency to 6:15 am + 60 = 7:15am this is more than current time so we know the next train is at 7:15am 
//Now get how many minutes away the train is
//take next train time minus current train time
//7:15 - 7:00 = 15 minutes away

//while the first train and frequency is less than current time, continue to add frequency
//compares times 


