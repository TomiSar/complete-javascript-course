// Remember, we're gonna use strict mode in all scripts now!
'use strict';

// const x = '23';
// if (x === 23) console.log(23);

// const currentYear = new Date().getFullYear();
// const yearOfBorn = 1980;
// const calculateAge = birthYear => currentYear - birthYear;

// console.log(`It's year ${currentYear} and person was born in ${yearOfBorn}.`);
// console.log(`Person if ${calculateAge(yearOfBorn)}-years old.`);

///////////////////////////////////////
// #region Using Google, StackOverflow and MDN
// PROBLEM 1:
// We work for a company building a smart home thermometer. Our most recent task is this: "Given an array of temperatures of one day, calculate the temperature amplitude. Keep in mind that sometimes there might be a sensor error."

// 1) Understanding the problem
// - What is temp amplitude? Answer: difference between highest and lowest temp
// - How to compute max and min temperatures?
// - What's a sensor error? And what do do?

// 2) Breaking up into sub-problems
// - How to ignore errors?
// - Find max value in temp array
// - Find min value in temp array
// - Subtract min from max (amplitude) and return it

// const temperatures = [3, -2, -6, -1, 'error', 9, 13, 17, 15, 14, 9, 5];

// const calculateTempAmplitude = function (temperatures) {
//   let min = temperatures[0];
//   let max = temperatures[0];

//   for (let i = 0; i < temperatures.length; i++) {
//     if (typeof temperatures[i] !== 'number') continue;

//     if (min > temperatures[i]) min = temperatures[i];
//     if (max < temperatures[i]) max = temperatures[i];
//   }
//   //   console.log(`Min temp: ${min}`);
//   //   console.log(`Max temp: ${max}`);
//   return max - min;
// };

// const amplitude = calculateTempAmplitude(temperatures);
// console.log(`Amplitude: ${amplitude}°C`);

// PROBLEM 2:
// Function should now receive 2 arrays of temps

// 1) Understanding the problem
// - With 2 arrays, should we implement functionality twice? NO! Just merge two arrays

// 2) Breaking up into sub-problems
// - Merge 2 arrays

// const temps1 = [3, 5, 1, 'error'];
// const temps2 = [9, 'error', 0, 5];

// const calculateTempAmplitudeNew = function (temperatures1, temperatures2) {
//   //   const temperatures = temperatures1.concat(temperatures2);
//   const temperatures = [...temperatures1, ...temperatures2];
//   let min = temperatures[0];
//   let max = temperatures[0];
//   let tempsSum = 0;
//   let tempsCount = 0;

//   for (let i = 0; i < temperatures.length; i++) {
//     if (typeof temperatures[i] !== 'number') continue;

//     if (temperatures[i] > max) max = temperatures[i];
//     if (temperatures[i] < min) min = temperatures[i];
//     tempsSum += temperatures[i];
//     tempsCount++;
//   }

//   console.log(`Max temp: ${max}°C`);
//   console.log(`Min temp: ${min}°C`);
//   console.log(`Avg temp: ${tempsSum / tempsCount}°C`);

//   return max - min;
// };

// const amplitude = calculateTempAmplitudeNew(temps1, temps2);
// console.log(`Amplitude: ${amplitude}°C`);

// #endregion

///////////////////////////////////////
// #region Debugging with the Console and Breakpoints

// const measureKelvin = function () {
//   const measurement = {
//     type: 'temp',
//     unit: 'celsius',
//     value: Number(prompt('Degrees celsius to Kelvins')),
//   };

//   console.table(measurement);
//   //   console.log(measurement);
//   //   console.log(typeof measurement.value);
//   //   console.log(measurement.value);
//   //   console.warn(measurement.value);
//   //   console.error(measurement.value);

//   const kelvin = measurement.value + 273.15;
//   return `${measurement.value}ºC is equal to ${kelvin}0K`;
// };

// // A) IDENTIFY
// console.log(measureKelvin());

// // Using a debugger
// const calcTempAmplitudeBug = function (t1, t2) {
//   const temps = t1.concat(t2);
//   // console.log(temps);

//   let max = temps[0];
//   let min = temps[0];

//   for (let i = 0; i < temps.length; i++) {
//     const curTemp = temps[i];
//     if (typeof curTemp !== 'number') continue;

//     // debugger;
//     if (curTemp > max) max = curTemp;
//     if (curTemp < min) min = curTemp;
//   }

//   console.log(`Max temp: ${max}°C`);
//   console.log(`Min temp: ${min}°C`);
//   console.log(`Amplitude: ${max - min}°C`);
//   // console.log(max, min);
//   return max - min;
// };

// const amplitudeBug = calcTempAmplitudeBug([3, 5, 1], [9, 4, 5]);
// // // A) IDENTIFY
// console.log(amplitudeBug);

// #endregion

///////////////////////////////////////
// #region Coding Challenge #1

/*
Given an array of forecasted maximum temperatures, the thermometer displays a string with these temperatures.
Example: [17, 21, 23] will print "... 17ºC in 1 days ... 21ºC in 2 days ... 23ºC in 3 days ..."

Create a function 'printForecast' which takes in an array 'arr' and logs a string like the above to the console.

Use the problem-solving framework: Understand the problem and break it up into sub-problems!
TEST DATA 1: [17, 21, 23]
TEST DATA 2: [12, 5, -5, 0, 4]
*/

// TEST DATA 1: [17, 21, 23]
// const temperatures = [17, 21, 23];
// TEST DATA 2: [12, 5, -5, 0, 4]
const temperatures = [12, 5, -5, 0, 4];

const printForecast = function (array) {
  let outputString = '';
  for (let i = 0; i < array.length; i++) {
    outputString += `... ${array[i]}ºC in ${i + 1} days `;
  }
  console.log(outputString + '...');
};

printForecast(temperatures);
// #endregion
