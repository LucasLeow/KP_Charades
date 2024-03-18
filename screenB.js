"use strict";

const wordNode = document.querySelector(".word");

let selectedWord;
let count = 0;
let intervalSpeed = 50;
let cycleCount = 0;

const timerNode = document.querySelector(".countdown");
let guessTime = 15; // 15 seconds
let countdownTimer;

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

let randomWordInterval = setInterval(displayWord, intervalSpeed);

function countdown() {
  if (guessTime == -1) {
    clearTimeout(countdownTimer);
  } else {
    timerNode.innerHTML = guessTime + " Seconds Remaining To Act";
    guessTime--;
  }
}
