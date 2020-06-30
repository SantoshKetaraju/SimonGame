var gamePattern = [];
var userButtonPressPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;
var starting = false;

$(document).keypress(function()
{
  if (!starting) {
    $("#level-title").text("Level " + level);
    nextSequence();
    starting = true;
  }
});

$(".btn").click(function() {
  var buttonClickedByUser = $(this).attr("id");
  playSound(buttonClickedByUser);
  userButtonPressPattern.push(buttonClickedByUser);
  animateButtonPress(buttonClickedByUser);
  checkAnswer(userButtonPressPattern.length - 1);
});

function nextSequence() {
  userButtonPressPattern = [];
  level++;
  $("h1").text("Level " + level);
  var buttonColor = Math.floor(Math.random() * 4)
  var randomChosenButtonColor = buttonColours[buttonColor];
  gamePattern.push(randomChosenButtonColor);
  $("#" + randomChosenButtonColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenButtonColor);
}

function playSound(buttonColour) {
  var audio = new Audio("sounds/" + buttonColour + ".mp3");
  audio.play();
}

function animateButtonPress(buttonColour) {
  $("#" + buttonColour).addClass("pressed");
  setTimeout(function() {
    $("#" + buttonColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (userButtonPressPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userButtonPressPattern.length === gamePattern.length) {
      console.log("Correct!");
      setTimeout(function() {
        nextSequence();
      }, 2000);
    }
  } else {
    console.log("Wrong!");
    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver()
{
  level = 0;
  gamePattern = [];
  starting = false;
}
