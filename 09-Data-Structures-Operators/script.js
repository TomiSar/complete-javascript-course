'use strict';

// Test Data for coding challenges
const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

const gameEvents = new Map([
  [17, '⚽️ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽️ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🔶 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽️ GOAL'],
  [80, '⚽️ GOAL'],
  [92, '🔶 Yellow card'],
]);

const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
const openingHours = {
  // [weekdays[2]]: {
  //   open: 8,
  //   close: 16,
  // },
  [weekdays[3]]: {
    open: 12,
    close: 22,
  },
  [weekdays[4]]: {
    open: 11,
    close: 23,
  },
  [weekdays[5]]: {
    open: 0, // Open 24 hours
    close: 24,
  },
};

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  // ES6 enhanced object literals
  openingHours,
  // hamburgerMenu: [
  //   'Crispy Chicken',
  //   'Brooklyn Habanero',
  //   'Harlem Bacon',
  //   'Big Mac',
  // ],

  // orderHamburger(hamburgerIndex) {
  //   console.log(
  //     `Enjoy your delicious ${this.hamburgerMenu[hamburgerIndex]} hamburger`
  //   );
  // },
  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  orderDelivery: function ({
    starterIndex = 1,
    mainIndex = 0,
    time = '20:00',
    address,
  }) {
    console.log(
      `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}.`
    );
  },

  orderPasta: function (ingredient1, ingredient2, ingredient3) {
    console.log(
      `Here's yourd delicious pasta with ${ingredient1}, ${ingredient2} and ${ingredient3}.`
    );
  },
  orderPizza: function (mainIngredient, ...otherIngredients) {
    console.log(mainIngredient);
    console.log(otherIngredients);
    console.log('\n');
  },
};

///////////////////////////////////////
// #region String Methods Practice

// * Delayed Departure from FAO to TXL (11h25)
//             Arrival from BRU to FAO (11h45)
//   * Delayed Arrival from HEL to FAO (12h05)
//           Departure from FAO to LIS (12h30)

const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

const getOnTime = str => (str.startsWith('_Delayed') ? '🔴' : '🟢');
const getFlightType = str => (str.includes('_Departure') ? '🛫' : '🛬');
const getCode = str => str.slice(0, 3).toUpperCase();

for (const flight of flights.split('+')) {
  const [type, from, to, time] = flight.split(';');
  const outputStr = `${getOnTime(type)}${type.replaceAll(
    '_',
    ' '
  )} ${getFlightType(type)} from ${getCode(from)} to ${getCode(
    to
  )} (${time.replace(':', 'h')})`.padStart(47);
  console.log(outputStr);
}

// for (const flight of flights.split('+')) {
//   const [type, from, to, time] = flight.split(';');
//   const output = `${type.startsWith('_Delayed') ? '🔴' : '🟢'}${type.replaceAll(
//     '_',
//     ' '
//   )} ${getCode(from)} ${getCode(to)} (${time.replace(':', 'h')})`.padStart(36);
//   console.log(output);
// }

// #endregion

///////////////////////////////////////
// #region Coding Challenge #4
/* 
Write a program that receives a list of variable names written in underscore_case and convert them to camelCase.

The input will come from a textarea inserted into the DOM (see code below), and conversion will happen when the button is pressed.

THIS TEST DATA (pasted to textarea)
underscore_case
 first_name
Some_Variable 
  calculate_AGE
delayed_departure

SHOULD PRODUCE THIS OUTPUT (5 separate console.log outputs)
underscoreCase      ✅
firstName           ✅✅
someVariable        ✅✅✅
calculateAge        ✅✅✅✅
delayedDeparture    ✅✅✅✅✅

HINT 1: Remember which character defines a new line in the textarea 😉
HINT 2: The solution only needs to work for a variable made out of 2 words, like a_b
HINT 3: Start without worrying about the ✅. Tackle that only after you have the variable name conversion working 😉
HINT 4: This challenge is difficult on purpose, so start watching the solution in case you're stuck. Then pause and continue!

Afterwards, test with your own test data!
*/

// document.body.append(document.createElement('textarea'));
// document.body.append(document.createElement('button'));

// document.querySelector('button').addEventListener('click', function () {
//   const text = document.querySelector('textarea').value;
//   const rows = text.split('\n');
//   // console.log(text);

//   for (const [i, row] of rows.entries()) {
//     const [part1, part2] = row.toLowerCase().trim().split('_');

//     const output = `${part1}${part2.replace(part2[0], part2[0].toUpperCase())}`;
//     console.log(`${output.padEnd(20)}${'✅'.repeat(i + 1)}`);
//   }
// });

// #endregion

///////////////////////////////////////
// #region Working With Strings - Part 3
// // Split and join
// console.log('a+very+nice+string'.split('+'));
// console.log('Chuck Norris'.split(' '));

// const [firstName, lastName] = 'Chuck Norris'.split(' ');

// const newName = ['Mr.', firstName, lastName.toUpperCase()].join(' ');
// console.log(newName);

// const capitalizeName = function (name) {
//   const names = name.split(' ');
//   const namesUpper = [];
//   for (const n of names) {
//     // namesUpper.push(n[0].toUpperCase() + n.slice(1));
//     namesUpper.push(n.replace(n[0], n[0].toUpperCase()));
//   }
//   console.log(namesUpper.join(' '));
// };

// capitalizeName('jessica ann smith davis');
// capitalizeName('chuck norris');

// // Padding
// const message = 'Go to gate 23!';
// console.log(message);
// console.log(message.padStart(20, '+').padEnd(30, '+'));
// console.log('Chuck'.padStart(20, '+').padEnd(30, '+'));

// const maskCreditCard = function (number) {
//   const str = number + '';
//   const last = str.slice(-4);
//   return last.padStart(str.length, '*');
// };

// console.log(maskCreditCard(12345678));
// console.log(maskCreditCard(9072139864875));
// console.log(maskCreditCard('09779003873899'));

// // Repeat
// const message2 = 'Bad weather... All departures delayed... \n';
// console.log(message2.repeat(5));

// const planesInLine = function (n) {
//   console.log(`There are ${n} planes in line ${'🛩'.repeat(n)}`);
// };

// planesInLine(3);
// planesInLine(25);
// planesInLine(5);

// #endregion

///////////////////////////////////////
// #region Working With Strings - Part 2
// const airline = 'TAP Air Portugal';

// console.log(airline.toLowerCase());
// console.log(airline.toUpperCase());

// // Fix capitalization in name
// const passenger = 'cHuCK'; //Chuck
// const passengerLower = passenger.toLowerCase();
// const passengerFixed = passenger[0].toUpperCase() + passengerLower.slice(1);
// console.log(passengerFixed);

// // Comparing email
// const email = 'hello@person.com';
// const loginEmail = 'Hello@Person.Com \n';

// // const lowerEmail = email.toLowerCase();
// // const trimmedEmail = email.trim();
// // console.log(trimmedEmail);

// const normalizedEmail = loginEmail.toLowerCase().trim();
// console.log(normalizedEmail);
// console.log(email === normalizedEmail);

// // replacing
// const prizeGB = '288,97£';
// const priceUS = prizeGB.replace(',', '.').replace('£', '$');

// console.log(prizeGB);
// console.log(priceUS);

// const announcement =
//   'All passengers come to boarding door 23. Boarding door 23!';
// console.log(announcement.replace('door', 'gate'));
// // console.log(announcement.replaceAll('door', 'gate'));
// console.log(announcement.replace(/door/g, 'gate'));

// // Booleans
// const airplane = 'Airbus A320neo';
// console.log(airplane.includes('A320'));
// console.log(airplane.includes('Boeing'));
// console.log(airplane.startsWith('Air'));
// console.log(airplane.endsWith('neo'));

// if (airplane.startsWith('') && airplane.endsWith('neo')) {
//   console.log('Airplane is part of the new Airbus family');
// }

// // Practice exercise
// function checkBaggage(items) {
//   const baggage = items.toLowerCase();
//   if (baggage.includes('gun') || baggage.includes('knife')) {
//     console.log('You are NOT allowed on board');
//   } else {
//     console.log('Welcome aboard!');
//   }
// }

// checkBaggage('I have a laptop, some Food and a pocket Knife');
// checkBaggage('Socks and camera');
// checkBaggage('Got some snacks and a gun for protection');

// #endregion

///////////////////////////////////////
// #region Working With Strings - Part 1
// const airline = 'TAP Air Portugal';
// const airplane = 'A320';

// console.log(airplane[0]);
// console.log(airplane[1]);
// console.log(airplane[2]);
// console.log('B737'[0]);

// console.log(airline.length); //16
// console.log('B737'.length); //4

// console.log(airline.indexOf('r')); //6
// console.log(airline.lastIndexOf('r')); //10
// console.log(airline.indexOf('Portugal')); //8

// console.log(airline.slice(4)); //Air Portugal
// // console.log(airline.substring(4)); //Air Portugal
// console.log(airline.slice(4, 7)); //Air
// console.log(airline.slice(0, airline.indexOf(' '))); //TAP
// console.log(airline.slice(airline.lastIndexOf(' ')).trim()); //Portugal

// console.log(airline.slice(-2)); //al
// console.log(airline.slice(1, -1)); //AP Air Portuga

// const checkMiddleSeat = function (seat) {
//   // B and E are middle seats
//   const s = seat.slice(-1);
//   if (s === 'B' || s === 'E') {
//     console.log('You got the middle seat 😔');
//   } else {
//     console.log('You got lucky 😘');
//   }
// };

// checkMiddleSeat('11B');
// checkMiddleSeat('23C');
// checkMiddleSeat('3E');

// console.log(new String('Chuck'));
// console.log(typeof new String('Chuck')); //object
// console.log(typeof new String('Chuck').slice(1)); //string

// #endregion

///////////////////////////////////////
// #region Coding Challenge #3
/* 
Let's continue with our football betting app! This time, we have a map with a log of the events that happened during the game. The values are the events themselves, 
and the keys are the minutes in which each event happened (a football game has 90 minutes plus some extra time).

1. Create an array 'events' of the different game events that happened (no duplicates)
2. After the game has finished, is was found that the yellow card from minute 64 was unfair. So remove this event from the game events log.
3. Print the following string to the console: "An event happened, on average, every 9 minutes" (keep in mind that a game has 90 minutes)
4. Loop over the events and log them to the console, marking whether it's in the first half or second half (after 45 min) of the game, like this:
      [FIRST HALF] 17: ⚽️ GOAL
*/

// // 1.
// const events = [...new Set(gameEvents.values())];
// for (const event of events) {
//   console.log(event);
// }
// console.log(events.length);

// // 2.
// console.log(gameEvents);
// gameEvents.delete(64);
// console.log(gameEvents);

// // 3.
// console.log(
//   `An event happened, on average, every ${90 / gameEvents.size} minutes`
// );
// const time = [...gameEvents.keys()].pop(); //last
// console.log(time);
// console.log(
//   `An event happened, on average, every ${time / gameEvents.size} minutes`
// );

// // 4.
// for (const [min, event] of gameEvents) {
//   const half = min < 45 ? 'FIRST' : 'SECOND';
//   console.log(`[${half} HALF] ${min}: ${event}`);
// }

// #endregion

///////////////////////////////////////
// #region Maps: Iteration
// const question = new Map([
//   ['question', 'What is the most popular programming language in the world?'],
//   [1, 'Python'],
//   [2, 'Java'],
//   [3, 'JavaScript'],
//   [4, 'C#'],
//   [5, 'C++'],
//   ['correct', 3],
//   [true, 'Correct 🎉'],
//   [false, 'Try again!'],
// ]);

// console.log(question);

// // Convert object to map
// const hoursMap = new Map(Object.entries(openingHours));
// console.log(hoursMap);

// // Quiz app
// console.log(question.get('question'));
// for (const [key, value] of question) {
//   if (typeof key === 'number') {
//     console.log(`Answer ${key}: ${value}`);
//   }
// }

// const answer = Number(prompt('Your answer (1-5)?'));
// console.log(`Your answer: ${question.get(answer)}`);
// console.log(question.get(question.get('correct') === answer));

// // Convert map to array
// console.log([...question]);
// console.log(question.entries());
// console.log([...question.keys()]);
// console.log([...question.values()]);

// #endregion

///////////////////////////////////////
// #region Maps: Fundamentals
// console.log('Hello');
// const rest = new Map();
// rest.set('name', 'Classico Italiano');
// rest.set(1, 'Firenze, Italy');
// console.log(rest.set(2, 'Lisbon, Portugal'));

// rest
//   .set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
//   .set('open', 11)
//   .set('close', 23)
//   .set(true, 'We are open')
//   .set(false, 'We are closed');

// console.log(rest.get('name'));
// console.log(rest.get(1));
// console.log(rest.get(2));
// console.log(rest.get(true));
// console.log(`Categories: ${rest.get('categories')}`);
// console.log(rest);

// const time = 21;
// console.log(rest.get(time > rest.get('open') && time < rest.get('close')));

// console.log(rest.has('categories'));
// console.log(rest.delete(2));
// // rest.clear();

// const arr = [1, 2];
// rest.set(arr, 'Test');
// rest.set(document.querySelector('h1'), 'Heading1');
// console.log(rest);
// console.log(rest.size);

// console.log(rest.get(arr));

// #endregion

///////////////////////////////////////
// #region Sets
// const ordersSet = new Set([
//   'Pasta',
//   'Risotto',
//   'Pizza',
//   'Pizza',
//   'Pasta',
//   'Risotto',
// ]);
// console.log(ordersSet);

// console.log(new Set('Chuck'));

// console.log(ordersSet.size); //3
// console.log(ordersSet.has('Pizza')); //true
// console.log(ordersSet.has('Bread')); //false
// ordersSet.add('Garlic Bread');
// ordersSet.add('Garlic Bread');
// console.log(ordersSet.size);

// ordersSet.delete('Risotto');
// console.log(ordersSet);
// console.log(ordersSet.size);
// // ordersSet.clear();

// for (const order of ordersSet) console.log(order);

// // Example
// const staff = ['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter'];
// const staffUnique = [...new Set(staff)];
// console.log(staffUnique);
// console.log(staffUnique.length);

// console.log(
//   new Set(['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter']).size
// );

// const chuck = new Set('chucknorrisissensei');
// console.log(chuck);
// console.log(chuck.size);

// #endregion

///////////////////////////////////////
// #region Coding Challenge #2
/* 
Let's continue with our football betting app!

1. Loop over the game.scored array and print each player name to the console, along with the goal number (Example: "Goal 1: Lewandowski")
2. Use a loop to calculate the average odd and log it to the console (We already studied how to calculate averages, you can go check 
  if you don't remember)
3. Print the 3 odds to the console, but in a nice formatted way, exaclty like this:
      Odd of victory Bayern Munich: 1.33
      Odd of draw: 3.25
      Odd of victory Borrussia Dortmund: 6.5
Get the team names directly from the game object, don't hardcode them (except for "draw"). HINT: Note how the odds and the game objects 
have the same property names.

BONUS: Create an object called 'scorers' which contains the names of the players who scored as properties, and the number of goals as the value. 
In this game, it will look like this:
      {
        Gnarby: 1,
        Hummels: 1,
        Lewandowski: 2
      }
*/

// // 1.
// for (const [i, player] of game.scored.entries()) {
//   console.log(`Goal ${i + 1}: ${player}`);
// }

// // 2.
// const odds = Object.values(game.odds);
// let sum = 0;
// for (const odd of odds) sum += odd;
// console.log(sum / odds.length);

// // 3.
// for (const [team, odd] of Object.entries(game.odds)) {
//   const teamStr = team === 'x' ? 'draw' : `victory ${game[team]}`;
//   console.log(`Odd of ${teamStr}: ${odd}`);
// }

// // BONUS
// // So the solution is to loop over the array, and add the array elements as object properties, and then increase the count
// // as we encounter a new occurence of a certain element
// const scorers = {};
// for (const player of game.scored) {
//   scorers[player] ? scorers[player]++ : (scorers[player] = 1);
// }
// console.log(scorers);

// #endregion

///////////////////////////////////////
// #region Looping Objects: Object Keys, Values, and Entries

// // Property NAMES: Object Keys
// const keys = Object.keys(openingHours);
// console.log(keys);

// let openHoursStr = `We are open on ${keys.length} days: `;
// for (const day of keys) {
//   openHoursStr +=
//     day !== 'sat'
//       ? `${day[0].toUpperCase() + day.slice(1)}, `
//       : `${day[0].toUpperCase() + day.slice(1)}`;
// }

// console.log(openHoursStr);

// // Property VALUES: Values
// const values = Object.values(openingHours);
// console.log(values);

// // Property ENTRIES: Object Entries (Keys, Values)
// const entries = Object.entries(openingHours);
// console.log(entries);

// for (const [day, { open, close }] of entries) {
//   console.log(`On ${day} we are open at ${open}-${close}.`);
// }

// #endregion

///////////////////////////////////////
// #region Optional Chaining
// if (restaurant.openingHours && restaurant.openingHours.mon) {
//   console.log(restaurant.openingHours.mon);
// }

// // NO Optional Chaining
// console.log(restaurant.openingHours.mon.open);

// // Optional Chaining
// console.log(restaurant.openingHours.mon?.open);
// console.log(restaurant.openingHours?.mon?.open);

// // Exxample
// const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
// for (const day of days) {
//   const open = restaurant.openingHours[day]?.open ?? 'closed';
//   console.log(
//     `On ${day} we ${open === 'closed' ? 'are closed' : `open at ${open}`}`
//   );
// }

// // Methods
// console.log(restaurant.order?.(0, 1) ?? 'Method does not exist');
// console.log(restaurant.orderHamburger?.(0, 1) ?? 'Method does not exist');

// // Arrays
// const users = [
//   { firstName: 'Chuck', lastName: 'Norris', email: 'chuck@sensei.com' },
// ];
// // const users = [];

// console.log(users[0]?.firstName ?? 'User Array is empty');
// console.log(users[1]?.firstName ?? 'User Array is empty');

// // if (users.length > 0) {
// //   console.log(users[0].firstName);
// // } else {
// //   console.log('User Array is empty');
// // }

// #endregion

///////////////////////////////////////
// #region The for-of Loop
// const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];
// console.log(menu);
// for (const item of menu) console.log(item);
// for (const [index, elem] of menu.entries()) {
//   console.log(`${index + 1}: ${elem}`);
// }

// for (const item of menu.entries()) {
//   console.log(`${item[0] + 1}: ${item[1]}`);
// }

// console.log([...menu.entries()]);

// #endregion

///////////////////////////////////////
// #region Coding Challenge #1
/* 
Suppose we get data from a web service about a certain game (below). In this challenge we're gonna work with the data. So here are your tasks:

1. Create one player array for each team (variables 'players1' and 'players2')
2. The first player in any player array is the goalkeeper and the others are field players. 
For Bayern Munich (team 1) create one variable ('gk') with the goalkeeper's name, and one array ('fieldPlayers') with all the remaining 10 field players
3. Create an array 'allPlayers' containing all players of both teams (22 players)
4. During the game, Bayern Munich (team 1) used 3 substitute players. So create a new array ('players1Final') containing all the original team1 players plus 'Thiago', 'Coutinho' and 'Perisic'
5. Based on the game.odds object, create one variable for each odd (called 'team1', 'draw' and 'team2')
6. Write a function ('printGoals') that receives an arbitrary number of player names (NOT an array) and prints each of them to the console, along with the number of goals that were scored in total (number of player names passed in)
7. The team with the lower odd is more likely to win. Print to the console which team is more likely to win, WITHOUT using an if/else statement or the ternary operator.

TEST DATA FOR 6: Use players 'Davies', 'Muller', 'Lewandowski' and 'Kimmich'. Then, call the function again with players from game.scored
*/

// // 1.
// const [players1, players2] = game.players;
// console.log(players1, players2);

// // 2.
// const [gk, ...fieldPlayers] = players1;
// console.log(gk, fieldPlayers);

// // 3.
// const allPlayers = [...players1, ...players2];
// console.log(allPlayers);

// // 4.
// const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic'];
// console.log(players1Final);

// // 5.
// const {
//   odds: { team1, x: draw, team2 },
// } = game;
// console.log(team1, draw, team2);

// // 6.
// function printGoals(...players) {
//   console.log(players);
//   console.log(`${players.length} total goals were scored`);
// }
// // printGoals('Davies', 'Muller', 'Lewandowski', 'Kimmich');
// printGoals(...game.scored);

// // 7.
// team1 < team2 && console.log(`Team 1 (${game.team1}) is more likely to win`);
// team1 > team2 && console.log(`Team 2 (${game.team2}) is more likely to win`);

// #endregion

///////////////////////////////////////
// #region Logical Assignment Operators
// const restaurant1 = {
//   name: 'Capri',
//   // numOfGuests: 20,
//   numOfGuests: 0,
// };

// const restaurant2 = {
//   name: 'Texas Ranger Beef Palace',
//   owner: 'Chuck Norris',
// };

// // OR assignment operator
// restaurant1.numOfGuests = restaurant1.numOfGuests || 10;
// restaurant2.numOfGuests = restaurant1.numOfGuests || 10;
// restaurant1.numOfGuests ||= 10;
// restaurant2.numOfGuests ||= 10;

// // nullish assignment operator (null or undefined)
// restaurant1.numOfGuests ??= 10;
// restaurant2.numOfGuests ??= 10;

// // AND assignment operator
// // restaurant1.owner = restaurant1.owner && '<ANONYMOUS>';
// // restaurant2.owner = restaurant1.owner && '<ANONYMOUS>';
// restaurant1.owner &&= '<ANONYMOUS>';
// restaurant2.owner &&= '<ANONYMOUS>';

// console.log(restaurant1);
// console.log(restaurant2);

// #endregion

///////////////////////////////////////
// #region The Nullish Coalescing Operator
// restaurant.numOfGuests = 0;
// const guests = restaurant.numOfGuests || 10;
// console.log(guests);

// // Nullish: nul and undefined (NOT 0 or '')
// const guestCorrect = restaurant.numOfGuests ?? 10;
// console.log(guestCorrect);

// #endregion

///////////////////////////////////////
// #region Short Circuiting (&& and ||)

// // Use ANY data type, return ANY data type, short-circuiting
// console.log('---- OR ----');
// console.log(3 || 'name');
// console.log('' || 'name');
// console.log(true || 0);
// console.log(undefined || null);

// console.log(undefined || 0 || '' || 'Hello' || 23 || null); //Hello (first Truthy value)

// restaurant.numOfGuests = 0;
// console.log(restaurant.numOfGuests == false);
// const guests1 = restaurant.numOfGuests ? restaurant.numOfGuests : 10;
// console.log(guests1);

// const guests2 = restaurant.numOfGuests || 10;
// console.log(guests2);

// console.log('---- AND ----');
// console.log(0 && 'Jack');
// console.log(7 && 'Jack');

// console.log('Hello' && 23 && null && 'Jack'); //null (first Falsy value)

// // Practical example
// if (restaurant.orderPizza) {
//   restaurant.orderPizza('mushrooms', 'spinach');
// }

// restaurant.order && restaurant.orderPizza('mushrooms', 'spinach');

// #endregion

///////////////////////////////////////
// #region Rest Pattern and Parameters
// // 1) Destructuring

// // SPREAD, because on RIGHT side of =
// const array = [1, 2, ...[3, 4]];
// console.log(...array);

// // REST, because on LEFT side of =
// const [a, b, ...others] = [1, 2, 3, 4, 5];
// console.log(a, b, others);

// const [pizza, , risotto, focaccia, ...otherStarters] = [
//   ...restaurant.mainMenu,
//   ...restaurant.starterMenu,
// ];
// console.log(pizza, risotto, focaccia, otherStarters);

// // Objects
// const { sat, ...weekHours } = restaurant.openingHours;
// console.log(sat);
// console.log(weekHours);

// // 2) Functions
// const addNumbers = function (...numbers) {
//   // const sum = numbers.reduce((a, b) => a + b, 0);
//   let sum = 0;
//   for (let i = 0; i < numbers.length; i++) sum += numbers[i];
//   console.log(sum);
// };

// addNumbers(2, 3); //5
// addNumbers(5, 3, 7, 2); //17
// addNumbers(8, 2, 5, 3, 2, 1, 4); //25

// const x = [23, 5, 7];
// addNumbers(...x); //35

// restaurant.orderPizza('Ham');
// restaurant.orderPizza('Salami', 'Feta', 'Tuna', 'Olives');
// restaurant.orderPizza();

// #endregion

///////////////////////////////////////
// #region The Spread Operator (...)
// const array = [7, 8, 9, 10];
// const newArray = [1, 2, 3, 4, ...array];
// console.log(newArray);

// console.log(...newArray);
// console.log(1, 2, 3, 4, 7, 8, 9, 10);

// const newMenu = [
//   ...restaurant.mainMenu,
//   'Chicken Parmesan',
//   'Lasagne',
//   'Italian Meatballs',
// ];

// console.log(restaurant.mainMenu);
// console.log(newMenu.sort());

// // Copy array
// const mainMenuCopy = [...restaurant.mainMenu];

// // Join 2 arrays
// const wholeMenu = [...restaurant.starterMenu, ...restaurant.mainMenu];
// console.log(wholeMenu);

// // Iterables: arrays, strings, maps, sets. NOT objects
// const str = 'Chuck';
// const letters = [...str, ' ', 'N.'];
// console.log(letters);
// console.log(...str);
// // console.log(`${...str} Norris`); //Unexpected token '...'

// // Real-world example
// const ingredients = [
//   prompt("Let's make pasta! Ingredient 1?"),
//   prompt('Ingredient 2?'),
//   prompt('Ingredient 3?'),
// ];
// console.log(ingredients);
// restaurant.orderPasta(...ingredients);

// // Objects
// const newResturant = { foundedIn: 1998, ...restaurant, founder: 'Mario Bros' };
// console.log(newResturant);

// const restaurantCopy = { ...restaurant };
// restaurantCopy.name = 'Italian Stallion';
// console.log(restaurantCopy.name);
// console.log(restaurant.name);

// #endregion

///////////////////////////////////////
// #region Destructuring Objects
// const { name, openingHours, categories } = restaurant;
// console.log(name, openingHours, categories);

// const {
//   name: restaurantName,
//   openingHours: hours,
//   categories: tags,
// } = restaurant;
// console.log(restaurantName, hours, tags);

// restaurant.orderDelivery({
//   time: '22:30',
//   address: 'Via del Sole 21',
//   mainIndex: 2,
//   starterIndex: 2,
// });

// restaurant.orderDelivery({
//   address: 'Hollywood Boulevard 1',
//   starterIndex: 0,
// });

// // Default values
// const { menu = [], starterMenu: starters = [] } = restaurant;
// console.log(menu, starters);

// // Mutating variables
// let a = 111;
// let b = 999;
// const obj = { a: 23, b: 7, c: 14 };
// ({ a, b } = obj);
// console.log(a, b);

// // Nested objects
// const {
//   fri: { open: o, close: c },
// } = openingHours;
// console.log(o, c);

// #endregion

///////////////////////////////////////
// #region Destructuring Arrays

// const array = [1, 2, 3];
// const a = array[0];
// const b = array[1];
// const c = array[2];

// const [x, y, z] = array;
// console.log(x, y, z);
// console.log(array);

// let [main, , secondary] = restaurant.categories;
// console.log(main, secondary);

// // // Switching variables
// // const temp = main;
// // main = secondary;
// // secondary = temp;
// // console.log(main, secondary);

// [secondary, main] = [main, secondary];
// console.log(main, secondary);

// // Receive 2 return values from a function
// const [starter, mainCourse] = restaurant.order(2, 0);
// console.log(starter, mainCourse);

// // Nested destructuring
// const nested = [2, 4, [5, 6]];
// // const [i, , j] = nested;
// const [i, , [j, k]] = nested;
// console.log(i, j, k);

// // Default values
// const [var1 = 1, var2 = 2, var3 = 10] = [8, 9];
// console.log(var1, var2, var3);

// const ratings = [
//   ['rating', 4.19],
//   ['ratingsCount', 144584],
// ];
// const [[, rating], [, ratingsCount]] = ratings;
// console.log(rating);
// console.log(ratingsCount);

// const ratingStars = [63405, 1808];
// const [fiveStarRatings, oneStarRatings, threeStarRatings = 0] = ratingStars;
// console.log(fiveStarRatings, oneStarRatings, threeStarRatings);

// #endregion
