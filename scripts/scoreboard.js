'use strict'


import { getElement, select, listen } from './utils.js';


 const scores = [];

 export function saveScore(date, hits, percentage) {
  const score = { date, hits, percentage };

  scores.push(score);
  scores.sort((a, b) => b.hits - a.hits);
  console.log("Scores array:", scores);
  scores.splice(9);

  localStorage.setItem('scores', JSON.stringify(scores));
}

export function getSavedScores() {
  const savedScore = localStorage.getItem("scores");
  return savedScore ? JSON.parse(savedScore) : [];
}


