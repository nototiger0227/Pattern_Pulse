alert("HOW TO PLAY ? ---- Press the Keys in order of their flashing and remember the order to Level Up");
var userClickedPattern = [];

var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;

function nextSequence() {

    userClickedPattern = [];


    $("h1").html("LEVEL-" + level);
    level++;
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut();
    $("#" + randomChosenColour).fadeIn();
    playSound(randomChosenColour);
}

function animatePress(currentColour) {
    $("." + currentColour).addClass("pressed");
    setTimeout(function() {
        $("." + currentColour).removeClass('pressed');
    }, 50);

}

function startOver() {
    level = 0;
    toggle = false;
    gamePattern = [];

}

function playSound(name) {
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();

}
var toggle = false;

$(document).keypress(function(event) {
    if (toggle == false)

        $("h1").html("LEVEL-" + level);
    nextSequence();
    toggle = true;
})

function checkAns(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();

            }, 1000);
        }
    } else {
        console.log("Wrong");
        var gameover = new Audio("./sounds/wrong.mp3");
        gameover.play();
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");

        }, 200);
        $("h1").html("Game Over, Press Any Key to Restart");
        $(document).keypress(function(event) {
            startOver();
        })


    }


}
$(".btn").on("click", function handler() {


    var userChosenColour = $(this).attr("id");
    // console.log(userChosenColour);
    playSound(userChosenColour);
    userClickedPattern.push(userChosenColour);
    animatePress(userChosenColour);
    console.log(userClickedPattern);
    checkAns(userClickedPattern.length - 1);



});