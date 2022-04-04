import { words5Letters } from '../src/5-letters.js';
import { words6Letters } from '../src/6-letters.js';
import { words7Letters } from '../src/7-letters.js';
import { words8Letters } from '../src/8-letters.js';
import { words9Letters } from '../src/9-letters.js';
import { wordsCategory } from '../php/wordsCategory.js';
import { newDataGame } from '../php/tempNewDataGame.js';
let nameFileLevel = words5Letters;

let groupsLettersCategory = [[], [], [], [],[]];
wordsCategory.forEach(el => {
    switch (el.word.length) {
        case 5:
            groupsLettersCategory[0].push(el)
          break;
        case 6:
            groupsLettersCategory[1].push(el)
        break;
        case 7:
            groupsLettersCategory[2].push(el)
          break;
        case 8:
            groupsLettersCategory[3].push(el)
        break;
        case 9:
            groupsLettersCategory[4].push(el)
        break;
    }
});

const wordElement = document.querySelector('.word');
function drawWord(){
  // return wordsLetters[Math.floor(Math.random()*wordsLetters.length)];
  wordElement.innerHTML = nameFileLevel[Math.floor(Math.random()*nameFileLevel.length)].word;
}
// const wordElement = document.querySelector('.word');
// wordElement.innerHTML = drawWord(nameFileLevel).word;
drawWord();

const yesDataElement = document.querySelector('.yes-data');
const noDataElement = document.querySelector('.no-data');
const nextElement = document.querySelector('.next-data');
yesDataElement.addEventListener('click', ()=> {
  exportNewDataGame(wordElement.innerHTML, true);
  drawWord();
});
noDataElement.addEventListener('click', ()=> {
  exportNewDataGame(wordElement.innerHTML, false);
  drawWord();
});
nextElement.addEventListener('click', ()=> {
  // exportNewDataGame(wordElement.innerHTML, false);
  drawWord();
});



function exportNewDataGame(newWord, newGame) {
    let postData = {word: newWord, category: "?", game: newGame};

    $.post( "./php/saveData.php", postData
        // , function() {
        //       alert( "success" );
        // })
        // .fail(function() {
        //     alert( "error" );
        // }
    );
    // console.log('wysłałem !   -  ' + postData.word);
}


const longWordButton = document.getElementById('longWord');
let titleButtonLongWord = '';
// let nameFileLevel = words5Letters;
let dataWords;

// const fillingButton = document.getElementById('filling');
const setting5Letters = document.getElementById('5letters');
const setting6Letters = document.getElementById('6letters');
const setting7Letters = document.getElementById('7letters');
const setting8Letters = document.getElementById('8letters');
const setting9Letters = document.getElementById('9letters');
// const onlyWords = document.getElementById('onlyWords');
// const notWord = document.querySelector('.not-word');
// const stringChars = document.getElementById('stringChars');
// const onceAgainSection = document.getElementById('onceAgain');
// const divOnlyWords = document.querySelector('.above.only-words');
// const pOnlyWords = document.querySelector('.above.only-words p');
setting5Letters.addEventListener('click', ()=> {
  titleButtonLongWord = '(5-literowe)';
  longWordButton.innerHTML = `<i class="fas fa-sort-amount-down-alt" dropdown></i> 
  Długość słowa <div class="dropdown-note" dropdown>${titleButtonLongWord}</div>`;
  nameFileLevel = words5Letters;
  createNewDataWords(nameFileLevel);
  drawWord();
    console.log(dataWords.length);
});
setting6Letters.addEventListener('click', ()=> {
  titleButtonLongWord = '(6-literowe)';  
  longWordButton.innerHTML = `<i class="fas fa-sort-amount-down-alt" dropdown></i> 
  Długość słowa <div class="dropdown-note" dropdown>${titleButtonLongWord}</div>`;
  nameFileLevel = words6Letters;
  createNewDataWords(nameFileLevel);
  drawWord();
    console.log(dataWords.length);
});
setting7Letters.addEventListener('click', ()=> {
  titleButtonLongWord = '(7-literowe)';
  longWordButton.innerHTML = `<i class="fas fa-sort-amount-down-alt" dropdown></i> 
  Długość słowa <div class="dropdown-note" dropdown>${titleButtonLongWord}</div>`;
  nameFileLevel = words7Letters;
  createNewDataWords(nameFileLevel);
  drawWord();
    console.log(dataWords.length);
});
setting8Letters.addEventListener('click', ()=> {
  titleButtonLongWord = '(8-literowe)';
  longWordButton.innerHTML = `<i class="fas fa-sort-amount-down-alt" dropdown></i> 
  Długość słowa <div class="dropdown-note" dropdown>${titleButtonLongWord}</div>`;
  nameFileLevel = words8Letters;
  createNewDataWords(words8Letters);
  drawWord();
    console.log(dataWords.length);
});
setting9Letters.addEventListener('click', ()=> {
  titleButtonLongWord = '(9-literowe)';
  longWordButton.innerHTML = `<i class="fas fa-sort-amount-down-alt" dropdown></i> 
  Długość słowa <div class="dropdown-note" dropdown>${titleButtonLongWord}</div>`;
  nameFileLevel = words9Letters;
  createNewDataWords(nameFileLevel);
  drawWord();
    console.log(dataWords.length);
});



function createNewDataWords(nameFile) {
    dataWords = [];
    nameFile.forEach(record => {
        if (record.game == null) dataWords.push(record);
    })
};

createNewDataWords(nameFileLevel);
console.log(dataWords.length);





function writeToFile() {

    let dataCategory = sortDataCategory(wordsCategory);
    
    nameFileLevel.forEach(record=>{
      let tempWorfd = dataCategory
      // if (record.word == )
    })
    // console.log(dataCategory);

    let postDataCategory = {content: dataCategory, level: nameFileLevel};

    // console.log(dataCategory);
    // console.log(postDataCategory);

    // $.post( "./php/saveData.php", postDataCategory
    //     , function() {
    //           alert( "success" );
    //     })
    //     .fail(function() {
    //         alert( "error" );
    //     }
    // );
}

function sortDataCategory(data) {
    const sortData = data.sort((a,b)=> a.word.localeCompare(b.word));
    var newData = "export const words9Letters = [\n";
    sortData.forEach(el => {
        newData += `{word: '${el.word}', category: '${el.category}', game: ${el.game}},\n`;
    });
    newData += "]";
    return newData;
}
