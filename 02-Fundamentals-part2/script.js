"use strict";
///////////////////////////////////////
// #region Activating Strict Mode

// let hasDriversLicense = false;
// const passTest = true;

// if (passTest) hasDriversLicense = true;
// if (hasDriversLicense) console.log("I can drive :D");

// const interface = 'Audio';
// const private = 534;

// #endregion

///////////////////////////////////////
// #region Functions

// function logger() {
//   console.log("Hello my name is Chuck Norris");
// }
// logger();
// logger();

// function fruitProcessor(apples, oranges) {
//   const juice = `Juice with ${apples} apples and ${oranges} oranges.`;
//   return juice;
// }

// const appleJuice = fruitProcessor(5, 0);
// console.log(appleJuice);

// const appleOrangeJuice = fruitProcessor(2, 4);
// console.log(appleOrangeJuice);

// const num = Number("23");

// #endregion

///////////////////////////////////////
// #region Function Declarations vs. Expressions

// // Function Declaration
// function calcAge1(birthYear) {
//   return 2037 - birthYear;
// }
// const age1 = calcAge1(1991);

// // Function Expression
// const calcAge2 = function (birthYear) {
//   return 2037 - birthYear;
// };
// const age2 = calcAge2(1991);

// console.log(age1, age2);
// #endregion

///////////////////////////////////////
// #region Arrow functions

// const calcAge3 = (birthYear) => 2037 - birthYear;
// const age3 = calcAge3(1991);
// console.log(age3);

// const yearsUntilRetirement = (birthYear, firstName) => {
//   const age = 2037 - birthYear;
//   const retirement = 65 - age;
//   //   return retirement;
//   return `${firstName} retires after ${retirement} years`;
// };

// console.log(yearsUntilRetirement(1991, "Jack"));
// console.log(yearsUntilRetirement(1980, "Chuck"));

// #endregion

///////////////////////////////////////
// #region Functions Calling Other Functions

// const cutFruitsInPieces = function (fruit) {
//   return fruit * 3;
// };

// function fruitProcessor(apples, oranges) {
//   const applePieces = cutFruitsInPieces(apples);
//   const orangePieces = cutFruitsInPieces(oranges);

//   const juice = `Juice with ${applePieces} pieces of apple and ${orangePieces} pieces of orange.`;
//   return juice;
// }

// console.log(fruitProcessor(2, 3));

// #endregion

///////////////////////////////////////
// #region Reviewing Functions

// const calculateAge = function (birthYear) {
//   return 2037 - birthYear;
// };

// const yearsUntilRetirement = function (birthYear, firstName) {
//   const age = calculateAge(birthYear);
//   const retirement = 65 - age;
//   if (retirement > 0) {
//     console.log(`${firstName} retires after ${retirement} years.`);
//     return retirement;
//   } else {
//     console.log(`${firstName} has already retired 🎉`);
//     return -1;
//   }
// };

// console.log(yearsUntilRetirement(1991, "Jack"));
// console.log(yearsUntilRetirement(1950, "Mike"));

// #endregion

///////////////////////////////////////
// #region Coding Challenge #1
/*
Back to the two gymnastics teams, the Dolphins and the Koalas! There is a new gymnastics discipline, which works differently.
Each team competes 3 times, and then the average of the 3 scores is calculated (so one average score per team).
A team ONLY wins if it has at least DOUBLE the average score of the other team. Otherwise, no team wins!

1. Create an arrow function 'calcAverage' to calculate the average of 3 scores
2. Use the function to calculate the average for both teams
3. Create a function 'checkWinner' that takes the average score of each team as parameters ('avgDolhins' and 'avgKoalas'), and then logs the winner to the console, together with the victory points, according to the rule above. Example: "Koalas win (30 vs. 13)".
4. Use the 'checkWinner' function to determine the winner for both DATA 1 and DATA 2.
5. Ignore draws this time.

TEST DATA 1: Dolphins score 44, 23 and 71. Koalas score 65, 54 and 49
TEST DATA 2: Dolphins score 85, 54 and 41. Koalas score 23, 34 and 27

HINT: To calculate average of 3 values, add them all together and divide by 3
HINT: To check if number A is at least double number B, check for A >= 2 * B. Apply this to the team's average scores
*/

// const calcAverage = (a, b, c) => (a + b + c) / 3;

// // // TEST DATA 1
// let scoreDolphins = calcAverage(44, 23, 71);
// let scoreKoalas = calcAverage(65, 54, 49);

// // // TEST DATA 2
// // let scoreDolphins = calcAverage(85, 54, 41);
// // let scoreKoalas = calcAverage(23, 34, 27);

// console.log(`Dolphins avg core: ${scoreDolphins}`);
// console.log(`Koalas avg core: ${scoreKoalas}`);

// const checkWinner = function (avgDolphins, avgKoalas) {
//   if (avgDolphins >= 2 * avgKoalas) {
//     console.log(`Dolphins win 🏆 (${avgDolphins} vs. ${avgKoalas})`);
//   } else if (avgKoalas >= 2 * avgDolphins) {
//     console.log(`Koalas win 🏆 (${avgKoalas} vs. ${avgDolphins})`);
//   } else {
//     console.log("No team wins...");
//   }
// };

// checkWinner(scoreDolphins, scoreKoalas);
// // checkWinner(576, 111);

// #endregion

///////////////////////////////////////
// #region Introduction to Arrays

// const friend1 = "Michael";
// const friend2 = "Steven";
// const friend3 = "Anna";
// const friend4 = "Peter";

// const friends = ["Michael", "Steven", "Anna", "Peter"];
// console.log(friends);

// const y = new Array(1991, 1984, 2008, 2020);

// console.log(friends[0]); //Michael
// console.log(friends[2]); //Anna

// console.log(`Total friends: ${friends.length}`);
// console.log(friends[friends.length - 1]); //Peter

// friends[1] = "Jack";
// console.log(friends); //Michael, Jack, Anna, Peter

// const firstName = "Chuck";
// const person = [firstName, "Norris", 2024 - 1940, "Sensei", friends];
// console.log(person);
// console.log(person.length);

// // Exercise
// const calculateAge = function (birthYear) {
//   return 2037 - birthYear;
// };

// const years = [1990, 1967, 2002, 2010, 2018];
// const age1 = calculateAge(years[0]);
// const age2 = calculateAge(years[1]);
// const age3 = calculateAge(years[years.length - 1]);
// console.log(age1, age2, age3);

// const ages = [
//   calculateAge(years[0]),
//   calculateAge(years[1]),
//   calculateAge(years[years.length - 1]),
// ];
// console.log(ages);

// #endregion

///////////////////////////////////////
// #region Basic Array Operations (Methods)

// const friends = ["Michael", "Steven", "Anna"];

// // Add elements
// const newLength = friends.push("Chuck"); //Add in array last element
// console.log(friends); //Michael, Steven, Anna, Chuck,
// console.log(newLength); //4

// friends.unshift("Sarah"); //Add in array first element
// console.log(friends); //Sarah, Michael, Steven, Anna, Chuck

// // Remove elements
// friends.pop(); //Remove last element
// const popped = friends.pop();
// console.log(popped); //Anna
// console.log(friends); //Sarah, Michael, Steven

// friends.shift(); //Remove first element
// console.log(friends); //Michael, Steven

// console.log(friends.indexOf("Steven")); //1
// console.log(friends.indexOf("Jack")); //-1

// friends.push(23);
// console.log(friends.includes("Michael")); //true
// console.log(friends.includes("Jack")); //false
// console.log(friends.includes("23")); //false
// console.log(friends.includes(23)); //true

// if (friends.includes("Steven")) {
//   console.log("You have a friend called Steven");
// }
// console.log(friends);

// #endregion

///////////////////////////////////////
// #region Coding Challenge #2
/*
Steven is still building his tip calculator, using the same rules as before: Tip 15% of the bill if the bill value is
between 50 and 300, and if the value is different, the tip is 20%.

1. Write a function 'calcTip' that takes any bill value as an input and returns the corresponding tip, calculated based on the rules
above (you can check out the code from first tip calculator challenge if you need to).
Use the function type you like the most. Test the function using a bill value of 100.
2. And now let's use arrays! So create an array 'bills' containing the test data below.
3. Create an array 'tips' containing the tip value for each bill, calculated from the function you created before.
4. BONUS: Create an array 'total' containing the total values, so the bill + tip.

TEST DATA: 125, 555 and 44

HINT: Remember that an array needs a value in each position, and that value can actually be the returned value of a function!
So you can just call a function as array values (so don't store the tip values in separate variables first, but right in the new array)
*/

// const calcTip = function (bill) {
//   return bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;
// };
// // const tip = calcTip(100);
// // console.log(tip);

// // TEST DATA: 125, 555 and 44
// const bills = [125, 555, 44];
// const tips = [calcTip(bills[0]), calcTip(bills[1]), calcTip(bills[2])];
// const totals = [bills[0] + tips[0], bills[1] + tips[1], bills[2] + tips[2]];

// console.log(`Bills: ${bills}`);
// console.log(`Tips: ${tips}`);
// console.log(`Totals: ${totals}`);

// #endregion

///////////////////////////////////////
// #region Introduction to Objects

// const personArr = [
//   "Chuck",
//   "Norris",
//   84,
//   "Sensei",
//   ["Arnold", "Sylvester", "Steven"],
// ];
// console.log(personArr);
// console.log(
//   `Adios ${personArr[0]} ${personArr[1]}. You are ${personArr[2]} year old ${personArr[3]} with ${personArr[4].length} friends.`
// );

// const personObj = {
//   firstName: "Chuck",
//   lastName: "Norris",
//   age: 84,
//   occupation: "Sensei",
//   friends: ["Arnold", "Sylvester", "Steven"],
// };
// console.log(personObj);
// console.log(
//   `Adios ${personObj.firstName} ${personObj.lastName}. You are ${personObj.age} year old ${personObj.occupation} with ${personObj.friends.length} friends.`
// );

// #endregion

///////////////////////////////////////
// #region Dot vs. Bracket Notation

// const personObj = {
//   firstName: "Chuck",
//   lastName: "Norris",
//   age: 84,
//   occupation: "Sensei",
//   friends: ["Arnold", "Sylvester", "Steven"],
// };

// console.log(personObj);
// console.log(personObj.lastName);
// console.log(personObj["lastName"]);

// const nameKey = "Name";
// console.log(personObj["first" + nameKey]);
// console.log(personObj["last" + nameKey]);

// const data = prompt(
//   "What do you want to know about person? Choose: firstName, lastName, age, occupation and friends"
// );

// if (personObj[data]) {
//   console.log(`Person ${data}: ${personObj[data]}`);
// } else {
//   console.log(`Person object doesn't contains value ${data}`);
// }

// personObj.location = "USA";
// personObj["twitter"] = "@chucknorris";
// console.log(personObj);

// // Challenge:  Chuck has 3 friends, and his best friend is called Arnold
// console.log(
//   `${personObj.firstName} has ${personObj.friends.length} friends, and his best friend is called ${personObj.friends[0]}`
// );

// // Desctructuring objects
// const { firstName, lastName, age, occupation, friends } = personObj;
// console.log(`${firstName} ${lastName} ${age} ${occupation} ${friends}`);

// #endregion

///////////////////////////////////////
// #region Object Methods

// const personObj = {
//   firstName: "Chuck",
//   lastName: "Norris",
//   birthYear: 1940,
//   occupation: "Sensei",
//   friends: ["Arnold", "Sylvester", "Steven"],
//   hasDriversLicense: true,

//   // Example 1
//   // calculateAge: function (birthYear) {
//   //   return new Date().getFullYear() - birthYear;
//   // },
//   // Example 2
//   // calculateAge: function () {
//   //   // console.log(this);
//   //   return new Date().getFullYear() - this.birthYear;
//   // },
//   // Example 3
//   calculateAge: function () {
//     this.age = new Date().getFullYear() - this.birthYear;
//     return this.age;
//   },
//   getSummary: function () {
//     return `${this.firstName} is a ${this.calculateAge()}-year old ${
//       this.occupation
//     }, and has ${this.hasDriversLicense ? "a" : "no"} drivers' license.`;
//   },
// };

// // Example 1
// console.log(personObj.calculateAge(1940));
// console.log(personObj["calculateAge"](1940));

// // Example 2
// console.log(personObj.calculateAge());
// console.log(personObj["calculateAge"]());

// // Example 3
// console.log(personObj.calculateAge()); //This has to be called befor (sets age value)
// console.log(personObj);
// console.log(personObj);

// // Challenge: Chuck is a 84-year old Sensei, and has a drivers' license
// console.log(personObj.getSummary());

// #endregion

///////////////////////////////////////
// #region Coding Challenge #3
/*
Let's go back to Mark and John comparing their BMIs! This time, let's use objects to implement the calculations!
Remember: BMI = mass / height ** 2 = mass / (height * height). (mass in kg and height in meter)

1. For each of them, create an object with properties for their full name, mass, and height (Mark Miller and John Smith)
2. Create a 'calcBMI' method on each object to calculate the BMI (the same method on both objects). Store the BMI value
to a property, and also return it from the method.
3. Log to the console who has the higher BMI, together with the full name and the respective BMI.
Example: "John Smith's BMI (28.3) is higher than Mark Miller's (23.9)!"

TEST DATA: Marks weights 78 kg and is 1.69 m tall. John weights 92 kg and is 1.95 m tall.
*/
// const mark = {
//   fullName: "Mark Miller",
//   mass: 78,
//   height: 1.69,
//   calcBMI: function () {
//     this.bmi = this.mass / this.height ** 2;
//     return this.bmi;
//   },
// };

// const john = {
//   fullName: "John Smith",
//   mass: 92,
//   height: 1.95,
//   calcBMI: function () {
//     this.bmi = this.mass / this.height ** 2;
//     return this.bmi;
//   },
// };

// mark.calcBMI();
// john.calcBMI();
// console.log(mark.bmi, john.bmi);

// if (mark.bmi > john.bmi) {
//   console.log(
//     `${mark.fullName}'s BMI (${mark.bmi}) is higher than ${john.fullName}'s (${john.bmi})!`
//   );
// } else if (john.bmi > mark.bmi) {
//   console.log(
//     `${john.fullName}'s BMI (${john.bmi}) is higher than ${mark.fullName}'s (${mark.bmi})!`
//   );
// }

// #endregion

///////////////////////////////////////
// #region Iteration: The for Loop

// function liftWeights(times) {
//   for (let i = 1; i <= times; i++) {
//     console.log(`Lifting weights repetition ${i} 🏋️`);
//   }
// }

// liftWeights(5);

// // for loop keeps running while condition is TRUE
// for (let rep = 1; rep <= 30; rep++) {
//   console.log(`Lifting weights repetition ${rep} 🏋️‍♀️`);
// }

// #endregion

///////////////////////////////////////
// #region Looping Arrays, Breaking and Continuing

// const personArray = [
//   "Chuck",
//   "Norris",
//   84,
//   "Sensei",
//   ["Arnold", "Sylvester", "Steven"],
//   true,
// ];

// const types = [];
// for (let i = 0; i < personArray.length; i++) {
//   // Reading from personArray
//   console.log(personArray[i], typeof personArray[i]);

//   // Filling types array
//   // types[i] = typeof personArray[i];
//   // types.push(typeof personArray[i]);
//   types.push(personArray[i]);
// }

// console.log(personArray);
// console.log(types);

// const years = [1991, 2007, 1969, 2020];
// const ages = [];
// const yearsSum = years.reduce((acc, curr) => acc + curr, 0);
// const yearsCount = years.reduce((acc) => acc + 1, 0);
// console.log(yearsSum);
// console.log(yearsCount);
// console.log(`AVG: ${Math.floor(yearsSum / yearsCount)}`);

// for (let i = 0; i < years.length; i++) {
//   ages.push(new Date().getFullYear() - years[i]);
// }
// console.log(ages);

// // continue and break
// console.log("----- ONLY STRINGS -----");
// for (let i = 0; i < personArray.length; i++) {
//   if (typeof personArray[i] !== "string") continue;
//   console.log(personArray[i], typeof personArray[i]);
// }

// console.log("----- ONLY NUMBERS -----");
// for (let i = 0; i < personArray.length; i++) {
//   if (typeof personArray[i] === "object") break;
//   console.log(personArray[i], typeof personArray[i]);
// }

// #endregion

///////////////////////////////////////
// #region Looping Backwards and Loops in Loops

// const personArray = [
//   "Chuck",
//   "Norris",
//   84,
//   "Sensei",
//   ["Arnold", "Sylvester", "Steven"],
//   true,
// ];

// console.log(personArray);

// // 4, 3, .., 0
// for (let i = personArray.length - 1; i >= 0; i--) {
//   console.log(i, personArray[i]);
// }

// let totalRepetitions = 0;
// for (let exercise = 1; exercise <= 3; exercise++) {
//   console.log(`---- Starting exercise ${exercise} ----`);

//   for (let repetition = 1; repetition <= 5; repetition++) {
//     totalRepetitions++;
//     console.log(
//       `Exercise:${exercise}: Lifting weights repetition ${repetition} 🏋️‍♀️`
//     );
//   }
// }
// console.log(`Total repetitions of exercise: ${totalRepetitions}`);

// #endregion

///////////////////////////////////////
// #region The while Loop

// let repetition = 1;
// while (repetition <= 10) {
//   console.log(`Lifting weights repetition ${repetition} 🏋️‍♀️`);
//   repetition++;
// }

// let dice = Math.trunc(Math.random() * 6) + 1;

// while (dice !== 6) {
//   console.log(`You rolled a ${dice}`);
//   dice = Math.trunc(Math.random() * 6) + 1;
//   if (dice === 6) console.log("Loop is about to end...");
// }

// #endregion

///////////////////////////////////////
// #region Coding Challenge #4
/*
Let's improve Steven's tip calculator even more, this time using loops!

1. Create an array 'bills' containing all 10 test bill values
2. Create empty arrays for the tips and the totals ('tips' and 'totals')
3. Use the 'calcTip' function we wrote before (no need to repeat) to calculate tips
and total values (bill + tip) for every bill value in the bills array. Use a for loop to perform the 10 calculations!

TEST DATA: 22, 295, 176, 440, 37, 105, 10, 1100, 86 and 52

HINT: Call calcTip in the loop and use the push method to add values to the tips and totals arrays 😉

4. BONUS: Write a function 'calcAverage' which takes an array called 'arr' as an argument.
This function calculates the average of all numbers in the given array. This is a DIFFICULT challenge
(we haven't done this before)! Here is how to solve it:
  4.1. First, you will need to add up all values in the array. To do the addition, start by creating a variable
  'sum' that starts at 0. Then loop over the array using a for loop. In each iteration, add the current value
  to the 'sum' variable. This way, by the end of the loop, you have all values added together
  4.2. To calculate the average, divide the sum you calculated before by the length of the array (because that's the number of elements)
  4.3. Call the function with the 'totals' array
*/

// const calcTip = function (bill) {
//   return bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;
// };

const calcTip = (bill) =>
  bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;
const bills = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];
const tips = [];
const totals = [];

for (let i = 0; i < bills.length; i++) {
  const tip = calcTip(bills[i]);
  tips.push(tip);
  totals.push(bills[i] + tips[i]);
}

console.log(bills);
console.log(tips);
console.log(totals);

const calcAverage = function (arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum / arr.length;
};

console.log(`Tips average: ${calcAverage(tips)}`);
console.log(`Totals average: ${calcAverage(totals)}`);

// #endregion
