// import { GuessWord } from './guessWord.js';
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


class CharKeyboard {
      constructor(numberChar, stateChar) {
        this.numberChar = numberChar;
        this.stateChar = stateChar;
      }

      changeStateChar() {
      }
}


class Game {

    // words5 = [{
    //     word: '',
    //     category: '',
    //     game: false
    // }]

    // words6 = [{
    //     word: '',
    //     category: '',
    //     game: false
    // }]

    constructor({ lettersWrapper, categoryWrapper, wordGameWrapper, keyboardScheme, keyboard1, keyboard2, keyboard3, keyboard4, dataLetters }) {
        this.lettersWrapper = lettersWrapper;
        this.categoryWrapper = categoryWrapper;
        this.wordGameWrapper = wordGameWrapper;
        this.keyboardScheme = keyboardScheme;
        this.keyboard1 = keyboard1;
        this.keyboard2 = keyboard2;
        this.keyboard3 = keyboard3;
        this.keyboard4 = keyboard4;
        this.dataLetters = dataLetters;
        this.numbersChar = [65,  66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76,  77, 78, 79, 
          //                 0   1   2    3   4   5   6   7  8    9   10  11  12  13   14
          80, 81, 82, 83,  84, 85, 86, 87, 88, 89, 90, 211, 260, 262, 280, 321, 323, 346, 377, 379];
        //15  16   17  18   19 20   21 22  23  24  25   26   27   28   29   30   31  32  33    34  
        this.charsObject;
        this.alphabet;
        this.qwerty;
        this.currentlyKeyboard;
        this.level;
        this.leftEmpty;
        this.currentLine = [];
        this.guessWord;
        this.guessWordChars;
        this.currentWord;
        this.typedWord;
        this.victory = false;
        this.onlyWords = true;
        this.isNotWord = false;
        this.attempts = 6;
    }

    clearLine(line) {
        line.forEach(el => {
           el.style.display = 'none';
        });
    }

 

    changeOnlyWords(param) {
      // console.log(fillingButton);
      fillingButton.innerHTML = `<i class="fas fa-digital-tachograph" dropdown></i> 
      Wypełnianie <div class="dropdown-note" dropdown>${titleButtonFilling}</div>`;
      this.onlyWords = param;
      if (this.onlyWords) document.querySelector('.above.only-words p').innerHTML = 'Tylko istniejące słowa';
      else document.querySelector('.above.only-words p').innerHTML = 'Dowolny ciąg znaków';
    }


    createDataLetters(dataLetters) {
        let startData = [];
        dataLetters.forEach(element => {
            if (element.game) startData.push(element);
            });
            return startData;
    }

    createWordsLevel(arrayLongLetters){
      const dataWorks = this.createDataLetters(arrayLongLetters);
      return dataWorks[Math.floor(Math.random()*dataWorks.length)];
    }


    startParameters(level, attempts) {
      this.attempts = attempts;
      this.level = level;
      this.leftEmpty = level;
      notWord.classList.add('hide');
      let words;
      switch (level) {
        case 5:
          words = this.createWordsLevel(words5Letters);
          break;
        case 6:
          words = this.createWordsLevel(words6Letters);
          break;
        case 7:
          words = this.createWordsLevel(words7Letters);
          break;
        case 8:
          words = this.createWordsLevel(words8Letters);
          break;
        case 9:
          words = this.createWordsLevel(words9Letters);
          break;
        default:
          // if (level == 5) words = {word:'BANAN', category:'TestBanan'};
          // if (level == 6) words = {word:'AGREST', category:'TestAgrest'};
          // if (level == 7) words = {word:'APASZKA', category:'TestApaszka'};
          // if (level == 8) words = {word:'TEODOLIT', category:'TestTeodolit'};
          // if (level == 9) words = {word:'ARCHITEKT', category:'TestArchitekt'};
      }

      // if (level == 5) {
      //   // this.words5 = this.createDataLetters(words5Letters);
      //   // words = this.words5[Math.floor(Math.random()*this.words5.length)];
      //   words = this.createWordsLevel(words5Letters);
    
      // }
      // // if (level == 5) words = {word:'BANAN', category:'TestBanan'};
      // if (level == 6) {
      //   // this.words6 = this.createDataLetters(words6Letters);
      //   // words = this.words6[Math.floor(Math.random()*this.words6.length)];
      //   words = this.createWordsLevel(words6Letters);
      // }
      // // if (level == 6) words = {word:'AGREST', category:'TestAgrest'};
      // if (level == 7) {
      //   // this.words7 = this.createDataLetters(words7Letters);
      //   // words = this.words7[Math.floor(Math.random()*this.words7.length)];
      //   words = this.createWordsLevel(words7Letters);
      // }
      // // if (level == 7) words = {word:'APASZKA', category:'TestApaszka'};
      // if (level == 8) {
      //   // this.words8 = this.createDataLetters(words8Letters);
      //   // words = this.words8[Math.floor(Math.random()*this.words8.length)];
      //   words = this.createWordsLevel(words8Letters);
      // }
      // // if (level == 8) words = {word:'TEODOLIT', category:'TestTeodolit'};
      // if (level == 9) {
      //   // this.words9 = this.createDataLetters(words9Letters);
      //   // words = this.words9[Math.floor(Math.random()*this.words9.length)];
      //   words = this.createWordsLevel(words9Letters);
      // }
      // if (level == 9) words = {word:'ARCHITEKT', category:'TestArchitekt'};

      this.guessWord = words.word;
      this.categoryWrapper.innerHTML = 'KATEGORIA:  ' + words.category;

      stringWords = createStringWords(wordsLetters);

      // this.guessWord = words.word;

      // this.categoryWrapper.innerHTML = 'KATEGORIA:  ' + words.category;

      this.charsObject = [];
      for (let i = 0; i < this.numbersChar.length; i++ ){
        this.charsObject.push(new CharKeyboard(this.numbersChar[i], 'normal'));
      }
      this.alphabet = [this.charsObject[0],  this.charsObject[27], this.charsObject[1], this.charsObject[2], this.charsObject[28], this.charsObject[3], this.charsObject[4], this.charsObject[29], 
                      this.charsObject[5], this.charsObject[6], this.charsObject[7], this.charsObject[8], this.charsObject[9], this.charsObject[10], this.charsObject[11], this.charsObject[30], 
                      this.charsObject[12], this.charsObject[13], this.charsObject[31], this.charsObject[14], this.charsObject[26], this.charsObject[15], this.charsObject[16], this.charsObject[17], 
                      this.charsObject[18], this.charsObject[32], this.charsObject[19], this.charsObject[20], this.charsObject[21], this.charsObject[22], this.charsObject[23], this.charsObject[24], 
                      this.charsObject[25], this.charsObject[33], this.charsObject[34]]
      this.qwerty = [this.charsObject[16],  this.charsObject[22], this.charsObject[4], this.charsObject[17], this.charsObject[19], this.charsObject[24], this.charsObject[20], this.charsObject[8],
                    this.charsObject[14], this.charsObject[15], this.charsObject[0], this.charsObject[18], this.charsObject[3], this.charsObject[5],this.charsObject[6], this.charsObject[7], 
                    this.charsObject[9], this.charsObject[10], this.charsObject[11], this.charsObject[25], this.charsObject[23], this.charsObject[2], this.charsObject[21], this.charsObject[1],
                    this.charsObject[13], this.charsObject[12], this.charsObject[27], this.charsObject[28], this.charsObject[29], this.charsObject[30], this.charsObject[31], this.charsObject[26],
                    this.charsObject[32], this.charsObject[33], this.charsObject[34]]
      this.currentlyKeyboard = this.alphabet;
      this.currentWord = new Array(level);
      this.victory = false;
      this.showWord('');
    }


    createTypedWord() {
      this.typedWord = '';
      this.currentLine.forEach(el => {
          this.typedWord +=  el.innerHTML;
      });
    }


    stopCurrentLine(){
      this.isNotWord = true;
      // console.log('stopCurrentLine');
      notWord.classList.remove('hide');
      divOnlyWords.classList.add('curtain-only-words');
      pOnlyWords.classList.add('curtain');
      this.currentLine.forEach(el => {
        el.classList.add('curtain-char');
      });
      document.querySelector('.back-space').classList.add('curtain-back-space');
    }

    startCurrentLine(){
      this.isNotWord = false;
      // console.log('startCurrentLin');
      notWord.classList.add('hide');
      divOnlyWords.classList.remove('curtain-only-words');
      pOnlyWords.classList.remove('curtain');
      this.currentLine.forEach(el => {
        el.classList.remove('curtain-char');
        el.innerHTML = '';
      });
      document.querySelector('.back-space').classList.remove('curtain-back-space');
    }


    isOnlyWords(){
        this.createTypedWord();
        if (this.onlyWords) {
            if (stringWords.includes(this.typedWord)) {
                console.log('SŁOWO ISTNIEJE');
                this.checkWord();
                if (!this.victory) this.createActiveRound();
            } else {
                console.log('NIE - słowo');
                this.stopCurrentLine();
            }
        } else {
            console.log('Dowolny ciąg znaków');
            this.checkWord();
            if (!this.victory) this.createActiveRound();
        }
    }   


    checkWord() {
        let resultCheckedChars = new Array(this.level);
        let tempCurrentLine = [];
        this.currentLine.forEach(el => {
            tempCurrentLine.push(el.innerHTML);
        });
        let guessWordChars = this.guessWord.split('');
        this.clearLine(this.currentLine);
        for (let i = 0; i < this.level; i++) {
            if (tempCurrentLine[i] == guessWordChars[i]) {
                guessWordChars[i] = '-';
                tempCurrentLine[i] = '!';
                resultCheckedChars[i] = 'success';
                this.currentWord[i].stateChar = 'success';
            }}
        for (let i = 0; i < this.level; i++) {
            if (tempCurrentLine[i] != '!') {
                for (let j = 0; j < this.level; j++) {
                    if (tempCurrentLine[i] == guessWordChars[j]) {
                      guessWordChars[j] = '-';
                        resultCheckedChars[i] = 'half-success';
                        if ((this.currentWord[i].stateChar != 'success')) this.currentWord[i].stateChar = 'half-success';
                        break;
                    } else {
                        resultCheckedChars[i] = 'not-char';
                    }
                }
            }
        }
        this.isVictory(resultCheckedChars);
        this.newViewLine(resultCheckedChars);
        this.createKeyboard(this.currentlyKeyboard, this.keyboard1, this.keyboard2, this.keyboard3, this.keyboard4);
    }   
    

    isVictory(resultCheckedChars) {
      let i = 0;
      resultCheckedChars.forEach(char => {
        if (char == 'success') i++;
      });
      if (i == this.level) {
        this.victory = true;
        this.onceAgain(this.level, this.attempts);
      }
    }


    newViewLine(resultCheckedChars) {
      const parentLine = this.currentLine[0].parentNode;
      for (let i = 0; i < this.level; i++) {
        if (this.currentWord[i].stateChar != 'success')
          if (this.currentWord[i].stateChar != 'half-success') {
            this.currentWord[i].stateChar = 'not-char';
          }
        const divLetter = document.createElement('div');
        if (this.victory) divLetter.className = `one-letter ${resultCheckedChars[i]} heartly`;
          else divLetter.className = `one-letter ${resultCheckedChars[i]}`;
        divLetter.innerHTML = this.currentLine[i].innerHTML;
        parentLine.appendChild(divLetter);
      }
    }


    writeLetter(oneChar) {
        const activeLetter = document.querySelector('div.current-letter');
        if (activeLetter) {
            let position = this.currentLine.indexOf(activeLetter); 
            if (this.currentLine[position].innerHTML == '') this.leftEmpty -= 1;
            activeLetter.innerHTML = String.fromCharCode(oneChar.numberChar);
            this.currentWord[position] = oneChar;
            if (this.leftEmpty > 0) {
              if (position == this.level - 1) position = 0;
              while (this.currentLine[position].innerHTML != '') {
                position += 1;
                if (position == this.level) position = 0;
              }
              activeLetter.classList.remove('current-letter');
              this.currentLine[position].classList.add('current-letter');
            } else {
                activeLetter.classList.remove('current-letter');
                this.isOnlyWords();
              }
        }
    }


    delLetter() {
        const activeLetter = document.querySelector('div.current-letter');
        if (activeLetter) {
            if (activeLetter.innerHTML != '') {
              this.leftEmpty += 1;
              activeLetter.innerHTML = String.fromCharCode(0);
            } else {
              let position = this.currentLine.indexOf(activeLetter);
              if (position == 0) position = this.level - 1;
              else position -= 1;
              activeLetter.classList.remove('current-letter');
              this.currentLine[position].classList.add('current-letter');
              if (this.currentLine[position].innerHTML != '') {
                this.leftEmpty += 1;
                this.currentLine[position].innerHTML = String.fromCharCode(0);
              }
            }
        } 
    }

    returnGame() {
      this.startCurrentLine();
      this.leftEmpty = this.level;
      document.querySelector('.current-round').firstChild.classList.add('current-letter');
      pOnlyWords.classList.remove('curtain-z-index');
    }

    delCurtainOnlyWords() {
      if (this.isNotWord) {
        this.returnGame();
      } else {
        this.delLetter();
      }
    }


    changeKeyboard() {
        if (this.currentlyKeyboard == this.alphabet) this.currentlyKeyboard = this.qwerty;
        else this.currentlyKeyboard = this.alphabet;
    }


     createKeyboard(lettersCheme, keyboard1, keyboard2, keyboard3, keyboard4) {
      keyboard1.innerHTML = '';
      keyboard2.innerHTML = '';
      keyboard3.innerHTML = '';
      keyboard4.innerHTML = '';
      for (let i = 0; i < 10; i++) {
        const button = document.createElement('button');
        button.className = lettersCheme[i].stateChar;
        button.innerHTML = String.fromCharCode(lettersCheme[i].numberChar);
        if (lettersCheme[i].stateChar != 'not-char') button.addEventListener('click', () => this.writeLetter(lettersCheme[i]));
        keyboard1.appendChild(button);
      }
      for (let i = 10; i < 19; i++) {
        const button = document.createElement('button');
        button.className = lettersCheme[i].stateChar;
        button.innerHTML = String.fromCharCode(lettersCheme[i].numberChar);
        if (lettersCheme[i].stateChar != 'not-char') button.addEventListener('click', () => this.writeLetter(lettersCheme[i]));
        keyboard2.appendChild(button);
      }
      const divKeyboard = document.createElement('div');
      divKeyboard.setAttribute('id', 'keyboardScheme');
      divKeyboard.className='keyboard-scheme';
      divKeyboard.innerHTML = '<i class="fas fa-keyboard"></i>';
      divKeyboard.addEventListener('click', () =>{
        this.changeKeyboard();
        this.createKeyboard(this.currentlyKeyboard, this.keyboard1, this.keyboard2, this.keyboard3, this.keyboard4);
      });
      keyboard3.appendChild(divKeyboard);
      for (let i = 19; i < 26; i++) {
        const button = document.createElement('button');
        button.className = lettersCheme[i].stateChar;
        button.innerHTML = String.fromCharCode(lettersCheme[i].numberChar);
        if (lettersCheme[i].stateChar != 'not-char') button.addEventListener('click', () => this.writeLetter(lettersCheme[i]));
        keyboard3.appendChild(button);
      }
      const divBackspace = document.createElement('div');
      divBackspace.className = 'back-space';
      divBackspace.innerHTML = '<i class="fas fa-long-arrow-alt-left"></i>';
      divBackspace.addEventListener('click', () => this.delCurtainOnlyWords());
      keyboard3.appendChild(divBackspace);
      for (let i = 26; i < 35; i++) {
        const button = document.createElement('button');
        button.className = lettersCheme[i].stateChar;
        button.innerHTML = String.fromCharCode(lettersCheme[i].numberChar);
        if (lettersCheme[i].stateChar != 'not-char') button.addEventListener('click', () => this.writeLetter(lettersCheme[i]));
        keyboard4.appendChild(button);
      }
    }

    
    changeLetter(element) {
      this.currentLine.forEach(el => {
        el.classList.remove('current-letter')
      });
      if (!this.isNotWord) element.classList.add('current-letter');
    }


    createStartPlaceGame(level, attempts, wrapper) {
      wrapper.innerHTML = '';
        // for ( let i = 0; i < level + 1; i++){
        for ( let i = 0; i < attempts; i++){
            const divLine = document.createElement('div');
            if (i == 0) divLine.className = 'line current-round';
            else divLine.className = 'line';
            for ( let j = 0; j < level; j++){
                const divLetter = document.createElement('div');
                if ((j == 0) && (i == 0)) divLetter.className = 'one-letter current-letter';
                else divLetter.className = 'one-letter';
                if (i == 0) {
                  divLetter.addEventListener('click', () => this.changeLetter(divLetter));
                }
                divLine.appendChild(divLetter);
            }
            wrapper.appendChild(divLine);
        }
        this.createCurrentLine();
    }

    
    createInfoOnlyWords() {
      const divOnlyWords = document.createElement('div');
      divOnlyWords.className = 'not-word hide';
      const pInfo = document.createElement('p');
      pInfo.innerHTML = 'Nie ma takiego słowa'
      divOnlyWords.appendChild(pInfo);
      document.querySelector('.only-words').appendChild(divOnlyWords);
    }


    createCurrentLine() {
      this.currentLine = document.querySelectorAll('.current-round .one-letter');
      this.currentLine = [...this.currentLine];
      this.currentLine.forEach(element => {
          element.addEventListener('click', () => this.changeLetter(element));
      });
      this.leftEmpty = this.level;
    }


    showWord(word) {
      const resultDiv = document.getElementById('resultWord');
      if (word != '') {
        resultDiv.classList.add('result-word');
        resultDiv.innerHTML = `Szukane słowo: <p>${word}</p>`;
      } else {
        resultDiv.innerHTML = ``;
      }
    }


    createActiveRound() {
        let listRounds = document.querySelectorAll('#wordGame .line');
        listRounds = [...listRounds];
        for (let i = 0; i < listRounds.length; i++) {
            if (listRounds[i].className == 'line current-round') {
              listRounds[i].classList.remove('current-round');
              if (i < listRounds.length -1) {
                listRounds[i + 1].classList.add('current-round');
                listRounds[i + 1].firstChild.classList.add('current-letter');
                this.createCurrentLine();
                } else {
                  this.showWord(this.guessWord);
                  this.onceAgain(this.level, this.attempts);
                  }
                break;
            }
        }
    }


    onceAgain(quantity, attempts) {
      onceAgainSection.classList.remove('hide');
      divOnlyWords.classList.add('curtain-only-words');
      pOnlyWords.classList.add('curtain');
      pOnlyWords.classList.add('curtain-z-index');
      // document.querySelector('.back-space').classList.add('back-space-z-index');
      // document.querySelector('.back-space').style.zIndex = '0';
      // console.log(document.querySelector('.back-space'));
      const onceAgainDiv = document.querySelector('#onceAgain div');
      // console.log(onceAgainDiv);
      onceAgainDiv.addEventListener('click', () =>{
        onceAgainSection.classList.add('hide');
        this.run(quantity, attempts);
      });
      // document.querySelector('.back-space').classList.add('back-space-z-index');
    }


    run(quantity, attempts) {
    this.startParameters(quantity, attempts);
    this.createKeyboard(this.currentlyKeyboard, this.keyboard1, this.keyboard2, this.keyboard3, this.keyboard4);
    this.createStartPlaceGame(quantity, attempts, this.wordGameWrapper);
    this.returnGame();
    }

}



const game = new Game({
    lettersWrapper: document.getElementById("letters"),
    categoryWrapper: document.querySelector("#category p"),
    wordGameWrapper: document.getElementById("wordGame"),
    keyboardScheme: document.getElementById("keyboardScheme"),
    keyboard1: document.getElementById("keyboard1"),
    keyboard2: document.getElementById("keyboard2"),
    keyboard3: document.getElementById("keyboard3"),
    keyboard4: document.getElementById("keyboard4"),
    dataLetters: wordsLetters,
});

game.run(5, 6);