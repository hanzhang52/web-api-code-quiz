const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll(".choice-text"));
const scoreText = document.querySelector("#score");
// const progressText = document.querySelector("#progressText");
// const progressBarFull = document.querySelector("#progressBarFull");

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
  {
    question:
      "Which of the following methods is used to access HTML elements using Javascript?",
    choice1: "getElementbyid()",
    choice2: "getElementsByClassName",
    choice3: "Both A and B",
    choice4: "17",
    answer: 3,
  },
  {
    question:
      "Which of the following methods can be used to display data in some form using Javascript? tallest building in the world is located in which city?",
    choice1: "document.write()",
    choice2: "console.log()",
    choice3: "window.alert()",
    choice4: "All of the above",
    answer: 4,
  },
  {
    question: "Which of the following is not a Javascript framework?",
    choice1: "Node",
    choice2: "Vue",
    choice3: "React",
    choice4: "Cassandra",
    answer: 4,
  },
  {
    question: "How to stop an interval timer in Javascript?",
    choice1: "clearInterval",
    choice2: "clearTimer",
    choice3: "intervalOver",
    choice4: "None of the above",
    answer: 1,
  },
];

const SCORE_POINTS = 100;
const MAX_QUESTIONS = 4;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);

    return window.location.assign("/end.html");
  }

  // questionCounter++;
  // progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
  // progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionsIndex];
  question.innerText = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuestions.splice(questionsIndex, 1);

  acceptingAnswers = true;
};

// savescore: function () {
//   let leaderboard = JSON.parse(localStorage.getItem("leaderbord"))

//   if (!leaderboard)
//     leaderboard = [];
//   }

//   leaderboard.push(this.getScore);
//   localStorage.setItem("leaderboard", JSON.stringify(leaderboard));

// }

choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    let classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(SCORE_POINTS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};

startGame();
