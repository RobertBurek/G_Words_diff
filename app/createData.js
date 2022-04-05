import { words5Letters } from '../src/5-letters.js';
import { words6Letters } from '../src/6-letters.js';
import { words7Letters } from '../src/7-letters.js';
import { words8Letters } from '../src/8-letters.js';
import { words9Letters } from '../src/9-letters.js';
import { wordsCategory } from '../php/wordsCategory.js';
import { newDataGame } from '../php/tempNewDataGame.js';
let copyNewDataGame = [...newDataGame];
let nameFileLevel = words5Letters;
let metrics = {varName: 'words5Letters', pathLocation: '../src/5-letters.js'};

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

    $.post( "./php/saveNewDataGame.php", postData
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
  metrics = {varName: 'words5Letters', pathLocation: '../src/5-letters.js'};
    console.log(dataWords.length);
});
setting6Letters.addEventListener('click', ()=> {
  titleButtonLongWord = '(6-literowe)';  
  longWordButton.innerHTML = `<i class="fas fa-sort-amount-down-alt" dropdown></i> 
  Długość słowa <div class="dropdown-note" dropdown>${titleButtonLongWord}</div>`;
  nameFileLevel = words6Letters;
  createNewDataWords(nameFileLevel);
  drawWord();
  metrics = {varName: 'words6Letters', pathLocation: '../src/6-letters.js'};
    console.log(dataWords.length);
});
setting7Letters.addEventListener('click', ()=> {
  titleButtonLongWord = '(7-literowe)';
  longWordButton.innerHTML = `<i class="fas fa-sort-amount-down-alt" dropdown></i> 
  Długość słowa <div class="dropdown-note" dropdown>${titleButtonLongWord}</div>`;
  nameFileLevel = words7Letters;
  createNewDataWords(nameFileLevel);
  drawWord();
  metrics = {varName: 'words7Letters', pathLocation: '../src/7-letters.js'};
    console.log(dataWords.length);
});
setting8Letters.addEventListener('click', ()=> {
  titleButtonLongWord = '(8-literowe)';
  longWordButton.innerHTML = `<i class="fas fa-sort-amount-down-alt" dropdown></i> 
  Długość słowa <div class="dropdown-note" dropdown>${titleButtonLongWord}</div>`;
  nameFileLevel = words8Letters;
  createNewDataWords(nameFileLevel);
  drawWord();
  metrics = {varName: 'words8Letters', pathLocation: '../src/8-letters.js'};
    console.log(dataWords.length);
});
setting9Letters.addEventListener('click', ()=> {
  titleButtonLongWord = '(9-literowe)';
  longWordButton.innerHTML = `<i class="fas fa-sort-amount-down-alt" dropdown></i> 
  Długość słowa <div class="dropdown-note" dropdown>${titleButtonLongWord}</div>`;
  nameFileLevel = words9Letters;
  createNewDataWords(nameFileLevel);
  drawWord();
  metrics = {varName: 'words9Letters', pathLocation: '../src/9-letters.js'};
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




const saveData = document.querySelector('.save-data');
saveData.addEventListener('click', writeToFileDataGame);

function writeToFileDataGame() {
    let newDataGameLevel = [];
    // newDataGame.forEach(line=>{
    copyNewDataGame.forEach(line=>{
      if (line.word.length == nameFileLevel[0].word.length) {
        newDataGameLevel.push(line);
      }
    });



    // console.log(newDataGameLevel.length);

    if(newDataGameLevel.length > 0) {

      let sortNewDataGameLevel = newDataGameLevel.sort((a,b)=> a.word.localeCompare(b.word));
      // console.log(sortNewDataGameLevel[80]);
      let tempWordsToFile = [];
      let next = 0;
      // let i = 0;
      nameFileLevel.forEach(record=>{
        // console.log(i++);
        if (record.word.includes(sortNewDataGameLevel[next].word)) {
          tempWordsToFile.push(sortNewDataGameLevel[next]);
          if (sortNewDataGameLevel.length > next + 1) next++;
          if (sortNewDataGameLevel[next].word == sortNewDataGameLevel[next - 1].word) next++;
          // console.log(sortNewDataGameLevel[next].word + ' ---  ' + next);
        } else {
          tempWordsToFile.push(record);
          // console.log(sortNewDataGameLevel[next].word + ' ---  ' + record.word);
        }
      })
      // console.log(tempWordsToFile);
      console.log(sortNewDataGameLevel);

      let newData = `export const ${metrics.varName} = [\n`;
      tempWordsToFile.forEach(el => {
          newData += `{word: '${el.word}', category: '${el.category}', game: ${el.game}},\n`;
      });
      newData += "]";

      let postData = {content: newData, level: metrics.pathLocation};

      // console.log(newData);
      // console.log( metrics.pathLocation);

      $.post( "./php/saveData.php", postData
          , function() {
                // alert( "success" );
                let cleanDataGame = [];
                // newDataGame.forEach(el=>{
                copyNewDataGame.forEach(el=>{
                  if (el.word.length != sortNewDataGameLevel[0].word.length) cleanDataGame.push(el);
                });
                copyNewDataGame = cleanDataGame;
                let newData = "export let newDataGame = [\n";
                cleanDataGame.forEach(el => {
                    newData += `{word: '${el.word}', category: '${el.category}', game: ${el.game}},\n`;
                });
                newData += "]";
                let postData = {content: newData, level: '../php/tempNewDataGame.js'};
                      // console.log(newData);
                      // console.log( postData.level);
                $.post( "./php/saveData.php", postData);
          })
          .fail(function() {
              alert( "error" );
          }
      );
    };
};

function sortData(data) {
    const sortData = data.sort((a,b)=> a.word.localeCompare(b.word));
    var newData = "export const words9Letters = [\n";
    sortData.forEach(el => {
        newData += `{word: '${el.word}', category: '${el.category}', game: ${el.game}},\n`;
    });
    newData += "]";
    return newData;
}
