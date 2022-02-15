class Game {
    constructor({ lettersWrapper, categoryWrapper, wordGameWrapper, keybourdScheme }) {
      this.lettersWrapper = lettersWrapper;
      this.categoryWrapper = categoryWrapper;
      this.wordGameWrapper = wordGameWrapper;
      this.keybourdScheme = keybourdScheme;
      this.alphabet = [65, 260, 66, 67, 262,  68, 69, 280, 70, 71, 72, 73, 74, 75, 76, 321, 77, 78, 323, 79, 211,
        80, 81, 82, 83, 346, 84, 85, 86, 87, 88, 89, 90, 377, 379];
      this.qwerty = [81, 87, 69, 82, 84, 89, 85, 73, 79, 80, 65, 83, 68, 70, 71, 72, 74, 75, 76, 90, 88, 67, 86,
        66, 78, 77, 260, 262, 280, 321, 323, 211, 346, 377, 379];
      this.currentlyKeybourd = this.alphabet;
    }
    
    writeLetter(letter) {
        console.log(letter);
    }

    changeKeybourd() {
        if (this.currentlyKeybourd == this.alphabet) this.currentlyKeybourd = this.qwerty;
        else this.currentlyKeybourd = this.alphabet;
    }

     createKeyboard(lettersCheme, wrapper) {
       wrapper.innerHTML = "";
      for (let i = 0; i < lettersCheme.length; i++) {
        const letter = String.fromCharCode(lettersCheme[i]);
        const button = document.createElement("button");
        button.innerHTML = letter;
        button.addEventListener('click', () => this.writeLetter(letter));
        wrapper.appendChild(button);
      }
    }
  
    run() {
      this.createKeyboard(this.currentlyKeybourd, this.lettersWrapper);
      this.keybourdScheme.addEventListener('click', () =>{
          this.changeKeybourd();
          this.createKeyboard(this.currentlyKeybourd, this.lettersWrapper);
      })
      console.log("wystartowałem grę!!!");
      // this.createKeyboard(this.currentlyKeybourd, this.lettersWrapper);
      // this.createKeyboard(this.qwerty, this.lettersQWERTYWrapper);
    }

  }
  