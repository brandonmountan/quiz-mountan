var timerEl = document.getElementById("timer-count");
var startButton = document.getElementById("start-button");
var submitButton = document.getElementById("submit-button");
var quizEl = document.getElementById("quiz");
var questionEl = document.getElementById("question");
var choicesEl = document.getElementById("choices");



function startTimer() {

    var timeLeft = 60;

    var timer = setInterval(function () {

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

startButton.addEventListener('click', startTimer);

startButton.addEventListener('click', displayQuestion);



var quizQuestions = [
    {
        question: "What is the capital of Montana?",
        choices: ["Great Falls", "Helena", "Bozeman", "Billings"],
        answer: 1
    },
    {
        question: "What is the largest planet in our solar system?",
        choices: ["Mars", "Saturn", "Jupiter", "Earth"],
        answer: 3
    },
];

var currentQuestionIndex = 0;



function displayQuestion() {
    var question = quizQuestions[currentQuestionIndex];
    questionEl.textContent = question.question;
    choicesEl.innerHTML = "";
    

    for (let i = 0; i < question.choices.length; i++) {
        var choice = question.choices[i];
        var li = document.createElement("li");
        li.textContent = choice;
        li.addEventListener("click", function () {
            selectAnswer(i);
        });
        choicesEl.appendChild(li);
    }
};

function selectAnswer(choiceIndex) {
    var question = quiz[currentQuestionIndex];
    var correctAnswer = question.correctAnswer;

    if (choiceIndex === correctAnswer) {
        score++;
    } else {
        timeLeft -= 10;
        if (timeLeft < 0) {
            timeLeft = 0;
        }
    }

    currentQuestionIndex++;

    if (currentQuestionIndex == quiz.length) {
        endQuiz();
    } else {
        displayQuestion();
    }
}