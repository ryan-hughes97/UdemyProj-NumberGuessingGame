/*
GAME FUNCTION:
- Player must guess a number between a min and max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify player of the correct answer if lose
- Let player choose to play again
*/

// Game Values
let min = 1, 
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

// UI Elements
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Play again event listener
game.addEventListener('mousedown', function(e){ // if use 'click' event, page reloads immediately after click
  if(e.target.className === 'play-again'){
    window.location.reload();
  }
})

// Listen for guess
guessBtn.addEventListener('click', function(){
  let guess = parseInt(guessInput.value);

  // Validate
  if(isNaN(guess) || guess < min || guess > max){
    setMessage(`Please enter a number between ${min} and ${max}.`, 'red');
  }

  // Check if won
  if(guess === winningNum){
    // Game over - won

    gameOver(true, `${winningNum} is correct, YOU WIN!`)

    // // Disable input
    // guessInput.disabled = true;
    // // change border color
    // guessInput.style.borderColor = 'green';
    // // Set message
    // setMessage(`${winningNum} is correct! You win!`, 'green');
  } else {
    // Wrong Number
    guessesLeft -= 1;

    if(guessesLeft === 0){
      // Game over - lost

      gameOver(false, `Wrong again! Looks like you ran out of guesses...you lose! The correct number was ${winningNum}.`);

      // // Disable input
      // guessInput.disabled = true;
      // // change border color
      // guessInput.style.borderColor = 'red';
      // // Set message
      // setMessage(`Wrong again! Looks like you ran out of guesses...you lose! The correct number was ${winningNum}.`, 'red');

    } else {
      // Game continues - answer wrong

      // change border color
      guessInput.style.borderColor = 'red';

      // clear input
      guessInput.value = '';

      // set message
      setMessage(`${guess} is not correct. You have ${guessesLeft} guesses left!`, 'red');
    }
  }
})

// Game over
function gameOver(won, msg){
  let color;
  won === true ? color = 'green' : color = 'red';

  // Disable input
  guessInput.disabled = true;
  // change border color
  guessInput.style.borderColor = color;
  // change text color
  message.style.color = color;
  // Set message
  setMessage(msg);

  // Play again?
  guessBtn.value = 'Play Again';
  guessBtn.className += 'play-again';
}

// Get Winning Number
function getRandomNum(min, max){
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Set message
function setMessage(msg, color){
  message.style.color = color;
  message.textContent = msg;
}