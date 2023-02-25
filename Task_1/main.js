import {TextHandler} from "./TextHandler.js";

let text_1 = new TextHandler('heLLo WorLd!');
let text_2 = new TextHandler('Вот пример строки,в которой     используются знаки препинания.После знаков должны стоять пробелы , а перед знаками их быть не должно .    Если есть лишние подряд идущие пробелы, они должны быть устранены.');
let text_3 = new TextHandler('В этом предожении пять слов');
let text_4 = new TextHandler('А звезды тем не менее, а звезды Тем не Менее, чуть ближе, но все также холодны.');

console.log( text_1.capitalize() );
console.log( text_2.punctuation() );
console.log( text_3.wordCounter() );
console.log( text_4.wordsFrequency() );
console.log( text_4.wordCounter() );