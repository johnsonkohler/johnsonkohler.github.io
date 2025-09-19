//---------------------------------------------------------------------------------- global vars

var lang = 2; //equals 0 (FR) or 1 (EN) or 2 (undefined)
var prompt;
var question;
var answers = [];

var listLang; 
var listIndex = -1;
var listsRead = 0;

var qIndex = -1;

const promptsFR = [`Suivant`, `Début de la liste de mots`, `Fin de la liste de mots. Prenez un pause!`, `Continuer au questionnaire`, `Terminer`]; //French prompts
const promptsEN = [`Next`, `Beginning of word list`, `End of word list. Take a break!`, `Continue to Questionnaire`, `Finish`]; //English prompts

const wordlistFR = [`fie`, `vie`, `scie`, `dit`, `chie`, `sept`, `dette`, `cède`, `sèche`, `dose`, `chose`, `t’oses`, `t’ôtes`, `sache`, `tache`, `vache`, `chatte`, `douze`, `sou`, `fou`, `vous`, `chou`, `doux`, `tout`, `château`, `gâteau`, `pâteux`, `pâte`, `tasse`, `basse`, `bail`, `maille`, `taille`, `paille`, `veine`, `aime`, `pi`, `habit`, `dôme`, `soute`, `coude`, `sauterelle`, `chanterelle`, `magie`, `surprise`, `gamme`];
const wordlistEN = [`fee`, `vee`, `see`, `Dee`, `she`, `set`, `debt`, `said`, `sesh`, `doze`, `shows`, `toes`, `tote `, `sash`, `stash`, `vash`, `shat`, `dues`, `sue`, `Shaw`, `sod`, `hot`, `hawed`, `pot`, `toss`, `boss`, `bye`, `my`, `tie`, `pie`, `Venn`, `em`, `pee`, `abbey`, `dome`, `soot`, `could`, `dragonfly`, `chant`, `magic`, `surprise`, `masterful`]; 
const context = [[`fie`, `Je me fie à toi.`], [`t’oses`, `Quand tu oses me contredire, t’oses me manquer de respect.`], [`t’ôtes`, `Tu ôtes ton manteau puis t’ôtes ton pull.`], [`tache`, `Il y a une tache de moutarde sur son chandail.`], [`pâteux`, `Le riz était plus pâteux que d’habitude.`], [`doze`, `The cat likes to doze on the rug.`], [`hawed`, `He hemmed and hawed.`]];

//Questionnaire text in FR then EN
const qsFR = [["Directives pour le questionnaire", "Les douze prochaines questions portent sur vous (votre genre, votre sexe, les langues que vous parlez, votre identité culturelle, etc.). Veuillez répondre à chaque question aussi complètement et justement que vous le voulez selon votre aise (souvenez-vous que vos réponses demeureront anonymes). Si vous ne voulez pas répondre à une question, vous pouvez laisser le champ vide. Notez qu’une fois que votre réponse sera soumise, vous ne pourrez plus la changer : il n’est pas possible de revenir aux questions précédentes. Sélectionnez « Suivant » quand vous êtes prêt·e·s !"], ["Quel est votre genre ?", "Veuillez répondre le plus complètement et justement que vous le voulez selon votre aise."], ["Quel est votre genre ?", "(Si vous avez répondu à la question précédente en français, veuillez répondre à celle-ci en anglais, et vice-versa)"], ["À quel point vous sentez-vous ___ aujourd’hui, ou au moment où vous avez effectué cet enregistrement ?", "", "Féminin·e", "", "", "Masculin·e"], ["Vous identifiez-vous comme faisant partie de la communauté LGBTQ+ ?", "Veuillez répondre le plus complètement et justement que vous le voulez selon votre aise.", "", "Diriez-vous que plusieurs de vos ami·e·s s’identifient comme faisant partie de la communauté LGBTQ+ ?", "Veuillez répondre le plus complètement et justement que vous le voulez selon votre aise.", ""], ["Quel âge avez-vous (en années) ?", "", "", "Quel est votre lieu de naissance ?", "", ""], ["Comment décririez-vous votre niveau de compétence en :", "", "français", "", "", "anglais"], ["À quel âge avez-vous acquis :", "(0 = votre langue maternelle ; vous pouvez sélectionner 0 pour plus d’une langue)", "français", "", "", "anglais"], ["Quelle(s) langue(s) parlez-vous à la maison ?", "", "", "Parlez-vous une ou des langues autre(s) que le français et l’anglais ? Si oui, à quel niveau de compétence ?"], ["Merci !", "Merci d’avoir participé à cette étude ! Vous pouvez dorénavant redonner cet appareil à la personne qui vous l’a confié. Si vous avez des questions, n’hésitez pas à nous les demander !"], ["Données:"]]; 
const qsEN = [["Questionnaire Instructions", "The following 12 questions are about you (your gender, your sex, the languages you speak, your cultural identity, etc.). Please answer each question as completely and accurately as you are comfortable (remember your responses will stay anonymous). If you don’t want to answer a question at all, you can leave it blank. Note that once you move on from a question, you can’t change your answer; there’s no Back button. Click ‘Next’ whenever you’re ready!"], ["What is your gender?", "Please answer as accurately and completely as you feel comfortable."], ["What is your gender?", "(If you answered the previous question in English, please answer this one in French, and vice versa)"], ["How ___ are you feeling today, or when you made this recording?", "", "Feminine", "", "", "Masculine"], ["Do you identify as a member of the LGBTQ community?", "Please answer as accurately and completely as you feel comfortable.", "", "Would you say that many of your friends identify as LGBTQ?", "Please answer as accurately and completely as you feel comfortable.", ""], ["How old are you (in years)?", "", "", "What is your place of birth?", "", ""], ["How would you rate your proficiency in:", "", "French", "", "", "English"], ["At what age did you acquire:", "(0 = mother tongue; this can be true for both languages.)", "French", "", "", "English"], ["What languages do you speak at home?", "", "", "Do you speak any other languages? If so, how well?"], ["Thank you!", "Thank you for participating in this study! Hand this device back to the person who gave it to you. If you have any questions, feel free to ask!"], ["Responses:"]]; 

//DOI elements and the formats they should take during the questionnaire section
const space = ["p1", "little-p1", "label1", "p2", "little-p2", "label2"];
const formats = [["hidden", "hidden"], ["text", "hidden"], ["text", "hidden"], ["range", "range"], ["text", "text"], ["number", "text"], ["range", "range"], ["number", "number"], ["text", "text"], ["hidden", "hidden"], ["text", "hidden"]];

const promptsByLang = [promptsFR, promptsEN];
const qsByLang = [qsFR, qsEN];
const list = [wordlistFR, wordlistEN];

const narrative = `Chez les Allard-Pelletiers, les partés de Noël sont un important rituel familial. À chaque 24 décembre, tous se réunissent à la ferme de la grand-mère, Martine, pour préparer une fête chaque fois plus mémorable que la dernière. Les festivités débutent dès les premiers invités arrivés. On commence par décorer l’arbre d’une panoplie de boules de Noël assorties. Puis, on tapisse les murs de guirlandes rouges et vertes. Enfin, gare aux petits ! car malgré leur courte taille ils dévoreront leurs rôties couvertes de beurre ou de sirop avant d’aller se défouler dans l’énorme cour arrière. <br><br>
Le soir venu, après le souper, les adultes s’arment de verres pour boire du champagne, tandis que les enfants jurent par les chocolats chauds de leur grand-mère. Ensuite, on s’installe autour d’un feu et on se raconte des histoires fantastiques de reines très riches et tout autant malveillantes, de Vikings aux longs cheveux roux, de rats en guerre contre des grenouilles et d’épées ensevelies dans des rocs magiques. Ces contes de fée durent des heures — il faut dire que les Allard-Pelletiers aiment la fantaisie ! — jusqu’à ce que les jeunes ne peuvent plus garder l’œil ouvert. Demain matin, on se réjouira et on échangera les cadeaux, mais pour l’instant, c’est dodo !`;

const p1 = document.getElementById("p1");
const input1 = document.getElementById("input1");
const label1 = document.getElementById("label1");
const p2 = document.getElementById("p2");
const input2 = document.getElementById("input2");
const label2 = document.getElementById("label2");
const qbutton = document.getElementById("qbutton");


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
  
    alert(`JS updated 01:04`);
  
    qbutton.innerHTML = prompt[0]; //Launch button --> Next button
    qbutton.setAttribute(`onclick`, `wordlist()`);
    p1.innerHTML = prompt[1];
  
    listLang = Math.floor(Math.random()*2); //choose a wordlist to go first
    
  }
}

function wordlist() {
  listIndex++;

  var contextSentence = "";

  if (listIndex < list[listLang].length) {
    for (i=0; i<context.length; i++) {
      if (list[listLang][listIndex] == context[i][0]) {
        contextSentence = `context[i][1] <br><br> `;
      }
    }
  }
  
  if (listIndex < list[listLang].length) {
    if (lang == 0) p1.innerHTML = `${contextSentence} + « Dit ${list[listLang][listIndex]} deux fois. »`;
    if (lang == 1) p1.innerHTML = `${contextSentence} + "Say ${list[listLang][listIndex]} twice."`;
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
  if (qIndex > 1) {
    answers += input1.value;
    answers += "; ";
    answers += input2.value;
    answers += "; ";
  }

  input1.value = "";
  input2.value = "";

  input1.setAttribute("type", formats[qIndex][0]);
  input2.setAttribute("type", formats[qIndex][1]);

  if (input1.type == "range") {
    input1.setAttribute("style", "height: 25px");
    input2.setAttribute("style", "height: 25px");
  } else {
    input1.setAttribute("style", "height: 100px");
    input2.setAttribute("style", "height: 100px");
  }

  for (i=0; i<6; i++) {
    if (i < question[qIndex].length) {
      document.getElementById(space[i]).innerHTML = question[qIndex][i];
    } else {
      document.getElementById(space[i]).innerHTML = " ";
    }
  }
  
  qIndex++;
  
  if (qIndex == 9) {
    qbutton.innerHTML = prompt[4];
  }
  
  if (qIndex == 11) input1.value = answers;
}








