
const wordDisplayElement = document.querySelector(".word-display");
const guessesCountElement = document.querySelector(".guesses-text b");
const keyboardElement = document.querySelector(".keyboard");
const hangmanImageElement = document.querySelector(".hangman-box img");
const gameOverModal = document.querySelector(".game-modal");
const playAgainButton = gameOverModal.querySelector("button");

let currentWord;           // Will store the word player needs to guess
let correctlyGuessedLetters;   // Will store letters the player guessed correctly
let incorrectGuessCount;   // Will count how many wrong guesses were made
const MAXIMUM_GUESSES = 6; // Player loses after 6 incorrect guesses

function resetGame() {
    // Clear any previous game progress
    correctlyGuessedLetters = [];
    incorrectGuessCount = 0;
    
    // Reset the hangman image to the starting image
    hangmanImageElement.src = "images/hangman-0.svg";
    
    // Update the guesses counter display
    guessesCountElement.innerText = `${incorrectGuessCount} / ${MAXIMUM_GUESSES}`;
    
    // Create empty boxes for each letter
let boxes = '';
for (let i = 0; i < currentWord.length; i++) {
    boxes += '<li class="letter"></li>';
}
wordDisplayElement.innerHTML = boxes;

// Enable all keyboard buttons
let allButtons = keyboardElement.querySelectorAll("button");
for (let i = 0; i < allButtons.length; i++) {
    allButtons[i].disabled = false;
}

// Hide the game over message
gameOverModal.classList.remove("show");
}

function selectRandomWord() {
    // Pick a random word and its hint from our wordList
    const randomIndex = Math.floor(Math.random() * wordList.length);
    const randomWordObject = wordList[randomIndex];
    
    // Set the current word to this random word
    currentWord = randomWordObject.word;
    
    // Display the hint for this word
    document.querySelector(".hint-text b").innerText = randomWordObject.hint;
    
    // Reset the game with this new word
    resetGame();
}

function endGame(playerWon) {
    // Set up the modal differently based on win or loss
    const resultMessage = playerWon ? "You found the word:" : "The correct word was:";
    const resultImage = playerWon ? "victory" : "lost";
    const resultHeading = playerWon ? "Congrats!" : "Game Over!";
    
    // Update the game over modal with appropriate content
    gameOverModal.querySelector("img").src = `images/${resultImage}.gif`;
    gameOverModal.querySelector("h4").innerText = resultHeading;
    gameOverModal.querySelector("p").innerHTML = `${resultMessage} <b>${currentWord}</b>`;
    
    // Show the game over modal
    gameOverModal.classList.add("show");
}

function handleLetterGuess(buttonElement, guessedLetter) {
    // Check if the guessed letter is in the word
    if (currentWord.includes(guessedLetter)) {
        // The letter is correct! Find all positions where it appears
        for (let i = 0; i < currentWord.length; i++) {
            const letterAtPosition = currentWord[i];
            
            if (letterAtPosition === guessedLetter) {
                // Add the letter to our correct guesses list
                correctlyGuessedLetters.push(guessedLetter);
                
                // Show the letter in the display
                const letterElements = wordDisplayElement.querySelectorAll("li");
                letterElements[i].innerText = guessedLetter;
                letterElements[i].classList.add("guessed");
            }
        }
    } else {
        // The letter is not in the word
        // Increase the wrong guess count
        incorrectGuessCount++;
        
        // Update the hangman image to show progress toward losing
        hangmanImageElement.src = `images/hangman-${incorrectGuessCount}.svg`;
    }
    
    // Disable the button so it can't be clicked again
    buttonElement.disabled = true;
    
    // Update the guesses counter display
    guessesCountElement.innerText = `${incorrectGuessCount} / ${MAXIMUM_GUESSES}`;
    
    // Check if the game is over
    if (incorrectGuessCount === MAXIMUM_GUESSES) {
        // Player has used all their guesses - they lose
        endGame(false);
    } else if (correctlyGuessedLetters.length === currentWord.length) {
        // Player has found all letters - they win
        endGame(true);
    }
}

// This loop creates buttons for each letter from 'a' to 'z'
for (let charCode = 97; charCode <= 122; charCode++) {
    // Create a new button element
    const buttonElement = document.createElement("button");
    
    // Set the button text to the current letter (converting ASCII code to character)
    const letter = String.fromCharCode(charCode);
    buttonElement.innerText = letter;
    
    // Add the click handler directly to the button using onclick
    buttonElement.onclick = function() {
        // When clicked, handle the letter guess
        handleLetterGuess(this, letter);
    };
    
    // Add the button to the keyboard element
    keyboardElement.appendChild(buttonElement);
}

// Select a random word to begin
selectRandomWord();

// Set up the "Play Again" button to restart the game
playAgainButton.onclick = selectRandomWord;