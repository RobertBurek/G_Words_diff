class Game {
    constructor({ lettersWrapper, categoryWrapper, wordGameWrapper, keybourdScheme, keybourd1, keybourd2, keybourd3, keybourd4 }) {
      this.lettersWrapper = lettersWrapper;
      this.categoryWrapper = categoryWrapper;
      this.wordGameWrapper = wordGameWrapper;
      this.keybourdScheme = keybourdScheme;
      this.keybourd1 = keybourd1;
      this.keybourd2 = keybourd2;
      this.keybourd3 = keybourd3;
      this.keybourd4 = keybourd4;
      this.alphabet = [65, 260, 66, 67, 262,  68, 69, 280, 70, 71, 72, 73, 74, 75, 76, 321, 77, 78, 323, 79, 211,
        80, 81, 82, 83, 346, 8678, 84, 85, 86, 87, 88, 89, 90, 377, 379];
      this.qwerty = [81, 87, 69, 82, 84, 89, 85, 73, 79, 80, 65, 83, 68, 70, 71, 72, 74, 75, 76, 90, 88, 67, 86,
        66, 78, 77, 8678, 260, 262, 280, 321, 323, 211, 346, 377, 379];
      this.currentlyKeybourd = this.alphabet;
    }
    
    writeLetter(letter) {
        console.log(letter.charCodeAt());
        console.log(letter);
    }

    changeKeybourd() {
        if (this.currentlyKeybourd == this.alphabet) this.currentlyKeybourd = this.qwerty;
        else this.currentlyKeybourd = this.alphabet;
    }

     createKeyboard(lettersCheme, keybourd1, keybourd2, keybourd3, keybourd4) {
      keybourd1.innerHTML = "";
      keybourd2.innerHTML = "";
      keybourd3.innerHTML = "";
      keybourd4.innerHTML = "";
      for (let i = 0; i < 10; i++) {
        const letter = String.fromCharCode(lettersCheme[i]);
        const button = document.createElement("button");
        button.innerHTML = letter;
        button.addEventListener('click', () => this.writeLetter(letter));
        keybourd1.appendChild(button);
      }
      for (let i = 10; i < 19; i++) {
        const letter = String.fromCharCode(lettersCheme[i]);
        const button = document.createElement("button");
        button.innerHTML = letter;
        button.addEventListener('click', () => this.writeLetter(letter));
        keybourd2.appendChild(button);
      }
      for (let i = 19; i < 27; i++) {
        const letter = String.fromCharCode(lettersCheme[i]);
        const button = document.createElement("button");
        button.innerHTML = letter;
        button.addEventListener('click', () => this.writeLetter(letter));
        keybourd3.appendChild(button);
      }
      for (let i = 27; i < 36; i++) {
        const letter = String.fromCharCode(lettersCheme[i]);
        const button = document.createElement("button");
        button.innerHTML = letter;
        button.addEventListener('click', () => this.writeLetter(letter));
        keybourd4.appendChild(button);
      }
    }

    charsListing(wrapper) {
      wrapper.innerHTML = "";
     for (let i = 8650; i < 8890; i++) {
       const letter = String.fromCharCode(i);
      //  8674  8801  8811 8688
       const button = document.createElement("button");
       button.innerHTML = letter;
       button.addEventListener('click', () => this.writeLetter(letter));
       wrapper.appendChild(button);
     }
   }
  
    run() {
      this.createKeyboard(this.currentlyKeybourd, this.keybourd1, this.keybourd2, this.keybourd3, this.keybourd4);
      this.keybourdScheme.addEventListener('click', () =>{
          this.changeKeybourd();
          this.createKeyboard(this.currentlyKeybourd, this.keybourd1, this.keybourd2, this.keybourd3, this.keybourd4);
      })
      // this.charsListing(this.lettersWrapper);
    }

  }
  