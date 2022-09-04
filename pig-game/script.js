'use strict';
// Selecting elements
let score0El = document.querySelector('#score--0');
let score1El = document.getElementById('score--1'); //this two works the same but the second one is more fast
const diceEl = document.querySelector('.dice');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const activePlayer0 = document.querySelector('.player--0');
const activePlayer1 = document.querySelector('.player--1');

function changePlayer(p0, p1) {
  //switch to next player
  p0.classList.remove('player--active');
  p1.classList.add('player--active');
  currentScore = 0;
}
function saveScore(score0, cs, current) {
  score0.textContent = Number(score0.textContent) + cs;
  current.textContent = 0;
}
//-------------------------------------------------------
score0El.textContent = 0;
score1El.textContent = 0;

diceEl.classList.add('hidden');

let currentScore = 0;
//Rolling dice functionality
btnRoll.addEventListener('click', function () {
  // 1. Generating a random dice roll
  const dice = Math.trunc(Math.random() * 6) + 1;
  //console.log(dice);

  // 2. Display dice;
  diceEl.classList.remove('hidden');
  diceEl.src = `dice-${dice}.png`; // we change the sourceo of the image
  //-------------------------------------------------------
  //3. Check for rolled 1; if true,
  if (dice !== 1) {
    //Add dice to current score
    currentScore += dice;
    if (activePlayer0.classList.contains('player--active')) {
      current0El.textContent = currentScore; //
    } else {
      current1El.textContent = currentScore;
    }
    //If dice===1;----------------------------------------
  } else {
    //Change player
    if (activePlayer0.classList.contains('player--active')) {
      changePlayer(activePlayer0, activePlayer1);
      current0El.textContent = 0;
    } else {
      changePlayer(activePlayer1, activePlayer0);
      current1El.textContent = 0;
    }
  }
});

//Hold button functionality------------------------------
btnHold.addEventListener('click', function () {
  if (activePlayer0.classList.contains('player--active')) {
    saveScore(score0El, currentScore, current0El);
    changePlayer(activePlayer0, activePlayer1);
  } else {
    saveScore(score1El, currentScore, current1El);
    changePlayer(activePlayer1, activePlayer0);
  }

  if (score0El.textContent >= 100) {
    prompt(`Player ${1} wins!`);
  } else if (score1El.textContent >= 100) {
    prompt(`Player ${2} wins!`);
  }
});

//New game button functionality-----------------------------
btnNew.addEventListener('click', function () {
  current0El.textContent = 0;
  current1El.textContent = 0;
  score1El.textContent = 0;
  score0El.textContent = 0;
  changePlayer(activePlayer1, activePlayer0);
  diceEl.classList.add('hidden');
});
