console.log('Exporting module');

// // First executed (blocking code)
// console.log('Start fetching users');
// const res = await fetch('https://jsonplaceholder.typicode.com/users');
// const data = await res.json();
// console.log(`${data.length} users total`);
// console.log('Finish fetching users');

export const shippingCost = 10;
export const cart = [];

export const totalSumOfCart = numArray =>
  numArray.reduce((acc, curr) => acc + curr, 0);

export const addToCart = function (item, quantity) {
  cart.push({ item, quantity });

  console.log(
    `${quantity} ${item}${quantity > 1 ? `s` : ''} added to shopping cart.`
  );
};

const totalPrice = 115;
const totalQuantity = 23;

export { totalPrice, totalQuantity as tq };

export default function (item, quantity) {
  cart.push({ item, quantity });

  console.log(
    `${quantity} ${item}${quantity > 1 ? `s` : ''} added to shopping cart.`
  );
}
