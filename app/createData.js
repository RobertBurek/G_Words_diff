import { words5Letters } from '../src/5-letters.js';
import { words6Letters } from '../src/6-letters.js';
import { words7Letters } from '../src/7-letters.js';
import { words8Letters } from '../src/8-letters.js';
import { words9Letters } from '../src/9-letters.js';
import { wordsCategory } from '../php/wordsCategory.js';

console.log(wordsCategory);

function createData(record) {
    // console.log(record);
    const level = record.word;
    console.log(level);
    // console.log(level);
    // console.log(data);
}

createData(wordsCategory[1]);