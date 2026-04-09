"use strict";

import { getElement, select, listen } from './utils.js';


const targetWord = getElement('current-word');
const inputField = getElement('word-input');
const startBtn = getElement('start-btn');
const timeCounter = getElement('time-remaining');
const gameMessage = getElement('game-status');

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
    return;
  }

  const nextWord = getRandomWord(words);
  targetWord.innerText = nextWord;



}


let timeLeft = 99;
let timer = null;
let gameRunning = false;

const startGame = function () {
  gameMessage.innerText = 'Go!';
  gameRunning = true;
  startBtn.innerText = 'Stop';
  timeLeft = 99;
  timeCounter.innerText = timeLeft;
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

  gameMessage.innerText = message;
  targetWord.innerText = '';
  targetWord.style.color = 'white';

  startBtn.innerText = 'Start';
};



const checkWord = function () {
  const typed = inputField.value.trim();
  const current = targetWord.innerText.trim();

  if (typed === current) {
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
    stopGame('Play Again!');
  }
});

listen('input', inputField, checkWord)


export class Score {
  #date;
  #hits;
  #percentage;

  constructor(date, hits, percentage) {
    this.#date = date;
    this.#hits = hits;
    this.#percentage = percentage;
  }

  
  get date() { return this.#date; }
  get hits() { return this.#hits; }
  get percentage() { return this.#percentage; }
}


export const bgMusic = new Audio('./media/audio.mp3');
export const successSound = new Audio('./media/start.mp3');
export const gameOverSound = new Audio('./media/over.mp3');

bgMusic.loop = true;


export let hits = 0; 
const hitsDisplay = document.getElementById('hits-count');
const scoreBody = document.getElementById('score-body');
const gameOverOverlay = document.getElementById('game-over-overlay');


export function recordFinalScore(currentHits, totalPossible) {
  const percentage = ((currentHits / totalPossible) * 100).toFixed(2);
  const date = new Date().toLocaleDateString();
  
  
  const finalScore = new Score(date, currentHits, percentage);
  
  
  const row = `<tr>
    <td>${finalScore.date}</td>
    <td>${finalScore.hits}</td>
    <td>${finalScore.percentage}%</td>
  </tr>`;
  
  if (scoreBody) {
    scoreBody.innerHTML = row + scoreBody.innerHTML;
  }
  
  if (gameOverOverlay) {
    gameOverOverlay.classList.remove('hidden');
  }
  
  gameOverSound.play();
}


export function handleSuccess() {
  hits++;
  if (hitsDisplay) hitsDisplay.innerText = hits;
  
  successSound.currentTime = 0;
  successSound.play();
}

