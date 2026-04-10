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

export const bgMusic = new Audio('./media/audio.mp3');
bgMusic.loop = true;
bgMusic.volume = 0.3;

const scoreBody = document.getElementById('score-body');
const gameOverOverlay = document.getElementById('game-over-overlay');
const playAgainBtn = document.getElementById('play-again-btn');

export function showFinalScore(hits, totalWords) {
  const percentage = totalWords === 0 ? 0 : Math.round((hits / totalWords) * 100);
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
}


