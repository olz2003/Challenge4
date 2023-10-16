/*
GIVEN I am taking a code quiz
WHEN I click the start button
THEN a timer starts and I am presented with a question
WHEN I answer a question
THEN I am presented with another question
WHEN I answer a question incorrectly
THEN time is subtracted from the clock
WHEN all questions are answered or the timer reaches 0
THEN the game is over
WHEN the game is over
THEN I can save my initials and my score
*/


// TIMER JUST PAUSES WHEN VIEWING SCORES
// ( ?? SHOULD PAUSE OR RESET ?? )

//this lovely mess (CLEANUP)
var checkHighscores = document.getElementById("highscores");
var checkStart = document.getElementById("start");
var timeEl = document.getElementById("timer");
var startContainer = document.querySelector(".start-container");
var questionContainer = document.querySelector(".question-container");
var highScoresContainer = document.querySelector(".highscores-container");
var backToQuizButton = document.getElementById("back-to-quiz");
var quizContainer = document.querySelector(".quiz-container");

var secondsLeft = 75; //initial time to start with
var timerInterval;

//function to start the quiz
function startQuiz(){
  checkStart.addEventListener("click", function(){
    timeEl.textContent = "Time: " + secondsLeft; //BUG FIX - timer visuals #1
    startContainer.style.display = "none";
    questionContainer.style.display = "block";
    startTimer(); //starts timer
  });

  //function for timer, determines score and game over
  function startTimer(){
    timerInterval = setInterval(function(){
      secondsLeft--;
      timeEl.textContent = "Time: " + secondsLeft;

      if(secondsLeft <= 0){ //ends game when time reaches zero
        clearInterval(timerInterval);
        gameOver();
      }
    }, 1000);
  }

  //display the scores screen
  checkHighscores.addEventListener("click", function(){
    clearInterval(timerInterval); //BUG FIX - stops timer
    quizContainer.style.display = "none";
    highScoresContainer.style.display = "block";
  });

  //display the starting screen
  backToQuizButton.addEventListener("click", function(){
    timeEl.textContent = "Time: 0"; //BUG FIX - timer visuals #2
    highScoresContainer.style.display = "none";
    questionContainer.style.display = "none";
    startContainer.style.display = "block";
    quizContainer.style.display = "block";
  });

  //funtion for updating to each question
  function askQuestion(){}

  //function to check for correct answers (ADD THE TIME DEDUCTION FOR WRONG ANSWERS)
  function checkAnswer(){}

  function gameOver(){
    quizContainer.style.display = "none";
    highScoresContainer.style.display = "block";
  }
}

startQuiz();
