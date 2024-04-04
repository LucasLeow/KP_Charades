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
let guessTime = 2; // 15 seconds
let countdownTimer;

let answerOptions;

let answerTimer = 0;
let roundScore = 0;
let totalScore = 0;

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
let actorReadyBtnNode;

// Screen B
let wordNode;
let timerNode;
let randomWordInterval;

// Screen D
let guessReadyBtnNode;

// const guessBtnContainerNode = document.querySelector(".guesser_button");
// const guessBtnNode = document.querySelector(".guess_btn");
// let guessCountDownTimer;
// let guesserTime;

// =========================================================================================================
// Helper Functions
// =========================================================================================================
const displayWord = function () {
  count++;
  if (count == 20) {
    cycleCount++;

    if (cycleCount == 3) {
      // reset cycleCount
      cycleCount = 0;
      count = 0;
      intervalSpeed = 50;
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
    displayScreenD();
  } else {
    timerNode.innerHTML = guessTime + " Seconds Remaining To Act";
    guessTime--;
  }
}

function countup() {
  answerTimer++;
}

function mod(n, m) {
  return ((n % m) + m) % m;
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
  actorReadyBtnNode = document.querySelector(".screenA_readyBtn");
  roundDivNode = document.querySelector(".round_number");
  roundDivNode.textContent = `Round ${roundNumber} of ${MAXROUND}`;
  document.body.style.backgroundColor = "#1f618d";

  actorReadyBtnNode.addEventListener("click", function (ev) {
    ev.preventDefault();
    displayScreenB();
  });
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
  wordNode = document.querySelector(".word");
  timerNode = document.querySelector(".countdown");
  randomWordInterval = setInterval(displayWord, intervalSpeed);
};

const displayScreenD = () => {
  const screenD_html = `
  <div class="container">
    <div class="row center_normal--text">
      ${guesserName} &nbsp &nbsp &nbsp &nbsp &nbsp Total Score: ${totalScore}
    </div>
  <div class="row">
    <div class="col landingHeader">${guesserName}'s turn</div>
  </div>

  <div class="row center_normal--text">
    Face the screen for ${guesserName} to tap
  </div>

  <div class="row center_normal--text round_number"></div>
  <button class="screenD_readyBtn btn">I'm Ready!</button>
</div>
  `;
  document.body.style.backgroundColor = "tomato";
  screenNode.innerHTML = screenD_html;

  guessReadyBtnNode = document.querySelector(".screenD_readyBtn");
  guessReadyBtnNode.addEventListener("click", function (ev) {
    ev.preventDefault();
    console.log("Screen D ready btn clicked");
    displayOptions(); // displays screen E
  });
};

const displayScreenF = (msg) => {
  const screenF_html = `
  <div class="container">
    <div class="row center_normal--text">
      ${guesserName} &nbsp &nbsp &nbsp &nbsp &nbsp Total Score: ${totalScore}
    </div>
  <div class="row">
    <div class="landingHeader">${msg}!</div>
    <div class="center_normal--text">Score for this round: ${roundScore}</div>
  </div>
</div>
  `;
  screenNode.innerHTML = screenF_html;
  roundScore = 0;
  answerTimer = 0;
  roundNumber++;
  if (roundNumber <= MAXROUND) setTimeout(displayScreenA, 5000); // switch to screenA after 5 seconds
};

const displayOptions = function () {
  let answerIndex = wordArray.indexOf(selectedWord);
  let backIndex = mod(answerIndex - 2, wordArray.length);
  let frontIndex = mod(answerIndex + 2, wordArray.length);
  console.log(answerIndex, backIndex, frontIndex);

  answerOptions = new Array(
    wordArray[answerIndex],
    wordArray[backIndex],
    wordArray[frontIndex]
  );

  console.log(answerOptions);

  const screenE_html = `
  <div class="container">
    <div class="row center_normal--text">
      ${guesserName} &nbsp &nbsp &nbsp &nbsp &nbsp Total Score: ${totalScore}
    </div>
    <div class="row">
      <div class="landingHeader">What was portrayed?</div>
      <div class="btn" data-answer="${answerOptions[0]}">${answerOptions[0]}</div>
    </div>
    <div class="row">
      <div class="btn" data-answer="${answerOptions[1]}">${answerOptions[1]}</div>
    </div>
    <div class="row">
      <div class="btn" data-answer="${answerOptions[2]}">${answerOptions[2]}</div>
    </div>
    <div class="row">
      <div class="countdown center_normal--text mt-5"></div>
    </div>
</div>`;

  screenNode.innerHTML = screenE_html;
  const scoreTimer = setInterval(countup, 1000); // start counting when option screen shown

  // Event delegation for option selection
  document.querySelector(".container").addEventListener("click", function (ev) {
    ev.preventDefault();
    clearInterval(scoreTimer);
    if (ev.target.dataset.answer !== selectedWord) {
      displayScreenF("Incorrect Answer!");
    } else {
      // correct answer selected
      if (answerTimer <= 5) roundScore += 150;
      if (answerTimer > 5 && answerTimer <= 10) roundScore += 100;
      if (answerTimer > 10 && answerTimer <= 15) roundScore += 75;
      if (answerTimer > 15 && answerTimer <= 20) roundScore += 50;
      if (answerTimer > 20) roundScore += 25;
      totalScore += roundScore;
      displayScreenF("Well Done!");
    }
  });

  // iterate through answerOptions & mcqNodes to populate mcqNodes in random order
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
  screenNode.scrollIntoView({
    behavior: "auto",
    block: "center",
    inline: "center",
  });
});

// =========================================================================================================
// Event Listeners
// =========================================================================================================

// wordNode.addEventListener("click", function () {
//   clearInterval(randomWordInterval);
// });

// guessBtnContainerNode.addEventListener(
//   "click",
//   function () {
//     guessBtnNode.classList.toggle("hidden");
//     guesserTime = 5;
//     guessCountDownTimer = setInterval(guessCountdown, 1000);
//   },
//   false
// );

// =========================================================================================================
// Main program
// =========================================================================================================

/*
Things left to do
1) iterate through answerOptions & mcqNodes to populate mcqNodes in random order
2) beautiful UI
*/
