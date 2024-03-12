'use strict';

// #region Random code
// function first(firstName, birthYear, occupation, location) {
//   const age = new Date().getFullYear() - birthYear;

//   if (age <= 40) {
//     var millenial = true;
//   } else {
//     millenial = false;
//   }

//   function second() {
//     console.log(
//       `${firstName} is a ${age}-year old ${occupation} living in ${location}.`
//     );

//     millenial
//       ? console.log('Damn son you need to grow up')
//       : console.log('You old mothafucka!!');
//     console.log('\n');
//   }

//   second();
//   //   const decade = (age - (age % 10)) / 10;
// }

// const firstNames = ['Chuck', 'Tomi', 'Jonas'];
// const years = [1940, 1980, 1992];
// const occupations = ['Sensei', 'SW Engineer', 'Teacher'];
// const countrys = ['USA', 'Finland', 'Portugal'];

// for (let i = 0; i < firstNames.length; i++) {
//   first(firstNames[i], years[i], occupations[i], countrys[i]);
// }

// const name = 'Chuck';
// const first = () => {
//   let a = 1;
//   const b = second(7, 9);
//   a = a + b;
//   return a;
// };

// function second(x, y) {
//   let c = 2;
//   return c;
// }

// const x = first();
// console.log(x); //3
// console.log(second(1, 2)); //2

// #endregion

///////////////////////////////////////
// #region Scoping in Practice
// function calculateAge(birthYear) {
//   const age = 2037 - birthYear;

//   function printAge() {
//     let output = `${firstName}, you are ${age}, born in ${birthYear}`;
//     console.log(output);

//     if (birthYear >= 1981 && birthYear <= 1996) {
//       var millenial = true;
//       // Creating NEW variable with same name as outer scope's variable
//       const firstName = 'Steven';

//       // Reasssigning outer scope's variable
//       output = 'NEW OUTPUT!';
//       const str = `Oh, and you're a millenial, ${firstName}`;
//       console.log(str);

//       function add(a, b) {
//         return a + b;
//       }
//     }
//     // console.log(str);
//     console.log(millenial);
//     // console.log(add(2, 3));
//     console.log(output);
//   }
//   printAge();

//   return age;
// }

// const firstName = 'Chuck';
// calculateAge(1991);
// // console.log(age);
// // printAge();
// #endregion

///////////////////////////////////////
// #region Hoisting and TDZ in Practice

// // Variables
// console.log(person);
// // console.log(job);
// // console.log(year);

// var person = 'Chuck'; // udefined
// let job = 'Sensei'; //Not working
// const year = 1940; //Not working

// console.log(addDeclaration(2, 3));
// // console.log(addExpression(2, 3)); //Not working
// // console.log(addArrow);
// // console.log(addArrow(2, 3)); //Not working

// // Functions
// function addDeclaration(a, b) {
//   return a + b;
// }

// const addExpression = function (a, b) {
//   return a + b;
// };

// var addArrow = (a, b) => a + b;

// // Example
// console.log(numberOfProducts);
// if (!numberOfProducts) deleteShoppingCart();

// var numberOfProducts = 10;

// function deleteShoppingCart() {
//   console.log('All products deleted');
// }

// var x = 1;
// let y = 2;
// const z = 3;

// console.log(x === window.x);
// console.log(y === window.y);
// console.log(z === window.z);
// console.log(window.x);
// console.log(window.y);
// console.log(window.z);

// #endregion

///////////////////////////////////////
// #region The this Keyword in Practice

// console.log(this);
// const calculateAge = function (birthYear) {
//   console.log(new Date().getFullYear() - birthYear);
//   // console.log('(Inside regular function) this: ' + this);
// };
// calculateAge(1980);

// const calculateAgeArrow = birthYear => {
//   console.log(new Date().getFullYear() - birthYear);
//   // console.log('(Inside arrow function) this: ' + this);
// };

// calculateAgeArrow(1980);

// const personObj1 = {
//   birthYear: 1940,
//   calculateAge: function () {
//     console.log(this);
//     console.log(`Age of the person is ${2024 - this.birthYear}`);
//   },
// };

// personObj1.calculateAge();

// const personObj2 = {
//   birthYear: 2010,
// };

// personObj2.calculateAge = personObj1.calculateAge;
// personObj2.calculateAge();

// const func = personObj1.calculateAge;
// func();

// #endregion

///////////////////////////////////////
// #region Regular Functions vs. Arrow Functions

// // var firstName = 'Jack';
// const personObj = {
//   firstName: 'Chuck',
//   birthYear: 1940,
//   calculateAge: function () {
//     console.log(this);
//     console.log(`Age of the person is ${2024 - this.birthYear}`);

//     // Solution 1
//     // const self = this; // self or that
//     // const isMillenial = function () {
//     //   console.log(self);
//     //   console.log(self.birthYear >= 1981 && self.birthYear <= 1996);
//     // };

//     // Solution 2
//     const isMillenial = () => {
//       console.log(this);
//       console.log(this.birthYear >= 1981 && this.birthYear <= 1996);
//     };

//     isMillenial();
//   },

//   greet: () => {
//     console.log(this);
//     console.log(`Hello ${this.firstName}`);
//   },
// };
// personObj.greet(); //Hello undefined
// personObj.calculateAge();

// // arguments keyword
// const addExpression = function (a, b) {
//   console.log(arguments);
//   return a + b;
// };

// addExpression(2, 5);
// addExpression(1, 3, 5, 7, 9);

// var addArrow = (a, b) => {
//   console.log(arguments);
//   return a + b;
// };

// addArrow(3, 4);

// #endregion

///////////////////////////////////////
// #region Objects vs. primitives

// let age = 30;
// let oldAge = age;
// age = 31;
// console.log(age);
// console.log(oldAge);

// let person = {
//   name: 'Chuck',
//   age: 84,
// };

// const friend = person;
// friend.age = 67;
// console.log('Friend:', friend);
// console.log('Person:', person);

// person.age = 84;
// console.log('Friend:', friend);
// console.log('Person:', person);

// #endregion

///////////////////////////////////////
// #region Primitives vs. Objects in Practice

// // Primitive types
// let lastName = 'Williams';
// let oldLastName = lastName;
// lastName = 'Davis';
// console.log(lastName);
// console.log(oldLastName);

// // Reference types
// const personObj1 = {
//   firstName: 'Jessica',
//   lastName: 'Williams',
//   age: 27,
// };

// const marriedPersonObj1 = personObj1;
// marriedPersonObj1.lastName = 'Davis';
// console.log('Before marriage: ', personObj1);
// console.log('After marriage: ', marriedPersonObj1);

// // Copying objects
// const personObj2 = {
//   firstName: 'Jessica',
//   lastName: 'Williams',
//   age: 27,
//   family: ['Jack', 'Sarah'],
// };

// const copyOfPerson = Object.assign({}, personObj2);
// copyOfPerson.lastName = 'Davis';
// copyOfPerson.family.push('Mary');
// copyOfPerson.family.push('Chuck');

// console.log('Before marriage: ', personObj2);
// console.log('After marriage: ', copyOfPerson);

// #endregion
