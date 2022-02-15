class Game {
    constructor({ lettersWrapper, categoryWrapper, wordGameWrapper }) {
      this.lettersWrapper = lettersWrapper;
      this.categoryWrapper = categoryWrapper;
      this.wordGameWrapper = wordGameWrapper;
      this.alphabet = [10, 11, 12, 13, 14, 15];
      this.qwerty = [25, 28, 30, 42, 12];
    }
    
    writeLetter(letter) {
        console.log(letter);
    }
  
    run() {
      console.log("wystartowałem grę!!!");
      for (let i = 10; i < 36; i++) {
        const letter = i.toString(36);
        const button = document.createElement("button");
        button.innerHTML = letter.toUpperCase();
        button.addEventListener('click', () => this.writeLetter(letter));
        this.lettersWrapper.appendChild(button);
      }
    }
  }
  