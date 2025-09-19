//---------------------------------------------------------------------------------- global vars

var lang; //equals 0 (FR) or 1 (EN)
var prompt;
var question;
var responses = [];

const promptsByLang = [promptsFR, promptsEN];
const qsByLang = [qsFR, qsEN];
const wordlistsByLang = [wordsFR, wordsEN];

const promptsFR = [`Suivant`, `Debut de la liste de mots`]; //French prompts like "Next", "Finish", etc.
const promptsEN = [`Next`, `Beginning of word list`]; //English versions of the above

const qsFR = []; //Questionnaire text in French
const qsEN = []; //Questionnaire text in English

const wordlistEN = [`word 1`, `word 2`, `word 3`]; //English wordlist
const wordlistFR = [`mot 1`, `mot 2`, `mot 3`]; //French wordlist

const narrative = `Beaucoup de mots`; //French narrative

//---------------------------------------------------------------------------------- on-load tasks

//double and shuffle the wordlists

function doubleAndShuffle(words) {
  let tempwords = []; 
  let temp = " ";

  for (i=0; i<words.length; i++) {
    tempwords.push(words[i]);
  }

  for (i=words.length-1; i>0; i--) {
    let swap = Math.floor(Math.random()*(i+1));
    
    temp = words[swap];
    words[swap] = words[i];
    words[i] = temp;
  }

  for (i=words.length-1; i>0; i--) {
    let swap = Math.floor(Math.random()*(i+1));
    
    temp = tempwords[swap];
    tempwords[swap] = tempwords[i];
    tempwords[i] = temp;
  }

  for (i=0; i<tempwords.length; i++) {
    words.push(tempwords[i]);
  }
}

doubleAndShuffle(wordsFR);
doubleAndShuffle(wordsEN);



//---------------------------------------------------------------------------------- startup page buttons

//background and text color, TEST THIS

var r = document.querySelector(':root');

function setCSSvar(vari, value) {
  r.style.setProperty(vari, value);
}

setCSSvar('--buttontextcolor', '#000000');
r.style.setProperty('--buttoncolor', '#000000');

function setLang(a) {
  lang = a;
  prompt = promptsByLang[a];
  question = qsByLang[a];
}

//options for accessible colors:
// orange #daa337
// yellow #eee462
// grey #505050
// purple #c329df
// white #ffffff
// black #000000


//---------------------------------------------------------------------------------- wordlist section

function run() { 
  document.getElementById("startpage").remove();

  //Set the Launch button to say "Next" (prompt[0])

  //Set p1 to read "Beginning of word list" (prompt[1])

  //Set the Next button to run "wordlist"
}

function wordlist() {

}








