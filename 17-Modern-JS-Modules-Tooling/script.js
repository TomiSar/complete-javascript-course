///////////////////////////////////////
// #region Exporting and Importing in ES6 Modules

// console.log('Importing module');
// import {
//   addToCart,
//   shippingCost,
//   totalSumOfCart,
//   tq,
//   totalPrice,
// } from './shoppingCart.js';
// console.log(shippingCost);
// const numArray = [1, 3, 5, 7, 9];
// console.log(totalSumOfCart(numArray));

// addToCart('bread', 2);
// addToCart('MacBook', 1);
// console.log(tq, totalPrice);

// import * as ShoppingCart from './shoppingCart.js';

// ShoppingCart.addToCart('bread', 10);
// console.log(ShoppingCart.totalPrice);

// import add, { cart } from './shoppingCart.js';
// add('pizza', 4);
// add('cheese', 1);
// add('egg', 2);
// add('pizza', 4);
// add('apple', 3);
// add('bread', 5);
// console.log(cart);

// #endregion

///////////////////////////////////////
// #region Top-Level Await (ES2022)
// https://jsonplaceholder.typicode.com/guide/
// console.log('Start fetching users');
// console.log('Finish fetching users');
// const res = await fetch('https://jsonplaceholder.typicode.com/users');
// const data = await res.json();
// console.log(data);

// const postsUrl = 'https://jsonplaceholder.typicode.com/posts';
// const getPostFromIndex = async function (index) {
//   const res = await fetch(postsUrl);
//   const data = await res.json();
//   console.log(data);
//   return { title: data.at(index).title, body: data.at(index).body };
// };

// const lastPost = await getPostFromIndex(-1);
// // console.log(lastPost);

// // Not Clean
// lastPost.then(lastPost => console.log(lastPost));

// const firstPost = await getPostFromIndex(0);
// console.log(firstPost);

// #endregion

///////////////////////////////////////
// #region The Module Pattern

// const ShoppingCart2 = (function () {
//   const shippingCost = 10;
//   const cart = [];
//   const totalPrice = 115;
//   const totalQuantity = 23;
//   const orders = [];

//   const addToCart = function (item, quantity) {
//     cart.push({ item, quantity });

//     console.log(
//       `${quantity} ${item}${
//         quantity > 1 ? `s` : ''
//       } added to shopping cart (shipping cost${shippingCost}).`
//     );
//   };

//   const orderStock = function (item, quantity) {
//     orders.push({ item, quantity });
//     console.log(`${quantity} ${item} ordered from supplier`);
//   };
//   return { addToCart, cart, totalPrice, totalQuantity, orderStock, orders };
// })();

// ShoppingCart2.addToCart('pizza', 4);
// ShoppingCart2.addToCart('apples', 3);
// ShoppingCart2.addToCart('bread', 5);
// ShoppingCart2.orderStock('McbBook Pro', 5);

// console.log(ShoppingCart2);
// console.log(ShoppingCart2.shippingCost);

// #endregion

///////////////////////////////////////
// #region CommonJS Modules
// Export
// export const addToCart = function (item, quantity) {
//   cart.push({ item, quantity });

//   console.log(
//     `${quantity} ${item}${
//       quantity > 1 ? `s` : ''
//     } added to shopping cart (shipping cost${shippingCost}).`
//   );
// };

// const { addToCart } = require('./shoppingCart.js');

// #endregion

///////////////////////////////////////
// #region Introduction to NPM
// import cloneDeep from './node_modules/lodash-es/cloneDeep.js';

// const state = {
//   cart: [
//     { product: 'hamburger', quantity: 5 },
//     { product: 'pizza', quantity: 5 },
//   ],
//   user: { loggedIn: true },
// };

// cloneDeep;
// const stateClone = Object.assign({}, state);
// const stateDeepClone = cloneDeep(state);
// state.user.loggedIn = false;
// console.log(stateClone);
// console.log(stateDeepClone);

// if (module.hot) {
//   module.hot.accept();
// }

// class Person {
//   #greeting = 'Hello';
//   constructor(firstName) {
//     this.firstName = firstName;
//     console.log(`${this.#greeting} ${this.firstName} !!`);
//   }
// }

// const chuck = new Person('Chuck');
// console.log('Chuck' ?? null);

// console.log(cart.find(el => el.quantity >= 2));
// Promise.resolve('TEST').then(x => console.log(x));

// import 'core-js/stable';
// // import 'core-js/stable/array/find';
// // import 'core-js/stable/promise';

// // Polifilling async functions
// import 'regenerator-runtime/runtime';

// const cartItemsFiltered = cart.map(item => ({
//   ...item,
//   quantity: Math.max(item.quantity, 4),
//   //   quantity: item.quantity >= 4 ? item.quantity : 4,
// }));

// const cartItems1 = cart.filter(item => item.quantity >= 4);
// console.log(cartItems1);
// const cart2 = [...cartItemsFiltered];
// console.log(cartItemsFiltered);
// const cartItems2 = cart2.filter(item => item.quantity === 4);
// const uniqueCartItems = new Set(cartItems2);
// const uniqueCartItemsArray = [...uniqueCartItems];
// console.log(uniqueCartItemsArray);

// #endregion
