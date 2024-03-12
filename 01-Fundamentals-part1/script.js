////////////////////////////////////
// #region Linking a JavaScript File
// let js = "amazing";
// console.log(40 + 8 + 23 - 10);
// #endregion

////////////////////////////////////
// #region Values and Variables
// let person = {
//   firstName: "",
//   lastName: "",
//   email: "",
//   age: 0,
// };

// const chuck = Object.assign({}, person, {
//   firstName: "Chuck",
//   lastName: "Norris",
//   email: "sensei@gmail.com",
//   age: 80,
// });
// console.log(chuck);

// let names = ["Chuck", "Matilda", "Bob"];
// for (let i = 0; i < names.length; i++) {
//   console.log(names[i]);
// }

// console.log("Jonas");
// console.log(23);

// let firstName = "Matilda";

// console.log(firstName);
// console.log(firstName);
// console.log(firstName);

// // Variable name conventions
// let jonas_matilda = "JM";
// let $function = 27;

// let person = "jonas";
// let PI = 3.1415;

// let myFirstJob = "Programmer";
// let myCurrentJob = "Teacher";

// let job1 = "programmer";
// let job2 = "teacher";
// #endregion

////////////////////////////////////
// #region Data Types
// let javascriptIsFun = true;
// console.log(javascriptIsFun);

// console.log(typeof true);
// console.log(typeof javascriptIsFun);
// console.log(typeof 23);
// console.log(typeof "Chuck Norris");

// javascriptIsFun = "YES is is!!";
// console.log(typeof javascriptIsFun);

// let year;
// console.log(year);
// console.log(typeof year);
// year = 1991;
// console.log(typeof year);
// console.log(typeof null);
// #endregion

////////////////////////////////////
// #region let, const and var keywords
// let age = 30;
// age = 31;

// const birthYear = 1993;

// var job = "programmer";
// console.log(job);
// job = "teacher";
// console.log(job);

// let greeting = "Greetings";

// if (greeting === "Greetings") {
//   var hello = "Hello";
//   console.log(hello);
// }

// console.log(hello);
// #endregion

////////////////////////////////////
// #region Operators
// Basic Operators
// Math operators
// const now = 2037;
// const ageJonas = now - 1991;
// const ageSarah = now - 2018;
// console.log(ageJonas, ageSarah);
// console.log(ageJonas * 2, ageJonas / 10, 3 ** 3);

// const firstName = "Chuck";
// const lastName = "Norris";
// console.log(firstName + " " + lastName);

// // Assignment operators
// let x = 10 + 5;
// x += 10;
// x *= 4;
// x++;
// x--;
// console.log(x);

// // Comparison operators >, <, >=, <=
// console.log(ageJonas < ageSarah);
// console.log(ageSarah >= 18);

// const isFullAge = ageSarah >= 18;
// console.log(now - 1991 > now - 2018);

// const ages = [];
// ages.push(ageJonas);
// ages.push(ageSarah);
// ages.push(ageJonas / 2);
// console.log("People count " + ages.length);
// console.log("Ages of people");
// for (let i = 0; i < ages.length; i++) {
//   console.log(`${i + 1}. age: ${ages[i]}`);
// }
// #endregion

////////////////////////////////////
// #region Operator Precedence
// # region
// # endregion
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_precedence
// const now = 2037;
// const ageJonas = now - 1991;
// const ageSarah = now - 2018;

// console.log(now - 1991 > now - 2018);
// let x, y;
// x = y = 25 - 10 - 5;
// console.log(x, y); // x = y = 10, x = 10
// console.log(x === y);

// const averageAge = (ageJonas + ageSarah) / 2;
// console.log(ageJonas, ageSarah, averageAge);
// #endregion

////////////////////////////////////
// #region Coding Challenge #1

/*
Mark and John are trying to compare their BMI (Body Mass Index), which is calculated using the formula: BMI = mass / height ** 2 = mass / (height * height). (mass in kg and height in meter).

1. Store Mark's and John's mass and height in variables
2. Calculate both their BMIs using the formula (you can even implement both versions)
3. Create a boolean variable 'markHigherBMI' containing information about whether Mark has a higher BMI than John.
*/

// // TEST DATA 1: Marks weights 78 kg and is 1.69 m tall. John weights 92 kg and is 1.95 m tall.
// // TEST DATA 2: Marks weights 95 kg and is 1.88 m tall. John weights 85 kg and is 1.76 m tall.
// const massMark = 78;
// const heightMark = 1.69;
// const massJohn = 92;
// const heightJohn = 1.95;

// const BMImark = massMark / heightMark ** 2;
// const BMIJohn = massJohn / (heightJohn * heightJohn);
// const markHigherBMI = BMImark > BMIJohn;
// console.log(BMImark, BMIJohn, markHigherBMI);

// #endregion

////////////////////////////////////
// #region Strings and Template Literals
// const firstName = "Chuck";
// const occupation = "Sensei";
// const birthYear = 1940;
// const yearsOld = new Date().getFullYear() - birthYear;
// const person =
//   "I'm " + firstName + ", a " + yearsOld + " years old " + occupation + "!";
// console.log(person);

// const newPerson = `I'm ${firstName}, a ${yearsOld} years old ${occupation}!`;
// console.log(newPerson);

// console.log(`Just a regular string...`);

// console.log(
//   "String with \n\
// multiple \n\
// lines"
// );

// console.log(
//   `String with
// multiple
// lines`
// );
// #endregion

////////////////////////////////////
// #region  Taking Decisions: if / else Statements
// const firstName = "Sarah";
// const age = 15;
// if (age >= 18) {
//   console.log(`${firstName} can start driving license 🚗`);
// } else {
//   const yearsLeft = 18 - age;
//   console.log(`${firstName} is too young. Wait another ${yearsLeft} years :)`);
// }

// const birthYear = 2011;
// let century;
// let ageDefinition;

// if (birthYear < 2000) {
//   century = 19;
//   ageDefinition = "middle aged";
// } else if (birthYear < 2010) {
//   century = 20;
//   ageDefinition = "youngster";
// } else {
//   century = 21;
//   ageDefinition = "teenager";
// }
// let yearsOld = new Date().getFullYear() - birthYear;
// console.log(
//   `Person was born in ${century}th century and is ${yearsOld} years old (${ageDefinition}).`
// );
// #endregion

////////////////////////////////////
// #region Coding Challenge #2
/*Use the BMI example from Challenge #1, and the code you already wrote, and improve it:
1. Print a nice output to the console, saying who has the higher BMI. 
The message can be either "Mark's BMI is higher than John's!" or "John's BMI is higher than Mark's!"
2. Use a template literal to include the BMI values in the outputs. Example: "Mark's BMI (28.3) is higher than John's (23.9)!"
*/

// const massMark = 78;
// const heightMark = 1.69;
// const massJohn = 92;
// const heightJohn = 1.95;

// // const massMark = 95;
// // const heightMark = 1.88;
// // const massJohn = 85;
// // const heightJohn = 1.76;

// const BMIMark = massMark / heightMark ** 2;
// const BMIJohn = massJohn / (heightJohn * heightJohn);
// console.log(BMIMark, BMIJohn);

// if (BMIMark > BMIJohn) {
//   console.log(`Mark's BMI (${BMIMark}) is higher than John's (${BMIJohn})!`);
// } else {
//   console.log(`John's BMI (${BMIJohn}) is higher than Marks's (${BMIMark})!`);
// }
// #endregion

////////////////////////////////////
// #region Type Conversion and Coercion

// // Type Conversion
// const inputYear = "1991";
// console.log(Number(inputYear), inputYear);
// console.log(Number(inputYear), 10);
// console.log(typeof Number(inputYear), typeof inputYear);

// console.log(Number("Chuck"));
// console.log(typeof NaN);

// console.log(String(23), 23);

// // Type Coercion
// console.log("I am " + 23 + " years old.");
// const subOutput = "23" - "10" - 3;
// console.log(typeof subOutput);
// console.log(subOutput);
// console.log("23" * 2);
// console.log("23" / 2);

// let n = "1" + 1; // '11'
// console.log(n);
// console.log(typeof n);
// n = n - 1; // 10
// console.log(typeof n);
// console.log(n);
// #endregion

////////////////////////////////////
// #region Truthy and Falsy Values
// JavaScript falsy value: 0, "", undefined, null, NaN
// console.log("Falsy values");
// console.log(Boolean(0));
// console.log(Boolean(""));
// console.log(Boolean(undefined));
// console.log(Boolean(null));
// console.log(Boolean(NaN));

// console.log("\nTruthy values");
// console.log(Boolean("Chuck"));
// console.log(Boolean({}));

// const moneyTotal = 100;
// if (moneyTotal) {
//   console.log("Don't spend all your money =)");
// } else {
//   console.log("You should get a job!");
// }

// let height; //false --> height=0
// if (height) {
//   console.log("Height is defined.");
// } else {
//   console.log("Height is undefined.");
// }
// #endregion

////////////////////////////////////
// #region Equality Operators: == vs. ===
// const age = "18";
// if (age === 18) console.log("You just became an adult :D (strict)");

// if (age == 18) console.log("You just became an adult :D (loose)");

// const favourite = Number(prompt("What's your favourite number?"));
// console.log(favourite);
// console.log(typeof favourite);

// if (favourite === 23) {
//   // 22 === 23 -> FALSE
//   console.log("Cool! 23 is an amzaing number!");
// } else if (favourite === 7) {
//   console.log("7 is also a cool number");
// } else if (favourite === 9) {
//   console.log("9 is also a cool number");
// } else {
//   console.log("Number is not 23 or 7 or 9");
// }

// if (favourite !== 23) console.log("Why not 23?");

// const ageString = "18";
// console.log(ageString == 18); //Type coercion
// console.log(ageString === 18); //No type coercion
// #endregion

////////////////////////////////////
// #region Logical Operators
// const hasDriversLicense = true; //A
// const hasGoodVision = true; //B

// console.log(hasDriversLicense && hasGoodVision); //false
// console.log(hasDriversLicense || hasGoodVision); //true
// console.log(!hasDriversLicense); //false

// const isTired = true; //C
// console.log(hasDriversLicense && hasGoodVision && isTired); //true

// console.log(`Person has drivers license: ${hasDriversLicense}`);
// console.log(`Person has good vision: ${hasGoodVision}`);
// console.log(`Person is tired: ${isTired}`);
// if (hasDriversLicense && hasGoodVision && !isTired) {
//   console.log("Person is able to drive =)!");
// } else {
//   console.log("Someone else should drive =(!");
// }
// #endregion

////////////////////////////////////
// #region Coding Challenge #3
/*
There are two gymnastics teams, Dolphins and Koalas. They compete against each other 3 times. The winner with the highest average score wins 
the a trophy!

1. Calculate the average score for each team, using the test data below
2. Compare the team's average scores to determine the winner of the competition, and print it to the console. 
Don't forget that there can be a draw, so test for that as well (draw means they have the same average score).

3. BONUS 1: Include a requirement for a minimum score of 100. With this rule, a team only wins if it has a 
higher score than the other team, and the same time a score of at least 100 points. HINT: Use a logical operator to test for minimum score, 
as well as multiple else-if blocks 😉
4. BONUS 2: Minimum score also applies to a draw! So a draw only happens when both teams have the same score and both have a score greater or equal 100 points. Otherwise, no team wins the trophy.

TEST DATA: Dolphins score 96, 108 and 89. Koalas score 88, 91 and 110
TEST DATA BONUS 1: Dolphins score 97, 112 and 101. Koalas score 109, 95 and 123
TEST DATA BONUS 2: Dolphins score 97, 112 and 101. Koalas score 109, 95 and 106
*/

// const scoreDolphins = (96 + 108 + 89) / 3;
// const scoreKoalas = (88 + 91 + 110) / 3;

// if (scoreDolphins > scoreKoalas && scoreDolphins >= 100) {
//   console.log("Dolphins win the trophy 🏆");
// } else if (scoreKoalas > scoreKoalas && scoreKoalas >= 100) {
//   console.log("Koalas win the trophy 🏆");
// } else if (
//   scoreDolphins === scoreKoalas &&
//   scoreDolphins >= 100 &&
//   scoreKoalas >= 100
// ) {
//   console.log("Both win the trophy!");
// }
// #endregion

////////////////////////////////////
// #region The switch Statement
// const day = "monday";
// switch (day) {
//   case "monday":
//     console.log("Plan course structure");
//     console.log("Go to coding meetup");
//     break;
//   case "tuesday":
//     console.log("Prepare theory videos");
//     break;
//   case "wednesday":
//   case "thursday":
//     console.log("Write code examples");
//     break;
//   case "friday":
//     console.log("Record videos");
//     break;
//   case "saturday":
//   case "sunday":
//     console.log("Enjoy the weekend :D");
//     break;
//   default:
//     console.log("Not a valid day!");
// }

// if (day === "monday") {
//   console.log("Plan course structure");
//   console.log("Go to coding meetup");
// } else if (day === "tuesday") {
//   console.log("Prepare theory videos");
// } else if (day === "wednesday" || day === "thursday") {
//   console.log("Write code examples");
// } else if (day === "friday") {
//   console.log("Record videos");
// } else if (day === "saturday" || day === "sunday") {
//   console.log("Enjoy the weekend :D");
// } else {
//   console.log("Not a valid day!");
// }
// #endregion

////////////////////////////////////
// #region Statements and Expressions
// 3 + 4;
// 1991;
// true && false && !false;

// if (23 > 10) {
//   const str = "23 is bigger";
// }

// const me = "Chuck";
// console.log(`I'm ${2037 - 1991} years old ${me}`);
// #endregion

////////////////////////////////////
// #region The Conditional (Ternary) Operator
// const age = 23;
// // age >= 18 ? console.log('I like to drink wine 🍷') : console.log('I like to drink water 💧');

// const drink = age >= 18 ? "wine 🍷" : "water 💧";
// console.log(drink);

// let drink2;
// if (age >= 18) {
//   drink2 = "wine 🍷";
// } else {
//   drink2 = "water 💧";
// }
// console.log(drink2);

// console.log(`I like to drink ${age >= 18 ? "wine 🍷" : "water 💧"}`);
// #endregion

////////////////////////////////////
// #region Coding Challenge #4
/*
Steven wants to build a very simple tip calculator for whenever he goes eating in a resturant. In his country, 
it's usual to tip 15% if the bill value is between 50 and 300. If the value is different, the tip is 20%.

1. Your task is to caluclate the tip, depending on the bill value. Create a variable called 'tip' for this. It's not allowed to use an if/else statement 😅 (If it's easier for you, you can start with an if/else statement, and then try to convert it to a ternary operator!)
2. Print a string to the console containing the bill value, the tip, and the final value (bill + tip). Example: 'The bill was 275, the tip was 41.25, and the total value 316.25'

TEST DATA: Test for bill values 275, 40 and 430

HINT: To calculate 20% of a value, simply multiply it by 20/100 = 0.2
HINT: Value X is between 50 and 300, if it's >= 50 && <= 300 😉
*/
// const bill = 430;
// const tip = bill >= 50 && bill <= 300 ? 0.15 * bill : 0.2 * bill;
// console.log(
//   `The bill was ${bill}, the tip was ${tip}, and the total value ${bill + tip}`
// );

// #endregion
