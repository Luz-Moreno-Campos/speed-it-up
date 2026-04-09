'use strict';

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


export const startSound = new Audio('./media/start.mp3');    // start click sound
export const bgMusic = new Audio('./media/audio.mp3');       // background music
export const gameOverSound = new Audio('./media/over.mp3');  // game over sound

bgMusic.loop = true;
bgMusic.volume = 0.3;


let hits = 0;
let attempts = 0;

const hitsDisplay = document.getElementById('hits-count');
const inputField = document.getElementById('word-input');
const currentWord = document.getElementById('current-word');
const gameStatus = document.getElementById('game-status');
const startBtn = document.getElementById('start-btn');

const scoreBody = document.getElementById('score-body');
const gameOverOverlay = document.getElementById('game-over-overlay');
const playAgainBtn = document.getElementById('play-again-btn');


startBtn.addEventListener('click', () => {
  startSound.currentTime = 0;
  startSound.play();      
  bgMusic.currentTime = 0;
  bgMusic.play();         

  // Reset hits when starting new game
  hits = 0;
  attempts = 0;
  hitsDisplay.innerText = 0;
});


inputField.addEventListener('input', () => {
  const typed = inputField.value.trim();
  const word = currentWord.innerText.trim();
  if (!word) return;

  if (typed === word) {
    hits++;
    attempts++;
    hitsDisplay.innerText = hits;
    inputField.style.color = "limegreen";
  } else if (!word.startsWith(typed)) {
    inputField.style.color = "red";
  } else {
    inputField.style.color = "white";
  }
});


const observer = new MutationObserver(() => {
  if (gameStatus.innerText === "Game Over!") {
    showFinalScore();
  }
});

observer.observe(gameStatus, { childList: true });


function showFinalScore() {
  const percentage = attempts === 0 ? 0 : ((hits / attempts) * 100).toFixed(2);
  const date = new Date().toLocaleDateString();
  const score = new Score(date, hits, percentage);

  const row = `
    <tr>
      <td>${score.date}</td>
      <td>${score.hits}</td>
      <td>${score.percentage}%</td>
    </tr>
  `;

  scoreBody.innerHTML = row + scoreBody.innerHTML;
  gameOverOverlay.classList.remove('hidden');

  bgMusic.pause();         
  gameOverSound.play();    
}


   

playAgainBtn.addEventListener('click', () => {
  gameOverOverlay.classList.add('hidden');
  hits = 0;
  attempts = 0;
  hitsDisplay.innerText = 0;

  bgMusic.currentTime = 0;
  bgMusic.play();          
});