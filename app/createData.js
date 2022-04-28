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
let titleButtonLongWord = '';
let dataWords = [];
let numberWords = 0;

const sjp = document.querySelector('#sjp');
const infoWord = document.querySelector('#word');
infoWord.addEventListener('click', ()=>{
  const urlSJP = 'https://sjp.pl/' + wordElement.innerHTML;
  // sjp.innerHTML = `<iframe src="${urlSJP}" height="200" width="600" title="Iframe Example"></iframe>`
  sjp.innerHTML = `<iframe id="infoWord" src="${urlSJP}" class="info-word"></iframe>`;
  sjp.classList.remove('hide');
})


function createNewDataWords(nameFile) {
  dataWords = [];
  nameFile.forEach(record => {
      if (record.game == null) dataWords.push(record);
  })
  numberWords = dataWords.length;
};

createNewDataWords(nameFileLevel);

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

function checkingSJP(word) {
  let dataPost = {word: word};
  $.post( "./php/sjp.php", dataPost, function(data) {
    // alert( "OK - odczyt / zapis do bazy" );
    // console.log(data.name);
    // console.log(data);
    // let element = data.querySelector("a");
    console.log(data);
      $( ".result-sjp" ).html( data );
    })
      .fail(function() {
          alert( "Błąd odczytu z bazy" );
      });
};

const wordElement = document.querySelector('.word');
function drawWord(){
  // return wordsLetters[Math.floor(Math.random()*wordsLetters.length)];
  if (dataWords.length > 0) wordElement.innerHTML = dataWords[Math.floor(Math.random()*dataWords.length)].word;
  else wordElement.innerHTML = " ";
  sjp.classList.add('hide');
  checkingSJP(wordElement.innerHTML);
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


const longWordButton = document.getElementById('longWordData');


// const fillingButton = document.getElementById('filling');
const setting5Letters = document.getElementById('5lettersData');
const setting6Letters = document.getElementById('6lettersData');
const setting7Letters = document.getElementById('7lettersData');
const setting8Letters = document.getElementById('8lettersData');
const setting9Letters = document.getElementById('9lettersData');
// const onlyWords = document.getElementById('onlyWords');
// const notWord = document.querySelector('.not-word');
// const stringChars = document.getElementById('stringChars');
// const onceAgainSection = document.getElementById('onceAgain');
// const divOnlyWords = document.querySelector('.above.only-words');
// const pOnlyWords = document.querySelector('.above.only-words p');


// numberWords = dataWords.length;

let currentlyLetter = '';

// function geveLetter(el) {
//     currentlyLetter = el.innerHTML;
//     console.log(currentlyLetter);
// }

let titleKeyboard = document.querySelector('#filling div')
let letters = document.querySelectorAll('.normal');

letters.forEach(letter=>{
  letter.addEventListener('click', ()=>{
    currentlyLetter = letter.innerHTML;
    createNewDataWords(nameFileLevel);
    console.log(dataWords);
    let tempDataWords = [];
    dataWords.forEach(record=>{
      if (record.word[0] == currentlyLetter) tempDataWords.push(record);
    })
    console.log(tempDataWords);
    dataWords = [];
    dataWords = [...tempDataWords];
    // console.log(dataWords);
    titleKeyboard.innerHTML = `<div class="dropdown-note" dropdown>(słowa na literę : ${currentlyLetter}, ${dataWords.length} słów)</div>`;
    drawWord();
  });
})


function cleanTitleNumberLetters() {
    titleKeyboard.innerHTML = `<div class="dropdown-note" dropdown>(słowa na literę : )</div>`;
}

titleButtonLongWord = `(5-literowe, ${numberWords} słów)`;
longWordButton.innerHTML = `<i class="fas fa-sort-amount-down-alt" dropdown></i> 
Długość słowa <div class="dropdown-note" dropdown>${titleButtonLongWord}</div>`;


setting5Letters.addEventListener('click', ()=> {
  cleanTitleNumberLetters();
  nameFileLevel = words5Letters;
  createNewDataWords(nameFileLevel);
  drawWord();
  metrics = {varName: 'words5Letters', pathLocation: '../src/5-letters.js'};
  titleButtonLongWord = `(5-literowe, ${numberWords} słów)`;
  longWordButton.innerHTML = `<i class="fas fa-sort-amount-down-alt" dropdown></i> 
  Długość słowa <div class="dropdown-note" dropdown>${titleButtonLongWord}</div>`;
    console.log(dataWords.length);
});
setting6Letters.addEventListener('click', ()=> {
  cleanTitleNumberLetters();
  nameFileLevel = words6Letters;
  createNewDataWords(nameFileLevel);
  drawWord();
  metrics = {varName: 'words6Letters', pathLocation: '../src/6-letters.js'};
  titleButtonLongWord = `(6-literowe, ${numberWords} słów)`;  
  longWordButton.innerHTML = `<i class="fas fa-sort-amount-down-alt" dropdown></i> 
  Długość słowa <div class="dropdown-note" dropdown>${titleButtonLongWord}</div>`;
    console.log(dataWords.length);
});
setting7Letters.addEventListener('click', ()=> {
  cleanTitleNumberLetters();
  nameFileLevel = words7Letters;
  createNewDataWords(nameFileLevel);
  drawWord();
  metrics = {varName: 'words7Letters', pathLocation: '../src/7-letters.js'};
  titleButtonLongWord = `(7-literowe, ${numberWords} słów)`;
  longWordButton.innerHTML = `<i class="fas fa-sort-amount-down-alt" dropdown></i> 
  Długość słowa <div class="dropdown-note" dropdown>${titleButtonLongWord}</div>`;
    console.log(dataWords.length);
});
setting8Letters.addEventListener('click', ()=> {
  cleanTitleNumberLetters();
  nameFileLevel = words8Letters;
  createNewDataWords(nameFileLevel);
  drawWord();
  metrics = {varName: 'words8Letters', pathLocation: '../src/8-letters.js'};
  titleButtonLongWord = `(8-literowe, ${numberWords} słów)`;
  longWordButton.innerHTML = `<i class="fas fa-sort-amount-down-alt" dropdown></i> 
  Długość słowa <div class="dropdown-note" dropdown>${titleButtonLongWord}</div>`;
    console.log(dataWords.length);
});
setting9Letters.addEventListener('click', ()=> {
  cleanTitleNumberLetters();
  nameFileLevel = words9Letters;
  createNewDataWords(nameFileLevel);
  drawWord();
  metrics = {varName: 'words9Letters', pathLocation: '../src/9-letters.js'};
  titleButtonLongWord = `(9-literowe, ${numberWords} słów)`;
  longWordButton.innerHTML = `<i class="fas fa-sort-amount-down-alt" dropdown></i> 
  Długość słowa <div class="dropdown-note" dropdown>${titleButtonLongWord}</div>`;
    console.log(dataWords.length);
});




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
                // console.log(`Zapisano do pliku  ${metrics.pathLocation}  -  ${newData.length} słów!`);
                let cleanDataGame = [];
                // newDataGame.forEach(el=>{
                copyNewDataGame.forEach(el=>{
                  if (el.word.length != sortNewDataGameLevel[0].word.length) cleanDataGame.push(el);
                });
                copyNewDataGame = [...cleanDataGame];
                console.log(`Zapisano do pliku  ${metrics.pathLocation}  -  ${sortNewDataGameLevel.length} słów!`);
                let newDataRest = "export let newDataGame = [\n";
                cleanDataGame.forEach(el => {
                  newDataRest += `{word: '${el.word}', category: '${el.category}', game: ${el.game}},\n`;
                });
                newDataRest += "]";
                let postDataRest = {content: newDataRest, level: 'tempNewDataGame.js'};
                      // console.log(newData);
                      // console.log( postData.level);
                $.post( "./php/saveData.php", postDataRest, function() {
                  console.log(`Zostało do zapisania ${cleanDataGame.length} słów`);
                  alert(`Zapisano do pliku  ${metrics.pathLocation}  -  ${sortNewDataGameLevel.length} słów!\n
                  Zostało do zapisania ${cleanDataGame.length} słów`);
                  copyNewDataGame = [...cleanDataGame];
                });
          })
          .fail(function() {
              alert( "Coś poszło nie tak z zapisem do pliku." );
          }
      );
    } else {
      console.log(`Nie ma nic do zapisania. Ilość rekordów: ${newDataGameLevel.length}`);
      alert(`Nie ma nic do zapisania. Ilość rekordów: ${newDataGameLevel.length}`);
    }
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
