// import { GuessWord } from './guessWord.js';
import { words5Letters } from '../src/5-letters.js';
import { words6Letters } from '../src/6-letters.js';
let wordsLetters = words5Letters;

const setting5Letters = document.getElementById('5letters');
const setting6Letters = document.getElementById('6letters');
const onlyWords = document.getElementById('onlyWords');
const stringChars = document.getElementById('stringChars');
const onceAgainSection = document.getElementById('onceAgain');
setting5Letters.addEventListener('click', ()=> {
    onceAgainSection.classList.add('hide');
    wordsLetters = words5Letters;
    // console.log(stringWords);
    stringWords = createStringWords(words5Letters);
    // console.log(stringWords);
    game.run(5);
});
setting6Letters.addEventListener('click', ()=> {
    onceAgainSection.classList.add('hide');
    wordsLetters = words6Letters;
    // console.log(stringWords);
    stringWords = createStringWords(words6Letters);
    // console.log(stringWords);
    game.run(6);
});
let stringWords = ''; //createStringWords(words5Letters');
// console.log(stringWords);
onlyWords.addEventListener('click', ()=> {
    game.changeOnlyWords(true);
});
stringChars.addEventListener('click', ()=> {
    game.changeOnlyWords(false);
});


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

    words5 = [{
        word: '',
        category: '',
        game: false
    }]

    words6 = [{
        word: '',
        category: '',
        game: false
    }]

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
        this.onlyWords = false;
    }

    clearLine(line) {
        line.forEach(el => {
           el.style.display = 'none';
        });
    }

    createTypedWord() {
        this.typedWord = '';
        this.currentLine.forEach(el => {
            this.typedWord +=  el.innerHTML;
        });
    }

    changeOnlyWords(param) {
        this.onlyWords = param;
        if (this.onlyWords) console.log('Tylko istniejące słowa');
        else console.log('Dowolny ciąg znaków');
    }


    createDataLetters(dataLetters) {
        let startData = [];
        // console.log(this.dataLetters);
        dataLetters.forEach(element => {
            if (element.game) startData.push(element);
            });
            // console.log(startData.length);
            // console.log(startData);
            return startData;
    }


    startParameters(level) {
      this.level = level;
      this.leftEmpty = level;
      let words;
      if (level == 5) {
        // this.dataLetters = words5Letters;
        // this.createDataLetters(this.words5,  words5Letters);
        this.words5 = this.createDataLetters(words5Letters);
        words = this.words5[Math.floor(Math.random()*this.words5.length)];
      }
    //   console.log(this.words5.length);
      // if (level == 5) words = {word:'BANAN', category:'TestBanan'};
      if (level == 6) {
        // this.dataLetters = words6Letters;
        // this.createDataLetters(this.words6, words6Letters);
        this.words6 = this.createDataLetters(words6Letters);
        words = this.words6[Math.floor(Math.random()*this.words6.length)];
      }
      // if (level == 6) words = {word:'AGREST', category:'TestAgrest'};

      stringWords = createStringWords(wordsLetters);

      this.guessWord = words.word;

    //   if (stringWords.includes(this.guessWord)) console.log(`Jest w bazie: ${this.guessWord}`);
    //   else console.log(`Nie ma w bazie: ${this.guessWord}`);


      this.categoryWrapper.innerHTML = 'KATEGORIA:  ' + words.category;
    //   console.log(words);

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


    isOnlyWords(){
        this.createTypedWord();
        if (this.onlyWords) {
            if (stringWords.includes(this.typedWord)) {
                console.log('To jest słowo');
                this.checkWord();
            } else {
                console.log('NIE - słowo');
                this.checkWord();
            }
        } else {
            console.log('NIE - słowo');
            this.checkWord();
        }
    }   


    checkWord() {
        // this.createTypedWord();
        let resultCheckedChars = new Array(this.level);
        let tempCurrentLine = [];
        // let tempWord = '';
        this.currentLine.forEach(el => {
            tempCurrentLine.push(el.innerHTML);
            // tempWord +=  el.innerHTML;
        });
        // if (stringWords.includes(tempWord)) {
        //     console.log('To jest słowo');
        // } else {
        //     console.log('NIE - słowo');
        // }
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
        this.onceAgain(this.level);
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
                // this.checkWord();
                this.isOnlyWords();
                if (!this.victory) this.createActiveRound();
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
      divBackspace.addEventListener('click', () => this.delLetter());
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
      element.classList.add('current-letter');
    }


    createStartPlaceGame(level, wrapper) {
      wrapper.innerHTML = '';
        for ( let i = 0; i < level + 1; i++){
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


    removeListenerLetter(element) {
    if (element.removeEventListener) {
        element.removeEventListener ('click', () => this.changeLetter(element));
        } else if (element.detachEvent) {
            element.detachEvent ('click', () => this.changeLetter(element));
        }
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
                    this.currentLine = document.querySelectorAll('.current-round .one-letter');
                    this.currentLine = [...this.currentLine];
                    this.currentLine.forEach(element => {
                        element.addEventListener('click', () => this.changeLetter(element));
                    });
                    this.leftEmpty = this.level;
                } else {
                  this.showWord(this.guessWord);
                  this.onceAgain(this.level);
                  }
                break;
            }
        }
    }


    onceAgain(quantity) {
      onceAgainSection.classList.remove('hide');
      const onceAgainDiv = document.querySelector('#onceAgain div');
    //   console.log(onceAgainDiv);
      onceAgainDiv.addEventListener('click', () =>{
        onceAgainSection.classList.add('hide');
        this.run(quantity);
      });
    }


    run(quantity) {
    this.startParameters(quantity);
    this.createKeyboard(this.currentlyKeyboard, this.keyboard1, this.keyboard2, this.keyboard3, this.keyboard4);
    this.createStartPlaceGame(quantity, this.wordGameWrapper);
    }


}

const game = new Game({
    lettersWrapper: document.getElementById("letters"),
    categoryWrapper: document.getElementById("category"),
    wordGameWrapper: document.getElementById("wordGame"),
    keyboardScheme: document.getElementById("keyboardScheme"),
    keyboard1: document.getElementById("keyboard1"),
    keyboard2: document.getElementById("keyboard2"),
    keyboard3: document.getElementById("keyboard3"),
    keyboard4: document.getElementById("keyboard4"),
    dataLetters: wordsLetters,
});

game.run(5);