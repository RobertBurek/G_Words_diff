// import { GuessWord } from './guessWord.js';
const setting5Letters = document.getElementById('5letters');
const setting6Letters = document.getElementById('6letters');
setting5Letters.addEventListener('click', ()=> {
  game.run(5);
});
setting6Letters.addEventListener('click', ()=> {
  game.run(6);
});


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
        word: 'WANNA',
        category: 'Rzecz'
    },{
        word: 'WÓZEK',
        category: 'Rzecz'
    },{
        word: 'PAJĄK',
        category: 'Przyroda'
    },{
        word: 'PERŁA',
        category: 'Rzecz'
    },{
        word: 'TORBA',
        category: 'Rzecz'
    },{
        word: 'TRAWA',
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
    }


    clearLine(line) {
        line.forEach(el => {
           el.style.display = 'none';
        });
    }


    startParameters(level) {
      this.level = level;
      this.leftEmpty = level;
      let words;
      if (level == 5) words = this.words5[Math.floor(Math.random()*this.words5.length)];
      if (level == 6) words = this.words6[Math.floor(Math.random()*this.words6.length)];

      this.guessWord = words.word;
      this.categoryWrapper.innerHTML = 'KATEGORIA:  ' + words.category;

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
        this.newViewLine(resultCheckedChars);
        this.createKeyboard(this.currentlyKeyboard, this.keyboard1, this.keyboard2, this.keyboard3, this.keyboard4);
    }
    

  newViewLine(resultCheckedChars) {
    const parentLine = this.currentLine[0].parentNode;
    for (let i = 0; i < this.level; i++) {
      if (this.currentWord[i].stateChar != 'success')
        if (this.currentWord[i].stateChar != 'half-success') {
          this.currentWord[i].stateChar = 'not-char';
        }
      const divLetter = document.createElement('div');
      divLetter.className = `one-letter ${resultCheckedChars[i]}`;
      divLetter.innerHTML = this.currentLine[i].innerHTML;
      parentLine.appendChild(divLetter);
    }
  }


  writeLetter(oneChar) {
    const activeLetter = document.querySelector('div.current-letter');
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
          this.checkWord();
          this.createActiveRound();
        }
    }


    delLetter() {
      const activeLetter = document.querySelector('div.current-letter');
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
        // const letter = String.fromCharCode(lettersCheme[i].numberChar);
        const button = document.createElement('button');
        button.className = lettersCheme[i].stateChar;
        button.innerHTML = String.fromCharCode(lettersCheme[i].numberChar);
        if (lettersCheme[i].stateChar != 'not-char') button.addEventListener('click', () => this.writeLetter(lettersCheme[i]));
        keyboard1.appendChild(button);
      }
      for (let i = 10; i < 19; i++) {
        // const letter = String.fromCharCode(lettersCheme[i].numberChar);
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
        // const letter = String.fromCharCode(lettersCheme[i].numberChar);
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
        // const letter = String.fromCharCode(lettersCheme[i].numberChar);
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
                  // console.log(`litera ${i}`);
                  // this.currentLine.push(divLetter);
                }
                // console.log(this.currentLine);
                divLine.appendChild(divLetter);
            }
            wrapper.appendChild(divLine);
        }
        this.createCurrentLine();
        // console.log(this.currentLine);
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
                // console.log(this.currentLine);
                this.currentLine = [...this.currentLine];
                this.currentLine.forEach(element => {
                    element.addEventListener('click', () => this.changeLetter(element));
                });
                this.leftEmpty = this.level;
    }


    createActiveRound() {
        let listRounds = document.querySelectorAll('#wordGame .line');
        listRounds = [...listRounds];
        // console.log(listRounds[0]);
        for (let i = 0; i < listRounds.length; i++) {
            if (listRounds[i].className == 'line current-round') {
                listRounds[i].classList.remove('current-round');
                listRounds[i + 1].classList.add('current-round');
                listRounds[i + 1].firstChild.classList.add('current-letter');
                this.currentLine = document.querySelectorAll('.current-round .one-letter');
                // console.log(this.currentLine);
                this.currentLine = [...this.currentLine];
                this.currentLine.forEach(element => {
                    element.addEventListener('click', () => this.changeLetter(element));
                });
                this.leftEmpty = this.level;
                // console.log(this.currentLine);
                // console.log(this.leftEmpty);
                break;
            }
        }
        // for ( let i = 0; i < level + 1; i++){
        //     const divLine = document.createElement('div');
        //     if (i == 0) divLine.className = 'line current-round';
        //     else divLine.className = 'line';
        //     for ( let j = 0; j < level; j++){
        //         const divLetter = document.createElement('div');
        //         if ((j == 0) && (i == 0)) divLetter.className = 'one-letter current-letter';
        //         else divLetter.className = 'one-letter';
        //         if (i == 0) {
        //           divLetter.addEventListener('click', () => this.changeLetter(divLetter));
        //           this.currentLine.push(divLetter);
        //         }
        //         divLine.appendChild(divLetter);
        //     }
        //     wrapper.appendChild(divLine);
        // }
    }

    // createStartPlaceGame(level, wrapper, currentRound) {
    //     for ( let i = 0; i < level + 1; i++){
    //         const divLine = document.createElement('div');
    //         if (i == currentRound) divLine.className = 'line current-round';
    //         else divLine.className = 'line';
    //         for ( let j = 0; j < level; j++){
    //             const divLetter = document.createElement('div');
    //             if ((j == 0) && (i == currentRound)) divLetter.className = 'one-letter current-letter';
    //             else divLetter.className = 'one-letter';
    //             if (i == currentRound) {
    //               divLetter.addEventListener('click', () => this.changeLetter(divLetter));
    //               this.currentLine.push(divLetter);
    //             }
    //             divLine.appendChild(divLetter);
    //         }
    //         wrapper.appendChild(divLine);
    //     }
    // }

    run(quantity) {
      // this.level = quantity;
      // this.leftEmpty = quantity;
      // this.charsObject = [];
      // for (let i = 0; i < this.numbersChar.length; i++ ){
      //   this.charsObject.push(new CharKeyboard(this.numbersChar[i], 'normal'));
      // }
    this.startParameters(quantity);
    this.createKeyboard(this.currentlyKeyboard, this.keyboard1, this.keyboard2, this.keyboard3, this.keyboard4);
      // console.log(this.wordGameWrapper);
      // this.createStartPlaceGame(this.level, this.wordGameWrapper, 5);
    this.createStartPlaceGame(quantity, this.wordGameWrapper);
     // this.createActiveRound();
    }
}