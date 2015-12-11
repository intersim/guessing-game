/* **** Global Variables **** */
// try to elminate these global variables in your project, these are here just to start.

var playersGuess = playersGuessSubmission();
var winningNumber = generateWinningNumber();
var guessCount = 3;

console.log("Winning number = " + winningNumber);
console.log("Player's guess = " + playersGuess);

/* **** Guessing Game Functions **** */

// Generate the Winning Number

function generateWinningNumber(){
  winningNumber = Math.floor(Math.random() * (100 - 1) + 1);
  return winningNumber;
}

// Fetch the Players Guess

function playersGuessSubmission(){
    //Set playersGuess to input value
    playersGuess = $("#playersGuess").val();
    //Convert from string to integer
    playersGuess = parseInt(playersGuess, 10);
    $("#playersGuess").val("");
    //Print to console log to check...
}

//When submit button is pressed, save input and check against winning num
$("#submit").click(playersGuessSubmission).click(checkGuess).click(lowerOrHigher);

// Check if the Player's Guess is the winning number 
var prevGuesses = [];

function checkGuess(){
//Check if guess is winner
if (playersGuess === winningNumber) {
  $(".header").empty().append("<h3>You WIN!!!</h3>");
  $(".guess").empty().append("<button>Play Again!</button>");
  $("button").click(playAgain);
}

//If guess is not winning number
else if (playersGuess !== winningNumber) {
//Check for repeats
  for (i = 0; i < prevGuesses.length; i++) {
    if (prevGuesses[i] === playersGuess) {
      $(".repeat").empty().append("<p>You've already guessed that!</p>");
      guessCount++;
    }
  }
    
  //If not a repeated guess
  if (guessCount > 0) {
    //Decrement guess count
    guessCount--;
    //Change header to "Try again"
    $(".header").empty().append("<h1>Try again!</h1>");
    //Print out how many guesses are left
    $(".header").append("<p>You have " + guessCount + " more guesses...</p>");
  }
  
    //For Game Over:
  else if (guessCount <= 0) {
    $(".header").empty().append("<h2>Game Over</h2>").append("<p>You have no more guesses...</p>");
    $(".guess").empty().append("<button>Play Again!</button>");
    $("button").click(playAgain);
  }
}
  //Log guess in previous guesses
  prevGuesses.push(playersGuess);
  console.log("Guess count = " + guessCount);
  console.log("Previous guesses = " + prevGuesses);
}


// Determine if the next guess should be a lower or higher number
function lowerOrHigher(){
  //if guess is lower than number
  if (playersGuess > winningNumber) {
    $(".feedback").empty().append("<p>Try a lower number.</p>");
    $(".repeat").empty();
  }
  //else if guess is higher than number
  else if (playersGuess < winningNumber) {
    $(".feedback").empty().append("<p>Try a higher number.</p>");
    $(".repeat").empty();
  }
}

function generateDecoyNumber1(){
  return Math.floor(Math.random() * (100 - 1) + 1);
}

function generateDecoyNumber2(){
  return Math.floor(Math.random() * (100 - 1) + 1);
}

var decoyNumber1 = generateDecoyNumber1();
var decoyNumber2 = generateDecoyNumber2();

// Create a provide hint button that provides additional clues to the "Player"
function provideHint(){
  $(".feedback").empty().append("<p>One of these numbers is the winner...</p>").append("<p>" + decoyNumber1 + ", " + winningNumber + ", " + decoyNumber2 + "</p>");
}

$("#hint").click(provideHint);

// Allow the "Player" to Play Again

function playAgain(){
  location.reload();
}


/* **** Event Listeners/Handlers ****  */