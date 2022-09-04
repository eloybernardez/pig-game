'use strict';
// Selecting elements
let score0El = document.getElementById('score--0');
let score1El = document.getElementById('score--1'); //this two works the same but the second one is more fast
const diceEl = document.querySelector('.dice');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const activePlayer0 = document.querySelector('.player--0');
const activePlayer1 = document.querySelector('.player--1');
let current0El = document.getElementById('current--0');
let current1El = document.getElementById('current--1');

let activePlayer = 0;
let scores = [0, 0];

//Functions block----------------------------------------------------
function changePlayer1(p0, p1) {
  //switch to next player
  p0.classList.remove('player--active');
  p1.classList.add('player--active');
  currentScore = 0;
}
function saveScore(score0, cs, current) {
  score0.textContent = Number(score0.textContent) + cs;
  current.textContent = 0;
}
const switchPlayer = function () {
  //we can use a piece of code as a function that executes that piece
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  activePlayer0.classList.toggle('player--active'); //if the class is active then removes it. If not, it activates it.
  activePlayer1.classList.toggle('player--active');
  //toggleling both classes ensures that one of them is always active
};
//-------------------------------------------------------
score0El.textContent = 0;
score1El.textContent = 0;

diceEl.classList.add('hidden');

let currentScore = 0;
//Rolling dice functionality---------------------------------
btnRoll.addEventListener('click', function () {
  // 1. Generating a random dice roll--------------
  const dice = Math.trunc(Math.random() * 6) + 1;

  // 2. Display dice;-------------------------
  diceEl.classList.remove('hidden');
  diceEl.src = `src/assets/dice-${dice}.png`; // we change the sourceo of the image
  //-------------------------------------------------------
  //3. Check for rolled 1; if true,----------------------
  if (dice !== 1) {
    //Add dice to current score
    currentScore += dice;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;

    //If dice===1;----------------------------------------
  } else {
    //Change player
    switchPlayer();
  }
});

//Hold button functionality------------------------------
btnHold.addEventListener('click', function () {
  scores[activePlayer] += currentScore;
  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];
  //Check if a score >=100-------------------------------
  if (scores[activePlayer] >= 100) {
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    //

    diceEl.classList.add('hidden');
    btnHold.classList.add('hidden');
    btnRoll.classList.add('hidden');
  } else {
    //Change player
    switchPlayer();
  }
});

//New game button functionality-----------------------------
btnNew.addEventListener('click', function () {
  //If clicked when someone wins-----------------------------------
  if (scores[activePlayer] >= 100) {
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--winner');
    document.querySelector(`.player--${activePlayer}`).classList.remove('name');
    //document.querySelector(`.player--${activePlayer}`).classList.add('name');
  }
  //Returns current and scores to 0---------------------------------------------
  scores = [0, 0];
  current0El.textContent = 0;
  score0El.textContent = scores[0];
  score1El.textContent = scores[1];
  current1El.textContent = 0;
  // We remove the class list hidden to show again the buttons------------------------------
  btnHold.classList.remove('hidden');
  btnRoll.classList.remove('hidden');
  //Switch to player 1----------------------------------------------
  document.querySelector('.player--0').classList.add('player--active');
  document.querySelector('.player--1').classList.remove('player--active');
  activePlayer = 0;
  //-------------------------------
  currentScore = 0;
});
