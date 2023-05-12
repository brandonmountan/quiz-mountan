// DOM elements
var timerEl = document.getElementById("timer-count");
var startButton = document.getElementById("start-button");
var submitChoiceButton = document.getElementById("submitChoice-button");
var quizEl = document.getElementById("quiz");
var questionEl = document.getElementById("question");
var choicesEl = document.getElementById("choices");
var resultEl = document.getElementById("result");

var timeLeft = 60;

var timer;

var score = 0;

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
    // console.log(event.target);
    // selectAnswer(i);
    if (event.target.dataset.quizbutton === "true") {
        selectAnswer(event.target.innerHTML);
            // console.log(event.target.innerHTML)
        // console.log("hello")
    }
});

function selectAnswer(userChoice) {
    var question = quizQuestions[currentQuestionIndex];
    var correctAnswer = question.answer;
    console.log(question);
    console.log(userChoice);
    console.log(correctAnswer);
    console.log(quizQuestions[currentQuestionIndex].choices.indexOf(userChoice));
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

function endQuiz() {
    clearInterval(timer);
    questionEl.textContent = "Quiz Complete";
    choicesEl.style.display = "none";
    resultEl.textContent = `Final score: ${score}`;
}