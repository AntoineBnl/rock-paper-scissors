
let playerScore = 0;
let computerScore = 0;

const playerScoreText = document.querySelector("#playerScore");
const computerScoreText = document.querySelector("#computerScore");
const results = document.querySelector("#results");

function computerPlay() {
  let seed = Math.random() * 3;
  switch(true) {
    case seed <= 1 : return "rock";
    case seed <= 2 : return "paper";
    case seed <= 3 : return "scissors";
  }
}

function playRound(playerSelection, computerSelection) {
  playerSelection = playerSelection.toLowerCase();

  if (computerSelection == playerSelection) {
    results.textContent = "Tie game!";
  } else if ( (computerSelection == "rock" && playerSelection == "scissors")
           || (computerSelection == "scissors" && playerSelection == "paper")
           || (computerSelection == "paper" && playerSelection == "rock") )
  {
    results.textContent = `You lose! ${computerSelection} beats ${playerSelection}`;
    computerScoreText.textContent = ++computerScore;
  } else {
    results.textContent = `You win! ${playerSelection} beats ${computerSelection}`;
    playerScoreText.textContent = ++playerScore;
  }
  setTimeout(function() {
    checkWinState();
  }, 100);

}

function checkWinState() {
  if (playerScore >= 5 || computerScore >= 5) {
    if (playerScore > computerScore) {
      alert("You've won the game!")
    } else {
      alert("The computer has won :(")
    }
    resetGame();
  }
}

function resetGame() {
  playerScore = 0;
  computerScore = 0;
  playerScoreText.textContent = 0;
  computerScoreText.textContent = 0;
  results.textContent = "Click a button to play again"
  buttons.forEach(btn => removeTransition(btn));
  window.removeEventListener('mouseup', releaseButton);
}

function removeTransition(btn) {
  btn.classList.remove('clicked');
}

const buttons = document.querySelectorAll(".btn-container > button");

let lastButton = null;

function releaseButton(e) {
  playRound(lastButton.textContent, computerPlay());
  removeTransition(lastButton);
}

buttons.forEach(btn => {
  btn.addEventListener('mousedown', () => {
    btn.classList.add('clicked');
    lastButton = btn;
    window.addEventListener('mouseup', releaseButton, { once: true });
  })
});

