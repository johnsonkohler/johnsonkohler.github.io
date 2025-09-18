//global vars

var lang; //equals 0 (FR) or 1 (EN)
var prompt;
var question;
var responses = [];

const promptsByLang = [promptsFR, promptsEN];
const qsByLang = [qsFR, qsEN];
const wordlistsByLang = [wordsFR, wordsEN];

const promptsFR = []; //French prompts like "Next", "Finish", etc.
const promptsEN = []; //English versions of the above

const qsFR = []; //Questionnaire text in French
const qsEN = []; //Questionnaire text in English

const wordlistEN = []; //English wordlist
const wordlistFR = []; //French wordlist

const narrative = `Words` //French narrative

//--------------------------- on-load tasks:

var r = document.querySelector(':root');

//function for doubling and randomizing the wordlist goes here
//call said function here


//options for accessible colors:
// orange #daa337
// yellow #eee462
// grey #505050
// purple #c329df
// white #ffffff
// black #000000













