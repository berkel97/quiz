const callCardContainer = document.querySelector(".score-card");
const options = document.querySelector(".options").children;
const questionNumSpan = document.querySelector(".qu-num-val");
const totalQuestionSpan = document.querySelector(".total-questions");
const correctAnswerSpan = document.querySelector(".correct-answers");
const totalQuestionSpan2 = document.querySelector(".total-questions2");
const percentage = document.querySelector(".percentage");
const question = document.querySelector(".question");
const op1 = document.querySelector(".option1");
const op2 = document.querySelector(".option2");
const op3 = document.querySelector(".option3");
const op4 = document.querySelector(".option4");
const op5 = document.querySelector(".option5");
let questionIndex;
let index = 0;
let myArray = [];
let myArr = [];
let score = 0;

// questions, options and answers
const questions = [
  {
    q: "When was the first refinery in Nigeria built?",
    options: ["1963", "1972", "1965", "1968", "1964"],
    answer: 2,
  },
  {
    q: "Which is the second largest continent in the world?",
    options: ["Australia", "Europe", "Asia", "Africa", "N.America"],
    answer: 3,
  },
  {
    q: "Which African country first gained independence?",
    options: ["Liberia", "Ethiopia", "Egypt", "Algeria", "Ghana"],
    answer: 0,
  },
  {
    q: "How many ethnic groups do we have in Nigeria?",
    options: ["190", "300", "253", "255", "250"],
    answer: 4,
  },
  {
    q: "When was paper currency introduced in Nigeria?",
    options: ["1918", "1922", "1914", "1919", "1920"],
    answer: 0,
  },
];

//setting questions and options and question numbers
totalQuestionSpan.innerHTML = questions.length;
function load() {
  questionNumSpan.innerHTML = index + 1;
  question.innerHTML = questions[questionIndex].q;
  op1.innerHTML = questions[questionIndex].options[0];
  op2.innerHTML = questions[questionIndex].options[1];
  op3.innerHTML = questions[questionIndex].options[2];
  op4.innerHTML = questions[questionIndex].options[3];
  op5.innerHTML = questions[questionIndex].options[4];
  index++;
}

function check(element) {
  if (element.id == questions[questionIndex].answer) {
    element.classList.add("correct");
    updateScoreCard("correct");
    score++;
  } else {
    element.classList.add("wrong");
    updateScoreCard("wrong");
  }
  disabledOptions();
}

function disabledOptions() {
  for (let i = 0; i < options.length; i++) {
    options[i].classList.add("disabled");
    if (options[i].id == questions[questionIndex].answer) {
      options[i].classList.add("correct");
    }
  }
}

function enableOptions() {
  for (let i = 0; i < options.length; i++) {
    options[i].classList.remove("disabled", "correct", "wrong");
  }
}

function Validate() {
  if (!options[0].classList.contains("disabled")) {
    alert("Please select an Option");
  } else {
    enableOptions();
    randomQuestion();
  }
}

function next() {
  Validate();
}

function randomQuestion() {
  let randomNumber = Math.floor(Math.random() * questions.length);
  let hitDuplicate = 0;
  if (index == questions.length) {
    quizOver();
  } else {
    if (myArray.length > 0) {
      for (let i = 0; i < myArray.length; i++) {
        if (myArray[i] == randomNumber) {
          hitDuplicate = 1;
          break;
        }
      }
      if (hitDuplicate == 1) {
        randomQuestion();
      } else {
        questionIndex = randomNumber;
        load();
        myArr.push(questionIndex);
      }
    }
    if (myArray.length == 0) {
      questionIndex = randomNumber;
      load();
      myArr.push(questionIndex);
    }

    myArray.push(randomNumber);
  }
}

function scoreCard() {
  for (let i = 0; i < questions.length; i++) {
    const div = document.createElement("div");
    callCardContainer.appendChild(div);
  }
}

function updateScoreCard(className) {
  callCardContainer.children[index - 1].classList.add(className);
}

function quizOver() {
  document.querySelector(".quiz-over").classList.add("show");
  correctAnswerSpan.innerHTML = score;
  totalQuestionSpan2.innerHTML = questions.length;
  percentage.innerHTML = (score / questions.length) * 100 + "%";
}

function tryAgain() {
  window.location.reload();
}

window.onload = function () {
  randomQuestion();
  scoreCard();
};
