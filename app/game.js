class CharKeyboard {
      constructor(numberChar, stateChar) {
        this.numberChar = numberChar;
        this.stateChar = stateChar;
      }

      changeStateChar() {

      }
}


class Game {
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
      
      
      // 260, 66, 67, 262,  68, 69, 280, 70, 71, 72, 73, 74, 75, 76, 321, 77, 78, 323, 79, 211,
        // 80, 81, 82, 83, 346, 8678, 84, 85, 86, 87, 88, 89, 90, 377, 379];
      // this.qwerty = [81, 87, 69, 82, 84, 89, 85, 73, 79, 80, 65, 83, 68, 70, 71, 72, 74, 75, 76, 90, 88, 67, 86,
      //   66, 78, 77, 8678, 260, 262, 280, 321, 323, 211, 346, 377, 379];
      this.currentlyKeyboard = this.alphabet;
    }
    
    writeLetter(letter, element, index) {
        // console.log(letter.charCodeAt());
        // console.log(letter);
        // console.log(element);
        if (index%2 == 1) {
        this.currentlyKeyboard[index].stateChar = 'red';
        element.classList.add('red'); 
      } else {
        this.currentlyKeyboard[index].stateChar = 'green';
        element.classList.add('green');
        }
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
      // const letter = String.fromCharCode(8678);   <i class="fal fa-arrow-alt-left"></i>
      const divBackspace = document.createElement("div");
      // divBackspace.setAttribute("id", "backSpace");
      divBackspace.className = 'back-space';
      divBackspace.innerHTML = '<i class="fas fa-long-arrow-alt-left"></i>';
      divBackspace.addEventListener('click', () => this.writeLetter(letter, divBackspace, 10));
      keyboard3.appendChild(divBackspace);


      // const divBackspace = document.createElement("div");
      // divBackspace.className = 'backspace';
      // divBackspace.innerHTML = letter;
      // divBackspace.addEventListener('click', () => this.writeLetter(letter, divBackspace, i));
      // keyboard3.appendChild(divBackspace);

      for (let i = 26; i < 35; i++) {
        const letter = String.fromCharCode(lettersCheme[i].numberChar);
        const button = document.createElement("button");
        button.className = lettersCheme[i].stateChar;
        button.innerHTML = letter;
        button.addEventListener('click', () => this.writeLetter(letter, button, i));
        keyboard4.appendChild(button);
      }
    }

  //   charsListing(wrapper) {
  //     wrapper.innerHTML = "";
  //    for (let i = 8650; i < 8890; i++) {
  //      const letter = String.fromCharCode(i);
  //     //  8678  8674  8801  8811 8688
  //      const button = document.createElement("button");
  //      button.innerHTML = letter;
  //      button.addEventListener('click', () => this.writeLetter(letter));
  //      wrapper.appendChild(button);
  //    }
  //  }
  
    run() {

        // for (let i = 0; i < this.numbersChar.length; i++ ){
        //   this.charsObject.push(new CharKeyboard(this.numbersChar[i], "normal"));
        // }
        // console.log(this.alphabet[0]);
      this.createKeyboard(this.currentlyKeyboard, this.keyboard1, this.keyboard2, this.keyboard3, this.keyboard4);
      // this.keyboardScheme.addEventListener('click', () =>{
      //     this.changeKeyboard();
      //     this.createKeyboard(this.currentlyKeyboard, this.keyboard1, this.keyboard2, this.keyboard3, this.keyboard4);
      // })
      // this.charsListing(this.lettersWrapper);
    }

  }
  