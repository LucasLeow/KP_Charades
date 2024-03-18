"use strict";
let roundNumber = 1;
const MAXROUND = 5;

// =========================================================================================================
// Landing Page Functionalities (Screen A)
// =========================================================================================================
const roundDivNode = document.querySelector(".round_number");
const readyBtnNode = document.querySelector(".screenA_readyBtn");

roundDivNode.textContent = `Round ${roundNumber} of ${MAXROUND}`;

readyBtnNode.addEventListener("click", function (ev) {
  ev.preventDefault();
  window.location.href = "ScreenB.html";
  console.log("ScreenA readybtn clicked");
});

// =========================================================================================================
