'use strict';

//selecting elements

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score0E2 = document.querySelector('#score--1');
const current0El = document.getElementById('current--0');
const current0E2 = document.getElementById('current--1');

const diceE1 = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//starting condition

let scores, currentScore, activePlayer, playing;

const init = function() {
    scores = [0,0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    score0El.textContent = 0;
    score0E2.textContent = 0;
    current0El.textContent = 0;
    current0E2.textContent = 0;

    diceE1.classList.add('hidden');
    player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
};

init();

// to switch between players functionality
const switchPlayer = function(){
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}


//rolling dice functionality
btnRoll.addEventListener('click', function (){

    //1. generating random dice rolls
    const dice = Math.trunc(Math.random() * 6) + 1;
   // console.log(dice);

   //2. Display dice
   diceE1.classList.remove('hidden');
   diceE1.src = `dice-${dice}.png`;

   //3. check for the rolled 1
   if(dice !== 1){
    currentScore += dice;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
   }else {

    //switch to next player
    switchPlayer();

   }

});

//button hold functionality

btnHold.addEventListener('click',function (){

    if(playing){

        //1. add current score to active player score

        scores[activePlayer] += currentScore;

        document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

      //2. check if player's score is >= 20

      if(scores[activePlayer] >= 20){
        //finish the game
        playing = false;
        diceE1.classList.add('hidden');
        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
        document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');

      }else{
        //switch to the next player
        switchPlayer();
      }
    }  
});

// button newgame functionality

btnNew.addEventListener('click', function(){
    init();
});

