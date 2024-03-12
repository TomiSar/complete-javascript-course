'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP demo app: https://bankist.netlify.app/

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const account5 = {
  owner: 'Chuck Norris',
  movements: [10000, 10000, 5000, -1000, 150000, -99, 125000],
  interestRate: 1.25,
  pin: 5555,
};

const accounts = [account1, account2, account3, account4, account5];
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const transferTextInfo = document.querySelector(
  '.operation--transfer h2:nth-child(3)'
);
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const loanTextInfo = document.querySelector('.operation--loan h2:nth-child(3)');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');
const closeTextInfo = document.querySelector(
  '.operation--close h2:nth-child(3)'
);

/////////////////////////////////////////////////
// Functions
const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  const sortMovements = movements.slice().sort((a, b) => a - b);
  const movs = sort ? sortMovements : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
      <div class="movements__value">${mov}€</div>
    </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calculateDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.innerHTML = `${acc.balance}€`;
};

const calculateDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const outcomes = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(outcomes)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter(int => int >= 1)
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
};

const createUsernames = function (accs) {
  accs.forEach(acc => {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc.movements);

  // Display balance
  calculateDisplayBalance(acc);

  // Display summary
  calculateDisplaySummary(acc);
};

///////////////////////////////////////
// Event handlers
let currentAccount;

btnLogin.addEventListener('click', function (event) {
  // Prevent form from submitting
  event.preventDefault();

  // Check that account matches inputLogin username field
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  // console.log(currentAccount);

  // Check PIN
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and welcome message
    labelWelcome.textContent = `Welcome back to Bankist, ${
      currentAccount.owner.split(' ')[0]
    } 👋`;

    // Show UI
    containerApp.style.opacity = 100;
    btnLogin.style.visibility = 'hidden';

    // Update UI
    updateUI(currentAccount);
  } else {
    labelWelcome.textContent += !labelWelcome.textContent.includes(
      '(Wrong user and/or PIN)'
    )
      ? ' (Wrong user and/or PIN)'
      : '';
  }

  // Clear input fields
  inputLoginUsername.value = '';
  inputLoginPin.value = '';
  inputLoginPin.blur();
});

btnTransfer.addEventListener('click', function (event) {
  event.preventDefault();
  const amount = Number(inputTransferAmount.value);

  // Check that receiver account matches input transferTo
  const receiverAccount = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  // console.log(amount);
  // console.log(receiverAccount);

  // Clear input fields
  inputTransferAmount.value = '';
  inputTransferTo.value = '';
  inputTransferAmount.blur();

  // Amount > 0, receiverAccount (exists), currentAccount balance >= amount and
  // receiverAccount is different than currentAccount (username)
  if (
    amount > 0 &&
    receiverAccount &&
    currentAccount?.balance >= amount &&
    receiverAccount?.username !== currentAccount.username //undefined !== currentAccount.username
  ) {
    transferTextInfo.innerHTML = '(Transfer approved)';

    // Make tranfer decrease current account balance,receiver account balance and UpdateUI
    currentAccount.movements.push(-amount);
    receiverAccount.movements.push(amount);
    updateUI(currentAccount);
  } else {
    transferTextInfo.innerHTML = '(Transfer declined)';
  }

  showTextOnElement(transferTextInfo);
});

function showTextOnElement(element) {
  setTimeout(() => {
    element.classList.remove('fade-out');
    element.innerHTML = '';
  }, 1500);
}

btnLoan.addEventListener('click', function (event) {
  event.preventDefault();
  const amount = Number(inputLoanAmount.value);

  // Loan conditions
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    loanTextInfo.innerHTML = '(Loan approved)';

    // Make transfer
    currentAccount.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  } else {
    loanTextInfo.innerHTML = '(Loan declined)';
  }

  inputLoanAmount.value = '';
  inputLoanAmount.blur();
  showTextOnElement(loanTextInfo);
});

btnClose.addEventListener('click', function (event) {
  event.preventDefault();

  // Check user and PIN
  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const indexToRemove = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    // console.log(currentAccount);
    // console.log(indexToRemove);

    // Delete account
    accounts.splice(indexToRemove, 1);

    // Hide UI and update
    containerApp.style.opacity = 0;
    labelWelcome.textContent = 'Log in to get started';
  } else {
    closeTextInfo.innerHTML = '(Check user & PIN)';
    showTextOnElement(closeTextInfo);
  }

  inputCloseUsername.value = '';
  inputClosePin.value = '';
  inputClosePin.blur();
});

let sorted = false;
btnSort.addEventListener('click', function (event) {
  event.preventDefault();
  sorted = !sorted;
  displayMovements(currentAccount.movements, sorted);
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

/////////////////////////////////////////////////
// #region Simple Array Methods
// let arr1 = ['a', 'b', 'c', 'd', 'e'];

// let outputStr = '';
// arr1.forEach((value, index) => {
//   outputStr += index < arr1.length - 1 ? `${value} ` : value;
// });
// console.log(outputStr);
// console.log(outputStr.length);

// // SLICE (Immutable)
// console.log(arr1.slice(2));
// console.log(arr1.slice(2, 4));
// console.log(arr1.slice(-2));
// console.log(arr1.slice(-1));
// console.log(arr1.slice(1, -2));
// console.log(arr1.slice());
// console.log(arr1.slice([...arr1]));

// // SPLICE (Mutable)
// // console.log(arr1.splice(2));
// arr1.splice(-1);
// console.log(arr1);
// arr1.splice(1, 2);
// console.log(arr1);

// // REVERSE (Mutable)
// arr1 = ['a', 'b', 'c', 'd', 'e'];
// const arr2 = ['j', 'i', 'h', 'g', 'f'];
// arr2.reverse();
// console.log(arr2);

// // CONCAT (Immutable)
// const letters = arr1.concat(arr2);
// console.log(letters);
// console.log([...arr1, ...arr2]);

// // JOIN (Immutable)
// console.log(letters.join(', '));

// #endregion

/////////////////////////////////////////////////
// #region The new at Method
// const arr = [23, 11, 64];
// console.log(arr[0]);
// console.log(arr.at(0));

// // getting last array element
// console.log(arr[arr.length - 1]);
// console.log(arr.slice(-1)[0]);
// console.log(arr.at(-1));

// console.log('Chuck'.at(0));
// console.log('Chuck'.at(-1));

// #endregion

/////////////////////////////////////////////////
// #region Looping Arrays: forEach
// console.log('----- FOR OF -----');
// for (const [i, movement] of movements.entries()) {
//   if (movement > 0) {
//     console.log(`Movement ${i + 1}: You deposited ${movement}`);
//   } else {
//     console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
//   }
// }

// console.log('----- FOREACH -----');
// movements.forEach(function (mov, i, arr) {
//   if (mov > 0) {
//     console.log(`Movement ${i + 1}: You deposited ${mov}`);
//   } else {
//     console.log(`Movement ${i + 1}: You withdrew ${Math.abs(mov)}`);
//   }
// });

// #endregion

/////////////////////////////////////////////////
// #region forEach With Maps and Sets
// // Map
// console.log('--- FOREACH MAP ---');
// currencies.forEach(function (value, key, map) {
//   console.log(`${key}: ${value}`);
// });

// // Set
// console.log('--- FOREACH SET ---');
// const currenciesUnique = new Set([
//   'USD',
//   'GBP',
//   'EUR',
//   'EUR',
//   'AUD',
//   'USD',
//   'GBP',
// ]);

// // Sets doesn't include keys only unique values (_ = throaway)
// currenciesUnique.forEach(function (value, _, map) {
//   console.log(`${value}: ${value}`);
// });

// #endregion

/////////////////////////////////////////////////
// #region Coding Challenge #1
/* Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets
HINT: Use tools from all lectures in this section so far 😉
TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4] */

// const checkDogs = function (dogsJulia, dogsKate) {
//   const dogsJuliaCorrected = dogsJulia.slice();
//   dogsJuliaCorrected.splice(0, 1);
//   dogsJuliaCorrected.splice(-2);

//   const dogs = [...dogsJuliaCorrected, ...dogsKate];
//   // const dogs = dogsJuliaCorrected.concat(dogsKate);
//   console.log(dogs);

//   dogs.forEach((age, i) => {
//     if (age >= 3) {
//       console.log(`Dog number ${i + 1} is an adult, and is ${age} years old`);
//     } else {
//       console.log(`Dog number ${i + 1} is still a puppy 🐶`);
//     }
//   });
// };

// checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
// checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);

// #endregion

/////////////////////////////////////////////////
// #region map Method
// const eurToUsd = 1.1;

// const movementsUSD = movements.map(mov => mov * eurToUsd);
// console.log(movements);
// console.log(movementsUSD);

// const movementsUSDfor = [];
// for (const mov of movements) movementsUSDfor.push(mov * eurToUsd);
// console.log(movementsUSDfor);

// const movementsDescriptions = movements.map(
//   (mov, i) =>
//     `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(
//       mov
//     )}`
// );
// console.log(movementsDescriptions);

// #endregion

/////////////////////////////////////////////////
// #region The filter Method
// // filter only positive values
// const depositsAF = movements.filter(mov => mov > 0);
// const depositsFC = movements.filter(function (mov) {
//   return mov > 0;
// });

// console.log(movements);
// console.log(depositsAF);
// console.log(depositsFC);

// const depositsFor = [];
// for (const mov of movements) {
//   if (mov > 0) {
//     depositsFor.push(mov);
//   }
// }
// console.log(depositsFor);

// const depositsForeach = [];
// movements.forEach(mov => {
//   mov > 0 && depositsForeach.push(mov);
// });
// console.log(depositsForeach);

// // Filter negative values
// const withdrawals = movements.filter(mov => mov < 0);
// console.log(withdrawals);

// // Logging negative values
// movements
//   .filter(mov => mov < 0)
//   .forEach((mov, i) => console.log(`${i + 1}. negative value: ${mov}`));

// // Filter between
// const filterMovs = movements.filter(value => value >= 200 && value <= 1500); //200, 450, 1300
// console.log(filterMovs);

// #endregion

/////////////////////////////////////////////////
// #region The reduce Method

// accumulator
// Logging iterations
// const balance = movements.reduce((acc, curr, i) => {
//   console.log(`iteration ${i + 1}: ${acc}`);
//   return acc + curr;
// }, 0);

// console.log(movements);

// const balance = movements.reduce((acc, curr) => acc + curr, 0);
// console.log(balance);

// let balanceFor = 0;
// for (const mov of movements) balanceFor += mov;
// console.log(balance);

// // Maximum value
// const maxValue = movements.reduce(
//   (acc, curr) => (acc > curr ? acc : curr),
//   movements[0]
// );
// console.log(maxValue);

// // minimum value
// const minValue = movements.reduce(
//   (acc, curr) => (acc < curr ? acc : curr),
//   movements[0]
// );
// console.log(minValue);

// #endregion

/////////////////////////////////////////////////
// #region Coding Challenge #2
/*
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]
*/

// const calcAverageHumanAge = function (ages) {
//   const humanAges = ages.map(age => (age <= 2 ? 2 * age : 16 + age * 4));
//   const adultHumans = humanAges.filter(age => age >= 18);
//   console.log('all:', humanAges);
//   console.log('adults:', adultHumans);
//   return adultHumans.reduce((acc, curr) => acc + curr, 0) / adultHumans.length;
//   // return adultHumans.reduce((acc, curr, i, arr) => acc + curr / arr.length, 0);
// };

// const avg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
// const avg2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
// console.log(avg1);
// console.log(avg2);

// #endregion

/////////////////////////////////////////////////
// #region The Magic of Chaining Methods
// const eurToUsd = 1.1;
// console.log(movements);

// const totalDepositsUSD = movements
//   .filter(mov => mov > 0)
//   // .map(mov => mov * eurToUsd)
//   .map((mov, i, arr) => {
//     console.log(arr);
//     return mov * eurToUsd;
//   })
//   .reduce((acc, curr) => acc + curr, 0);

// const countOfDepositsUSD = movements.filter(mov => mov > 0).length;

// const avgDepositsUSD = movements
//   .filter(mov => mov > 0)
//   .map(mov => mov * eurToUsd)
//   .reduce((acc, curr, i, arr) => acc + curr / arr.length, 0);

// console.log(totalDepositsUSD);
// console.log(countOfDepositsUSD);
// console.log(totalDepositsUSD / countOfDepositsUSD);

// console.log(avgDepositsUSD);

// #endregion

/////////////////////////////////////////////////
// #region Coding Challenge #3
/* Rewrite the 'calcAverageHumanAge' function from the previous challenge, but this time as an arrow function, and using chaining!
TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4] */

// const calcAverageHumanAge = ages =>
//   ages
//     .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
//     .filter(age => age >= 18)
//     .reduce((acc, curr, i, arr) => acc + curr / arr.length, 0);

// const avg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
// const avg2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
// console.log(avg1, avg2);

// #endregion

/////////////////////////////////////////////////
// #region The find Method
// const firstWithdrawal = movements.find(mov => mov < 0);
// console.log(movements);
// console.log(firstWithdrawal);

// console.log(accounts);
// const account = accounts.find(acc => acc.owner === account2.owner);
// console.log(account);

// #endregion

/////////////////////////////////////////////////
// #region some and every
// console.log(movements);

// // EQUALITY
// console.log(movements.includes(-130));

// // SOME:CONDITION
// console.log(movements.some(mov => mov === -130));

// const anyDeposits = movements.some(mov => mov > 0);
// console.log(anyDeposits);

// // EVERY
// console.log(movements.every(mov => mov > 0));
// console.log(account4.movements.every(mov => mov > 0));

// // Separete callback
// const deposit = mov => mov > 0;
// console.log(movements.some(deposit));
// console.log(movements.every(deposit));
// console.log(movements.filter(deposit));

// #endregion

/////////////////////////////////////////////////
// #region flat and flatMap (Nested arrays)

// const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
// console.log(arr);
// console.log(arr.flat());

// const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
// console.log(arrDeep.flat(2));

// // flat
// const totalAccBalance1 = accounts
//   .map(acc => acc.movements)
//   .flat()
//   .reduce((acc, mov) => acc + mov, 0);
// console.log(totalAccBalance1);

// // flatMap
// const totalAccBalance2 = accounts
//   .flatMap(acc => acc.movements)
//   .reduce((acc, mov) => acc + mov, 0);
// console.log(totalAccBalance2);

// #endregion

/////////////////////////////////////////////////
// #region Sorting Arrays
// // Strings
// const owners = ['Jack', 'Jonas', 'Chuck', 'Martha'];
// console.log(owners);
// owners.sort();
// console.log(owners);

// // Numbers
// const moves = [200, 450, -400, 3000, -650, -130, 70, 1300];
// console.log(moves);

// // return < 0, A, B (keep order)
// // return > 0, B, A (switch order)

// // Ascending
// // moves.sort((a, b) => {
// //   if (a > b) return 1;
// //   if (a < b) return -1;
// //   return 0;
// // });
// moves.sort((a, b) => a - b);
// console.log(moves);

// // Descending
// // moves.sort((a, b) => {
// //   if (a > b) return -1;
// //   if (a < b) return 1;
// //   return 0;
// // });
// moves.sort((a, b) => b - a);
// console.log(moves);

// #endregion

/////////////////////////////////////////////////
// #region More Ways of Creating and Filling Arrays

// // Empty arrays + fill method
// const arr = [1, 2, 3, 4, 5, 6, 7];
// console.log(arr);
// console.log(new Array(1, 2, 3, 4, 5, 6, 7));

// const x = new Array(7);
// console.log(x);
// x.fill(1, 3, 6);
// console.log(x);
// x.fill(1);
// console.log(x);

// arr.fill(23, 2, 6);
// console.log(arr);

// // Array.from
// // const y = Array.from({ length: 7 }, () => 1);
// const y = Array.from({ length: 7 }).fill(1);
// console.log(y);

// const z = Array.from({ length: 7 }, (_, i) => i + 1);
// console.log(z);

// labelBalance.addEventListener('click', function () {
//   const movementsUI = Array.from(
//     document.querySelectorAll('.movements__value'),
//     el => Number(el.textContent.replace('€', ''))
//   );
//   console.log(movementsUI.length);
//   console.log(movementsUI);
// });

// const movementsUI2 = [...document.querySelectorAll('.movements__value')];

// #endregion

/////////////////////////////////////////////////
// #region Array Methods Practice

// // 1.
// const bankDepositsSum = accounts
//   .flatMap(acc => acc.movements)
//   .filter(mov => mov > 0)
//   .reduce((sum, curr) => sum + curr, 0);
// console.log(bankDepositsSum);

// const bankWithdawalsSum = accounts
//   .flatMap(acc => acc.movements)
//   .filter(mov => mov < 0)
//   .reduce((sum, curr) => sum + curr, 0);
// console.log(bankWithdawalsSum);

// // 2.
// // const numOfDeposits1000 = accounts
// //   .flatMap(acc => acc.movements)
// //   .filter(mov => mov >= 1000).length;

// const numOfDeposits1000 = accounts
//   .flatMap(acc => acc.movements)
//   .reduce((count, curr) => (curr >= 1000 ? ++count : count), 0);
// // .reduce((count, curr) => (curr >= 1000 ? (count += 1) : count), 0);
// console.log(numOfDeposits1000);

// // Prefixed ++ operator
// let a = 10;
// let b = 10;
// console.log(++a); //Prefix
// console.log(b++); //Postfix
// console.log(b);

// // 3.
// const { depositsSum, withdrawalsSum } = accounts
//   .flatMap(acc => acc.movements)
//   .reduce(
//     (sums, curr) => {
//       // curr > 0 ? (sums.depositsSum += curr) : (sums.withdrawalsSum += curr);
//       sums[curr > 0 ? 'depositsSum' : 'withdrawalsSum'] += curr;
//       return sums;
//     },
//     { depositsSum: 0, withdrawalsSum: 0 }
//   );
// console.log(depositsSum);
// console.log(withdrawalsSum);

// const { depositsCount, withdrawalsCount } = accounts
//   .flatMap(acc => acc.movements)
//   .reduce(
//     (count, curr) => {
//       curr > 0 ? ++count.depositsCount : ++count.withdrawalsCount;
//       return count;
//     },
//     { depositsCount: 0, withdrawalsCount: 0 }
//   );

// console.log(depositsCount);
// console.log(withdrawalsCount);

// // 4. this is a nice title -> This Is a Nice Title
// const convertTitleCase = function (title) {
//   const capitalize = str => str[0].toUpperCase() + str.slice(1);
//   const exceptions = ['a', 'an', 'and', 'the', 'but', 'or', 'on', 'in', 'with'];

//   const titleCase = title
//     .toLowerCase()
//     .split(' ')
//     .map(word => (exceptions.includes(word) ? word : capitalize(word)))
//     .join(' ');

//   return capitalize(titleCase);
// };

// console.log(convertTitleCase('this is a nice title'));
// console.log(convertTitleCase('this is a LONG title but not too long'));
// console.log(convertTitleCase('and here is another title with an EXAMPLE'));
// console.log(convertTitleCase('a an and the but or on in with'));

// #endregion

/////////////////////////////////////////////////
// #region Coding Challenge #4
/*
Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).

1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do NOT create a new array, simply loop over the array. Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').
4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)
6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)
7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)

HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.

TEST DATA:
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] }
];
*/

// const dogs = [
//   { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
//   { weight: 8, curFood: 200, owners: ['Matilda'] },
//   { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
//   { weight: 32, curFood: 340, owners: ['Michael'] },
// ];

// // 1.
// dogs.forEach(dog => (dog.recFood = Math.trunc(dog.weight ** 0.75 * 28)));
// console.log(dogs);

// // 2.
// const sarahDog = dogs.find(dog => dog.owners.includes('Sarah'));
// console.log(sarahDog);
// console.log(
//   `Sarah's dog is eating too ${
//     sarahDog.curFood > sarahDog.recFood ? 'much' : 'little'
//   }`
// );

// // 3.
// const ownersEatTooMuch = dogs
//   .filter(dog => dog.curFood > dog.recFood)
//   .flatMap(dog => dog.owners);
// console.log(ownersEatTooMuch);

// const ownersEatTooLittle = dogs
//   .filter(dog => dog.curFood < dog.recFood)
//   .flatMap(dog => dog.owners);
// console.log(ownersEatTooLittle);

// // 4.
// console.log(`${ownersEatTooMuch.join(' and ')} dogs eat too much!`);
// console.log(`${ownersEatTooLittle.join(' and ')} dogs eat too little!`);

// // 5.
// console.log(dogs.some(dog => dog.curFood === dog.recFood));

// // 6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)
// // current > (recommended * 0.90) && current < (recommended * 1.10)
// // console.log(
// //   dogs.some(
// //     dog => dog.curFood > dog.recFood * 0.9 && dog.curFood < dog.recFood * 1.1
// //   )
// // );
// const checkDogsEatingOkay = dog =>
//   dog.curFood > dog.recFood * 0.9 && dog.curFood < dog.recFood * 1.1;
// console.log(dogs.some(checkDogsEatingOkay));

// // 7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
// console.log(dogs.filter(checkDogsEatingOkay));

// // 8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions
// // are inside the array's objects) sort it by recommended food portion in an ascending order [1,2,3]
// console.log(dogs);
// // (a, b) = objects
// const dogsRecFoodASC = dogs.slice().sort((a, b) => a.recFood - b.recFood);
// console.log('Sorted ASCENDING by recommended food portion\n', dogsRecFoodASC);
// const dogsRecFoodDESC = dogs.slice().sort((a, b) => b.recFood - a.recFood);
// console.log('Sorted DESCENDING by recommended food portion\n', dogsRecFoodDESC);

// #endregion
