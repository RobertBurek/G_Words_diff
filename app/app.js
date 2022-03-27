import { Game } from './game.js';
import { words5Letters } from '../src/5-letters.js';
import { words6Letters } from '../src/6-letters.js';
import { words7Letters } from '../src/7-letters.js';
import { words8Letters } from '../src/8-letters.js';
import { words9Letters } from '../src/9-letters.js';
let wordsLetters = words5Letters;

let titleButtonLongWord = '(5-literowe)';
let titleButtonFilling = 'Wypełnianie (tylko istniejące słowa)';

const longWordButton = document.getElementById('longWord');
const fillingButton = document.getElementById('filling');
const setting5Letters = document.getElementById('5letters');
const setting6Letters = document.getElementById('6letters');
const setting7Letters = document.getElementById('7letters');
const setting8Letters = document.getElementById('8letters');
const setting9Letters = document.getElementById('9letters');
const onlyWords = document.getElementById('onlyWords');
const notWord = document.querySelector('.not-word');
const stringChars = document.getElementById('stringChars');
const onceAgainSection = document.getElementById('onceAgain');
const divOnlyWords = document.querySelector('.above.only-words');
const pOnlyWords = document.querySelector('.above.only-words p');
setting5Letters.addEventListener('click', ()=> {
  titleButtonLongWord = '(5-literowe)';
  listenerLongLetters(5, 6, words5Letters);
});
setting6Letters.addEventListener('click', ()=> {
  // import words6Letters from '../src/6-letters.js';
  titleButtonLongWord = '(6-literowe)';
  listenerLongLetters(6, 6, words6Letters);
});
setting7Letters.addEventListener('click', ()=> {
  titleButtonLongWord = '(7-literowe)';
  // longWord.innerHTML = titleButtonLongWord;
  listenerLongLetters(7, 6, words7Letters);
});
setting8Letters.addEventListener('click', ()=> {
  titleButtonLongWord = '(8-literowe)';
  listenerLongLetters(8, 6, words8Letters);
});
setting9Letters.addEventListener('click', ()=> {
  titleButtonLongWord = '(9-literowe)';
  listenerLongLetters(9, 6, words9Letters);
});

let stringWords = '';

onlyWords.addEventListener('click', ()=> {
  titleButtonFilling = '(tylko istniejące słowa)';
  game.changeOnlyWords(true);
});
stringChars.addEventListener('click', ()=> {
  titleButtonFilling = '(dowolny ciąg liter)';
  game.changeOnlyWords(false);
});


function listenerLongLetters(quantity, attempts, arrayLongLetters) {
  longWordButton.innerHTML = `<i class="fas fa-sort-amount-down-alt" dropdown></i> 
  Długość słowa <div class="dropdown-note" dropdown>${titleButtonLongWord}</div>`;
  onceAgainSection.classList.add('hide');
  wordsLetters = arrayLongLetters;
  stringWords = createStringWords(arrayLongLetters);
  game.run(quantity, attempts);
}

function createStringWords(words) {
    let tempStringWords = '';
    words.forEach(el => {
        tempStringWords += el.word +',';
    });
    return tempStringWords;
}


// class CharKeyboard {
//       constructor(numberChar, stateChar) {
//         this.numberChar = numberChar;
//         this.stateChar = stateChar;
//       }

//       changeStateChar() {
//       }
// }


const game = new Game({
    lettersWrapper: document.getElementById("letters"),
    categoryWrapper: document.querySelector("#category p"),
    wordGameWrapper: document.getElementById("wordGame"),
    keyboardScheme: document.getElementById("keyboardScheme"),
    keyboard1: document.getElementById("keyboard1"),
    keyboard2: document.getElementById("keyboard2"),
    keyboard3: document.getElementById("keyboard3"),
    keyboard4: document.getElementById("keyboard4"),
    dataLetters: wordsLetters
});

game.run(5, 6);