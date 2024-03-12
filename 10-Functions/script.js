'use strict';

///////////////////////////////////////
// #region Default Parameters
// const bookings = [];
// const createBooking = function (
//   flightNum,
//   numOfPassengers = 1,
//   price = 199 * numOfPassengers
// ) {
//   const booking = {
//     flightNum,
//     numOfPassengers,
//     price,
//   };
//   console.log(booking);
//   bookings.push(booking);
// };

// createBooking('BC345');
// createBooking('BC345', 2, 800);
// createBooking('BC345', 2);
// createBooking('BC345', 5);
// createBooking('BC345', undefined, 5);

// #endregion

///////////////////////////////////////
// #region How Passing Arguments Works: Values vs. Reference
// const flight = 'AB123';
// const person = {
//   firstName: 'Chuck',
//   passport: 9852764152,
// };

// const checkIn = function (flightNum, passenger) {
//   flightNum = 'CD456';
//   passenger.firstName = !passenger.firstName.includes('Mr.')
//     ? 'Mr. ' + passenger.firstName
//     : passenger.firstName;
//   //   passenger.firstName = 'Mr. ' + passenger.firstName;

//   if (passenger.passport === 9852764152) {
//     alert(`${passenger.firstName} Check in successful!`);
//     console.log(`${passenger.firstName} Check in successful!`);
//   } else {
//     alert(`${passenger.firstName} Check in failed (Reason: Wrong passport)!`);
//     console.log(
//       `${passenger.firstName} Check in failed (Reason: Wrong passport)!`
//     );
//   }
// };

// checkIn(flight, person);
// console.log(flight);
// console.log(person);

// // Is the same thing doing
// const flightNum = flight;
// const passenger = person;

// const newPassport = function (person) {
//   person.passport = Math.trunc(Math.random() * 100000000000);
// };

// newPassport(person);
// checkIn(flight, person);
// console.log(person);

// #endregion

///////////////////////////////////////
// #region Functions Accepting Callback Functions
// const oneWord = function (str) {
//   return str.replace(/ /g, '').toLowerCase();
// };

// const upperFirstWord = function (str) {
//   const [first, ...others] = str.split(' ');
//   return [first.toUpperCase(), ...others].join(' ');
// };

// const capitalizeFirstLetterOthersLower = function (str) {
//   const [first, ...others] = str.split(' ');
//   return [
//     first[0].toUpperCase() + first.slice(1).toLowerCase(),
//     ...others.map(word => word.toLowerCase()),
//   ].join(' ');
// };

// // Higher-order function
// const transformer = function (str, func) {
//   console.log(`Original string: ${str}`);
//   console.log(`Transformed string: ${func(str)}`);
//   console.log(`Transformed by function: ${func.name}`);
// };

// transformer('JavaScript is the best!', upperFirstWord);
// transformer('JavaScript is the best!', oneWord);
// transformer('javaScript IS The best!', capitalizeFirstLetterOthersLower);

// // JS uses callbacks all the time
// const high5 = function () {
//   console.log('👋');
// };

// document.body.addEventListener('click', high5);
// ['Chuck', 'Steven', 'Hannu'].forEach(high5);

// #endregion

///////////////////////////////////////
// #region Functions Returning Functions
// const greet = function (greeting) {
//   return function (name) {
//     console.log(`${greeting} ${name}`);
//   };
// };

// const greeterHey = greet('Hey');
// console.log(typeof greeterHey);
// greeterHey('Chuck Norris');
// greeterHey('Steven');
// greet('Hello')('Jeff');

// // Challenge
// const greetArr = greeting => name => console.log(`${greeting} ${name}`);
// greetArr('Howdy')('Matt');

// #endregion

///////////////////////////////////////
// #region The call, apply and bind Methods
// const lufthansa = {
//   airline: 'Lufthansa',
//   iataCode: 'LH',
//   bookings: [],
//   book(flightNum, name) {
//     console.log(
//       `${name} booked a seat ${this.airline} flight ${this.iataCode}${flightNum}`
//     );
//     this.bookings.push({ flight: `${this.iataCode} ${flightNum}`, name });
//   },
// };

// lufthansa.book(239, 'Chuck Norris');
// lufthansa.book(123, 'John Smith');
// // console.log(lufthansa);

// const eurowings = {
//   airline: 'Eurowings',
//   iataCode: 'EW',
//   bookings: [],
// };

// const book = lufthansa.book;
// // Does NOT work
// // book(23, 'Sarah Williams'); //undefined because of this keyword

// // Call method
// book.call(eurowings, 23, 'Sarah Williams');
// // console.log(eurowings);

// book.call(lufthansa, 239, 'Jane Doe');
// // console.log(lufthansa);

// const swiss = {
//   airline: 'Swiss Air Lines',
//   iataCode: 'LX',
//   bookings: [],
// };

// book.call(swiss, 583, 'Mary Cooper');
// // console.log(swiss);

// // Apply method
// const flightData = [583, 'George Cooper'];
// book.apply(swiss, flightData);
// console.log(swiss);

// book.call(swiss, ...flightData);

// ///////////////////////////////////////
// // The bind Method

// // book.call(eurowings, 23, 'Sarah Williams');
// const bookEW = book.bind(eurowings);
// const bookLH = book.bind(lufthansa);
// const bookLX = book.bind(swiss);

// // bookEW(23, 'Steven Williams');
// // console.log(eurowings);
// // const bookEW23 = book.bind(eurowings, 23);
// // bookEW23('Matt Williams');
// // bookEW23('Anna Williams');

// const family = ['Steven Williams', 'Matt Williams', 'Anna Williams'];

// for (const member of family) {
//   book.bind(eurowings, 23)(member);
// }
// console.log(eurowings);

// // With Event Listeners
// lufthansa.planes = 300;
// lufthansa.buyPlane = function () {
//   console.log('A new plane wad added in your collection');
//   console.log(this);
//   this.planes++;
//   console.log(this.planes); //console.log(this.planes);
// };
// // lufthansa.buyPlane();

// document
//   .querySelector('.buy')
//   .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));

// lufthansa.sellPlane = function () {
//   console.log('Plane was removed from your collection');
//   console.log(this); //console.log(this);
//   this.planes--;
//   console.log(this.planes); //console.log(this.planes);
// };
// // lufthansa.sellPlane();

// document
//   .querySelector('.sell')
//   .addEventListener('click', lufthansa.sellPlane.bind(lufthansa));

// // Partial application
// const addTax = (rate, value) => value + value * rate;
// console.log(addTax(0.1, 200));

// const addVAT = addTax.bind(null, 0.23);
// // addVAT = value => value + value * 0.23;

// console.log(addVAT(100));
// console.log(addVAT(23));

// const addTaxRate = function (rate) {
//   return function (value) {
//     return value + value * rate;
//   };
// };

// const addVAT2 = addTaxRate(0.23);
// console.log(addVAT2(100));
// console.log(addVAT2(23));

// #endregion

///////////////////////////////////////
// #region Coding Challenge #1
/*
Let's build a simple poll app!

A poll has a question, an array of options from which people can choose, and an array with the number of replies for each option. This data is stored in the starter object below.

Here are your tasks:

1. Create a method called 'registerNewAnswer' on the 'poll' object. The method does 2 things:
  1.1. Display a prompt window for the user to input the number of the selected option. The prompt should look like this:
        What is your favourite programming language?
        0: JavaScript
        1: Python
        2: Rust
        3: C++
        (Write option number)

  1.2. Based on the input number, update the answers array. For example, if the option is 3, increase the value AT POSITION 3 of the array by 1. Make sure to check if the input is a number and if the number makes sense (e.g answer 52 wouldn't make sense, right?)
2. Call this method whenever the user clicks the "Answer poll" button.
3. Create a method 'displayResults' which displays the poll results. The method takes a string as an input (called 'type'), which can be either 'string' or 'array'. If type is 'array', simply display the results array as it is, using console.log(). This should be the default option. If type is 'string', display a string like "Poll results are 13, 2, 4, 1".
4. Run the 'displayResults' method at the end of each 'registerNewAnswer' method call.

HINT: Use many of the tools you learned about in this and the last section 😉

BONUS: Use the 'displayResults' method to display the 2 arrays in the test data. Use both the 'array' and the 'string' option. Do NOT put the arrays in the poll object! So what shoud the this keyword look like in this situation?

BONUS TEST DATA 1: [5, 2, 3]
BONUS TEST DATA 2: [1, 5, 3, 9, 6, 1]
*/

// const poll = {
//   question: 'What is your favourite programming language?',
//   options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
//   // This generates [0, 0, 0, 0]. More in the next section 😃
//   answers: new Array(4).fill(0),
//   registerNewAnswer() {
//     // Get answer
//     const answer = Number(
//       prompt(
//         `${this.question}\n${this.options.join('\n')}\n(Write option number)`
//       )
//     );

//     // Register answer (number and 0-3 valid answer)
//     typeof answer === 'number' &&
//       answer < this.answers.length &&
//       this.answers[answer]++;

//     this.displayResults();
//     this.displayResults('string');
//   },
//   displayResults(type = 'array') {
//     if (type === 'array') {
//       console.log(this.answers);
//     } else if (type === 'string') {
//       console.log(`Poll results are ${this.answers.join(', ')}`);
//     }
//   },
// };

// document
//   .querySelector('.poll')
//   .addEventListener('click', poll.registerNewAnswer.bind(poll));

// BONUS TEST DATA 1: [5, 2, 3]
// BONUS TEST DATA 2: [1, 5, 3, 9, 6, 1]
// poll.displayResults.call({ answers: [5, 2, 3] }, 'string');
// poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] }, 'string');
// poll.displayResults.call({ answers: [5, 2, 3] });
// poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] });

// #endregion

///////////////////////////////////////
// #region Immediately Invoked Function Expressions (IIFE)
// const runOnce = function () {
//   console.log('This will never run again');
// };
// runOnce();

// // IIFE
// (function () {
//   console.log('This will never run again');
//   const isPrivate = 23;
// })();
// // console.log(isPrivate);

// (() => console.log('This will ALSO never run again'))();

// {
//   const isPrivate = 23;
//   var notPrivate = 66;
// }
// // console.log(isPrivate);
// console.log(notPrivate);

// #endregion

///////////////////////////////////////
// #region Closures
// const secureBooking = function () {
//   let passengerCount = 0;
//   return function () {
//     passengerCount++;
//     console.log(`${passengerCount} passengers`);
//   };
// };

// const booker = secureBooking();
// booker();
// booker();
// booker();

// console.dir(booker);

// #endregion

///////////////////////////////////////
// #region More Closure Examples
// // Example 1
// let f;

// const g = function () {
//   let a = 23;
//   f = function () {
//     console.log(a * 2);
//   };
// };

// const h = function () {
//   let b = 199;
//   f = function () {
//     console.log(b * 2);
//   };
// };

// g();
// f();
// console.dir(f);

// // Re-assigning f function
// h();
// f();
// console.dir(f);

// // Example 2
// const boardPassengers = function (n, wait) {
//   const perGroup = n / 3;
//   setTimeout(function () {
//     console.log(`We are now boarding all ${n} passengers`);
//     console.log(`There are 3 groups, each with ${perGroup} passengers`);
//   }, wait * 1000);
//   console.log(`Will start boarding in ${wait} seconds`);
// };

// const perGroup = 1000;
// boardPassengers(180, 3);

// #endregion

///////////////////////////////////////
// #region Coding Challenge #2
/*
This is more of a thinking challenge than a coding challenge 🤓

Take the IIFE below and at the end of the function, attach an event listener that changes the color of the selected h1 element ('header') to blue, each time the BODY element is clicked. Do NOT select the h1 element again!

And now explain to YOURSELF (or someone around you) WHY this worked! Take all the time you need. Think about WHEN exactly the callback function is executed, and what that means for the variables involved in this example.
*/

// (function () {
//   const header = document.querySelector('h1');
//   header.style.color = 'red';

//   document.querySelector('body').addEventListener('click', function () {
//     header.style.color = 'blue';
//     // setTimeout(() => {
//     //   header.style.color = 'pink';
//     // }, 4000);
//   });
// })();

// #endregion
