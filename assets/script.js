// DOM elements
var timerEl = document.getElementById("timer-count");
var startButton = document.getElementById("start-button");
var quizEl = document.getElementById("quiz");
var questionEl = document.getElementById("question");
var choicesEl = document.getElementById("choices");
var resultEl = document.getElementById("result");
var initialsEl = document.getElementById("initials");
var submitBtn = document.getElementById("submit");
var userInitialsSpan = document.querySelector("#user-intials");
var userScoreSpan = document.querySelector("#user-score");

var timeLeft = 60;
var timer;
var score = 0;

renderLastRegistered();
// Timer
function startTimer() {

    timer = setInterval(function () {

        if (timeLeft > 1) {
            timerEl.textContent = timeLeft + ' seconds remaining';
            timeLeft--;
        } else if (timeLeft === 1) {
            timerEl.textContent = timeLeft + ' second remaining';
            timeLeft--;
        } else if (timeLeft === 0) {
            timerEl.textContent = '';
            clearInterval(timer);
        }
    }, 1000);
}

// Event Listeners
startButton.addEventListener('click', startTimer);

startButton.addEventListener('click', displayQuestion);




// Quiz Questions
var quizQuestions = [
    {
        question: "What is the capital of Montana?",
        choices: ["Great Falls", "Helena", "Bozeman", "Billings"],
        answer: 1
    },
    {
        question: "What is the largest planet in our solar system?",
        choices: ["Mars", "Saturn", "Jupiter", "Earth"],
        answer: 2
    },
    {
        question: "What is the capital of France?",
        choices: ["Paris", "Berlin", "London"],
        answer: 0
      },
      {
        question: "Which year was JavaScript first released?",
        choices: ["1995", "2005", "2010"],
        answer: 0
      },
      {
        question: "Which planet in our solar system is known for its beautiful ring system?",
        choices: ["Mars", "Jupiter", "Saturn", "Uranus"],
        answer: 2
      },
];



var currentQuestionIndex = 0;


// Displaying questions on the screen
function displayQuestion() {
    var question = quizQuestions[currentQuestionIndex];
    questionEl.textContent = question.question;
    choicesEl.innerHTML = "";
    

    for (let i = 0; i < question.choices.length; i++) {
        var choice = question.choices[i];
        var button = document.createElement("button");
        button.dataset.quizbutton = "true";
        button.innerHTML = choice;
        choicesEl.appendChild(button);
    }
};


document.addEventListener("click", function (event) {
    if (event.target.dataset.quizbutton === "true") {
        selectAnswer(event.target.innerHTML);
    }
});

// Assigning the correct answer and taking time off if the user answers incorrectly
function selectAnswer(userChoice) {
    var question = quizQuestions[currentQuestionIndex];
    var correctAnswer = question.answer;
    if (quizQuestions[currentQuestionIndex].choices.indexOf(userChoice) === correctAnswer) {
        score++;
    } else {
        timeLeft -= 10;
        if (timeLeft < 0) {
            timeLeft = 0;
        }
    }

    currentQuestionIndex++;

    if (currentQuestionIndex == quizQuestions.length) {
        endQuiz();
    } else {
        displayQuestion();
    }
}

// What to display when the quiz ends
function endQuiz() {
    clearInterval(timer);
    questionEl.textContent = "Quiz Complete";
    choicesEl.style.display = "none";
    resultEl.textContent = `Final score: ${score}`;
}



// could not figure out local storage...

// function renderLastRegistered() {
//     var userResults = localStorage.getItem("score");
//     var userInitials = localStorage.getItem("initials");

//     if (!userResults || !userInitials) {
//         return;
//     }

//     resultEl.textContent = userResults;
//     initialsEl.textContent = userInitials;
// }

// submitBtn.addEventListener("click", function(event) {

//     event.preventDefault();

//     var userResults = document.querySelector("#user-score").value;
//     var userInitials = document.querySelector("#user-intials").value;

//     if (userResults === "") {
//         displayMessage("error");
//     } else if (userInitials === "") {
//         displayMessage("error");
//     } else {

//     localStorage.setItem("score", userResults);
//     localStorage.setItem("intials", userInitials);
//     renderLastRegistered();
//     }
// })
