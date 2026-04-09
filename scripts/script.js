"use strict";

import { showFinalScore, bgMusic } from './score.js';
import { getElement, select, listen } from './utils.js';



const targetWord = getElement('current-word');
const inputField = getElement('word-input');
const startBtn = getElement('start-btn');
const timeCounter = getElement('time-remaining');
const gameMessage = getElement('game-status');
const originalMessage = gameMessage.innerText;
const hitsDisplay = getElement('hits-count');
const gameOverOverlay = getElement('game-over-overlay');
const playAgainBtn = getElement('play-again-btn');


const words = ['dinosaur', 'love', 'pineapple', 'calendar', 'robot', 'building',
  'population', 'weather', 'bottle', 'history', 'dream', 'character', 'money',
  'absolute', 'discipline', 'machine', 'accurate', 'connection', 'rainbow',
  'bicycle', 'eclipse', 'calculator', 'trouble', 'watermelon', 'developer',
  'philosophy', 'database', 'periodic', 'capitalism', 'abominable', 'component',
  'future', 'pasta', 'microwave', 'jungle', 'wallet', 'canada', 'coffee', 'beauty',
  'agency', 'chocolate', 'eleven', 'technology', 'alphabet', 'knowledge', 'magician',
  'professor', 'triangle', 'earthquake', 'baseball', 'beyond', 'evolution', 'banana',
  'perfumer', 'computer', 'management', 'discovery', 'ambition', 'music', 'eagle',
  'crown', 'chess', 'laptop', 'bedroom', 'delivery', 'enemy', 'button', 'superman',
  'library', 'unboxing', 'bookstore', 'language', 'homework', 'fantastic', 'economy',
  'interview', 'awesome', 'challenge', 'science', 'mystery', 'famous', 'league', 'memory',
  'leather', 'planet', 'software', 'update', 'yellow', 'keyboard', 'window'];


inputField.disabled = true;

const getRandomWord = function (words) {
  const nextWordIndex = Math.floor(Math.random() * words.length)
  return words.splice(nextWordIndex, 1)[0];
}

const displayWord = function () {

  if (words.length === 0) {
    stopGame('Game Over!');
    showFinalScore(hits, attempts);
    return;
  }

  const nextWord = getRandomWord(words);
  targetWord.innerText = nextWord;



}


let timeLeft = 99;
let timer = null;
let gameRunning = false;
let hits = 0;
let attempts = 0;

const startGame = function () {
  gameMessage.innerText = 'Go!';
  gameRunning = true;
  startBtn.innerText = 'Stop';
  timeLeft = 99;
  timeCounter.innerText = timeLeft;
  bgMusic.currentTime = 0;
  bgMusic.play();
  hits = 0;
  attempts = 0;
  hitsDisplay.innerText = 0;

  displayWord();
  inputField.value = '';
  inputField.disabled = false;
  inputField.focus();  // this is to put the cursor in the input field   
  startCountdown();

}


function startCountdown() {
  timer = setTimeout(() => {
    timeLeft--;
    timeCounter.innerText = timeLeft;

    if (timeLeft <= 0) {
      stopGame('Game Over!');
      showFinalScore(hits, attempts);
    } else {
      startCountdown();
    }
  }, 1000);
}


const stopGame = function (message) {
  gameRunning = false;
  clearTimeout(timer);

  inputField.disabled = true;
  inputField.value = '';
  bgMusic.pause();
  bgMusic.currentTime = 0;
  gameMessage.innerText = message || originalMessage;
  targetWord.innerText = '';
  targetWord.style.color = 'white';

  timeLeft = 99;
  timeCounter.innerText = 99;

  startBtn.innerText = 'Start';
};


const checkWord = function () {
  const typed = inputField.value.trim();
  const current = targetWord.innerText.trim();
  if (typed === current) {
    hits++;
    attempts++;
    hitsDisplay.innerText = hits;
    inputField.style.color = 'white';
    displayWord();
    inputField.value = '';
    return;
  } else if (!current.startsWith(typed)) {
    inputField.style.color = 'red';
  }
  else {
    inputField.style.color = 'white';
  }

}


listen('click', startBtn, () => {
  if (!gameRunning) {
    startGame();
  } else {
    timeLeft = 99;
    timeCounter.innerText = 99;
    hits = 0;
    attempts = 0;
    hitsDisplay.innerText = 0;
    stopGame('Play Again!');
  }
});

listen('input', inputField, checkWord)


listen('click', playAgainBtn, () => {
  gameOverOverlay.classList.add('hidden');
  stopGame(); 
});




