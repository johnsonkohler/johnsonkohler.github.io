console.log("Last updated 2026-02-20 15:40")

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

const promptWord = document.getElementById("promptWord");
const promptForm = document.getElementById("promptForm");
const answerBox = document.getElementById("answerBox");
const feedback = document.getElementById("feedback");

// --------------------------------------------------------------------- defining setting 1

function newQuestionSettingOne() {

  //-------------------------------------------------------------------- Setup
  
  feedback.innerText = "Conjugate the verb above in the form provided.";

  // Math.floor(Math.random() * 10) returns a random int 0 through 9 inclusive
  
  const answerBoxes = document.getElementsByName("answerBox");
  for (let i=1; i<answerBoxes.length; i++) answerBoxes[i].type = "hidden";
  
  if (wordUses%3 == 0) {
    var temp = currentWord;
    while (temp == currentWord) temp = dictionary[Math.floor(Math.random() * dictionary.length)]
    currentWord = temp;

    currentQuestion = currentWord[Math.floor(Math.random() * currentWord.length)]
  }
  else {
    currentQuestion = correctAnswer;
  }
  wordUses++;

  //-------------------------------------------------------------------- Selecting an answer
  var validAnswersCollected = false;

  while (!validAnswersCollected) {
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
  //console.log(`Changing \"${currentQuestion[0][varToChange]}\" to \"${newValue}\".\nvalid Answers: ${validAnswers}`);

  var existsNewAnswerLine = false
  for (const validAnswer of validAnswers) if (validAnswer[1] != currentQuestion[1]) existsNewAnswerLine = true;
  if (validAnswers.length > 0 && existsNewAnswerLine) validAnswersCollected = true;
  }
  
  var tentative = validAnswers[Math.floor(Math.random() * validAnswers.length)];
  while (tentative[1] == currentQuestion[1]) tentative = validAnswers[Math.floor(Math.random() * validAnswers.length)];
  
  correctAnswer = tentative;

  //-------------------------------------------------------------------- Display

  var promptText = "";
  for (var i=0; i<currentQuestion[1].length; i++) promptText += currentQuestion[1][i] + " "
  promptWord.innerText = promptText;
  
  promptText = "";
  for (var i=0; i<correctAnswer[0].length; i++) promptText += correctAnswer[0][i] + " "
  promptForm.innerText = promptText;

}

function checkAnswer() {

  console.log("Marking answer:")
  
  //collect inputs
  const inputs = document.getElementsByName("answerBox");
  var answers = [];
  for (var i=0; i<inputs.length; i++) {
    if (inputs[i].value != "") answers.push(inputs[i].value);
    inputs[i].value = "";
  }
  console.log("Correct answer(s): " + correctAnswer[1]);
  console.log("User's answer(s): " + answers);

  //check to make sure all correct answers are represented
  var allCorrect = true;
  for (var i=0; i<correctAnswer[1].length; i++) {
    for (var j=0; j<answers.length; j++) if (correctAnswer[i] == answers[j]) continue;
    allCorrect = false;
  }

  //check to make sure no incorrect answers are represented
  var noneWrong = true;
  for (var i=0; i<answers.length; i++) {
    for (var answer of correctAnswer[1]) if (answer == answers[i] || answers[i] == "") continue;
    noneWrong = false;
  }

  //display feedback
  if (allCorrect && noneWrong) {
    feedback.innerText = "Correct!"
  } else {
    feedback.innerText = "Nope. Correct answer: " + correctAnswer;
  }
  
  newQuestionSettingOne();
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
