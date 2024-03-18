"use strict";
// =========================================================================================================
// Landing Page Functionalities (Screen X)
// =========================================================================================================
let guesserName;
const sectionANode = document.querySelector(".ScreenX");

const nameSubmitBtnNode = document.querySelector(".name__submit-btn");
const inputName = document.querySelector(".name__input");

nameSubmitBtnNode.addEventListener("click", function (ev) {
  ev.preventDefault();
  guesserName = inputName.value;
  // sectionANode.classList.add("hidden");
  window.location.href = "ScreenA.html";
  console.log(guesserName);
});

// =========================================================================================================
