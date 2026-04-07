"use strict";

import { getElement, select, listen } from './utils.js';

const targetWord = getElement('current-word');
const inputField = getElement('word-input');
const startBtn = getElement('start-btn');

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


inputField.disabled =true; 

const getRandomWord = function (words) {
  const nextWordIndex = Math.floor(Math.random() * words.length)
  return words.splice(nextWordIndex, 1)[0];
}

const displayWord = function () {
  const nextWord = getRandomWord(words);
  targetWord.innerText = nextWord;
}

const startGame = function() {
  displayWord();       
  inputField.value = '';
  inputField.disabled = false; 
  inputField.focus();  // this is to put the cursor in the input field   
}

const checkWord = function () {
  const typed = inputField.value.trim();
  const current = targetWord.innerText.trim();

  if (typed === current) {
    displayWord();          
    inputField.value = '';  
  }
};

listen('click', startBtn, startGame);
listen('input', inputField, checkWord)




