const holdBtn = document.getElementById("hold");
const rollBtn = document.getElementById("roll");
const p1HoldID = document.getElementById("p1-hold"); // player 1 holdValue and score
const p1ScoreID = document.getElementById("p1-score");
const p2HoldID = document.getElementById("p2-hold"); // player 2 holdValue and score
const p2ScoreID = document.getElementById("p2-score");
const resultMessage = document.getElementById("result"); // result message

holdBtn.addEventListener("click", hold);
rollBtn.addEventListener("click", roll);

// current player's IDs
let currentPlayer = "Player-1";
let currentHold = p1HoldID.id;
let currentScore = p1ScoreID.id;
// values
let holdValue = 0;
let score1 = 0;
let score2 = 0;
let won = false;

// if player won: go to ending
// if player hasn't won yet: next player turn
function hold() {
  if (won) {
    ending();
  } else {
    switchPlayer();
  }
}

// if roll 1: turn total = 0, next player turn
// if role 2-6: turn total += faceValue, update holdValue UI, check if won
function roll() {
  const faceValue = Math.floor(Math.random() * 6) + 1; // the roll value
  const output = "&#x268" + (faceValue - 1) + "; ";
  const die = document.getElementById("die");
  die.innerHTML = output;
  
  if (faceValue === 1) {
    holdValue = 0;
    switchPlayer();
  } else { 
    holdValue += faceValue;
    document.getElementById(currentHold).style.width = holdValue + "%";
    document.getElementById(currentHold).setAttribute("aria-valuenow", holdValue);
    document.getElementById(currentHold).innerText = holdValue;
    checkIfWon();
  }
}

// update score for currentPlayer, update UI, switch player IDs to other player's
function switchPlayer() {
  if (currentPlayer === "Player-1") {
    score1 += holdValue;
    showHoldAndScore(score1); 
    currentPlayer = "Player-2";
    currentHold = p2HoldID.id;
    currentScore = p2ScoreID.id;
    resultMessage.innerHTML = "Player-2 turn!";
  } else {
    score2 += holdValue; 
    showHoldAndScore(score2); 
    currentPlayer = "Player-1";
    currentHold = p1HoldID.id;
    currentScore = p1ScoreID.id;
    resultMessage.innerHTML = "Player-1 turn!";
  }
}

// reset turn total = 0, update UI
function showHoldAndScore(playerScore) {
  holdValue = 0;

  document.getElementById(currentScore).style.width = playerScore + "%";
  document.getElementById(currentScore).setAttribute("aria-valuenow", playerScore);
  document.getElementById(currentScore).innerText = playerScore;

  document.getElementById(currentHold).style.width = holdValue + "%";
  document.getElementById(currentHold).setAttribute("aria-valuenow", holdValue);
  document.getElementById(currentHold).innerText = holdValue;
}

// if player reaches 100: set won = true and initiate hold() to end turn
function checkIfWon() {
  let tempScore = 0;
  if (currentPlayer === "Player-1") {
    tempScore = score1;
  } else {
    tempScore = score2;
  }

  if ((tempScore + holdValue) >= 100) {
    won = true;
    hold();
  }
}

// ending message, disable buttons, set progress bar to 100 and green with emoji
function ending() {
  resultMessage.innerHTML = currentPlayer + " won!";
  holdBtn.disabled = true;
  rollBtn.disabled = true;

  showHoldAndScore(100);
  document.getElementById(currentScore).style.background = "green";
  document.getElementById(currentScore).innerText = 100 + "🎉";
}