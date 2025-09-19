//---------------------------------------------------------------------------------- global vars

var lang = 2; //equals 0 (FR) or 1 (EN) or 2 (undefined)
var prompt;
var question;
var responses = [];

var listLang; 
var listIndex = -1;
var listsRead = 0;

var qIndex = -1;

const promptsFR = [`Suivant`, `Début de la liste de mots`, `Fin de la liste de mots. Prenez un pause!`, `Continuer au questionnaire`]; //French prompts
const promptsEN = [`Next`, `Beginning of word list`, `End of word list. Take a break!`, `Continue to Questionnaire`]; //English prompts

const qsFR = []; //Questionnaire text in French
const qsEN = []; //Questionnaire text in English

const wordlistEN = [`word 1`, `word 2`, `word 3`]; //English wordlist
const wordlistFR = [`mot 1`, `mot 2`, `mot 3`]; //French wordlist

const promptsByLang = [promptsFR, promptsEN];
const qsByLang = [qsFR, qsEN];
const list = [wordlistFR, wordlistEN];

const narrative = `Beaucoup de mots`; //French narrative

const qbutton = document.getElementById("qbutton");
const p1 = document.getElementById("p1");

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

doubleAndShuffle(wordlistFR);
doubleAndShuffle(wordlistEN);
wordlistFR.push(narrative);



//---------------------------------------------------------------------------------- startup page buttons

//background and text color, TEST THIS


function setCSSvar(vari, value) {
  var r = document.querySelector(':root');
  r.style.setProperty(vari, value);
}

//setCSSvar('--buttontextcolor', '#000000');
//r.style.setProperty('--buttoncolor', '#000000');

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
  if (lang == 2) {
    alert(`Veuillez sélectionner une langue · Please select a language`);
  } else {
  
    document.getElementById("startpage").remove();
  
    alert(`JS updated 00:04`);
  
    qbutton.innerHTML = prompt[0]; //Launch button --> Next button
    qbutton.setAttribute(`onclick`, `wordlist()`);
    p1.innerHTML = prompt[1];
  
    listLang = Math.floor(Math.random()*2); //choose a wordlist to go first
    
  }
}

function wordlist() {
  listIndex++;
  
  if (listIndex < list[listLang].length) {
    p1.innerHTML = list[listLang][listIndex];
  } else if (listsRead == 0) {
    p1.innerHTML = prompt[2]; //end of wordlist take a break
    listsRead++;
    if (listLang == 0) {
      listLang++;
    } else {
      listLang--;
    }
    listIndex = -1;
  } else {
    p1.innerHTML = prompt[2];
    qbutton.innerHTML = prompt[3]; //continue to questionnaire
    qbutton.setAttribute(`onclick`, `questionnaire()`);
  }
}


//---------------------------------------------------------------------------------- questionnaire

function questionnaire() {
  alert(`All is working well so far!`);

  qbutton.innerHTML = prompt[0]; //Start questionnaire button --> Next question button
  qbutton.setAttribute(`onclick`, `q()`);

  p1.innerHTML = question[0];
}

function q() {
  qIndex++;

  
}








