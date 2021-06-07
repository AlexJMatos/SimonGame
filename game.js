// Create the arrays for the colors
var buttonColors = ["red", "blue", "green", "yellow"];

// Create an array for saving the patterns of the game
var gamePattern = [];

// Create an for saving the user click pattern
var userClickedPattern = [];

// Create a variable to check wheter the game has started
var started = false;

// Create a variable for the levels 
var level = 0;

// Detect for keypress in the whole document to start the game
$(document).keypress(function (event) {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

// Detect if a click is done in the buttons
$(".btn").click(function () {
    var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
});


// Create a function to generate numbers between 0 and 3
function nextSequence() {
    // reset the userClickedPattern to an empty array ready for the next level
    userClickedPattern = [];

    // Increase the level
    level++;

    // Changing the title level 
    $("#level-title").text("Level " + level);

    // Create a random number between 0 and 3
    var randomNumber = Math.floor(Math.random() * 4);

    // Select a random color from the colors array using the nextSequence function
    var randomChosenColor = buttonColors[randomNumber];

    // Adding the random color gotten to the game pattern
    gamePattern.push(randomChosenColor);

    // Selecting the color chosen using the jQuery and making it flash
    $("#" + randomChosenColor)
        .fadeOut(250)
        .fadeIn(250);


    // Play the sound
    playSound(randomChosenColor);
}

function startOver(){
    // Reset game values
    level = 0;
    gamePattern = [];
    started = false;
}

// Create a function for playing sound
function playSound(name) {
    new Audio("sounds/" + name + ".mp3").play();
}

// Create a function to animate the pressed button
function animatePress(currentColor) {
    $("#" + currentColor).toggleClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).toggleClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] == userClickedPattern[currentLevel]) {
        console.log("success");

        // Check if the player has finished the sequence
        if (userClickedPattern.length == gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }
    else {
        console.log("wrong");

        // Play the wrong sound 
        playSound("wrong");

        // Change the body css class to a red color
        $("body").toggleClass("game-over");
        setTimeout(function () {
            $("body").toggleClass("game-over");
        }, 200);

        // Change the h1 title
        $("h1").text("Game Over, Press Any Key to Restart");

        // Call the function start over
        startOver();
    }
}

