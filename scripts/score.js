"use strict";

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

