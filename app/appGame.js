import { allWords5 } from "../src/allWords-5-letters.js";
import { allWords6 } from "../src/allWords-6-letters.js";
import { allWords7 } from "../src/allWords-7-letters.js";
import { allWords8 } from "../src/allWords-8-letters.js";
import { allWords9 } from "../src/allWords-9-letters.js";
import { words5Letters } from "../src/5-lettersBIS.js";
import { words6Letters } from "../src/6-lettersBIS.js";
import { words7Letters } from "../src/7-lettersBIS.js";
import { words8Letters } from "../src/8-lettersBIS.js";
import { words9Letters } from "../src/9-lettersBIS.js";


class GameRound {
	constructor(
		word,
		category,
		game,
		description,
		level,
		attempt,
		isCategory,
		isOnlyWord,
		points
	) {
		this.word = word;
		this.category = category;
		this.game = game;
		this.description = description;
		this.level = level;
		this.attempt = attempt;
		this.isCategory = isCategory;
		this.isOnlyWord = isOnlyWord;
		this.points = points;
		// this.multiplierIsCategory = 3;
		this.bonusIsCategory = 0;
		this.multiplierIsOnlyWord = 1;
	}

  // setBonusIsCategory(level){
  //   this.bonusIsCategory = 20 * level;
  // }

	checkCategory(level) {
		if (this.category != "?") {
			this.isCategory = true;
			// this.multiplierIsCategory = 2;
			this.bonusIsCategory = 0;
		} else {
			this.isCategory = false;
			// this.multiplierIsCategory = 3;
			this.bonusIsCategory = level * 20;
		}
	}

	chengeIsOnlyWord(param) {
		if (param) {
			this.isOnlyWord = false;
			this.multiplierIsOnlyWord = 1;
		} else {
			this.isOnlyWord = true;
			this.multiplierIsOnlyWord = 2;
		}
	}

	startParameters(dataSQL, level, attempts) {
		this.word = dataSQL["word"];
		this.category = dataSQL["category"];
		this.game = dataSQL["game"];
		this.description = dataSQL["description"];
		this.level = level;
		this.attempt = attempts;
		// this.checkCategory(level);
    // this.oneRoundGame.setBonusIsCategory(level);
    this.bonusIsCategory = 20 * level;
		this.isOnlyWord = false;
    // this.bonusIsCategory = level * 2 * 10;
		// this.points = level * 10 * this.multiplierIsCategory * this.multiplierIsOnlyWord;
		this.points = this.countPoints(10, level, 2) + this.bonusIsCategory;
	}

	countPoints(round, level, multiplier) {
		return (
			level * round * multiplier
			// (this.isOnlyWord) ? (level * round + this.bonusIsCategory * this.multiplierIsOnlyWord):(level * round + this.bonusIsCategory * this.multiplierIsOnlyWord);
		);
	}

	setCategory(value) {
		this.category = value;
	}

	setAttempt(value) {
		this.attempt = value;
	}

	setIsCategory(value) {
		this.isCategory = value;
	}

	setIsOnlyWord(value) {
		this.isOnlyWord = value;
	}

	setPoints(value) {
		this.points = value;
	}
}

let numberWords;
let stringWords;
let titleButtonLongWord;
let wordVictory;

// const categoryWrapper = document.querySelector("#category p");
const longWordButton = document.getElementById("longWord");
const fillingButton = document.getElementById("filling");
const setting5Letters = document.getElementById("5letters");
const setting6Letters = document.getElementById("6letters");
const setting7Letters = document.getElementById("7letters");
const setting8Letters = document.getElementById("8letters");
const setting9Letters = document.getElementById("9letters");
const onlyWords = document.getElementById("onlyWords");
const notWord = document.querySelector(".not-word");
const stringChars = document.getElementById("stringChars");
const onceAgainSection = document.getElementById("onceAgain");
const divOnlyWords = document.querySelector(".above.only-words");
const pOnlyWords = document.querySelector(".above.only-words p");

setting5Letters.addEventListener("click", () => {
	listenerLongLetters(5, 6);
});
setting6Letters.addEventListener("click", () => {
	listenerLongLetters(6, 6);
});
setting7Letters.addEventListener("click", () => {
	listenerLongLetters(7, 6);
});
setting8Letters.addEventListener("click", () => {
	listenerLongLetters(8, 6);
});
setting9Letters.addEventListener("click", () => {
	listenerLongLetters(9, 6);
});

onlyWords.addEventListener("click", () => {
	appGame.changeOnlyWords(true, "(tylko istniejące słowa)");
});
stringChars.addEventListener("click", () => {
	appGame.changeOnlyWords(false, "(dowolny ciąg liter)");
});

function convertTextCategory(text) {
	text = text.toLowerCase();
	const tab = [...text];
	tab[0] = tab[0].toUpperCase();
	return tab.join("");
}

const whatCategoryDiv = document.querySelector(".what-category");
const whatCategoryElements = document.querySelectorAll("[category]");
whatCategoryElements.forEach((element) => {
	element.addEventListener("click", () => {
		console.log(element);
		disableWhatCategory();
		element.classList.remove("what-category-disabled");
		element.classList.add("what-category-focus");
		var dataWord = {
			category: convertTextCategory(element.innerHTML),
			word: wordVictory,
			longWord: wordVictory.length,
		};
		console.log(dataWord);
		$.post(
			"./php/writeCategoryInBaseSQL.php",
			{
				nameBase: wordVictory.length + "-letters",
				isWord: wordVictory,
				category: convertTextCategory(element.innerHTML),
			},
			function (dataSQL) {
				// console.log(dataSQL);
				console.log(
					"Zapis kategorii w bazie SQL !!!  W tabeli: " + dataSQL.nameTable
				);
			},
			"json"
		).fail(function () {
			$.post("./php/category.php", dataWord);
			console.log("Błąd zapisu w bazie SQL - zapis kategorii do pliku !!!");
		});
		whatCategoryDiv.classList.add("hide");
		document.querySelector("#category p").innerHTML =
			"KATEGORIA:  " + convertTextCategory(element.innerHTML);
		// this.categoryWrapper.innerHTML = 'KATEGORIA:  ' + convertTextCategory(element.innerHTML);
		document.querySelector("#category").style.cursor = "pointer";
		document
			.querySelector("#category")
			.addEventListener("click", changeCategoryStyle);
	});
});

const changeCategoryStyle = function changeCategoryStyle() {
	whatCategoryDiv.classList.remove("hide");
	document.querySelector("#category").style.cursor = "default";
};

function disableWhatCategory() {
	whatCategoryElements.forEach((el) => {
		el.classList.add("what-category-disabled");
	});
}

function startSelectionCategory() {
	whatCategoryDiv.classList.remove("hide");
	whatCategoryElements.forEach((el) => {
		el.classList.remove("what-category-disabled");
		el.classList.remove("what-category-focus");
	});
}

function listenerLongLetters(quantity, attempts) {
	onceAgainSection.classList.add("hide");
	appGame.run(quantity, attempts);
}

class CharKeyboard {
	constructor(numberChar, stateChar) {
		this.numberChar = numberChar;
		this.stateChar = stateChar;
	}

	changeNumberChar(newNumberChar) {
		this.numberChar = newNumberChar;
	}

	changeStateChar(newStateChar) {
		this.stateChar = newStateChar;
	}

	getNumberChar() {
		return this.numberChar;
	}

	getStateChar() {
		return this.stateChar;
	}
}

class AppGame {
	listGameRound = [];
	constructor({
		lettersWrapper,
		categoryWrapper,
		wordGameWrapper,
		keyboardScheme,
		keyboard1,
		keyboard2,
		keyboard3,
		keyboard4,
		dataLetters,
	}) {
		this.lettersWrapper = lettersWrapper;
		this.categoryWrapper = categoryWrapper;
		this.wordGameWrapper = wordGameWrapper;
		this.keyboardScheme = keyboardScheme;
		this.keyboard1 = keyboard1;
		this.keyboard2 = keyboard2;
		this.keyboard3 = keyboard3;
		this.keyboard4 = keyboard4;
		this.dataLetters = dataLetters;
		this.numbersChar = [
			65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82,
			83, 84, 85, 86, 87, 88, 89, 90, 211, 260, 262, 280, 321, 323, 346, 377,
			379,
		];
		// this.charsObject;
		// this.alphabet;
		// this.qwerty;
    // --------------------------------------
    this.charsObject = [];
		for (let i = 0; i < this.numbersChar.length; i++) {
			this.charsObject.push(new CharKeyboard(this.numbersChar[i], "normal"));
		}
		this.alphabet = [
			this.charsObject[0],
			this.charsObject[27],
			this.charsObject[1],
			this.charsObject[2],
			this.charsObject[28],
			this.charsObject[3],
			this.charsObject[4],
			this.charsObject[29],
			this.charsObject[5],
			this.charsObject[6],
			this.charsObject[7],
			this.charsObject[8],
			this.charsObject[9],
			this.charsObject[10],
			this.charsObject[11],
			this.charsObject[30],
			this.charsObject[12],
			this.charsObject[13],
			this.charsObject[31],
			this.charsObject[14],
			this.charsObject[26],
			this.charsObject[15],
			this.charsObject[16],
			this.charsObject[17],
			this.charsObject[18],
			this.charsObject[32],
			this.charsObject[19],
			this.charsObject[20],
			this.charsObject[21],
			this.charsObject[22],
			this.charsObject[23],
			this.charsObject[24],
			this.charsObject[25],
			this.charsObject[33],
			this.charsObject[34],
		];
		this.qwerty = [
			this.charsObject[16],
			this.charsObject[22],
			this.charsObject[4],
			this.charsObject[17],
			this.charsObject[19],
			this.charsObject[24],
			this.charsObject[20],
			this.charsObject[8],
			this.charsObject[14],
			this.charsObject[15],
			this.charsObject[0],
			this.charsObject[18],
			this.charsObject[3],
			this.charsObject[5],
			this.charsObject[6],
			this.charsObject[7],
			this.charsObject[9],
			this.charsObject[10],
			this.charsObject[11],
			this.charsObject[25],
			this.charsObject[23],
			this.charsObject[2],
			this.charsObject[21],
			this.charsObject[1],
			this.charsObject[13],
			this.charsObject[12],
			this.charsObject[27],
			this.charsObject[28],
			this.charsObject[29],
			this.charsObject[30],
			this.charsObject[31],
			this.charsObject[26],
			this.charsObject[32],
			this.charsObject[33],
			this.charsObject[34],
		];
    this.currentlyKeyboard = this.alphabet
    // --------------------------------------
		// this.currentlyKeyboard;
		// this.currentlyKeyboard = this.alphabet;
		this.level;
		this.leftEmpty;
		this.currentLine = [];
		this.guessWordChars;
		this.currentWord;
		this.typedWord = "";
		this.victory = false;
		this.onlyWords = true;
		this.isNotWord = false;
		this.attempts = 6;
		this.oneRoundGame = new GameRound();
		this.myPromise;
		this.stringWords = "";
	}

	clearLine(line) {
		line.forEach((el) => {
			el.style.display = "none";
		});
	}

	changeOnlyWords(param, titleButtonFilling) {
		fillingButton.innerHTML = `<i class="fas fa-digital-tachograph" dropdown></i> 
      Wypełnianie <div class="dropdown-note" dropdown>${titleButtonFilling}</div>`;
		this.onlyWords = param;
		this.oneRoundGame.chengeIsOnlyWord(param);
		// this.oneRoundGame.points = this.oneRoundGame.countPoints(10, this.level);
		console.log(this.oneRoundGame);
		if (this.onlyWords)
			document.querySelector(".above.only-words p").innerHTML =
				"Tylko istniejące słowa";
		else
			document.querySelector(".above.only-words p").innerHTML =
				"Dowolny ciąg znaków";
	}

	writeCategory() {
		// this.categoryWrapper.innerHTML =
		// 	"KATEGORIA:  " + convertTextCategory(this.oneRoundGame.category);
		this.categoryWrapper.innerHTML =
			"KATEGORIA:  ? ";
		// console.log("Kategoria  -  " + this.oneRoundGame.category);
		console.log("Punkty  :  " + this.oneRoundGame.points + ", w tym (kategoria) :  " + this.oneRoundGame.bonusIsCategory + ' ,    Kat: ' + convertTextCategory(this.oneRoundGame.category));
	}

	startParameters(level, attempts, resultSQL) {
		whatCategoryDiv.classList.add("hide");
		document
			.querySelector("#category")
			.removeEventListener("click", changeCategoryStyle);
		document.querySelector("#category").style.cursor = "default";
		this.attempts = attempts;
		this.level = level;
		this.leftEmpty = level;
		notWord.classList.add("hide");
		titleButtonLongWord = this.level + `-literowe`;
		// this.readWordsWithBase(resultSQL);
		this.writeCategory();
		this.stringWords = resultSQL.allWords;
		this.guessWordChars = resultSQL.word.split("");
		longWordButton.innerHTML = `<i class="fas fa-sort-amount-down-alt" dropdown></i> 
      Długość słowa <div class="dropdown-note" dropdown>(${titleButtonLongWord} [${resultSQL.countWords}])</div>`;
		
    for (let i = 0; i < this.numbersChar.length; i++) {
			this.charsObject[i].changeStateChar("normal");
		}
		this.currentWord = new Array(level);
		this.victory = false;
		this.showWord("");
	}

	createTypedWord() {
		this.typedWord = "";
		this.currentLine.forEach((el) => {
			this.typedWord += el.innerHTML;
		});
		console.log(this.typedWord + " -> twoje słowo");
	}

	stopCurrentLine() {
		this.isNotWord = true;
		// console.log('stopCurrentLine');
		notWord.classList.remove("hide");
		divOnlyWords.classList.add("curtain-only-words");
		pOnlyWords.classList.add("curtain");
		this.currentLine.forEach((el) => {
			el.classList.add("curtain-char");
		});
		document.querySelector(".back-space").classList.add("curtain-back-space");
	}

	startCurrentLine() {
		this.isNotWord = false;
		// console.log('startCurrentLin');
		notWord.classList.add("hide");
		divOnlyWords.classList.remove("curtain-only-words");
		pOnlyWords.classList.remove("curtain");
		this.currentLine.forEach((el) => {
			el.classList.remove("curtain-char");
			el.innerHTML = "";
		});
		document
			.querySelector(".back-space")
			.classList.remove("curtain-back-space");
	}

	isWord(level, isWord) {
		return new Promise((resolve, reject) => {
			$.post(
				"./php/isWordInBaseSQL.php",
				{ nameBase: level + "-letters", isWord: isWord },
				function (dataSQL) {
					resolve(dataSQL);
					console.log(dataSQL);
					console.log("Promise - szukanie słowa odbyło się !!!");
				},
				"json"
			).fail(function () {
				console.log("Błąd odczytu z bazy wszystkich słów.");
				switch (level) {
					case 5:
						stringWords = allWords5;
						break;
					case 6:
						stringWords = allWords6;
						break;
					case 7:
						stringWords = allWords7;
						break;
					case 8:
						stringWords = allWords8;
						break;
					case 9:
						stringWords = allWords9;
						break;
				}
				let dataFile;
				if (stringWords.includes(isWord)) {
					dataFile = { res: true };
				} else {
					dataFile = { res: false };
				}
				reject(dataFile);
			});
		});
	}

	doWhenIsWord(condition, resultSQL) {
		if (condition) {
			console.log("SŁOWO ISTNIEJE.");
			this.checkWord(resultSQL);
			if (!this.victory) this.createActiveRound();
		} else {
			console.log("NIE MA TAKIEGO SŁOWA.");
			this.stopCurrentLine();
		}
	}

	isOnlyWords(resultSQL) {
		this.createTypedWord();
		if (this.onlyWords) {
			this.isWord(this.level, this.typedWord)
				.then((result) => {
					this.doWhenIsWord(result.res, resultSQL);
				})
				.catch((resultFile) => {
					this.doWhenIsWord(resultFile.res, resultSQL);
				});
		} else {
			console.log("Dowolny ciąg znaków.");
			this.checkWord(resultSQL);
			if (!this.victory) this.createActiveRound();
		}
	}

	checkWord(resultSQL) {
		let resultCheckedChars = new Array(this.level);
		let tempCurrentLine = [];
		this.currentLine.forEach((el) => {
			tempCurrentLine.push(el.innerHTML);
		});
		// this.guessWordChars = resultSQL.word.split("");
		this.guessWordChars = this.oneRoundGame.word.split(""); //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
		console.log(this.guessWordChars);

		this.clearLine(this.currentLine);
		for (let i = 0; i < this.level; i++) {
			if (tempCurrentLine[i] == this.guessWordChars[i]) {
				this.guessWordChars[i] = "-";
				tempCurrentLine[i] = "!";
				resultCheckedChars[i] = "success";
				this.currentWord[i].changeStateChar("success");
			}
		}
		for (let i = 0; i < this.level; i++) {
			if (tempCurrentLine[i] != "!") {
				for (let j = 0; j < this.level; j++) {
					if (tempCurrentLine[i] == this.guessWordChars[j]) {
						this.guessWordChars[j] = "-";
						resultCheckedChars[i] = "half-success";
						if (this.currentWord[i].getStateChar() != "success")
							this.currentWord[i].changeStateChar("half-success");
						break;
					} else {
						resultCheckedChars[i] = "not-char";
					}
				}
			}
		}
		this.isVictory(resultCheckedChars);
		this.newViewLine(resultCheckedChars);
		this.createKeyboard(
			this.currentlyKeyboard,
			this.keyboard1,
			this.keyboard2,
			this.keyboard3,
			this.keyboard4,
			resultSQL
		);
	}

	// isVictory(resultCheckedChars, resultSQL) {
	isVictory(resultCheckedChars) {
		// this.myPromise.then(result=>{
		let i = 0;
		resultCheckedChars.forEach((char) => {
			if (char == "success") i++;
		});
		if (i == this.level) {
			this.victory = true;
			this.onceAgain(this.level, this.attempts);
			// if (words.category == "?") whatCategoryDiv.classList.remove('hide');
			// if ((resultSQL.category == "?") && this.oneRoundGame.category == "?") startSelectionCategory();
			if (this.oneRoundGame.category == "?") startSelectionCategory();
		}
		// });
	}

	newViewLine(resultCheckedChars) {
    console.log('Punkty przed rundą : ' + this.oneRoundGame.points + ", w tym (kategoria) :  " + this.oneRoundGame.bonusIsCategory);
		console.log(resultCheckedChars);
		const parentLine = this.currentLine[0].parentNode;
		for (let i = 0; i < this.level; i++) {
			if (this.currentWord[i].getStateChar() != "success")
				if (this.currentWord[i].getStateChar() != "half-success") {
					this.currentWord[i].changeStateChar("not-char");
				}
			const divLetter = document.createElement("div");
			if (this.victory)
				divLetter.className = `one-letter ${resultCheckedChars[i]} heartly`;
			else divLetter.className = `one-letter ${resultCheckedChars[i]}`;
			divLetter.innerHTML = this.currentLine[i].innerHTML;
			parentLine.appendChild(divLetter);
		}
    this.oneRoundGame.points = this.oneRoundGame.points - this.oneRoundGame.countPoints(1, this.level, this.oneRoundGame.multiplierIsOnlyWord);
    // console.log(this.oneRoundGame.points);
    // console.log(this.oneRoundGame.bonusIsCategory);
    console.log("Punkty po rundzie  :  " + this.oneRoundGame.points + ", w tym (kategoria) :  " + this.oneRoundGame.bonusIsCategory);
	}

	writeLetter(oneChar, resultSQL) {
		const activeLetter = document.querySelector("div.current-letter");
		if (activeLetter) {
			let position = this.currentLine.indexOf(activeLetter);
			if (this.currentLine[position].innerHTML == "") this.leftEmpty -= 1;
			activeLetter.innerHTML = String.fromCharCode(oneChar.numberChar);
			this.currentWord[position] = oneChar;
			if (this.leftEmpty > 0) {
				if (position == this.level - 1) position = 0;
				while (this.currentLine[position].innerHTML != "") {
					position += 1;
					if (position == this.level) position = 0;
				}
				activeLetter.classList.remove("current-letter");
				this.currentLine[position].classList.add("current-letter");
			} else {
				activeLetter.classList.remove("current-letter");
				this.isOnlyWords(resultSQL);
			}
		}
	}

	delLetter() {
		const activeLetter = document.querySelector("div.current-letter");
		if (activeLetter) {
			if (activeLetter.innerHTML != "") {
				this.leftEmpty += 1;
				activeLetter.innerHTML = String.fromCharCode(0);
			} else {
				let position = this.currentLine.indexOf(activeLetter);
				if (position == 0) position = this.level - 1;
				else position -= 1;
				activeLetter.classList.remove("current-letter");
				this.currentLine[position].classList.add("current-letter");
				if (this.currentLine[position].innerHTML != "") {
					this.leftEmpty += 1;
					this.currentLine[position].innerHTML = String.fromCharCode(0);
				}
			}
		}
	}

	returnGame() {
		this.startCurrentLine();
		this.leftEmpty = this.level;
		document
			.querySelector(".current-round")
			.firstChild.classList.add("current-letter");
		pOnlyWords.classList.remove("curtain-z-index");
	}

	delCurtainOnlyWords() {
		if (this.isNotWord) {
			this.returnGame();
		} else {
			this.delLetter();
		}
	}

	changeKeyboard() {
    // console.log('Przed zmianą klawiatury : ' + this.currentlyKeyboard[0]);
		if (this.currentlyKeyboard == this.alphabet)
			this.currentlyKeyboard = this.qwerty;
		else this.currentlyKeyboard = this.alphabet;
	}

	createKeyboard(
		lettersCheme,
		keyboard1,
		keyboard2,
		keyboard3,
		keyboard4,
		resultSQL
	) {
		keyboard1.innerHTML = "";
		keyboard2.innerHTML = "";
		keyboard3.innerHTML = "";
		keyboard4.innerHTML = "";
		for (let i = 0; i < 10; i++) {
			const button = document.createElement("button");
			button.className = lettersCheme[i].getStateChar();
			button.innerHTML = String.fromCharCode(lettersCheme[i].numberChar);
			if (lettersCheme[i].getStateChar() != "not-char")
				button.addEventListener("click", () =>
					this.writeLetter(lettersCheme[i], resultSQL)
				);
			keyboard1.appendChild(button);
		}
		for (let i = 10; i < 19; i++) {
			const button = document.createElement("button");
			button.className = lettersCheme[i].getStateChar();
			button.innerHTML = String.fromCharCode(lettersCheme[i].numberChar);
			if (lettersCheme[i].getStateChar() != "not-char")
				button.addEventListener("click", () =>
					this.writeLetter(lettersCheme[i], resultSQL)
				);
			keyboard2.appendChild(button);
		}
		const divKeyboard = document.createElement("div");
		divKeyboard.setAttribute("id", "keyboardScheme");
		divKeyboard.className = "keyboard-scheme";
		divKeyboard.innerHTML = '<i class="fas fa-keyboard"></i>';
		divKeyboard.addEventListener("click", () => {
			this.changeKeyboard();
			this.createKeyboard(
				this.currentlyKeyboard,
				this.keyboard1,
				this.keyboard2,
				this.keyboard3,
				this.keyboard4,
        resultSQL
			);
		});
		keyboard3.appendChild(divKeyboard);
		for (let i = 19; i < 26; i++) {
			const button = document.createElement("button");
			button.className = lettersCheme[i].getStateChar();
			button.innerHTML = String.fromCharCode(lettersCheme[i].numberChar);
			if (lettersCheme[i].getStateChar() != "not-char")
				button.addEventListener("click", () =>
					this.writeLetter(lettersCheme[i], resultSQL)
				);
			keyboard3.appendChild(button);
		}
		const divBackspace = document.createElement("div");
		divBackspace.className = "back-space";
		divBackspace.innerHTML = '<i class="fas fa-long-arrow-alt-left"></i>';
		divBackspace.addEventListener("click", () => this.delCurtainOnlyWords());
		keyboard3.appendChild(divBackspace);
		for (let i = 26; i < 35; i++) {
			const button = document.createElement("button");
			button.className = lettersCheme[i].getStateChar();
			button.innerHTML = String.fromCharCode(lettersCheme[i].numberChar);
			if (lettersCheme[i].getStateChar() != "not-char")
				button.addEventListener("click", () =>
					this.writeLetter(lettersCheme[i], resultSQL)
				);
			keyboard4.appendChild(button);
		}
	}

	changeLetter(element) {
		this.currentLine.forEach((el) => {
			el.classList.remove("current-letter");
		});
		if (!this.isNotWord) element.classList.add("current-letter");
	}

	createStartPlaceGame(level, attempts, wrapper) {
		wrapper.innerHTML = "";
		// for ( let i = 0; i < level + 1; i++){
		for (let i = 0; i < attempts; i++) {
			const divLine = document.createElement("div");
			if (i == 0) divLine.className = "line current-round";
			else divLine.className = "line";
			for (let j = 0; j < level; j++) {
				const divLetter = document.createElement("div");
				if (j == 0 && i == 0) divLetter.className = "one-letter current-letter";
				else divLetter.className = "one-letter";
				if (i == 0) {
					divLetter.addEventListener("click", () =>
						this.changeLetter(divLetter)
					);
				}
				divLine.appendChild(divLetter);
			}
			wrapper.appendChild(divLine);
		}
		this.createCurrentLine();
	}

	createInfoOnlyWords() {
		const divOnlyWords = document.createElement("div");
		divOnlyWords.className = "not-word hide";
		const pInfo = document.createElement("p");
		pInfo.innerHTML = "Nie ma takiego słowa";
		divOnlyWords.appendChild(pInfo);
		document.querySelector(".only-words").appendChild(divOnlyWords);
	}

	createCurrentLine() {
		this.currentLine = document.querySelectorAll(".current-round .one-letter");
		this.currentLine = [...this.currentLine];
		this.currentLine.forEach((element) => {
			element.addEventListener("click", () => this.changeLetter(element));
		});
		this.leftEmpty = this.level;
	}

	showWord(word) {
		const resultDiv = document.getElementById("resultWord");
		if (word != "") {
			resultDiv.classList.add("result-word");
			resultDiv.innerHTML = `Szukane słowo: <p>${word}</p>`;
		} else {
			resultDiv.innerHTML = ``;
		}
	}

	createActiveRound() {
		let listRounds = document.querySelectorAll("#wordGame .line");
		listRounds = [...listRounds];
		for (let i = 0; i < listRounds.length; i++) {
			if (listRounds[i].className == "line current-round") {
				listRounds[i].classList.remove("current-round");
				if (i < listRounds.length - 1) {
					listRounds[i + 1].classList.add("current-round");
					listRounds[i + 1].firstChild.classList.add("current-letter");
					this.createCurrentLine();
				} else {
					this.showWord(this.oneRoundGame.word);
					this.onceAgain(this.level, this.attempts);
					if (this.oneRoundGame.category == "?") startSelectionCategory();
				}
				break;
			}
		}
	}

	onceAgain(quantity, attempts) {
		wordVictory = this.oneRoundGame.word;
		console.log(wordVictory);
		onceAgainSection.classList.remove("hide");
		divOnlyWords.classList.add("curtain-only-words");
		pOnlyWords.classList.add("curtain");
		pOnlyWords.classList.add("curtain-z-index");
		const onceAgainDiv = document.querySelector("#onceAgain div");
		onceAgainDiv.addEventListener("click", () => {
			onceAgainSection.classList.add("hide");
			this.run(quantity, attempts);
		});
	}

	run(level, attempts) {
		this.myPromise = new Promise((resolve, reject) => {
			$.post(
				"./php/readWordWithBaseSQL.php",
				{ nameBase: level + "-letters" },
				function (dataSQL) {
					console.log(
						"promise - zapytanie wykonane. Ilość słów: " + dataSQL["countWords"]
					);
					resolve(dataSQL);
				},
				"json"
			).fail(function () {
				const dataFile = randomWordSelection(level);
				console.log(
					"promise - błąd odczytu z bazy !!! Ilość słów: " +
						dataFile["countWords"]
				);
				reject(dataFile);
			});
		});
		this.myPromise
			.then((resultSQL) => {
				this.oneRoundGame.startParameters(resultSQL, level, attempts);
				console.log(this.oneRoundGame);
				this.startParameters(level, attempts, resultSQL);
				this.createKeyboard(
					this.currentlyKeyboard,
					this.keyboard1,
					this.keyboard2,
					this.keyboard3,
					this.keyboard4,
					resultSQL
				);
				this.createStartPlaceGame(
					level,
					attempts,
					this.wordGameWrapper,
					resultSQL
				);
				this.returnGame(resultSQL);
			})
			.catch((resultFile) => {
				this.oneRoundGame.startParameters(resultFile, level, attempts);
				console.log(this.oneRoundGame);
				this.startParameters(level, attempts, resultFile);
				this.createKeyboard(
					this.currentlyKeyboard,
					this.keyboard1,
					this.keyboard2,
					this.keyboard3,
					this.keyboard4,
					resultFile
				);
				this.createStartPlaceGame(
					level,
					attempts,
					this.wordGameWrapper,
					resultFile
				);
				this.returnGame(resultFile);
			});
	}
}

function randomWord(data) {
	numberWords = data.length;
	return data[Math.floor(Math.random() * data.length)];
}

function randomWordSelection(level) {
	let dataWithFile = [];
	switch (level) {
		case 5:
			dataWithFile = words5Letters;
			break;
		case 6:
			dataWithFile = words6Letters;
			break;
		case 7:
			dataWithFile = words7Letters;
			break;
		case 8:
			dataWithFile = words8Letters;
			break;
		case 9:
			dataWithFile = words9Letters;
			break;
	}
	const tempData = randomWord(dataWithFile);
	const dataFile = {
		word: tempData.word,
		category: tempData.category,
		game: true,
		description: tempData.description,
		countWords: numberWords,
	};
	return dataFile;
}

const appGame = new AppGame({
	lettersWrapper: document.getElementById("letters"),
	categoryWrapper: document.querySelector("#category p"),
	wordGameWrapper: document.getElementById("wordGame"),
	keyboardScheme: document.getElementById("keyboardScheme"),
	keyboard1: document.getElementById("keyboard1"),
	keyboard2: document.getElementById("keyboard2"),
	keyboard3: document.getElementById("keyboard3"),
	keyboard4: document.getElementById("keyboard4"),
});

appGame.run(5, 6);
