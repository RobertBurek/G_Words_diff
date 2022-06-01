// import { GuessWord } from './guessWord.js';
import { allWords5 } from '../src/allWords-5-letters.js';
import { allWords6 } from '../src/allWords-6-letters.js';
import { allWords7 } from '../src/allWords-7-letters.js';
import { allWords8 } from '../src/allWords-8-letters.js';
import { allWords9 } from '../src/allWords-9-letters.js';
// import { words5Letters } from '../src/5-letters.js';
// import { words6Letters } from '../src/6-letters.js';
// import { words7Letters } from '../src/7-letters.js';
// import { words8Letters } from '../src/8-letters.js';
// import { words9Letters } from '../src/9-letters.js';
// let wordsLetters = words5Letters;

class Word {
  constructor(word, category, game, description) {
    this.word = word;
    this.category = category;
    this.game = game;
    this.description = description;
  }
}

// console.log(allWords5);

// let gameWord = new Word('','?', false, '');

// let words = {word:'',category:'?',game:false};
let numberWords;

let titleButtonLongWord = `5-literowe`;
let titleButtonFilling = 'Wypełnianie (tylko istniejące słowa)';

const categoryWrapper = document.querySelector("#category p");
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
  // titleButtonLongWord = `5-literowe`;
  // listenerLongLetters(5, 6, words5Letters);
  listenerLongLetters(5, 6);
});
setting6Letters.addEventListener('click', ()=> {
  // titleButtonLongWord = `6-literowe`;
  // listenerLongLetters(6, 6, words6Letters);
  listenerLongLetters(6, 6);
});
setting7Letters.addEventListener('click', ()=> {
  // titleButtonLongWord = `7-literowe`;
  // listenerLongLetters(7, 6, words7Letters);
  listenerLongLetters(7, 6);
});
setting8Letters.addEventListener('click', ()=> {
  // titleButtonLongWord = `8-literowe`;
  // listenerLongLetters(8, 6, words8Letters);
  listenerLongLetters(8, 6);
});
setting9Letters.addEventListener('click', ()=> {
  // titleButtonLongWord = `9-literowe`;
  // listenerLongLetters(9, 6, words9Letters);
  listenerLongLetters(9, 6);
});

// let stringWords = '';

onlyWords.addEventListener('click', ()=> {
  // titleButtonFilling = '(tylko istniejące słowa)';
  appGame.changeOnlyWords(true, '(tylko istniejące słowa)');
});
stringChars.addEventListener('click', ()=> {
  // titleButtonFilling = '(dowolny ciąg liter)';
  appGame.changeOnlyWords(false, '(dowolny ciąg liter)');
});


function convertTextCategory(text) {
  text = text.toLowerCase();
  const tab = [...text];
  tab[0] = tab[0].toUpperCase();
  return tab.join("");
}

const whatCategoryDiv = document.querySelector('.what-category');
const whatCategoryElements = document.querySelectorAll('[category]');
whatCategoryElements.forEach(element => {
  element.addEventListener('click', ()=>{
    console.log(element);
    disableWhatCategory();
    element.classList.remove('what-category-disabled');
    element.classList.add('what-category-focus');
        var dataWord = { category: convertTextCategory(element.innerHTML), word: words.word, longWord: words.word.length }
        $.post( "./php/category.php", dataWord
        // , function() {
        //   alert( "success" );
        // })
        //   .done(function() {
        //     alert( "second success" );
        //   })
        //   .fail(function() {
        //     alert( "error" );
        //   }
        );
    whatCategoryDiv.classList.add('hide');
    document.querySelector("#category p").innerHTML = 'KATEGORIA:  ' + convertTextCategory(element.innerHTML);
    document.querySelector("#category").style.cursor = "pointer";
    document.querySelector("#category").addEventListener('click', changeCategoryStyle);
  });
})

const changeCategoryStyle = function changeCategoryStyle() {
  whatCategoryDiv.classList.remove('hide');
  document.querySelector("#category").style.cursor = "default";
}


function disableWhatCategory() {
  whatCategoryElements.forEach(el => {
    el.classList.add('what-category-disabled');
  })
}

function startSelectionCategory() {
  whatCategoryDiv.classList.remove('hide');
  whatCategoryElements.forEach(el => {
    el.classList.remove('what-category-disabled');
    el.classList.remove('what-category-focus');
  })
}



// function listenerLongLetters(quantity, attempts, arrayLongLetters) {
//   onceAgainSection.classList.add('hide');
//   wordsLetters = [...arrayLongLetters];
//   stringWords = createStringWords(arrayLongLetters);
//   game.run(quantity, attempts);
//   longWordButton.innerHTML = `<i class="fas fa-sort-amount-down-alt" dropdown></i> 
//   Długość słowa <div class="dropdown-note" dropdown>(${titleButtonLongWord} [${numberWords}])</div>`;
// }

function listenerLongLetters(quantity, attempts) {
  onceAgainSection.classList.add('hide');
  // wordsLetters = [...arrayLongLetters];
  // stringWords = result.allWords;
  appGame.run(quantity, attempts);
  // this.myPromise.then(result=>{
    // this.stringWords = resultSQL.allWords;
  // stringWords = result.allWords;

  longWordButton.innerHTML = `<i class="fas fa-sort-amount-down-alt" dropdown></i> 
  Długość słowa <div class="dropdown-note" dropdown>(${titleButtonLongWord} [${numberWords}])</div>`;
// });
}

// function createStringWords() {
//   this.myPromise.then(result => {
//     // let tempStringWords = '';
//     // words.forEach(el => {
//     //     tempStringWords += el.word +',';
//     // });
//     return result.allWords;
//   });
// }


class CharKeyboard {
      constructor(numberChar, stateChar) {
        this.numberChar = numberChar;
        this.stateChar = stateChar;
      }

      changeStateChar() {
      }
}


class AppGame {

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
        this.typedWord = '';
        this.victory = false;
        this.onlyWords = true;
        this.isNotWord = false;
        this.attempts = 6;
        this.gameWord = new Word();
        // this.gameWord;
        // this.gameWord = new Word('','?', false, '');
        // console.log(this.gameWord.word);
        this.myPromise;
        this.stringWords = '';
    }



    clearLine(line) {
        line.forEach(el => {
           el.style.display = 'none';
        });
    }

 

    changeOnlyWords(param, titleButtonFilling) {
      // console.log(fillingButton);
      fillingButton.innerHTML = `<i class="fas fa-digital-tachograph" dropdown></i> 
      Wypełnianie <div class="dropdown-note" dropdown>${titleButtonFilling}</div>`;
      this.onlyWords = param;
      if (this.onlyWords) document.querySelector('.above.only-words p').innerHTML = 'Tylko istniejące słowa';
      else document.querySelector('.above.only-words p').innerHTML = 'Dowolny ciąg znaków';
    }


    // createDataLetters(dataLetters) {
    //     let startData = [];
    //     dataLetters.forEach(element => {
    //         if (element.game) startData.push(element);
    //         });
    //         // console.log(startData);
    //         return startData;
    // }

    // createWordsLevel(arrayLongLetters){
    //   const dataWorks = this.createDataLetters(arrayLongLetters);
    //   // console.log(dataWorks.length);
    //   numberWords = dataWorks.length;
    //   // console.log(dataWorks[Math.floor(Math.random()*dataWorks.length)]);
    //   return dataWorks[Math.floor(Math.random()*dataWorks.length)];
    // }

    readWordsWithBase(resultSQL){
      // this.myPromise.then(result => {
        this.gameWord = new Word(resultSQL.word, resultSQL.category, true, resultSQL.description);
        console.log(this.gameWord.word);
      // });
    }


    startParameters(level, attempts, resultSQL) {
      whatCategoryDiv.classList.add('hide');
      document.querySelector("#category").removeEventListener('click', changeCategoryStyle);
      document.querySelector("#category").style.cursor = "default";
      this.attempts = attempts;
      this.level = level;
      this.leftEmpty = level;
      notWord.classList.add('hide');
      titleButtonLongWord = this.level + `-literowe`;
      this.readWordsWithBase(resultSQL);
      this.stringWords = resultSQL.allWords;
      this.guessWordChars = resultSQL.word.split('');
      // let words;
      // switch (level) {
      //   case 5:
      //     // words = this.createWordsLevel(words5Letters);
      //     titleButtonLongWord = `5-literowe`;
      //     // gameWord = this.readWordsWithBase('5-letters');
      //     this.readWordsWithBase(this.gameWord);
      //     // console.log(this.gameWord.word + ' -> 3');
      //     break;
      //   case 6:
      //     // words = this.createWordsLevel(words6Letters);
      //     titleButtonLongWord = `6-literowe`;
      //     this.readWordsWithBase();
      //     break;
      //   case 7:
      //     // words = this.createWordsLevel(words7Letters);
      //     titleButtonLongWord = `7-literowe`;
      //     this.readWordsWithBase('7-letters');
      //     break;
      //   case 8:
      //     // words = this.createWordsLevel(words8Letters);
      //     titleButtonLongWord = `8-literowe`;
      //     this.readWordsWithBase('8-letters');
      //     break;
      //   case 9:
      //     // words = this.createWordsLevel(words9Letters);
      //     titleButtonLongWord = `9-literowe`;
      //     this.readWordsWithBase('9-letters');
      //     break;



        // default:
          // if (level == 5) words = {word:'BANAN', category:'TestBanan'};
          // if (level == 6) words = {word:'AGREST', category:'TestAgrest'};
          // if (level == 7) words = {word:'APASZKA', category:'TestApaszka'};
          // if (level == 8) words = {word:'TEODOLIT', category:'TestTeodolit'};
          // if (level == 9) words = {word:'ARCHITEKT', category:'TestArchitekt'};
      // }
          // if (level == 5) words = {word:'BANAN', category:'TestBanan'};
          // if (level == 5) words = {word:'BANAN', category:'?'};
          // if (level == 6) words = {word:'AGREST', category:'TestAgrest'};
          // if (level == 7) words = {word:'APASZKA', category:'TestApaszka'};
          // if (level == 8) words = {word:'TEODOLIT', category:'TestTeodolit'};
          // if (level == 9) words = {word:'ARCHITEKT', category:'TestArchitekt'};

        // longWordButton.innerHTML = `<i class="fas fa-sort-amount-down-alt" dropdown></i> 
        // Długość słowa <div class="dropdown-note" dropdown>(${titleButtonLongWord} [${numberWords}])</div>`;

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

      // this.guessWord = this.gameWord.word;
      // this.categoryWrapper.innerHTML = 'KATEGORIA:  ' + this.gameWord.category;

      // stringWords = createStringWords(wordsLetters);

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
      console.log(this.typedWord + ' -> twoje słowo');
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

    isWord(level, isWord) {
      return new Promise((resolve, reject) => {
        $.post( "./php/isWordInBaseSQL.php", {nameBase: level + '-letters', isWord: isWord}, function(dataSQL) {
          resolve(dataSQL);
          console.log(dataSQL);
          console.log('Promise - szukanie słowa odbyło się !!!');
          }, "json")
          .fail(function() {
            console.log( "Błąd odczytu z bazy wszystkich słów." );
        });
      });
  }
  

  isOnlyWords(resultSQL){
    // this.isWord(this.level, this.stringWords).then(res => {
        // console.log(resultSQL.allWords);
        // this.stringWord = resultSQL.allWords;
        // console.log(this.stringWords);
        this.createTypedWord();
        if (this.onlyWords) {
          this.isWord(this.level, this.typedWord).then(result => {
            // if (this.stringWords.includes(this.typedWord)) {
              console.log(this.typedWord);
              console.log(result.res);
              console.log(result.il);
            if (result.res) {
                console.log('SŁOWO ISTNIEJE.');
                this.checkWord(resultSQL);
                if (!this.victory) this.createActiveRound();
            } else {
                console.log('NIE MA TAKIEGO SŁOWA.');
                this.stopCurrentLine();
            }
          });
        } else {
            console.log('Dowolny ciąg znaków.');
            // console.log(this.guessWordChars);
            this.checkWord(resultSQL);
            if (!this.victory) this.createActiveRound();
        }

      // });
    }   

    checkWord(resultSQL) {
      // this.myPromise.then(result => {
        let resultCheckedChars = new Array(this.level);
        let tempCurrentLine = [];
        // console.log(this.level + ' -> checWord()');
        // console.log(wordChars + ' -> checWord()');
        this.currentLine.forEach(el => {
            tempCurrentLine.push(el.innerHTML);
        });
          this.guessWordChars = resultSQL.word.split('');
          console.log(this.guessWordChars);

        this.clearLine(this.currentLine);
        for (let i = 0; i < this.level; i++) {
            if (tempCurrentLine[i] == this.guessWordChars[i]) {
              this.guessWordChars[i] = '-';
                tempCurrentLine[i] = '!';
                resultCheckedChars[i] = 'success';
                this.currentWord[i].stateChar = 'success';
            }}
        for (let i = 0; i < this.level; i++) {
            if (tempCurrentLine[i] != '!') {
                for (let j = 0; j < this.level; j++) {
                    if (tempCurrentLine[i] == this.guessWordChars[j]) {
                      this.guessWordChars[j] = '-';
                        resultCheckedChars[i] = 'half-success';
                        if ((this.currentWord[i].stateChar != 'success')) this.currentWord[i].stateChar = 'half-success';
                        break;
                    } else {
                        resultCheckedChars[i] = 'not-char';
                    }
                }
            }
        }
        // console.log(resultCheckedChars);
        this.isVictory(resultCheckedChars, resultSQL);
        this.newViewLine(resultCheckedChars);
        this.createKeyboard(this.currentlyKeyboard, this.keyboard1, this.keyboard2, this.keyboard3, this.keyboard4, resultSQL);
      // });
      }   
    

    isVictory(resultCheckedChars, resultSQL) {
      // this.myPromise.then(result=>{
      let i = 0;
      resultCheckedChars.forEach(char => {
        if (char == 'success') i++;
      });
      if (i == this.level) {
        this.victory = true;
        this.onceAgain(this.level, this.attempts);
        // if (words.category == "?") whatCategoryDiv.classList.remove('hide');
        if (resultSQL.category == "?") startSelectionCategory();
      }
    // });
    }


    newViewLine(resultCheckedChars) {
      console.log(resultCheckedChars);
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


    writeLetter(oneChar, resultSQL) {
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
                this.isOnlyWords(resultSQL);
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
        // console.log(this.gameWord.word);
    }


     createKeyboard(lettersCheme, keyboard1, keyboard2, keyboard3, keyboard4, resultSQL) {
      keyboard1.innerHTML = '';
      keyboard2.innerHTML = '';
      keyboard3.innerHTML = '';
      keyboard4.innerHTML = '';
      for (let i = 0; i < 10; i++) {
        const button = document.createElement('button');
        button.className = lettersCheme[i].stateChar;
        button.innerHTML = String.fromCharCode(lettersCheme[i].numberChar);
        if (lettersCheme[i].stateChar != 'not-char') button.addEventListener('click', () => this.writeLetter(lettersCheme[i], resultSQL));
        keyboard1.appendChild(button);
      }
      for (let i = 10; i < 19; i++) {
        const button = document.createElement('button');
        button.className = lettersCheme[i].stateChar;
        button.innerHTML = String.fromCharCode(lettersCheme[i].numberChar);
        if (lettersCheme[i].stateChar != 'not-char') button.addEventListener('click', () => this.writeLetter(lettersCheme[i], resultSQL));
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
        if (lettersCheme[i].stateChar != 'not-char') button.addEventListener('click', () => this.writeLetter(lettersCheme[i], resultSQL));
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
        if (lettersCheme[i].stateChar != 'not-char') button.addEventListener('click', () => this.writeLetter(lettersCheme[i], resultSQL));
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
                  // if (words.category == "?") whatCategoryDiv.classList.remove('hide');
                  if (words.category == "?") startSelectionCategory();
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


    run(level, attempts) {
      this.myPromise = new Promise((resolve, reject) => {
        $.post( "./php/readWordWithBaseSQL.php", {nameBase: level + '-letters'}, function(dataSQL) {
          resolve(dataSQL);
          console.log('promise - zapytanie wykonane.');
          }, "json")
          .fail(function() {
            console.log( "promise - błąd odczytu z bazy !!!" );
            // this.changeOnlyWords(false);
            let dataSQL = {word: 'BANAN', category: 'Roślina', game: true, description: 'Owoc tropikalny', countWords: 0};
            reject(dataSQL);
        });
    });
    this.myPromise.then(resultSQL=>{
    this.startParameters(level, attempts, resultSQL);
    this.createKeyboard(this.currentlyKeyboard, this.keyboard1, this.keyboard2, this.keyboard3, this.keyboard4, resultSQL);
    this.createStartPlaceGame(level, attempts, this.wordGameWrapper, resultSQL);
    this.returnGame(resultSQL);
      }).catch(resultSQL=>{
        this.startParameters(level, attempts, resultSQL);
        // this.changeOnlyWords(false);
        this.createKeyboard(this.currentlyKeyboard, this.keyboard1, this.keyboard2, this.keyboard3, this.keyboard4, resultSQL);
        this.createStartPlaceGame(level, attempts, this.wordGameWrapper, resultSQL);
        this.changeOnlyWords(false, '(dowolny ciąg liter)');
        this.returnGame(resultSQL);
      });
    }

}



const appGame = new AppGame({
    lettersWrapper: document.getElementById("letters"),
    // categoryWrapper: document.querySelector("#category p"),
    wordGameWrapper: document.getElementById("wordGame"),
    keyboardScheme: document.getElementById("keyboardScheme"),
    keyboard1: document.getElementById("keyboard1"),
    keyboard2: document.getElementById("keyboard2"),
    keyboard3: document.getElementById("keyboard3"),
    keyboard4: document.getElementById("keyboard4"),
    // dataLetters: wordsLetters,
});

appGame.run(5, 6);