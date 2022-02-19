// import { GuessWord } from "./guessWord.js";

class CharKeyboard {
      constructor(numberChar, stateChar) {
        this.numberChar = numberChar;
        this.stateChar = stateChar;
      }

      changeStateChar() {

      }
}

class GuessWord {
    constructor (word, level) {
        this.word = word;
        this.level = level;
    }
}


class Game {

    words5 = [{
        word: 'BALON',
        category: 'Rzecz'
    },{
        word: 'MOTYL',
        category: 'Przyroda'
    },{
        word: 'MUCHA',
        category: 'Przyroda'
    },{
        word: 'MAZAK',
        category: 'Rzecz'
    },{
        word: 'BANAN',
        category: 'Jedzenie'
    },{
        word: 'POTOK',
        category: 'Przyroda'
    },{
        word: 'FARBA',
        category: 'Rzecz'
    }]

    words6 = [{
        word: 'ANTENA',
        category: 'Rzecz'
    },{
        word: 'KAŁUŻA',
        category: 'Przyroda'
    },{
        word: 'KALINA',
        category: 'Przyroda'
    },{
        word: 'AMULET',
        category: 'Rzecz'
    },{
        word: 'AGREST',
        category: 'Jedzenie'
    },{
        word: 'BAMBUS',
        category: 'Przyroda'
    },{
        word: 'FORINT',
        category: 'Rzecz'
    }]

    constructor({ lettersWrapper, categoryWrapper, wordGameWrapper, keyboardScheme, keyboard1, keyboard2, keyboard3, keyboard4 }) {
      this.lettersWrapper = lettersWrapper;
      this.categoryWrapper = categoryWrapper;
      this.wordGameWrapper = wordGameWrapper;
      this.keyboardScheme = keyboardScheme;
      this.keyboard1 = keyboard1;
      this.keyboard2 = keyboard2;
      this.keyboard3 = keyboard3;
      this.keyboard4 = keyboard4;
      this.numbersChar = [65,  66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76,  77, 78, 79, 
        //                 0   1   2    3   4   5   6   7  8    9   10  11  12  13   14
        80, 81, 82, 83,  84, 85, 86, 87, 88, 89, 90, 211, 260, 262, 280, 321, 323, 346, 377, 379];
      //15  16   17  18   19 20   21 22  23  24  25   26   27   28   29   30   31  32  33    34  
      this.charsObject = [];
      for (let i = 0; i < this.numbersChar.length; i++ ){
        this.charsObject.push(new CharKeyboard(this.numbersChar[i], "normal"));
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

      this.level = 5;
      this.leftEmpty = this.level;
      this.currentWord = [];
      const {word, category} = this.words5[Math.floor(Math.random()*this.words5.length)];
      this.categoryWrapper.innerHTML = 'KATEGORIA:  ' + category;
      this.guessWord = new GuessWord(word, this.level);
      // console.log(this.guessWord.word);
      // console.log(this.guessWord.level);
    }
    
    writeLetter(letter, element, index) {
        // console.log(letter.charCodeAt());
        // console.log(letter);
        // console.log(element);
        // console.log(index);
        const activeLetter = document.querySelector('div.current-letter');
        let position = this.currentWord.indexOf(activeLetter); 
        if (this.currentWord[position].innerHTML == "") this.leftEmpty -= 1;
        // console.log(this.leftEmpty);
        activeLetter.innerHTML = letter;
        // if (this.currentWord[position].innerHTML != "") this.leftEmpty -= 1;
        // let position = this.currentWord.indexOf(activeLetter); 
        // if (this.currentWord[position].innerHTML != "") this.leftEmpty -= 1;
        if (this.leftEmpty > 0) {
            if (position == this.level - 1) position = 0;

            while (this.currentWord[position].innerHTML != "") {
              // console.log(this.leftEmpty);
              position += 1;
              if (position == this.level) position = 0;
              // position += 1;
            }
            // console.log(position);
            activeLetter.classList.remove('current-letter');
            this.currentWord[position].classList.add('current-letter');
      } else {
        activeLetter.classList.remove('current-letter');
        this.createActiveRound();
      }
        // this.leftEmpty -= 1;
        // console.log(this.leftEmpty);
        // console.log(this.currentWord[position]);
      //   if (index%2 == 1) {
      //   this.currentlyKeyboard[index].stateChar = 'red';
      //   element.classList.add('red'); 
      // } else {
      //   this.currentlyKeyboard[index].stateChar = 'green';
      //   element.classList.add('green');
      //   }
    }

    changeKeyboard() {
        if (this.currentlyKeyboard == this.alphabet) this.currentlyKeyboard = this.qwerty;
        else this.currentlyKeyboard = this.alphabet;
    }

     createKeyboard(lettersCheme, keyboard1, keyboard2, keyboard3, keyboard4) {
      keyboard1.innerHTML = "";
      keyboard2.innerHTML = "";
      keyboard3.innerHTML = "";
      keyboard4.innerHTML = "";
      for (let i = 0; i < 10; i++) {
        const letter = String.fromCharCode(lettersCheme[i].numberChar);
        const button = document.createElement("button");
        button.className = lettersCheme[i].stateChar;
        button.innerHTML = letter;
        button.addEventListener('click', () => this.writeLetter(letter, button, i));
        keyboard1.appendChild(button);
      }
      for (let i = 10; i < 19; i++) {
        const letter = String.fromCharCode(lettersCheme[i].numberChar);
        const button = document.createElement("button");
        button.className = lettersCheme[i].stateChar;
        button.innerHTML = letter;
        button.addEventListener('click', () => this.writeLetter(letter, button, i));
        keyboard2.appendChild(button);
      }
      const divKeyboard = document.createElement("div");
      divKeyboard.setAttribute("id", "keyboardScheme");
      divKeyboard.className='keyboard-scheme';
      divKeyboard.innerHTML = '<i class="fas fa-keyboard"></i>';
      divKeyboard.addEventListener('click', () =>{
        this.changeKeyboard();
        this.createKeyboard(this.currentlyKeyboard, this.keyboard1, this.keyboard2, this.keyboard3, this.keyboard4);
      });
      keyboard3.appendChild(divKeyboard);
      for (let i = 19; i < 26; i++) {
        const letter = String.fromCharCode(lettersCheme[i].numberChar);
        const button = document.createElement("button");
        button.className = lettersCheme[i].stateChar;
        button.innerHTML = letter;
        button.addEventListener('click', () => this.writeLetter(letter, button, i));
        keyboard3.appendChild(button);
      }
      const divBackspace = document.createElement("div");
      divBackspace.className = 'back-space';
      divBackspace.innerHTML = '<i class="fas fa-long-arrow-alt-left"></i>';
      divBackspace.addEventListener('click', () => this.writeLetter(letter, divBackspace, 10));
      keyboard3.appendChild(divBackspace);
      for (let i = 26; i < 35; i++) {
        const letter = String.fromCharCode(lettersCheme[i].numberChar);
        const button = document.createElement("button");
        button.className = lettersCheme[i].stateChar;
        button.innerHTML = letter;
        button.addEventListener('click', () => this.writeLetter(letter, button, i));
        keyboard4.appendChild(button);
      }
    }


    changeLetter(element) {
      this.currentWord.forEach(element => {
        element.classList.remove('current-letter')
      });
      element.classList.add('current-letter');
    }

    createStartPlaceGame(level, wrapper) {
        for ( let i = 0; i < level + 1; i++){
            const divLine = document.createElement("div");
            if (i == 0) divLine.className = 'line current-round';
            else divLine.className = 'line';
            for ( let j = 0; j < level; j++){
                const divLetter = document.createElement("div");
                if ((j == 0) && (i == 0)) divLetter.className = 'one-letter current-letter';
                else divLetter.className = 'one-letter';
                if (i == 0) {
                  divLetter.addEventListener('click', () => this.changeLetter(divLetter));
                  this.currentWord.push(divLetter);
                }
                divLine.appendChild(divLetter);
            }
            wrapper.appendChild(divLine);
        }
    }

    removeListenerLetter(element) {
    if (element.removeEventListener) {
        element.removeEventListener ('click', () => this.changeLetter(element));
        } else if (element.detachEvent) {
            element.detachEvent ('click', () => this.changeLetter(element));
        }
    }

    createActiveRound() {
        this.currentWord.forEach(element => {
            element.removeEventListener('click', () => this.changeLetter(element));
        });
        let listRounds = document.querySelectorAll('#wordGame .line');
        listRounds = [...listRounds];
        // console.log(listRounds[0]);
        for (let i = 0; i < listRounds.length; i++) {
            if (listRounds[i].className == "line current-round") {
                listRounds[i].classList.remove("current-round");
                listRounds[i].classList.remove("current-round");
                listRounds[i + 1].classList.add("current-round");
                listRounds[i + 1].firstChild.classList.add("current-letter");
                this.currentWord = document.querySelectorAll('.current-round .one-letter');
                // console.log(this.currentWord);
                this.currentWord = [...this.currentWord];
                this.currentWord.forEach(element => {
                    element.addEventListener('click', () => this.changeLetter(element));
                });
                this.leftEmpty = this.level;
                // console.log(this.currentWord);
                break;
            }
        }
        // for ( let i = 0; i < level + 1; i++){
        //     const divLine = document.createElement("div");
        //     if (i == 0) divLine.className = 'line current-round';
        //     else divLine.className = 'line';
        //     for ( let j = 0; j < level; j++){
        //         const divLetter = document.createElement("div");
        //         if ((j == 0) && (i == 0)) divLetter.className = 'one-letter current-letter';
        //         else divLetter.className = 'one-letter';
        //         if (i == 0) {
        //           divLetter.addEventListener('click', () => this.changeLetter(divLetter));
        //           this.currentWord.push(divLetter);
        //         }
        //         divLine.appendChild(divLetter);
        //     }
        //     wrapper.appendChild(divLine);
        // }
    }

    // createStartPlaceGame(level, wrapper, currentRound) {
    //     for ( let i = 0; i < level + 1; i++){
    //         const divLine = document.createElement("div");
    //         if (i == currentRound) divLine.className = 'line current-round';
    //         else divLine.className = 'line';
    //         for ( let j = 0; j < level; j++){
    //             const divLetter = document.createElement("div");
    //             if ((j == 0) && (i == currentRound)) divLetter.className = 'one-letter current-letter';
    //             else divLetter.className = 'one-letter';
    //             if (i == currentRound) {
    //               divLetter.addEventListener('click', () => this.changeLetter(divLetter));
    //               this.currentWord.push(divLetter);
    //             }
    //             divLine.appendChild(divLetter);
    //         }
    //         wrapper.appendChild(divLine);
    //     }
    // }

    run() {
        this.createKeyboard(this.currentlyKeyboard, this.keyboard1, this.keyboard2, this.keyboard3, this.keyboard4);
        // console.log(this.wordGameWrapper);
        // this.createStartPlaceGame(this.level, this.wordGameWrapper, 5);
        this.createStartPlaceGame(this.level, this.wordGameWrapper);
        // this.createActiveRound();
    }
}