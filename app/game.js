class Game {
    constructor({ lettersWrapper, lettersQWERTYWrapper, categoryWrapper, wordGameWrapper }) {
      this.lettersWrapper = lettersWrapper;
      this.lettersQWERTYWrapper = lettersQWERTYWrapper;
      this.categoryWrapper = categoryWrapper;
      this.wordGameWrapper = wordGameWrapper;
      this.alphabet = [65, 260, 66, 67, 262,  68, 69, 280, 70, 71, 72, 73, 74, 75, 76, 321, 77, 78, 323, 79, 211,
        80, 81, 82, 83, 346, 84, 85, 86, 87, 88, 89, 90, 377, 379];
      this.qwerty = [81, 87, 69, 82, 84, 89, 85, 73, 79, 80, 65, 83, 68, 70, 71, 72, 74, 75, 76, 90, 88, 67, 86,
        66, 78, 77, 260, 262, 280, 321, 323, 211, 346, 377, 379];
    }
    
    writeLetter(letter) {
        console.log(letter);
    }

    createKaybord(letters, wrapper) {
      for (let i = 0; i < letters.length; i++) {
        const letter = String.fromCharCode(letters[i]);
        const button = document.createElement("button");
        button.innerHTML = letter;
        button.addEventListener('click', () => this.writeLetter(letter));
        wrapper.appendChild(button);
      }
    }
  
    run() {
      console.log("wystartowałem grę!!!");
      this.createKaybord(this.alphabet, this.lettersWrapper);
      this.createKaybord(this.qwerty, this.lettersQWERTYWrapper);
    }

  }
  