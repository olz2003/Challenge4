var submitButton = document.getElementById("submit-initials");
var checkHighscores = document.getElementById("highscores");
var initials = document.getElementById("player-initials");
var backButton = document.getElementById("back-to-quiz");
var startButton = document.getElementById("start");
var timeEl = document.getElementById("timer");

var endContainer = document.querySelector(".end-container");
var quizContainer = document.querySelector(".quiz-container");
var startContainer = document.querySelector(".start-container");
var questionContainer = document.querySelector(".question-container");
var highscoresContainer = document.querySelector(".highscores-container");

var secondsLeft = 75;
var finalScore;
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

var playerHighscores = [];

var currentQuestionIndex = 0;

function startQuiz() {
  function startTimer() {
    timerInterval = setInterval(function () {
      secondsLeft--;
      timeEl.textContent = "Time: " + secondsLeft;
      if (secondsLeft <= 0) {
        clearInterval(timerInterval);
        gameOver();
      }
    }, 1000);
  }

  function askQuestion() {
    if (currentQuestionIndex < questionsArray.length) {
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

      answerA.addEventListener("click", function () {
        checkAnswer(currentQuestion.answers[0], currentQuestion.correctAnswer);
      });
      answerB.addEventListener("click", function () {
        checkAnswer(currentQuestion.answers[1], currentQuestion.correctAnswer);
      });
      answerC.addEventListener("click", function () {
        checkAnswer(currentQuestion.answers[2], currentQuestion.correctAnswer);
      });
      answerD.addEventListener("click", function () {
        checkAnswer(currentQuestion.answers[3], currentQuestion.correctAnswer);
      });
    } else {
      gameOver();
    }
  }

  function checkAnswer(selectedAnswer, correctAnswer) {
    if (selectedAnswer !== correctAnswer) {
      secondsLeft -= 10;
    }

    if (currentQuestionIndex < questionsArray.length - 1) {
      currentQuestionIndex++;
      askQuestion();
    } else {
      gameOver();
    }
  }

  function gameOver() {
    finalScore = secondsLeft;
    clearInterval(timerInterval);
    questionContainer.style.display = "none";
    endContainer.style.display = "block";
    var finalScoreElement = document.querySelector("#final-score");
    finalScoreElement.textContent = "Your final score is: " + finalScore;
  }

  checkHighscores.addEventListener("click", function () {
    clearInterval(timerInterval);
    quizContainer.style.display = "none";
    endContainer.style.display = "none";
    highscoresContainer.style.display = "block";
  });

  function saveLastScore() {
    var playerScore = {
      initials: initials.value,
      score: finalScore,
    };
    playerHighscores.push(playerScore);
    localStorage.setItem("playerHighscores", JSON.stringify(playerHighscores));
  }

  function renderHighscores() {
    var highscoresList = document.getElementById("highscores-list");
    highscoresList.innerHTML = "";

    playerHighscores.forEach(function (playerScore) {
      var li = document.createElement("li");
      li.textContent = playerScore.initials + " - " + playerScore.score;
      highscoresList.appendChild(li);
    });
  }

  submitButton.addEventListener("click", function (event) {
    event.preventDefault();
    questionContainer.style.display = "none";
    endContainer.style.display = "none";
    startContainer.style.display = "none";
    quizContainer.style.display = "none";
    highscoresContainer.style.display = "block";
    saveLastScore();
    renderHighscores();
  });

  backButton.addEventListener("click", function () {
    timeEl.textContent = "Time: 0";
    highscoresContainer.style.display = "none";
    questionContainer.style.display = "none";
    endContainer.style.display = "none";
    startContainer.style.display = "block";
    quizContainer.style.display = "block";
    currentQuestionIndex = 0;
  });

  startButton.addEventListener("click", function () {
    secondsLeft = 75;
    timeEl.textContent = "Time: " + secondsLeft;
    startContainer.style.display = "none";
    questionContainer.style.display = "block";
    startTimer();
    askQuestion();
  });
}

startQuiz();
