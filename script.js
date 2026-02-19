const questions = [
  {
    question: "Which planet is known as the Red Planet?",
    answers: ["Earth", "Mars", "Saturn", "Venus"],
    correctIndex: 1,
  },
  {
    question: "What is the largest ocean on Earth?",
    answers: ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean", "Arctic Ocean"],
    correctIndex: 2,
  },
  {
    question: "Who wrote 'Romeo and Juliet'?",
    answers: ["William Shakespeare", "Jane Austen", "Charles Dickens", "Mark Twain"],
    correctIndex: 0,
  },
  {
    question: "What is the chemical symbol for gold?",
    answers: ["Go", "Ag", "Au", "Gd"],
    correctIndex: 2,
  },
  {
    question: "In computing, what does CPU stand for?",
    answers: ["Central Processing Unit", "Computer Primary Unit", "Core Program Utility", "Central Program Unit"],
    correctIndex: 0,
  },
  {
    question: "How many continents are there on Earth?",
    answers: ["5", "6", "7", "8"],
    correctIndex: 2,
  },
  {
    question: "Which language is primarily spoken in Brazil?",
    answers: ["Spanish", "Portuguese", "French", "English"],
    correctIndex: 1,
  },
  {
    question: "What year did the first man land on the moon?",
    answers: ["1965", "1969", "1972", "1959"],
    correctIndex: 1,
  },
];

const totalQuestions = 5;
let round = [];
let currentQuestionIndex = 0;
let score = 0;
let answered = false;

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const questionCountEl = document.getElementById("question-count");
const scoreEl = document.getElementById("score");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");
const feedbackEl = document.getElementById("feedback");

function shuffle(list) {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function updateHud() {
  questionCountEl.textContent = `Question ${Math.min(currentQuestionIndex + 1, totalQuestions)} / ${totalQuestions}`;
  scoreEl.textContent = `Score: ${score}`;
}

function renderQuestion() {
  answered = false;
  nextBtn.disabled = true;
  feedbackEl.textContent = "";
  feedbackEl.className = "feedback";

  const current = round[currentQuestionIndex];
  questionEl.textContent = current.question;
  answersEl.innerHTML = "";

  current.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "answer";
    button.textContent = answer;
    button.addEventListener("click", () => selectAnswer(index, button));
    answersEl.appendChild(button);
  });

  updateHud();
}

function selectAnswer(index, clickedButton) {
  if (answered) {
    return;
  }
  answered = true;

  const current = round[currentQuestionIndex];
  const answerButtons = answersEl.querySelectorAll("button");

  answerButtons.forEach((btn, btnIndex) => {
    btn.disabled = true;
    if (btnIndex === current.correctIndex) {
      btn.classList.add("correct");
    }
  });

  if (index === current.correctIndex) {
    score += 1;
    clickedButton.classList.add("correct");
    feedbackEl.textContent = "Correct!";
    feedbackEl.classList.add("good");
  } else {
    clickedButton.classList.add("wrong");
    feedbackEl.textContent = `Not quite. Correct answer: ${current.answers[current.correctIndex]}`;
    feedbackEl.classList.add("bad");
  }

  updateHud();
  nextBtn.disabled = false;
}

function endGame() {
  questionEl.textContent = `Game complete! Final score: ${score} / ${totalQuestions}`;
  answersEl.innerHTML = "";
  feedbackEl.textContent = score === totalQuestions
    ? "Perfect score!"
    : score >= 3
      ? "Nice work!"
      : "Good try — hit restart for a new set.";
  feedbackEl.className = "feedback good";
  questionCountEl.textContent = `Question ${totalQuestions} / ${totalQuestions}`;
  nextBtn.disabled = true;
}

function nextQuestion() {
  if (!answered) {
    return;
  }

  currentQuestionIndex += 1;
  if (currentQuestionIndex >= totalQuestions) {
    endGame();
    return;
  }

  renderQuestion();
}

function startGame() {
  round = shuffle(questions).slice(0, totalQuestions);
  currentQuestionIndex = 0;
  score = 0;
  nextBtn.disabled = true;
  renderQuestion();
}

nextBtn.addEventListener("click", nextQuestion);
restartBtn.addEventListener("click", startGame);

startGame();
