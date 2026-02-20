console.log("Last updated 2026-02-20 18:08")

// --------------------------------------------------------------------- global: dictionary

const dictionary = [[  [ ["1st", "sing", "present"], ["I dive"] ],  [ ["3rd", "sing", "present"], ["she dives"] ],  [ ["", "", "past"], ["dived", "dove"] ],  [ ["", "", "inf"], ["to dive"] ]  ], [  [ ["1st", "sing", "present"], ["I run"] ],  [ ["3rd", "sing", "present"], ["she runs"] ],  [ ["", "", "past"], ["ran"] ],  [ ["", "", "inf"], ["to run"] ]  ], [  [ ["1st", "sing", "present"], ["I can"] ],  [ ["3rd", "sing", "present"], ["she can"] ],  [ ["", "", "past"], ["could"] ]  ]]

// --------------------------------------------------------------------- global: acceptable values

const acceptableValues = [["1st", "3rd"], ["sing"], ["present", "past", "inf"]];

// =
// gender: ["m.", "f.", "n."]
// case: ["nom."]
// person: ["1st", "2nd", "3rd"]
// number: ["sing.", "pl."]
// tense: ["pres.", "fut.", "imperf.", "aor."]
// voice: ["act.", "mid.", "pass."]
// mood: ["ind.", "imp.", "inf.", "part."]

// --------------------------------------------------------------------- other global vars

var currentWord = ""; //top-level entry in the dictionary
var currentQuestion = ""; //sub-entry containing the displayed PROMPT WORD and its hidden INFLECTION DATA
var correctAnswer = ""; //the sub-entry containing the hidden ANSWER WORD and its displayed INFLECTION DATA
var wordUses = 0;

var recentAnswers = [];

const promptWord = document.getElementById("promptWord");
const promptForm = document.getElementById("promptForm");
const answerBox = document.getElementById("answerBox");
const submitButton = document.getElementById("submitButton");
const feedback = document.getElementById("feedback");

// --------------------------------------------------------------------- defining setting 1

function newQuestionSettingOne() {

  //-------------------------------------------------------------------- Setup

  submitButton.setAttribute("onclick", "event.preventDefault(); checkAnswer();")
  submitButton.setAttribute("value", "Check");
  
  feedback.innerText = "Conjugate the verb above in the form provided.";
  for (var i=0; i<document.getElementsByName("answerBox").length; i++) document.getElementsByName("answerBox")[i].value = "";

  // Math.floor(Math.random() * 10) returns a random int 0 through 9 inclusive
  
  const answerBoxes = document.getElementsByName("answerBox");
  for (let i=1; i<answerBoxes.length; i++) answerBoxes[i].type = "hidden";
  
  if (wordUses%3 == 0) {
    var temp = currentWord;
    while (temp == currentWord) temp = dictionary[Math.floor(Math.random() * dictionary.length)]
    currentWord = temp;

    recentAnswers = [];

    currentQuestion = currentWord[Math.floor(Math.random() * currentWord.length)]
  }
  else {
    recentAnswers.push(currentQuestion);
    recentAnswers.push(correctAnswer);
    // ^ new
    currentQuestion = correctAnswer;
  }
  wordUses++;

  //-------------------------------------------------------------------- Selecting an answer
  var validAnswersCollected = false;
  var attempts = 0;
  const maxAttempts = currentWord.length*10;

  while (!validAnswersCollected) {
  attempts++;
    
  const varToChange = Math.floor(Math.random() * currentQuestion[0].length)
  var newValue = currentQuestion[0][varToChange];
  if (acceptableValues[varToChange].length < 2) continue;
  while (newValue == currentQuestion[0][varToChange]) newValue = acceptableValues[varToChange][Math.floor(Math.random() * acceptableValues[varToChange].length)];

  validAnswers = [];
  for (const entry of currentWord) {
    if (entry[0][varToChange] != newValue) continue;
    var valid = true;
    for (var j=0; j<entry[0].length; j++) {
      if (j == varToChange) continue;
      if (entry[0][j] == "" || currentQuestion[0][j] == "" || entry[0][j] == currentQuestion[0][j]) continue;
      valid = false;
    }
    if (valid) validAnswers.push(entry);
  }

  var existsNewAnswerLine = false
  for (var i=0; i<validAnswers.length; i++) {
    //replacing if (validAnswer[1] != currentQuestion[1]) existsNewAnswerLine = true;
    var recentlyUsed = false;
    for (const recentAnswer of recentAnswers) if (validAnswers[i][1] == recentAnswer[1]) recentlyUsed = true;
    if (!recentlyUsed) {
      existsNewAnswerLine = true;
    } else {
      var tempArr = [];
      for (var j=0; j<i; j++) tempArr.push(validAnswers[j]);
      for (var j=i+1; j<validAnswers.length; j++) tempArr.push(validAnswers[j]);
      validAnswers = tempArr;
      i--;
    }
  }
  if (validAnswers.length > 0 && existsNewAnswerLine) validAnswersCollected = true;
    
  if (attempts > maxAttempts) {
    validAnswers = [];
    var randomNewAnswer = currentWord[Math.floor(Math.random() * currentWord.length)];
    while (randomNewAnswer[1] == currentQuestion[1]) randomNewAnswer = currentWord[Math.floor(Math.random() * currentWord.length)];
    validAnswers.push(randomNewAnswer);
    break;
  }
  }
  
  var tentative = validAnswers[Math.floor(Math.random() * validAnswers.length)];
  
  // ^ replacing while (tentative[1] == currentQuestion[1]) tentative = validAnswers[Math.floor(Math.random() * validAnswers.length)];
  
  correctAnswer = tentative;

  //-------------------------------------------------------------------- Display
  
  var promptText = "";
  for (var i=0; i<currentQuestion[1].length-1; i++) {
      promptText += ` ${currentQuestion[1][i]}` + ",";
    }
  promptText += ` ${currentQuestion[1][currentQuestion[1].length-1]}`;
  promptWord.innerText = promptText;
  
  promptText = "";
  for (var i=0; i<correctAnswer[0].length; i++) promptText += correctAnswer[0][i] + " "
  promptForm.innerText = promptText;

}

function checkAnswer() {
  
  //collect inputs
  const inputs = document.getElementsByName("answerBox");
  var userAnswers = [];
  for (var i=0; i<inputs.length; i++) {
    if (inputs[i].value != "") userAnswers.push(inputs[i].value);
  }

  //check to make sure all correct answers were inputted
  var allCorrect = true;
  for (var i=0; i<correctAnswer[1].length; i++) {
    for (var j=0; j<userAnswers.length+1; j++) {
      if (correctAnswer[1][i] == userAnswers[j]) break;
      if (j == userAnswers.length) allCorrect = false;
    }
  }

  //check to make sure no incorrect answers are represented
  var noneWrong = true;
  for (var i=0; i<userAnswers.length; i++) {
    for (var j=0; j<correctAnswer[1].length; j++) {
      if (correctAnswer[1][j] == userAnswers[i]) break;
      if (j == correctAnswer[1].length) noneWrong = false;
    }
  }

  //display feedback
  if (allCorrect && noneWrong) {
    feedback.innerText = "Correct!"
  } else {
    feedback.innerText = "Nope. Correct answer:";
    for (var i=0; i<correctAnswer[1].length-1; i++) {
      feedback.innerText += ` ${correctAnswer[1][i]}` + ",";
    }
    feedback.innerText += ` ${correctAnswer[1][correctAnswer[1].length-1]}`;
  }

  //update button
  submitButton.setAttribute("onclick", "event.preventDefault(); newQuestionSettingOne();")
  submitButton.setAttribute("value", "Next");

}

function addField() {
  const answerBoxes = document.getElementsByName("answerBox");
  for (const box of answerBoxes) {
    if (box.type == "hidden") {
      box.type = "text";
      return;
    }
  }
  alert("No more fields to add!");
}

newQuestionSettingOne();
