'use strict';

///////////////////////////////////////
// #region Coding Challenge #1
/* 
Implement a game rest functionality, so that the player can make a new guess! Here is how:

1. Select the element with the 'again' class and attach a click event handler
2. In the handler function, restore initial values of the score and secretNumber variables
3. Restore the initial conditions of the message, number, score and guess input field
4. Also restore the original background color (#222) and number width (15rem)
*/

/* DOM manipulation
console.log(document.querySelector('.message').textContent);
document.querySelector('.message').textContent = '🎉 Correct Number!';
document.querySelector('.number').textContent = 13;
document.querySelector('.score').textContent = 10;
document.querySelector('.guess').value = 23;
console.log(document.querySelector('.guess').value);

// document.querySelector('.number').textContent = 55;
// console.log(document.querySelector('.message'));
// console.log(document.querySelector('.number').textContent);
// document.querySelector('.message').textContent = '🎉 Correct Number!';
// console.log(document.querySelector('.message').textContent);
// document.querySelector('.score').textContent = 15;
// document.querySelector('.highscore').textContent = 101;
// document.querySelector('.guess').value = 23;
// console.log(document.querySelector('.score').textContent);
// console.log(document.querySelector('.highscore').textContent);
// console.log(document.querySelector('.guess').value);
*/

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highScore = 0;

const displayMessage = function (messageText) {
  document.querySelector('.message').textContent = messageText;
};

const checkScore = function (score) {
  if (score > 5 && score <= 10) {
    document.querySelector('body').style.backgroundColor = '#eed202';
  } else if (score <= 5) {
    document.querySelector('body').style.backgroundColor = '#ff0f0f';
  }
};

// Game logic
document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  //   console.log(typeof guess); // number

  console.log(guess);
  // No input
  if (!guess) {
    // document.querySelector('.message').textContent = '⛔️ No number!';
    displayMessage('⛔️ No number!');
  }
  // Numbers must be between 1-20
  else if (guess < 0 || guess > 20) {
    displayMessage(`⛔️ ${guess < 0 ? 'Less than 0!' : 'Greater than 20!'}`);
    return;
    // Player wins
  } else if (guess === secretNumber) {
    // document.querySelector('.message').textContent = '🎉 Correct Number!';
    displayMessage(`Secret number: ${secretNumber} 🎉!`);
    document.querySelector('.header').textContent =
      'Game Over (Player wins)🔥🔥!';
    document.querySelector('.number').textContent = secretNumber;
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';

    // Set highscore
    if (score > highScore) {
      highScore = score;
      document.querySelector('.highscore').textContent = highScore;
    }
    // Guess is wrong (Too low or too high)
  } else if (guess !== secretNumber) {
    if (score > 1) {
      // document.querySelector('.message').textContent =
      // guess > secretNumber ? '📈 Too high!' : '📉 Too low!';
      displayMessage(
        `Guess: ${guess} (Too ${guess < secretNumber ? 'Low ⬇️' : 'High ⬆️'})`
      );
      score--;
      checkScore(score);
      document.querySelector('.score').textContent = score;
    } else {
      //   document.querySelector('.message').textContent = '💥 You lost the game!';
      displayMessage('💥 You lost the game!');
      document.querySelector('.header').textContent =
        'Game Over (Computer wins)😭😭!';
      document.querySelector('.score').textContent = 0;
    }
  }
  //   // When guess is too high
  // } else if (guess > secretNumber) {
  //   if (score > 1) {
  //     document.querySelector('.message').textContent = '📈 Too high!';
  //     score--;
  //     document.querySelector('.score').textContent = score;
  //   } else {
  //     document.querySelector('.message').textContent = '💥 You lost the game!';
  //     document.querySelector('.score').textContent = 0;
  //   }

  //   // When guess is too low
  // } else if (guess < secretNumber) {
  //   if (score > 1) {
  //     document.querySelector('.message').textContent = '📉 Too low!';
  //     score--;
  //     document.querySelector('.score').textContent = score;
  //   } else {
  //     document.querySelector('.message').textContent = '💥 You lost the game!';
  //     document.querySelector('.score').textContent = 0;
  //   }
  // }
});

// Play again
document.querySelector('.again').addEventListener('click', function () {
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  score = 20;

  document.querySelector('.header').textContent = 'Guess Random Number!';
  displayMessage('Guess number (between 1-20)');
  document.querySelector('.score').textContent = score;
  document.querySelector('.number').textContent = '?';
  document.querySelector('.guess').value = '';

  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
});

// document.querySelector('.reset').addEventListener('click', function () {
//   document.querySelector('.guess').value = 0;
// });

// #endregion
