"use strict";

// =========================================================================================================
// Global Variables
// =========================================================================================================

// =========================================================================================================
// HTML Nodes Selection
// =========================================================================================================

const mcq_nodes = document.querySelectorAll(".mcq");

const guessBtnContainerNode = document.querySelector(".guesser_button");
const guessBtnNode = document.querySelector(".guess_btn");

// =========================================================================================================
// Variables Declaration
// =========================================================================================================

let guessCountDownTimer;

let guesserTime;
// Helper Functions
// =========================================================================================================

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
