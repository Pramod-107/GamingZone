const playerChoiceText = document.getElementById("playerChoice");
const computerChoiceText = document.getElementById("computerChoice");
const resultText = document.getElementById("result");
const playerScoreSpan = document.getElementById("playerScore");
const computerScoreSpan = document.getElementById("computerScore");

let playerScore = 0;
let computerScore = 0;

function play(playerChoice) {
  const choices = ["rock", "paper", "scissors"];
  const computerChoice = choices[Math.floor(Math.random() * choices.length)];

  playerChoiceText.textContent = `You chose: ${capitalize(playerChoice)}`;
  computerChoiceText.textContent = `Computer chose: ${capitalize(computerChoice)}`;

  let result = "";

  if (playerChoice === computerChoice) {
    result = "It's a tie!";
  } else if (
    (playerChoice === "rock" && computerChoice === "scissors") ||
    (playerChoice === "paper" && computerChoice === "rock") ||
    (playerChoice === "scissors" && computerChoice === "paper")
  ) {
    result = "You win!";
    playerScore++;
  } else {
    result = "You lose!";
    computerScore++;
  }

  resultText.textContent = `Result: ${result}`;
  playerScoreSpan.textContent = playerScore;
  computerScoreSpan.textContent = computerScore;
}

function resetGame() {
  playerScore = 0;
  computerScore = 0;
  playerChoiceText.textContent = "You chose: -";
  computerChoiceText.textContent = "Computer chose: -";
  resultText.textContent = "Result: -";
  playerScoreSpan.textContent = "0";
  computerScoreSpan.textContent = "0";
}

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

/* Add to rockpapersissors.css */
.back-btn {
    display: inline-block;
    background-color: #232323;
    color: #ff7300;
    text-decoration: none;
    padding: 10px 22px;
    border-radius: 10px;
    font-size: 1rem;
    font-weight: bold;
    border: 2px solid #ff7300;
    transition: background 0.3s, color 0.3s;
    margin-top: 10px;
}
.back-btn:hover {
    background-color: #ff7300;
    color: #181818;
}
