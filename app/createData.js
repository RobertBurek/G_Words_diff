import { words5Letters } from '../src/5-letters.js';
import { words6Letters } from '../src/6-letters.js';
import { words7Letters } from '../src/7-letters.js';
import { words8Letters } from '../src/8-letters.js';
import { words9Letters } from '../src/9-letters.js';
import { wordsCategory } from '../php/wordsCategory.js';


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


// let sortGroupsLettersCategory = groupsLettersCategory[0].sort((a,b)=>a.word.localeCompare(b.word));
let sortGroupsLettersCategory = words9Letters.sort((a,b)=>a.word.localeCompare(b.word));
// console.log(sortGroupsLettersCategory);

var dataCategory = "export const words9Letters = [\n"
sortGroupsLettersCategory.forEach(el=>{
    dataCategory += `{word: '${el.word}', category: '${el.category}', game: ${el.game}},\n`
});
dataCategory += "]";

// console.log(dataCategory);

dataCategory = {content: dataCategory};

console.log(dataCategory);

$.post( "../php/saveData.php", dataCategory
    , function() {
          alert( "success" );
    })
    .fail(function() {
        alert( "error" );
    }
);