"use strict";
// =========================================================================================================
// Variables Declaration
// =========================================================================================================
// Screen X
let guesserName;
let actorName;

// Screen A
let roundNumber = 1;
const MAXROUND = 5;

// Screen B
const wordArray = [
  "Budget Cuts",
  "Sudden Deadlines",
  "Technology Failures",
  "Evolving Customer Needs",
  "Mergers and Acquisitions",
  "Cybersecurity Threats",
  "Regulatory Changes",
  "Cultural Shifts",
  "Supply Chain Disruptions",
];

let selectedWord;
let count = 0;
let intervalSpeed = 50;
let cycleCount = 0;
let guessTime = 15; // 15 seconds
let countdownTimer;

// =========================================================================================================
// HTMLs
// =========================================================================================================
const screenX_html = `
<div class="container">
<div class="row">
  <div class="col landingHeader">Welcome</div>
</div>

<form>
  <div class="form-group">
    <label for="actor_name" class="form__label"
      >Enter Actor Name:</label
    >
    <input
      type="actor_name"
      class="form-control actor_name__input"
      id="actor_name"
      placeholder="Jimmy"
    />
    <label for="guesser_name" class="form__label"
      >Enter Guesser Name:</label
    >
    <input
      type="guesser_name"
      class="form-control guesser_name__input"
      id="guesser_name"
      placeholder="Michelle"
    />
  </div>
  <button type="submit" class="name__submit-btn btn">I'm Ready!</button>
</form>
</div>`;

// =========================================================================================================
// HTML Nodes Selection
// =========================================================================================================
const screenNode = document.querySelector(".screen");

// Screen A
let roundDivNode;
let readyBtnNode;

// Screen B
let wordNode;
let timerNode;
let randomWordInterval;
// const mcq_nodes = document.querySelectorAll(".mcq");

// const guessBtnContainerNode = document.querySelector(".guesser_button");
// const guessBtnNode = document.querySelector(".guess_btn");
// let guessCountDownTimer;
// let guesserTime;

// Helper Functions
// =========================================================================================================
const displayWord = function () {
  count++;
  if (count == 20) {
    cycleCount++;

    if (cycleCount == 3) {
      clearInterval(randomWordInterval);
      countdownTimer = setInterval(countdown, 1000);
      return;
    } else {
      count = 0;
      intervalSpeed += 50;
      clearInterval(randomWordInterval);
      randomWordInterval = setInterval(displayWord, intervalSpeed);
    }
  }

  selectedWord = wordArray[Math.floor(Math.random() * wordArray.length)];
  wordNode.textContent = selectedWord;
};

function countdown() {
  if (guessTime == -1) {
    console.log(selectedWord);
    clearTimeout(countdownTimer);
  } else {
    timerNode.innerHTML = guessTime + " Seconds Remaining To Act";
    guessTime--;
  }
}

const displayScreenA = () => {
  const screenA_html = `
<div class="container">
  <div class="row">
    <div class="col landingHeader">${actorName}'s Turn!</div>
  </div>

  <div class="row center_normal--text">
    Face your screen for ${actorName} to tap
  </div>

  <div class="row center_normal--text round_number"></div>
  <button class="screenA_readyBtn btn">I'm Ready!</button>
</div>`;

  screenNode.innerHTML = screenA_html;
};

const displayScreenB = () => {
  const screenB_html = `
  <div class="container">
  <div class="row">
    <div class="col landingHeader">${actorName}'s Turn!</div>
  </div>
  <div class="row center_normal--text">Portray the following word:</div>
  
  <div class="row center_normal--text word"></div>
  <div class="countdown center_normal--text mt-5"></div>
  </div>`;

  screenNode.innerHTML = screenB_html;
};
// =========================================================================================================
// Main
// =========================================================================================================
screenNode.innerHTML = screenX_html;

const nameSubmitBtnNode = document.querySelector(".name__submit-btn");
const actorNameInput = document.querySelector(".actor_name__input");
const guesserNameInput = document.querySelector(".guesser_name__input");

nameSubmitBtnNode.addEventListener("click", function (ev) {
  ev.preventDefault();
  guesserName = guesserNameInput.value;
  actorName = actorNameInput.value;
  console.log(guesserName, actorName);
  displayScreenA();
  roundDivNode = document.querySelector(".round_number");
  readyBtnNode = document.querySelector(".screenA_readyBtn");
  console.log(roundDivNode);
  screenNode.scrollIntoView({
    behavior: "auto",
    block: "center",
    inline: "center",
  });

  // Screen A Functionalities
  roundDivNode.textContent = `Round ${roundNumber} of ${MAXROUND}`;
  readyBtnNode.addEventListener("click", function (ev) {
    ev.preventDefault();
    displayScreenB();
    wordNode = document.querySelector(".word");
    timerNode = document.querySelector(".countdown");
    randomWordInterval = setInterval(displayWord, intervalSpeed);
  });
});

function guessCountdown() {
  if (guesserTime == 0) {
    clearTimeout(guessCountDownTimer);
  } else {
    timerNode.innerHTML = guesserTime + " Seconds Remaining To Guess";
    guesserTime--;
  }
}

function mod(n, m) {
  return ((n % m) + m) % m;
}

const displayOptions = function () {
  wordNode.classList.toggle("hidden");
  timerNode.innerHTML = "";
  guessBtnContainerNode.classList.toggle("hidden"); // show button
  mcq_nodes.forEach((node) => node.classList.toggle("hidden")); // show all mcq option nodes

  let answerIndex = wordArray.indexOf(selectedWord);
  let backIndex = mod(answerIndex - 2, wordArray.length);
  let frontIndex = mod(answerIndex + 2, wordArray.length);
  console.log(answerIndex, backIndex, frontIndex);

  const answerOptions = new Array(
    wordArray[answerIndex],
    wordArray[backIndex],
    wordArray[frontIndex]
  );

  console.log(answerOptions);

  // iterate through answerOptions & mcqNodes to populate mcqNodes in random order
  for (let i = 0; i < mcq_nodes.length; i++) {
    mcq_nodes[i].textContent = answerOptions[i];
  }
};

// =========================================================================================================
// Event Listeners
// =========================================================================================================

wordNode.addEventListener("click", function () {
  clearInterval(randomWordInterval);
});

guessBtnContainerNode.addEventListener(
  "click",
  function () {
    guessBtnNode.classList.toggle("hidden");
    guesserTime = 5;
    guessCountDownTimer = setInterval(guessCountdown, 1000);
  },
  false
);

// =========================================================================================================
// Main program
// =========================================================================================================

/*
Things left to do
1) iterate through answerOptions & mcqNodes to populate mcqNodes in random order
2) beautiful UI
*/
