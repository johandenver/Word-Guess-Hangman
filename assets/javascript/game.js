// variables:

// create an array with possile choices: 
var answerWords = ["desert", "runner", "coyote", "anvil", "cactus", "sand", "meep", "acme", "looney", "dynamite"]
// create an array with the alphabet:
var letterChoices = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]

// set the baseline to the game:
var wins = 0;
var losses = 0;
var guessesLeft = 10;

//var randomAnswer = generateWord();  //need to remove funcition. 
// creates an empty array to hold the answer:
var currentWord = [];
var incorrectGuesses = []; //letters not in answer word. 
var correctGuesses = []; //letters that are in answer word. 


//document.querySelector("#incorrect-letters").textContent = guessesChosen.join(", ")

// link variables to html:
var docWins = document.getElementById("wins");
var docLosses = document.getElementById("losses");
var docGuessesRemaining = document.getElementById("guesses-left");
var docCurrentWord = document.getElementById("current-word");
var docLettersChosen = document.getElementById("incorrect-letters");
var alertMessage = document.querySelector("#alert-message");

docWins.textContent = wins
docLosses.textContent = losses
docGuessesRemaining.textContent = guessesLeft


// 1: generate an answer word randomly from answerWords array:
var answer = answerWords [Math.floor(Math.random() * answerWords.length)];
console.log(answer)

// create loop to push the random word to the document in underscore spaces: 

for (var i = 0; i < answer.length; i++) {
   currentWord.push("_");
   //console.log(currentWord) 
   docCurrentWord.textContent = currentWord.join(" ")
}

/* 2: capture the user input (letter guesses).
    2.1: normalize and validate the input. (change to lower case, make sure its a letter etc.) 
*/

// function to alert if letter is not chosen:
document.onkeydown = function(event) {
    //resets the alert
    alertMessage.textContent = ""
    //converts any user key in caps to lowercase.
    var letter = event.key.toLowerCase();
    //limits the acceptable keys to letters only (no symbols or numbers).
    if(letter>="a" && letter<= "z") { 
        evaluateUserInput(letter)

    } else { 
        //gives an alert if a non letter key is pushed.
        document.querySelector("#alert-message").textContent = "Please select a letter!!"
    }
   
}


//  3: evaluate the user's input. (check if it is equal to the random computer choice). 
    // 3.1: check if the users letter is in the random word answer. 
function evaluateUserInput(letter) {
    if (answer.indexOf(letter) !== -1) {
        if (correctGuesses.indexOf(letter) !== -1){
            alertMessage.textContent = "You already have picked that letter!";
        } else {
            correctGuesses.push(letter);
            correctGuess(letter);
            lossIncrement(letter);  
        }
    } else {
        dupCheck(letter);
    }
};
        
// function to check for duplicates
function dupCheck (letter){
        if (incorrectGuesses.indexOf(letter) !== -1) {
    alertMessage.textContent = "letter already chosen, pick another!"
    } else {
    incorrectGuesses.push(letter);
    docLettersChosen.textContent = incorrectGuesses.join(", ");
    lossIncrement(letter);
    }
};

// function to push correct push letter in answer field. 
function correctGuess(letter){

    for (let i = 0; i < answer.length; i++) {

        if (answer[i] === letter) {
            currentWord[i] = answer [i];
            winsIncrement();
        }        
    } 
    docCurrentWord.textContent = currentWord.join(" ")
}
// 3.3: If letter is incorrect add the letter to the answer field. 

// 3.4: Check if the user has guesses remaining. 
function lossIncrement(letter){
    guessesLeft--;
    docGuessesRemaining.textContent = guessesLeft;
    
    if (guessesLeft === 0){
        losses++;
        docLosses.textContent = losses
        reset();
    }  
}

function winsIncrement(letter) {
    if (currentWord.indexOf("_") === -1) {
        wins++;
        docWins.textContent = wins
        reset();
    } 
}
// 3.5: If user completes the all the correct letters of the word correctly, then need to alert user and reset the game, and increment wins by one. 
// 3.6: If user doesnt find all letters in the answer word in 10 tries, they loses game and need to increment losses by one and game resets. 


//4: Create a game reset. Reset all variables back to initial values (except for wins/losses) and then redisplay game data. 


function reset() {
    guessesLeft = 10;
    //guessesChosen = [];
    currentWord = [];
    incorrectGuesses = []; //letters not in answer word. 
    correctGuesses = []; //letters that are in answer word. 
    
    answer = answerWords [Math.floor(Math.random() * answerWords.length)];
    console.log(answer)

    // create loop to push the random word to the document in underscore spaces: 

    for (var i = 0; i < answer.length; i++) {
        currentWord.push("_");
        //console.log(currentWord) 
        docCurrentWord.textContent = currentWord.join(" ")
    }

}