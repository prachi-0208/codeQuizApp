// -------------------------
// 📦 QUESTION DATABASE
// -------------------------

// Easy Level Questions
const easyQuestions = [
  { question: "What does HTML stand for?", options: ["HyperText Markup Language", "HyperText Machine Language", "Home Tool Markup Language"], answer: 0, hint: "It's used to structure web pages." },
  { question: "Which tag is used for headings in HTML?", options: ["<head>", "<h1>", "<header>"], answer: 1, hint: "It starts with 'h' and has a number." },
  { question: "What does CSS stand for?", options: ["Creative Style Sheets", "Cascading Style Sheets", "Colorful Style Sheets"], answer: 1, hint: "It styles web pages." },
  { question: "Which HTML tag is used to create a link?", options: ["<a>", "<link>", "<href>"], answer: 0, hint: "It’s a single letter." },
  { question: "Which attribute is used to add an image to a webpage?", options: ["src", "href", "alt"], answer: 0, hint: "It points to the source of the image." },
  { question: "Which attribute provides info about an element in HTML?", options: ["title", "info", "details"], answer: 0, hint: "It’s the same word you’d use for naming a book or movie." },
  { question: "What is the correct HTML element for inserting a line break?", options: ["<break>", "<br>", "<lb>"], answer: 1, hint: "It’s a two-letter tag that stands for break." }
];

// Medium Level Questions
const mediumQuestions = [
  { question: "What does CSS stand for?", options: ["Cascading Style Sheets", "Creative Style Sheets", "Computer Style Sheets"], answer: 0, hint: "It is used to style web pages." },
  { question: "Which CSS property is used for background color?", options: ["bg-color", "color", "background-color"], answer: 2, hint: "It starts with 'background'." },
  { question: "Which CSS property changes the text color?", options: ["text-color", "font-color", "color"], answer: 2, hint: "It’s just 'color'." },
  { question: "How do you add a comment in CSS?", options: ["//", "/* */", "#"], answer: 1, hint: "It starts and ends with special characters." },
  { question: "Which HTML element defines important text?", options: ["<b>", "<strong>", "<em>"], answer: 1, hint: "It’s the strongest option." },
  { question: "What does DOM stand for?", options: ["Document Object Model", "Data Object Manager", "Document Oriented Model"], answer: 0, hint: "It's about objects in a document." },
  { question: "Which CSS property makes text bold?", options: ["font-weight", "font-bold", "text-bold"], answer: 0, hint: "It involves weight." }
];

// Hard Level Questions
const hardQuestions = [
  { question: "Which is not a JavaScript data type?", options: ["Undefined", "Boolean", "Float"], answer: 2, hint: "JavaScript uses 'number' instead of 'float'." },
  { question: "How do you write comments in JavaScript?", options: ["//", "/* */", "#"], answer: 0, hint: "It's double slashes." },
  { question: "Which function parses a string into an integer?", options: ["parseString()", "parseInt()", "intParse()"], answer: 1, hint: "It starts with 'parse'." },
  { question: "Which is NOT a looping structure in JavaScript?", options: ["for", "foreach", "loop"], answer: 2, hint: "'loop' is incorrect." },
  { question: "What is '2' + 2 in JavaScript?", options: ["22", "4", "NaN"], answer: 0, hint: "Think about string concatenation." },
  { question: "Which keyword declares a constant?", options: ["const", "let", "var"], answer: 0, hint: "It’s literally 'constant'." },
  { question: "Which event fires on HTML click?", options: ["onclick", "onmouseclick", "onpress"], answer: 0, hint: "It's 'click' with 'on'." }
];

// -------------------------
// 🎮 GAME STATE VARIABLES
// -------------------------

let questions = [];              // Stores current question set
let currentQuestion = 0;         // Index for current question
let score = 0;                   // User's score
let timeLeft = 30;               // Time countdown for quiz

// DOM Elements
const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const nextButton = document.getElementById('next-btn');
const timerElement = document.getElementById('time');
const scoreElement = document.getElementById('current-score');
const hintButton = document.getElementById('hint-btn');
const hintElement = document.getElementById('hint');

// -------------------------
// 🚀 START QUIZ FUNCTION
// -------------------------
function startQuiz(difficulty) {
  document.getElementById('difficulty-container').style.display = 'none';
  document.querySelector('.container').style.display = 'block';

  // Load the selected difficulty's questions
  questions = difficulty === 'easy' ? easyQuestions :
              difficulty === 'medium' ? mediumQuestions :
              hardQuestions;

  loadQuestion(); // Load first question
  startTimer();   // Start the countdown timer
}

// -------------------------
// 🔁 LOAD A QUESTION
// -------------------------
function loadQuestion() {
  // If all questions are done
  if (currentQuestion >= questions.length) {
    alert(`Quiz Over! Your final score is: ${score}`);
    saveScore();
    location.reload(); // Restart quiz
    return;
  }

  updateProgressBar(); // Update progress bar

  const q = questions[currentQuestion];
  questionElement.textContent = q.question;
  optionsElement.innerHTML = ''; // Clear previous options

  // Create buttons for each option
  q.options.forEach((option, index) => {
    const btn = document.createElement('button');
    btn.textContent = option;
    btn.onclick = () => checkAnswer(index);
    optionsElement.appendChild(btn);
  });

  hintButton.style.display = 'block';
  hintElement.textContent = '';
}

// -------------------------
// ✅ CHECK USER'S ANSWER
// -------------------------
function checkAnswer(selectedIndex) {
  if (selectedIndex === questions[currentQuestion].answer) {
    score++;
    scoreElement.textContent = score;
  }
  currentQuestion++;
  loadQuestion();
}

// -------------------------
// 📊 UPDATE PROGRESS BAR
// -------------------------
function updateProgressBar() {
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  document.getElementById('progress-bar').style.width = progress + '%';
}

// -------------------------
// ⏲️ TIMER FUNCTION
// -------------------------
function startTimer() {
  const timerInterval = setInterval(() => {
    timeLeft--;
    timerElement.textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      alert('Time up!');
      saveScore();
      location.reload();
    }
  }, 1000); // Update every second
}

// -------------------------
// 💡 SHOW HINT ON CLICK
// -------------------------
hintButton.onclick = function () {
  hintElement.textContent = questions[currentQuestion].hint;
};

// -------------------------
// 💾 SAVE SCORES LOCALLY
// -------------------------
function saveScore() {
  let scores = JSON.parse(localStorage.getItem('highScores')) || [];
  scores.push(score);
  scores = scores.sort((a, b) => b - a).slice(0, 5); // Top 5 scores
  localStorage.setItem('highScores', JSON.stringify(scores));
}

// -------------------------
// 📋 SHOW HIGH SCORES
// -------------------------
function displayHighScores() {
  const scores = JSON.parse(localStorage.getItem('highScores')) || [];
  alert('High Scores:\n' + scores.join('\n'));
}
