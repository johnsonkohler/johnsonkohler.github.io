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

// --------------------------------------------------------------------- defining setting 1

function newQuestionSettingOne() {

  //-------------------------------------------------------------------- Setup
  
  //suppress default on Submit button

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
  while (newValue == currentQuestion[0][varToChange]) newValue = acceptableValues[varToChange][Math.floor(Math.random() * acceptableValues[varToChange].length)];

  validAnswers = [];
  for (const entry of currentWord) {
    if (entry[0][varToChange] != newValue) continue;
    var valid = true;
    for (const j=0; j<entry[0].length; j++) {
      if (j == varToChange) continue;
      if (entry[0][j] == "" || currentQuestion[0][j] == "" || entry[0][j] == currentQuestion[0][j]) continue;
      valid = false;
    }
    if (valid) validAnswers.push(entry);
  }
  console.log(`Changing \"${currentQuestion[0][varToChange]}\" to \"${newVal}\".\nvalid Answers: ${validAnswers}`);
    
  if (validAnswers.length > 0) validAnswersCollected = true;
  }
  
  var tentative = validAnswers[Math.floor(Math.random() * validAnswers.length)];
  while (tentative[1] == currentQuestion[1]) tentative = validAnswers[Math.floor(Math.random() * validAnswers.length)];
  
  correctAnswer = tentative;

  //-------------------------------------------------------------------- Display

  //display question text:
  promptWord.innerText = currentQuestion[1];
  promptForm.innerText = correctAnswer[0];

}

function checkAnswer() {
  //Collect input(s)
  //Wipe answer box fields
  //If (input == correctAnswer[0]), display "correct!". Otherwise display "incorrect" and correctAnswer.
  //For questions with several answers, the entry in correctAnswer will be an array. Make sure the multiple-input formats it the same way.
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
