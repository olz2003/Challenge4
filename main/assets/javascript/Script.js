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

//this lovely mess (CLEANUP)
var checkHighscores = document.getElementById("highscores");
var checkStart = document.getElementById("start");
var timeEl = document.getElementById("timer");
var startContainer = document.querySelector(".start-container");
var questionContainer = document.querySelector(".question-container");
var highscoresContainer = document.querySelector(".highscores-container");
var backButton = document.getElementById("back-to-quiz");
var quizContainer = document.querySelector(".quiz-container");
var endContainer = document.querySelector(".end-container");
var submitButton = document.getElementById("submit");

var secondsLeft = 75; //initial time to start with
var timerInterval;

const questionsArray = [
  {
    question: "Commonly used data types DO NOT include:",
    answers: ["strings", "booleans", "alerts", "numbers"],
    correctAnswer: "alerts"
  },
  {
    question: "The condition in an if/else statement is enclosed within ____.",
    answers: ["quotes", "curly brackets", "parentheses", "square brackets"],
    correctAnswer: "parentheses"
  },
  {
    question: "Arrays in JavaScript can be used to store ____.",
    answers: ["numbers and strings", "other arrays", "booleans", "all of the above"],
    correctAnswer: "all of the above"
  },
  {
    question: "String values must be enclosed within ____ when being assigned to variables.",
    answers: ["commas", "curly brackets", "quotes", "parentheses"],
    correctAnswer: "quotes"
  },
  {
    question: "A very useful tool used during development and debugging for printing content to the debugger is:",
    answers: ["JavaScript", "terminal/bash", "for loops", "console.log"],
    correctAnswer: "console.log"
  }
];

var currentQuestionIndex = 0;

function startQuiz(){
  checkStart.addEventListener("click", function (){
    secondsLeft = 75;
    timeEl.textContent = "Time: " + secondsLeft;
    startContainer.style.display = "none";
    questionContainer.style.display = "block";
    startTimer();
    askQuestion();
  });

  function startTimer(){
    timerInterval = setInterval(function (){
      secondsLeft--;
      timeEl.textContent = "Time: " + secondsLeft;
      if(secondsLeft <= 0){
        clearInterval(timerInterval);
        gameOver();
      }
    }, 1000);
  }

  function askQuestion(){
    if (currentQuestionIndex < questionsArray.length){
      var currentQuestion = questionsArray[currentQuestionIndex];
      var questionElement = document.getElementById("question");
      var answerA = document.getElementById("answerA");
      var answerB = document.getElementById("answerB");
      var answerC = document.getElementById("answerC");
      var answerD = document.getElementById("answerD");
  
      questionElement.textContent = currentQuestion.question;
      answerA.textContent = "1. " + currentQuestion.answers[0];
      answerB.textContent = "2. " + currentQuestion.answers[1];
      answerC.textContent = "3. " + currentQuestion.answers[2];
      answerD.textContent = "4. " + currentQuestion.answers[3];
  
      answerA.addEventListener("click", function(){
        checkAnswer(currentQuestion.answers[0], currentQuestion.correctAnswer);
      });
      answerB.addEventListener("click", function(){
        checkAnswer(currentQuestion.answers[1], currentQuestion.correctAnswer);
      });
      answerC.addEventListener("click", function(){
        checkAnswer(currentQuestion.answers[2], currentQuestion.correctAnswer);
      });
      answerD.addEventListener("click", function(){
        checkAnswer(currentQuestion.answers[3], currentQuestion.correctAnswer);
      });
    } else {
      gameOver();
    }
  }

  function checkAnswer(selectedAnswer, correctAnswer){
    if (selectedAnswer !== correctAnswer) {
      secondsLeft -= 10;
    }
  
    if (currentQuestionIndex < questionsArray.length - 1){
      currentQuestionIndex++;
      askQuestion();
    } else {
      currentQuestionIndex = 0;
      gameOver();
    }
  }
  
  function gameOver(){
    clearInterval(timerInterval);
    questionContainer.style.display = "none";
    endContainer.style.display = "block";
    var finalScoreElement = document.querySelector("#final-score");
    finalScoreElement.textContent = "Your final score is: " + secondsLeft;
  }

  checkHighscores.addEventListener("click", function(){
    clearInterval(timerInterval);
    quizContainer.style.display = "none";
    endContainer.style.display = "none";
    highscoresContainer.style.display = "block";
  });
  
  function saveLastScore(){
    var studentGrade = {
      student: student.value,
      grade: grade.value,
      comment: comment.value.trim(),
    };
    localStorage.setItem('studentGrade', JSON.stringify(studentGrade));
  }
  
  function renderLastScore(){
    var lastGrade = JSON.parse(localStorage.getItem('studentGrade'));
    if (lastGrade !== null){
      document.getElementById('saved-name').innerHTML = lastGrade.student;
      document.getElementById('saved-grade').innerHTML = lastGrade.grade;
      document.getElementById('saved-comment').innerHTML = lastGrade.comment;
    }
  }
  
  saveButton.addEventListener('click', function (event){
    event.preventDefault();
    saveLastScore();
    renderLastScore();
  });

  backButton.addEventListener("click", function (){
    timeEl.textContent = "Time: 0";
    highscoresContainer.style.display = "none";
    questionContainer.style.display = "none";
    endContainer.style.display = "none";
    startContainer.style.display = "block";
    quizContainer.style.display = "block";
    currentQuestionIndex = 0;
  });
}

startQuiz();
