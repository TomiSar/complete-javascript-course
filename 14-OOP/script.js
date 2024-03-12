'use strict';

///////////////////////////////////////
// #region Constructor Functions and the new Operator, Prototypes and Prototypal Inheritance on Built-In Objects

// const Person = function (firstName, birthYear) {
//   // Instance properties
//   this.firstName = firstName;
//   this.birthYear = birthYear;
//   // Never to this!
//   // this.calcAge = function () {
//   //   console.log(2037 - this.birthYear);
//   // };
// };

// const chuck = new Person('Chuck', 1940);
// console.log(chuck);

// // 1. New {} is created
// // 2. function is called, this = {}
// // 3. {} linked to prototype
// // 4. function automatically return {}

// const matilda = new Person('Matilda', 2017);
// const jack = new Person('Jack', 1975);
// console.log(matilda, jack);

// console.log(chuck instanceof Person);

// Person.hello = function () {
//   console.log('Hello there 👋');
//   console.log(this);
// };
// Person.hello();

// ///////////////////////////////////////
// // Prototypes

// console.log(Person.prototype);
// Person.prototype.calculateAge = function () {
//   console.log(2037 - this.birthYear);
// };
// chuck.calculateAge();
// matilda.calculateAge();

// console.log(chuck.__proto__);
// console.log(chuck.__proto__ === Person.prototype);

// console.log(Person.prototype.isPrototypeOf(chuck));
// console.log(Person.prototype.isPrototypeOf(matilda));
// console.log(Person.prototype.isPrototypeOf(Person)); //false

// // .prototyeOfLinkedObjects
// Person.prototype.species = 'Homo Sapiens';
// console.log(chuck.species, matilda.species);

// console.log(chuck.hasOwnProperty('firstName'));
// console.log(chuck.hasOwnProperty('species'));

// ///////////////////////////////////////
// // Prototypal Inheritance on Built-In Objects

// console.log(chuck.__proto__);
// // Object.prototype (top of prototype chain)
// console.log(chuck.__proto__.__proto__);
// console.log(chuck.__proto__.__proto__.__proto__);

// console.dir(Person.prototype.constructor);

// const array = [3, 6, 5, 5, 6, 9, 3, 9]; // new Array === []
// console.log(array.__proto__);
// console.log(array.__proto__ === Array.prototype);

// console.log(array.__proto__.__proto__);

// Array.prototype.unique = function () {
//   return [...new Set(this)];
// };

// console.log(array.unique());

// const h1 = document.querySelector('h1');
// console.dir(h1);
// console.dir(x => x + 1);

// #endregion

///////////////////////////////////////
// #region Coding Challenge #1
/*
1. Use a constructor function to implement a Car. A car has a make and a speed property. The speed property is the current speed of the car in km/h;
2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console;
3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console;
4. Create 2 car objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them.

DATA CAR 1: 'BMW' going at 120 km/h
DATA CAR 2: 'Mercedes' going at 95 km/h
*/

// // 1.
// const Car = function (make, speed) {
//   this.make = make;
//   this.speed = speed;
// };

// // 2.
// Car.prototype.accelerate = function () {
//   this.speed += 10;
//   console.log(`${this.make} is going at ${this.speed} km/h`);
// };

// // 3.
// Car.prototype.break = function () {
//   this.speed -= 5;
//   console.log(`${this.make} is going at ${this.speed} km/h`);
// };

// // 4.
// const bmw = new Car('BMW', 120);
// const audi = new Car('Audi', 110);

// for (let times = 1; times <= 5; times++) {
//   bmw.accelerate();
//   audi.accelerate();
// }

// for (let times = 1; times <= 2; times++) {
//   bmw.break();
//   audi.break();
// }

// #endregion

///////////////////////////////////////
// #region ES6 Classes

// // Class expression const PersonCl = class {}

// // Class declaration
// class PersonCl {
//   constructor(fullName, birthYear) {
//     this.fullName = fullName;
//     this.birthYear = birthYear;
//   }

//   // Methods will be added  in prototype property
//   calculateAge() {
//     console.log(
//       `You are ${new Date().getFullYear() - this.birthYear} years old.`
//     );
//   }

//   greet() {
//     console.log(`Hello ${this.firstName} 👋`);
//   }

//   get age() {
//     return new Date().getFullYear() - this.birthYear;
//   }

//   // Set a property that already exists
//   set fullName(name) {
//     if (name.includes(' ')) this._fullName = name;
//     else alert(`${name} is not a full name!`);
//   }

//   get fullName() {
//     return this._fullName;
//   }

//   // Static method
//   static hey() {
//     console.log('Hey there 👋');
//     console.log(this);
//   }
// }
// const chuck = new PersonCl('Chuck Norris', 1940);
// console.log(chuck);
// chuck.calculateAge();
// console.log(chuck.age);

// console.log(chuck.__proto__ === PersonCl.prototype);

// // PersonCl.prototype.greet = function () {
// //   console.log(`Hey ${this.firstName}`);
// // };
// chuck.greet();

// // 1. Classes are NOT hoisted
// // 2. Classes are first-class citizens
// // 3. Classes are executed in strict mode

// const walter = new PersonCl('Walter White', 1965);
// console.log(walter);
// PersonCl.hey();

// #endregion

///////////////////////////////////////
// #region Setters and Getters
// const account = {
//   owner: 'Chuck',
//   movements: [200, 530, 120, 300],
//   get latest() {
//     return this.movements.slice(-1).pop();
//   },
//   set latest(mov) {
//     this.movements.push(mov);
//   },
// };

// console.log(account.latest);

// account.latest = 50;
// console.log(account.movements);

// #endregion

///////////////////////////////////////
// #region Object.create
// const PersonProto = {
//   calculateAge() {
//     console.log(new Date().getFullYear() - this.birthYear);
//   },

//   init(firstName, birthYear) {
//     this.firstName = firstName;
//     this.birthYear = birthYear;
//   },
// };

// const steven = Object.create(PersonProto);
// console.log(steven);
// steven.name = 'Steven';
// steven.birthYear = 1990;
// steven.calculateAge();
// console.log(steven.__proto__ === PersonProto);

// const sarah = Object.create(PersonProto);
// sarah.init('Sarah', 1979);
// sarah.calculateAge();

// #endregion

///////////////////////////////////////
// #region Coding Challenge #2
/*
1. Re-create challenge 1, but this time using an ES6 class;
2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide by 1.6);
3. Add a setter called 'speedUS' which sets the current speed in mi/h (but converts it to km/h before storing the value, by multiplying the input by 1.6);
4. Create a new car and experiment with the accelerate and brake methods, and with the getter and setter.

DATA CAR 1: 'Ford' going at 120 km/h
*/

// class CarCl {
//   constructor(make, speed) {
//     this.make = make;
//     this.speed = speed;
//   }

//   accelerate() {
//     this.speed += 10;
//     console.log(`${this.make} is going at ${this.speed} km/h`);
//   }

//   brake() {
//     this.speed -= 5;
//     console.log(`${this.make} is going at ${this.speed} km/h`);
//   }

//   get speedUS() {
//     return this.speed / 1.6;
//   }
//   set speedUS(speed) {
//     this.speed = speed * 1.6;
//   }
// }

// const ford = new CarCl('Ford', 120);
// console.log(ford.speedUS);
// ford.accelerate();
// ford.accelerate();
// ford.brake();
// ford.speedUS = 50;
// console.log(ford);

// #endregion

///////////////////////////////////////
// #region Inheritance Between "Classes": Constructor Functions

// const Person = function (firstName, birthYear) {
//   this.firstName = firstName;
//   this.birthYear = birthYear;
// };

// Person.prototype.calculateAge = function () {
//   console.log(
//     `${this.firstName} is ${new Date().getFullYear() - this.birthYear} old.`
//   );
// };

// const Student = function (firstName, birthYear, course) {
//   Person.call(this, firstName, birthYear);
//   this.course = course;
// };

// // Linking prototypes
// Student.prototype = Object.create(Person.prototype);

// Student.prototype.introduce = function () {
//   console.log(`My name is ${this.firstName} and I study ${this.course}.`);
// };

// const mike = new Student('Mike', 1985, 'Computer Science');
// mike.introduce();
// mike.calculateAge();

// console.log(mike.__proto__);
// console.log(mike.__proto__.__proto__);

// console.log(mike instanceof Person);
// console.log(mike instanceof Student);
// console.log(mike instanceof Object);

// Student.prototype.constructor = Student;
// console.dir(Student.prototype.constructor);

// #endregion

///////////////////////////////////////
// #region Coding Challenge #3

/*
1. Use a constructor function to implement an Electric Car (called EV) as a CHILD "class" of Car. Besides a make and current speed, the EV also has the current battery charge in % ('charge' property);
2. Implement a 'chargeBattery' method which takes an argument 'chargeTo' and sets the battery charge to 'chargeTo';
3. Implement an 'accelerate' method that will increase the car's speed by 20, and decrease the charge by 1%. Then log a message like this: 'Tesla going at 140 km/h, with a charge of 22%';
4. Create an electric car object and experiment with calling 'accelerate', 'brake' and 'chargeBattery' (charge to 90%). Notice what happens when you 'accelerate'! HINT: Review the definiton of polymorphism 😉

DATA CAR 1: 'Tesla' going at 120 km/h, with a charge of 23%
*/

// const Car = function (make, speed) {
//   this.make = make;
//   this.speed = speed;
// };

// Car.prototype.accelerate = function () {
//   this.speed += 10;
//   console.log(`${this.make} is going at ${this.speed} km/h`);
// };

// Car.prototype.brake = function () {
//   this.speed -= 5;
//   console.log(`${this.make} is going at ${this.speed} km/h`);
// };

// const EV = function (make, speed, charge) {
//   Car.call(this, make, speed);
//   this.charge = charge;
// };

// // Link the prototypes
// EV.prototype = Object.create(Car.prototype);

// EV.prototype.chargeTo = function (chargeTo) {
//   this.charge = chargeTo;
// };

// EV.prototype.accelerate = function () {
//   this.speed += 20;
//   this.charge--;
//   console.log(
//     `${this.make} is going at ${this.speed} km/h, with a charge of ${this.charge}%`
//   );
// };

// const tesla = new EV('Tesla', 120, 23);
// tesla.accelerate();
// console.log(tesla);
// tesla.brake();
// tesla.accelerate();

// console.log(tesla instanceof Car);
// console.log(tesla instanceof EV);
// console.log(tesla instanceof Object);

// #endregion

///////////////////////////////////////
// #region Inheritance Between "Classes": ES6 Classes
// class PersonCl {
//   constructor(fullName, birthYear) {
//     this.fullName = fullName;
//     this.birthYear = birthYear;
//   }

//   // Instance methods
//   calculateAge() {
//     console.log(
//       `You are ${new Date().getFullYear() - this.birthYear} years old.`
//     );
//   }

//   greet() {
//     console.log(`Hello ${this.fullName} 👋`);
//   }

//   get age() {
//     return this.age;
//   }

//   set fullName(name) {
//     if (name.includes(' ')) this._fullName = name;
//     else alert(`${name} is not a full name!`);
//   }

//   get fullName() {
//     return this._fullName;
//   }

//   // Static method
//   static hey() {
//     console.log('Hey there 👋');
//   }
// }

// class Student extends PersonCl {
//   constructor(fullName, birthYear, course) {
//     super(fullName, birthYear);
//     this.course = course;
//   }

//   introduce() {
//     console.log(`My name is ${this.fullName} and I study ${this.course}.`);
//   }

//   // Override
//   calculateAge() {
//     console.log(
//       `I'm ${
//         new Date().getFullYear() - this.birthYear
//       } years old, but as a student I feel more like ${
//         new Date().getFullYear() - this.birthYear - 10
//       }`
//     );
//   }
// }

// const mike = new Student('Mike MacKenzie', 1979, 'Computer Science');
// mike.introduce();
// mike.calculateAge();

// console.log(mike.__proto__);
// console.log(mike.__proto__.__proto__);

// console.log(mike instanceof PersonCl);
// console.log(mike instanceof Student);
// console.log(mike instanceof Object);

// Student.prototype.constructor = Student;
// console.dir(Student.prototype.constructor);

// #endregion

///////////////////////////////////////
// #region Inheritance Between "Classes": Object.create
// const PersonProto = {
//   calculateAge() {
//     console.log(
//       `Name: ${this.firstName}, age: ${
//         new Date().getFullYear() - this.birthYear
//       }`
//     );
//   },

//   init(firstName, birthYear) {
//     this.firstName = firstName;
//     this.birthYear = birthYear;
//   },
// };

// const mike = Object.create(PersonProto);

// const StudentProto = Object.create(PersonProto);
// StudentProto.init = function (firstName, birthYear, course) {
//   PersonProto.init.call(this, firstName, birthYear);
//   this.course = course;
// };

// StudentProto.introduce = function () {
//   console.log(`My name is ${this.firstName} and I study ${this.course}.`);
// };

// const carol = Object.create(StudentProto);
// carol.init('Carol', 1988, 'Computer Science');
// carol.introduce();
// carol.calculateAge();

// #endregion

///////////////////////////////////////
// #region
// // Encapsulation: Protected Properties and Methods
// // Encapsulation: Private Class Fields and Methods
// // 1) Public fields
// // 2) Private fields
// // 3) Public methods
// // 4) Private methods
// // (there is also the static version)

// class Account {
//   // 1) Public fields (instances)
//   //   locale = navigator.language;
//   locale = 'fi-FI';

//   // 2) Private fields (instances)
//   #movements = [];
//   #pin;

//   constructor(owner, currency, pin) {
//     this.owner = owner;
//     this.currency = currency;
//     // Protected property
//     this.#pin = pin;
//     // this._movements = [];
//     // this.locale = 'fi-FI';

//     console.log(`Thanks for opening account ${owner}`);
//   }

//   // 3) Public methods
//   // Public interface
//   getMovements() {
//     return this.#movements;
//   }

//   deposit(value) {
//     this.#movements.push(value);
//     return this;
//   }

//   withdraw(value) {
//     this.deposit(-value);
//     return this;
//   }

//   requestLoan(value) {
//     if (this._approveLoan(value)) {
//       this.deposit(value);
//       console.log('Loan approved');
//       return this;
//     }
//   }

//   balance() {
//     const balance = this.#movements.reduce((mov, curr) => mov + curr, 0);
//     console.log(
//       `Account balance: ${Intl.NumberFormat(this.locale, {
//         style: 'currency',
//         currency: this.currency,
//       }).format(balance)}`
//     );
//   }

//   static helper() {
//     console.log('Helper');
//   }

//   // 4) Private methods
//   //   #approveLoan(value) {
//   _approveLoan(value) {
//     return true;
//   }
// }

// const acc1 = new Account('Chuck', 'EUR', 1111);
// // acc1.movements.push(value);
// // acc1.movements.push(value);
// acc1.deposit(250);
// acc1.withdraw(120);
// acc1.requestLoan(1000);
// console.log(acc1.getMovements());
// console.log(acc1);
// // Account.helper();

// // console.log(acc1.#movements);
// // console.log(acc1.#pin);
// // console.log(acc1.#approveLoan(100));
// // acc1.balance();

// // Chaining
// const acc2 = new Account('Mike', 'EUR', 2222);
// acc2
//   .deposit(415)
//   .deposit(30)
//   .withdraw(230)
//   .requestLoan(15000)
//   .withdraw(1500)
//   .balance();
// console.log(acc2.getMovements());

// #endregion

///////////////////////////////////////
// #region Coding Challenge #4
/*
1. Re-create challenge #3, but this time using ES6 classes: create an 'EVCl' child class of the 'CarCl' class
2. Make the 'charge' property private;
3. Implement the ability to chain the 'accelerate' and 'chargeBattery' methods of this class, and also update the 'brake' method in the 'CarCl' class. They experiment with chining!

DATA CAR 1: 'Rivian' going at 120 km/h, with a charge of 23%
*/

// class CarCl {
//   constructor(make, speed) {
//     this.make = make;
//     this.speed = speed;
//   }

//   accelerate() {
//     this.speed += 10;
//     console.log(`${this.make} is going at ${this.speed} km/h`);
//   }

//   brake() {
//     this.speed -= 5;
//     console.log(`${this.make} is going at ${this.speed} km/h`);
//     return this;
//   }

//   get speedUS() {
//     return this.speed / 1.6;
//   }
//   set speedUS(speed) {
//     this.speed = speed * 1.6;
//   }
// }

// class EVCl extends CarCl {
//   #charge;

//   constructor(make, speed, charge) {
//     super(make, speed);
//     this.#charge = charge;
//   }

//   chargeBattery(chargeTo) {
//     this.#charge = chargeTo;
//     return this;
//   }

//   accelerate() {
//     this.speed += 20;
//     this.#charge--;
//     console.log(
//       `${this.make} is going at ${this.speed} km/h, with a charge of ${
//         this.#charge
//       }%`
//     );
//     return this;
//   }
// }

// const rivian = new EVCl('Rivian', 120, 23);
// console.log(rivian);
// // console.log(rivian.#charge);
// rivian
//   .accelerate()
//   .accelerate()
//   .accelerate()
//   .brake()
//   .chargeBattery(50)
//   .accelerate();
// console.log(rivian.speedUS);

// #endregion
