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

localStorage.setItem("info/JTS", "");

// include( 'autoLogin.js');

// $.getScript( "app/autoLogin.js" )
//   .done(function( script, textStatus ) {
//     // console.log( script );
//     console.log( textStatus );
//     console.log( 'byłem w autoLoginie  ...' );
//   })
//   .fail(function() {
//     console.log( "coś poszło nie tak w autoLogin" );
// });

// localStorage.setItem('nick/JTS', 'Robert');
// localStorage.setItem('nick/JTS', '');
// localStorage.removeItem('nick/JTS');

// const ggg = document.getElementById(".login-btn");

// const loginBtn = document.querySelector(".login-btn");

// loginBtn.addEventListener("click", () => {
//   console.log("zapis start");
// });

class GameRound {
	constructor(
		word,
		category,
		game,
		description,
		level,
		// attempt,
		// isCategory,
		// isOnlyWord,
		points
	) {
		this.word = word;
		this.category = category;
		this.game = game;
		this.description = description;
		this.level = level;
		this.attempt = 1;
		this.isCategory = false;
		this.isOnlyWord = true;
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
			this.points -= this.bonusIsCategory;
			this.bonusIsCategory = 0;
		} else {
			this.isCategory = false;
			// this.multiplierIsCategory = 3;
			this.bonusIsCategory = level * 20;
		}
	}

	chengeIsOnlyWord(param) {
		if (param) {
			this.isOnlyWord = true;
			this.multiplierIsOnlyWord = 1;
		} else {
			this.isOnlyWord = false;
			this.multiplierIsOnlyWord = 2;
		}
	}

	startParameters(dataSQL, level) {
		this.word = dataSQL["word"];
		this.category = dataSQL["category"];
		this.game = dataSQL["game"];
		this.description = dataSQL["description"];
		this.level = level;
		// this.attempt = attempts;
		// this.checkCategory(level);
		// this.oneRoundGame.setBonusIsCategory(level);
		this.bonusIsCategory = 20 * level;
		// this.isOnlyWord = true;
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
// const loggingButton = document.getElementById("logging");
const setting5Letters = document.getElementById("5letters");
const setting6Letters = document.getElementById("6letters");
const setting7Letters = document.getElementById("7letters");
const setting8Letters = document.getElementById("8letters");
const setting9Letters = document.getElementById("9letters");
const onlyWords = document.getElementById("onlyWords");
const notWord = document.querySelector(".not-word");
const stringChars = document.getElementById("stringChars");
const onceAgainSection = document.getElementById("onceAgain");
const saveScoreSection = document.getElementById("saveScore");
const divOnlyWords = document.querySelector(".above.only-words");
const pOnlyWords = document.querySelector(".above.only-words p");
// const loggingDivInfo = document.querySelector(".logging").parentNode;
// const saveScoreDiv = document.querySelector("#saveScore div");

const contactsDiv = document.querySelector("[name='contacts']");
const resultsDiv = document.querySelector("[name='results']");
const loginBtn = document.querySelector(".login-btn");
const inputNick = document.querySelector("[name='nick']");
const inputPassword = document.querySelector("[name='password']");
const loggingButton = document.getElementById("logging");
const loggingDivInfo = document.querySelector(".logging").parentNode;

try {
	loginBtn.addEventListener("click", () => {
		// resultsDiv.classList.remove('hide');
		// loggingDivInfo.classList.add("dropdown-active");
		const dataLogin = { Nick: inputNick.value, Password: inputPassword.value };
		$.post(
			"./php/login.php",
			dataLogin,
			function (data) {
				loggingDivInfo.classList.add("dropdown-active");
				if (!data.error) {
					resultsDiv.classList.remove("hide");
					contactsDiv.classList.add("hide");
					console.log("Zalogowano gracza: " + data.nick);
					localStorage.setItem("nick/JTS", data.nick);
					localStorage.setItem("nameTable/JTS", data.nameTable);
					loggingButton.innerHTML = `<i class="fas fa-sign-in-alt" dropdown></i>
                    Witaj ${data.nick} ! <div class="dropdown-note" dropdown> (twoje wyniki) </div>`;
					appGame.saveScore();
					$.getScript("app/readScores.js").done(function () {
						console.log(
							`Odczyt wyników gracza: ${localStorage.getItem(
								"nick/JTS"
							)}   - readScores.js`
						);
					});
					// loggingDivInfo.classList.add("dropdown-active");
				} else {
					// loggingDivInfo.classList.add("dropdown-active");
					loggingButton.innerHTML = `<i class="fas fa-sign-in-alt" dropdown></i>
                    Logowanie <div class="dropdown-note" dropdown style="color:red;"> (${data.error})</div>`;
				}
			},
			"json"
		).fail(function () {
			alert("Błąd reakcji z login.php");
		});
	});
} catch (e) {
	if (e instanceof ReferenceError) {
		console.log("loginBtn - nie jest zdefiniowany.");
	}
}

const registerBtn = document.querySelector(".register-btn");
// const inputNick = document.querySelector("[name='nick']");
// const inputPassword = document.querySelector("[name='password']");
// const loggingButton = document.getElementById("logging");
// const loggingDivInfo = document.querySelector(".logging").parentNode;

try {
	registerBtn.addEventListener("click", () => {
		const dataRegister = {
			Nick: inputNick.value,
			Password: inputPassword.value,
		};
		$.post(
			"./php/register.php",
			dataRegister,
			function (data) {
				loggingDivInfo.classList.add("dropdown-active");
				if (!data.error) {
					resultsDiv.classList.remove("hide");
					contactsDiv.classList.add("hide");
					console.log("Zarejestrowano nowego gracza: " + data.nick);
					localStorage.setItem("nick/JTS", data.nick);
					localStorage.setItem("nameTable/JTS", data.nameTable);
					loggingButton.innerHTML = `<i class="fas fa-sign-in-alt" dropdown></i>
                    Witaj ${data.nick} ! <div class="dropdown-note" dropdown> (twoje wyniki) </div>`;
					appGame.saveScore();
					$.getScript("app/readScores.js").done(function () {
						console.log(
							`Odczyt wyników gracza: ${localStorage.getItem(
								"nick/JTS"
							)}   - readScores.js`
						);
					});
					// loggingDivInfo.classList.add("dropdown-active");
				} else {
					// loggingDivInfo.classList.add("dropdown-active");
					loggingButton.innerHTML = `<i class="fas fa-sign-in-alt" dropdown></i>
                    Logowanie <div class="dropdown-note" dropdown style="color:red;"> (${data.error})</div>`;
				}
			},
			"json"
		).fail(function () {
			alert("Błąd reakcji z register.php");
		});
	});
} catch (e) {
	if (e instanceof ReferenceError) {
		console.log("registerBtn - nie jest zdefiniowany.");
	}
}

const logoutBtn = document.querySelector(".logout-btn");
// const loggingButton = document.getElementById("logging");
// const loggingDivInfo = document.querySelector(".logging").parentNode;

try {
	logoutBtn.addEventListener("click", () => {
		resultsDiv.classList.add("hide");
		contactsDiv.classList.remove("hide");
		localStorage.setItem("nick/JTS", "");
		localStorage.setItem("nameTable/JTS", "");
		localStorage.setItem("result5/JTS", 0);
		localStorage.setItem("result6/JTS", 0);
		localStorage.setItem("result7/JTS", 0);
		localStorage.setItem("result8/JTS", 0);
		localStorage.setItem("result9/JTS", 0);
		console.log("Wyczyszczono dane !!!");

		loggingButton.innerHTML = `
			<i class="fas fa-sign-in-alt" dropdown></i>
			Logowanie <div class="dropdown-note" dropdown>(rejestracja)</div>
		`;

		// loggingDivInfo.innerHTML = `<div class="logging" logging>
		// 		<label class="dropdown-login" logging>Nazwa (login):
		// 		    <input type="text" name="nick" placeholder="" logging></label>
		// 		<label class="dropdown-password" logging>Hasło:
		// 		    <input type="password" name="password" placeholder="" logging></label>
		// 		<div id="lower">
		// 		    <button class="normal reg-log-btn register-btn">Rejestruj</button>
		// 		    <button class="normal reg-log-btn login-btn">Zaloguj</button>
		// 		</div>
		// 	</div>`;

		// $.getScript("app/login.js").done(function () {
		// 	console.log("inicjacja login.js");
		// });
		$.getScript("app/register.js").done(function () {
			console.log("inicjacja register.js");
		});
	});
} catch (e) {
	if (e instanceof ReferenceError) {
		console.log("logoutBtn - nie jest zdefiniowany.");
	}
}

// const resultsDiv = document.querySelector("[name='results']");
// console.log(contactsDiv);
// console.log(resultsDiv);

if (
	localStorage.getItem("nick/JTS") != "" &&
	localStorage.getItem("nick/JTS")
) {
	resultsDiv.classList.remove("hide");
	contactsDiv.classList.add("hide");
	loggingButton.innerHTML = `<i class="fas fa-sign-in-alt" dropdown></i>
        Witaj ${localStorage.getItem(
					"nick/JTS"
				)} ! <div class="dropdown-note" dropdown> (twoje wyniki) </div>`;

	$.getScript("app/readScores.js").done(function () {
		console.log(
			`Odczyt wyników gracza: ${localStorage.getItem(
				"nick/JTS"
			)}   - readScores.js`
		);
	});
}

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
	// console.log('Zmiana kursora na kategorii.');
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
	saveScoreSection.classList.add("hide");
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
	// listGameRound = [];
	constructor({
		lettersWrapper,
		categoryWrapper,
		wordGameWrapper,
		saveScoreWrapper,
		onceAgainWrapper,
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
		this.saveScoreWrapper = saveScoreWrapper;
		this.onceAgainWrapper = onceAgainWrapper;
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
		this.currentlyKeyboard = this.alphabet;
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
		this.listGameRound = [];
		this.saveScoreWrapper.addEventListener("click", () => {
			saveScoreSection.classList.add("hide");
			loggingDivInfo.classList.add("dropdown-active");
			$("html, body").animate({ scrollTop: 800 }, 100);
			// this.saveScore();
		});
		this.onceAgainWrapper.addEventListener("click", () => {
			onceAgainSection.classList.add("hide");
			saveScoreSection.classList.add("hide");
			this.run(this.level, this.attempts);
			// this.stratAgain();
			// this.run(quantity, attempts);
		});
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
		console.log(this.oneRoundGame.isOnlyWord);
		if (this.onlyWords)
			document.querySelector(".above.only-words p").innerHTML =
				"Tylko istniejące słowa";
		else
			document.querySelector(".above.only-words p").innerHTML =
				"Dowolny ciąg znaków";
	}

	// this.howCategory = funcShowCategory(){
	// 	this.categoryWrapper.innerHTML =
	// 		"KATEGORIA:  " + convertTextCategory(this.oneRoundGame.category);
	//     console.log('Pokazałem kategorię: ' + this.oneRoundGame.category);
	// }

	writeCategory() {
		this.categoryWrapper.innerHTML = "KATEGORIA:  ? ";
		whatCategoryDiv.classList.add("hide");
		this.categoryWrapper.style.cursor = "pointer";
		this.categoryWrapper.addEventListener("click", () => {
			this.categoryWrapper.innerHTML =
				"KATEGORIA:  " + convertTextCategory(this.oneRoundGame.category);
			console.log("Pokazałem kategorię: " + this.oneRoundGame.category);
			this.categoryWrapper.style.cursor = "default";
			this.oneRoundGame.checkCategory(this.level);
			console.log(
				"Punkty  :  " +
					this.oneRoundGame.points +
					", w tym (kategoria) :  " +
					this.oneRoundGame.bonusIsCategory +
					" ," +
					this.oneRoundGame.isCategory +
					"    Kat: " +
					convertTextCategory(this.oneRoundGame.category)
			);
		});
		console.log(
			"Punkty  :  " +
				this.oneRoundGame.points +
				", w tym (kategoria) :  " +
				this.oneRoundGame.bonusIsCategory +
				" ," +
				this.oneRoundGame.isCategory +
				"    Kat: " +
				convertTextCategory(this.oneRoundGame.category)
		);
	}

	startParameters(level, attempts, resultSQL) {
		console.log(this.listGameRound.length);
		console.log(this.listGameRound);
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

	saveWord() {
		return new Promise((resolve, reject) => {
			$.post(
				"./php/saveRoundGame.php",
				{
					nameTable: localStorage.getItem("nameTable/JTS"),
					word: this.oneRoundGame.word,
					level: this.oneRoundGame.level,
					attempt: this.oneRoundGame.attempt,
					isCategory: this.oneRoundGame.isCategory,
					isOnlyWord: this.oneRoundGame.isOnlyWord,
					points: this.oneRoundGame.points,
				},
				function (dataSQL) {
					resolve(dataSQL);
					// console.log(dataSQL);
				},
				"json"
			).fail(function (data) {
				reject(data);
				// console.log(data);
			});
		});
	}

	setResultLocalStorage(level, result) {
		localStorage.setItem("result" + level + "/JTS", result);
	}

	isVictory(resultCheckedChars) {
		let i = 0;
		resultCheckedChars.forEach((char) => {
			if (char == "success") i++;
		});
		if (i == this.level) {
			this.victory = true;
			this.onceAgain();
			if (this.oneRoundGame.category == "?") startSelectionCategory();
			if (
				localStorage.getItem("nick/JTS") != "" &&
				localStorage.getItem("nick/JTS")
			) {
				this.saveWord()
					.then((dataBase) => {
						this.setResultLocalStorage(dataBase.level, dataBase.result);
						$.getScript("app/displayScores.js").done(function () {
							console.log("Wyświetlanie wyników gracza - displayScores.js");
						});
					})
					.catch(() => {
						this.listGameRound.push(this.oneRoundGame);
						console.log(`Problem z zapisem słowa do bazy !!!`);
						console.log(this.listGameRound);
						localStorage.setItem(
							"info/JTS",
							'<div class="result-letter info">Błąd zapisu wyniku do bazy !!!</div>'
						);
						$.getScript("app/displayScores.js").done(function () {
							console.log(
								"Wyświetlanie wyników gracza. Błąd zapisu - displayScores.js"
							);
						});
					});
			} else {
				this.listGameRound.push(this.oneRoundGame);
				console.log(this.oneRoundGame);
			}
		}
	}

	newViewLine(resultCheckedChars) {
		console.log(
			"Punkty przed rundą : " +
				this.oneRoundGame.points +
				", w tym (kategoria) :  " +
				this.oneRoundGame.bonusIsCategory
		);
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
		this.oneRoundGame.points =
			this.oneRoundGame.points -
			this.oneRoundGame.countPoints(
				1,
				this.level,
				this.oneRoundGame.multiplierIsOnlyWord
			);
		// console.log(this.oneRoundGame.points);
		// console.log(this.oneRoundGame.bonusIsCategory);
		console.log(
			"Punkty po rundzie  :  " +
				this.oneRoundGame.points +
				", w tym (kategoria) :  " +
				this.oneRoundGame.bonusIsCategory
		);
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
					this.oneRoundGame.attempt += 1;
					this.createCurrentLine();
				} else {
					this.showWord(this.oneRoundGame.word);
					this.onceAgain();
					if (this.oneRoundGame.category == "?") startSelectionCategory();
				}
				break;
			}
		}
	}

	onceAgain() {
		wordVictory = this.oneRoundGame.word;
		console.log(`Odgadnięte słowo: ${wordVictory}`);
		onceAgainSection.classList.remove("hide");
		divOnlyWords.classList.add("curtain-only-words");
		pOnlyWords.classList.add("curtain");
		pOnlyWords.classList.add("curtain-z-index");
		if (
			localStorage.getItem("nick/JTS") == "" &&
			!localStorage.getItem("nick/JTS")
		) {
			saveScoreSection.classList.remove("hide");
		}
	}

	saveOneRoundGameWithList() {
		if (this.listGameRound.length > 0) {
			for (let i = 0; i < this.listGameRound.length; i++) {
				$.post(
					"./php/saveRoundGame.php",
					{
						nameTable: localStorage.getItem("nameTable/JTS"),
						word: this.listGameRound[i].word,
						level: this.listGameRound[i].level,
						attempt: this.listGameRound[i].attempt,
						isCategory: this.listGameRound[i].isCategory,
						isOnlyWord: this.listGameRound[i].isOnlyWord,
						points: this.listGameRound[i].points,
					},
					function (dataSQL) {
						console.log(dataSQL);
						localStorage.setItem(
							"result" + dataSQL.level + "/JTS",
							dataSQL.result
						);
						$.getScript("app/displayScores.js").done(function () {
							console.log(
								`Przygotowanie widoku wyników gracza: ${localStorage.getItem(
									"nick/JTS"
								)}   - displayScores.js`
							);
						});
					},
					"json"
				).fail(function (data) {
					console.log(data);
				});
			}
			this.listGameRound = [];
		}
	}

	saveScore() {
		// loggingDivInfo.classList.add("dropdown-active");
		// $("html, body").animate({ scrollTop: 800 }, 100); // 'linear'
		const intervalSaveScores = setInterval(() => {
			if (
				localStorage.getItem("nick/JTS") != "" &&
				localStorage.getItem("nick/JTS")
			) {
				this.saveOneRoundGameWithList();
				console.log("Wyniki z listy zapisano do gracza!!!");
				clearInterval(intervalSaveScores);
			}
		}, 1000);
	}

	run(level, attempts) {
		let dataForBase;
		this.myPromise = new Promise((resolve, reject) => {
			if (
				localStorage.getItem("nick/JTS") != "" &&
				localStorage.getItem("nick/JTS")
			) {
				dataForBase = {
					nameBase: level + "-letters",
					nameTable: localStorage.getItem("nameTable/JTS"),
				};
			} else {
				dataForBase = {
					nameBase: level + "-letters",
					nameTable: "",
				};
			}
			$.post(
				"./php/readWordWithBaseSQL.php",
				dataForBase,
				function (dataSQL) {
					console.log(
						"promise - zapytanie wykonane. Ilość słów: " + dataSQL["countWords"] + "/" + dataSQL["countWordsPlayer"]
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
				this.oneRoundGame = new GameRound();
				this.oneRoundGame.startParameters(resultSQL, level);
				console.log(this.oneRoundGame);
				// this.listGameRound.push(this.oneRoundGame);
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
				this.oneRoundGame = new GameRound();
				this.oneRoundGame.startParameters(resultFile, level);
				console.log(this.oneRoundGame);
				// this.listGameRound.push(this.oneRoundGame);
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
	saveScoreWrapper: document.querySelector("#saveScore div"),
	onceAgainWrapper: document.querySelector("#onceAgain div"),
	keyboardScheme: document.getElementById("keyboardScheme"),
	keyboard1: document.getElementById("keyboard1"),
	keyboard2: document.getElementById("keyboard2"),
	keyboard3: document.getElementById("keyboard3"),
	keyboard4: document.getElementById("keyboard4"),
});

appGame.run(5, 6);
