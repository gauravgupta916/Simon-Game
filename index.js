var gamePattern = [];
var userClickedPattern = [];
var colors = ["red","green","yellow","blue"];
var gameOn = false;
var level = 0;
var clickCount = 0, userPtr = -1;

$(document).keypress(function(event){
  if(!gameOn){
    newSequence();
    changeTitle();
  }
  gameOn = true;
});


$(".btn").on("click",clickHandler);

function changeTitle() {
  $("h1").text("Level "+ level);
}

function newSequence() {
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColor = colors[randomNumber];
  gamePattern.push(randomChosenColor);
  animation(randomChosenColor);
  level++;
  changeTitle();
  //console.log(gamePattern);
}

function animation(idOfButtonClicked) {
  $("#"+idOfButtonClicked).fadeOut(100).fadeIn(100);
  var audio = new Audio("sounds/"+idOfButtonClicked+".mp3");
  audio.play();
}

function clickHandler() {
  if(!gameOn) {
    abortGame();
    return -1;
  }
  var idOfButtonClicked = (this.id);
  userClickedPattern.push(idOfButtonClicked);
  //console.log(userClickedPattern);
  animatePress(idOfButtonClicked);
  userPtr++;
  if(validateClick()) {
    clickCount++;
    if(clickCount === gamePattern.length) {
      clickCount = 0;
      setTimeout(function() {
        newSequence();
      }, 500);
      userPtr = -1;
      userClickedPattern = [];
    }
  }
  // animation(idOfButtonClicked);
}


function animatePress(currentColor) {
  $("#"+currentColor).addClass("pressed");
  var audio = new Audio("sounds/"+currentColor+".mp3");
  audio.play();
  setTimeout(function() {
    $("#"+currentColor).removeClass("pressed");
  }, 100);
}

function abortGame() {
  $("h1").text("Game Over, Press Any Key to Restart");
  var audio = new Audio("sounds/wrong.mp3");
  audio.play();
  $("body").addClass("red");
  setTimeout(function() {
    $("body").removeClass("red");
  }, 150);
  gameOn = false;
  gamePattern = [];
  userClickedPattern = [];
  userPtr = -1;
  clickCount = 0;
  level = 0;
  // console.log("After abort");
  // console.log(gamePattern);
  // console.log(userClickedPattern);
}

function validateClick() {
  if(gamePattern[userPtr] != userClickedPattern[userPtr]) {
    abortGame();
    return false;
  }
  return true;
}


// setTimeout(function() {
//   newSequence();
// }, 3000);


