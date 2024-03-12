'use strict';

// https://github.com/public-apis/public-apis
const API_KEY = '395463436969012795521x85094';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderCountry = function (data, className = '') {
  const html = `
    <article class="country ${className}">
      <img class="country__img" src="${data.flag}" />
      <div class="country__data">
        <h3 class="country__name">${data.name}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>🏙️</span>${data.capital}</p>
        <p class="country__row"><span>👫</span>${(
          +data.population / 1000000
        ).toFixed(1)}M people</p>
        <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
        <p class="country__row"><span>💰</span>${data.currencies[0].code} (${
    data.currencies[0].symbol
  })</p>
      </div>
    </article>
    `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

// Helper functions
const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
};

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

    return response.json();
  });
};

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    // navigator.geolocation.getCurrentPosition(
    //   position => resolve(position),
    //   err => reject(err)
    // );
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

// Reverse geocoding
const fetchReverseGeocodingData = async function (lat, lng) {
  return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json&auth=${API_KEY}`);
};

// Country data
const fetchCountryData = async function (country) {
  return fetch(
    `https://countries-api-836d.onrender.com/countries/name/${country}`
  );
};

///////////////////////////////////////
// #region Our First AJAX Call: XMLHttpRequest
// const getCountryData = function (country) {
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//   request.send();

//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);

//     const name = data.name.common;
//     const flag = data.flags.svg;
//     const region = data.region;
//     const language = Object.values(data.languages)[0];
//     const currency = Object.values(data.currencies)[0].name;

//     const html = `
//   <article class="country">
//     <img class="country__img" src="${flag}" />
//     <div class="country__data">
//       <h3 class="country__name">${name}</h3>
//       <h4 class="country__region">${region}</h4>
//       <p class="country__row"><span>👫</span>${(
//         +data.population / 1000000
//       ).toFixed(1)} people</p>
//       <p class="country__row"><span>🗣️</span>${language}</p>
//       <p class="country__row"><span>💰</span>${currency}</p>
//     </div>
//   </article>
//   `;
//     countriesContainer.insertAdjacentHTML('beforeend', html);
//     countriesContainer.style.opacity = 1;
//   });
// };

// getCountryData('portugal');
// getCountryData('usa');
// getCountryData('germany');
// getCountryData('peru');

// #endregion

///////////////////////////////////////
// #region Welcome to Callback Hell
// const renderCountry = function (data, className = '') {
//   const population = +(data.population / 1000000).toFixed(2);

//   const html = `
//     <article class="country ${className}">
//       <img class="country__img" src="${data.flags.png}" />
//         <div class="country__data">
//             <h3 class="country__name">${data.name}</h3>
//             <p class="country__row"><span>🏙️ ${data.capital}</span></p>
//             <h4 class="country__region">${data.region}</h4>
//             <p class="country__row"><span>👫</span>${population}M</p>
//             <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
//             <p class="country__row"><span>💰</span>${data.currencies[0].code} (${data.currencies[0].symbol})</p>
//         </div>
//     </article>
//     `;

//   countriesContainer.insertAdjacentHTML('beforeend', html);
//   countriesContainer.style.opacity = 1;
// };

// const getCountryAndNeighbour = function (country) {
//   const request1 = new XMLHttpRequest();
//   request1.open(
//     'GET',
//     `https://countries-api-836d.onrender.com/countries/name/${country}`
//   );
//   request1.send();

//   request1.addEventListener('load', function () {
//     const [data1] = JSON.parse(this.responseText);
//     console.log(data1);

//     // Render country 1
//     renderCountry(data1);

//     // Get neighbour country 2
//     const [neighbour] = data1.borders;

//     if (!neighbour) return;

//     // AJAX call country 2
//     const request2 = new XMLHttpRequest();
//     request2.open(
//       'GET',
//       `https://countries-api-836d.onrender.com/countries/alpha/${neighbour}`
//     );
//     request2.send();

//     request2.addEventListener('load', function () {
//       const data2 = JSON.parse(this.responseText);
//       console.log(data2);

//       // Render country 2
//       renderCountry(data2, 'neighbour');
//     });
//   });
// };

// // getCountryAndNeighbour('finland');
// // getCountryAndNeighbour('portugal');
// getCountryAndNeighbour('usa');

// setTimeout(() => {
//   console.log('1 second passed');
//   setTimeout(() => {
//     console.log('2 seconds passed');
//     setTimeout(() => {
//       console.log('3 seconds passed');
//       setTimeout(() => {
//         console.log('4 seconds passed');
//         setTimeout(() => {
//           console.log('5 seconds passed');
//         }, 1000);
//       }, 1000);
//     }, 1000);
//   }, 1000);
// }, 1000);

// #endregion

///////////////////////////////////////
// #region Consuming Promises, Chaining Promises, Handling Rejected Promises and Throwing Errors Manually

// // console log
// const getCountryData = function (country) {
//   fetch(`https://countries-api-836d.onrender.com/countries/name/${country}`)
//     .then(function (response) {
//       console.log(response);
//       return response.json();
//     })
//     .then(function (data) {
//       console.log(data);
//       renderCountry(data[0]);
//     });
// };

// // Chaining Promises
// const getCountryData = function (country) {
//   // Country 1
//   fetch(`https://countries-api-836d.onrender.com/countries/name/${country}`)
//     .then(response => response.json())
//     .then(data => {
//       renderCountry(data[0]);

//       const neighbour = data[0].borders[0];
//       if (!neighbour) return;

//       // Country 2
//       return fetch(
//         `https://countries-api-836d.onrender.com/countries/alpha/${neighbour}`
//       );
//     })
//     .then(response => response.json())
//     .then(data => renderCountry(data, 'neighbour'));
// };

// // Handling Rejected Promises and Throwing Errors Manually
// const getCountryData = function (country) {
//   // Country 1
//   fetch(`https://countries-api-836d.onrender.com/countries/name/${country}`)
//     .then(response => {
//       //   console.log(response);
//       if (!response.ok)
//         throw new Error(`Country not found (${response.status})`);
//       return response.json();
//     })
//     .then(data => {
//       renderCountry(data[0]);

//       const neighbour = data[0].borders[0];
//       if (!neighbour) return;

//       // Country 2
//       return fetch(
//         `https://countries-api-836d.onrender.com/countries/alpha/${neighbour}`
//       );
//     })
//     .then(response => {
//       //   console.log(response);
//       if (!response.ok)
//         throw new Error(`Country not found (${response.status})`);
//       return response.json();
//     })
//     .then(data => renderCountry(data, 'neighbour'))
//     .catch(err => {
//       console.error(`${err.status} 💥💥💥`);
//       renderError(`${err.message} 💥💥. Try again!`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

// // Using dynamic error messages
// const getCountryData = function (country) {
//   // Country 1
//   getJSON(
//     `https://countries-api-836d.onrender.com/countries/name/${country}`,
//     'Country not found'
//   )
//     .then(data => {
//       renderCountry(data[0]);

//       //   const neighbour = 'asdfasdf';
//       const neighbour = data[0].borders[0];
//       if (!neighbour)
//         throw new Error(`Neighbour country of ${data[0].name} was not found`);

//       // Country 2
//       return getJSON(
//         `https://countries-api-836d.onrender.com/countries/alpha/${neighbour}`,
//         'Neighbour country not found'
//       );
//     })
//     .then(data => renderCountry(data, 'neighbour'))
//     .catch(err => {
//       console.error(`${err.status} 💥💥💥`);
//       renderError(`${err.message} 💥💥. Try again!`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

// btn.addEventListener('click', function () {
//   getCountryData('portugal');
// });

// #endregion

///////////////////////////////////////
// #region Coding Challenge #1
/* 
In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. For that, you will use a second API to geocode coordinates.

Here are your tasks:

PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng) (these are GPS coordinates, examples are below).
2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. Use this API to do reverse geocoding: https://geocode.xyz/api.
The AJAX call will be done to a URL with this format: https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and promises to get the data. Do NOT use the getJSON function we created, that is cheating 😉
3. Once you have the data, take a look at it in the console to see all the attributes that you recieved about the provided location. Then, using this data, log a messsage like this to the console: 'You are in Berlin, Germany'
4. Chain a .catch method to the end of the promise chain and log errors to the console
5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. This is an error with the request. Remember, fetch() does NOT reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message.

PART 2
6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using.
7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to type the same code)

TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
TEST COORDINATES 2: 19.037, 72.873
TEST COORDINATES 2: -33.933, 18.474
*/

//https://countries-api-836d.onrender.com/countries/name/${country}
//https://geocode.xyz/52.508,13.381?geoit=json

// const whereAmI = function (lat, lng) {
//   fetch(`https://geocode.xyz/${lat},${lng}?geoit=json&auth=${API_KEY}`)
//     .then(res => {
//       if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`);
//       return res.json();
//     })
//     .then(data => {
//       //   console.log(data);
//       //   console.log(`Your location ${data.city} ${data.country}`);
//       return fetch(
//         `https://countries-api-836d.onrender.com/countries/name/${data.country}`
//       );
//     })
//     .then(res => {
//       if (!res.ok) throw new Error(`Country not found ${res.status}`);
//       return res.json();
//     })
//     .then(data => renderCountry(data[0]))
//     .catch(err => console.error(`${err.message} 💥`));
// };

// whereAmI(60.2323576, 24.9282861);
// whereAmI(52.508, 13.381);
// whereAmI(64.119824, -21.892299);

// #endregion

///////////////////////////////////////
// #region The Event Loop in Practice
// console.log('Test start');
// setTimeout(() => console.log('0 sec timer'), 0);
// Promise.resolve('Resolved promise 1').then(res => console.log(res));

// Promise.resolve('Resolved promise 2').then(res => {
//   for (let i = 0; i < 100000000; i++) {}
//   console.log(res);
// });

// console.log('Test end');
// #endregion

///////////////////////////////////////
// #region Building a Simple Promise
// const lotteryPromise = new Promise(function (resolve, reject) {
//   console.log('Lotter draw is happening 🔮');
//   setTimeout(function () {
//     if (Math.random() >= 0.5) {
//       resolve('You WIN 💰');
//     } else {
//       reject(new Error('You lost your money 💩'));
//     }
//   }, 1000);
// });

// lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

// // Promisifying setTimeout
// const wait = function (seconds) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, seconds * 1000);
//   });
// };

// wait(1)
//   .then(() => {
//     console.log('1 second passed');
//     return wait(1);
//   })
//   .then(() => {
//     console.log('2 second passed');
//     return wait(1);
//   })
//   .then(() => {
//     console.log('3 second passed');
//     return wait(1);
//   })
//   .then(() => console.log('4 second passed'));

// setTimeout(() => {
//   console.log('1 second passed');
//   setTimeout(() => {
//     console.log('2 seconds passed');
//     setTimeout(() => {
//       console.log('3 second passed');
//       setTimeout(() => {
//         console.log('4 second passed');
//       }, 1000);
//     }, 1000);
//   }, 1000);
// }, 1000);

// Promise.resolve('abc').then(x => console.log(x));
// Promise.reject(new Error('Error!')).catch(x => console.error(x));

// #endregion

///////////////////////////////////////
// #region Promisifying the Geolocation API
// getPosition().then(pos => console.log(pos));

// const whereAmI = function () {
//   getPosition()
//     .then(pos => {
//       const { latitude: lat, longitude: lng } = pos.coords;

//       return fetch(
//         `https://geocode.xyz/${lat},${lng}?geoit=json&auth=${API_KEY}`
//       );
//     })
//     .then(res => {
//       if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`);
//       return res.json();
//     })
//     .then(data => {
//       console.log(data);
//       console.log(`You are in ${data.city}, ${data.country}`);

//       return fetch(
//         `https://countries-api-836d.onrender.com/countries/name/${data.country}`
//       );
//     })
//     .then(res => {
//       if (!res.ok) throw new Error(`Country not found (${res.status})`);
//       return res.json();
//     })
//     .then(data => renderCountry(data[0]))
//     .catch(err => console.error(`${err.message} 💥`));
// };

// btn.addEventListener('click', whereAmI);

// #endregion

///////////////////////////////////////
// #region Coding Challenge #2
/* 
Build the image loading functionality that I just showed you on the screen.
Tasks are not super-descriptive this time, so that you can figure out some stuff on your own. Pretend you're working on your own 😉

PART 1
1. Create a function 'createImage' which receives imgPath as an input. This function returns a promise which creates a new image (use document.createElement('img')) and sets the .src attribute to the provided image path. When the image is done loading, append it to the DOM element with the 'images' class, and resolve the promise. The fulfilled value should be the image element itself. In case there is an error loading the image ('error' event), reject the promise.

If this part is too tricky for you, just watch the first part of the solution.

PART 2
2. Comsume the promise using .then and also add an error handler;
3. After the image has loaded, pause execution for 2 seconds using the wait function we created earlier;
4. After the 2 seconds have passed, hide the current image (set display to 'none'), and load a second image (HINT: Use the image element returned by the createImage promise to hide the current image. You will need a global variable for that 😉);
5. After the second image has loaded, pause execution for 2 seconds again;
6. After the 2 seconds have passed, hide the current image.

TEST DATA: Images in the img folder. Test the error handler by passing a wrong image path. Set the network speed to 'Fast 3G' in the dev tools Network tab, otherwise images load too fast.
*/

// const wait = function (seconds, message = '') {
//   return new Promise(function (resolve) {
//     if (message) console.log(message);
//     setTimeout(resolve, seconds * 1000);
//   });
// };

// const imgContainer = document.querySelector('.images');

// const createImage = function (imgPath) {
//   return new Promise(function (resolve, reject) {
//     const img = document.createElement('img');
//     img.src = imgPath;

//     img.addEventListener('load', function () {
//       imgContainer.append(img);
//       resolve(img);
//     });

//     img.addEventListener('error', function () {
//       reject(new Error('Image not found!'));
//     });
//   });
// };

// let currentImg;
// const imagePath = ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg'];

// createImage(imagePath[0])
//   .then(img => {
//     currentImg = img;
//     return wait(2, 'image 1 loaded');
//   })
//   .then(() => {
//     currentImg.style.display = 'none';
//     return createImage(imagePath[1]);
//   })
//   .then(img => {
//     currentImg = img;
//     return wait(2, 'image 2 loaded');
//   })
//   .then(() => {
//     currentImg.style.display = 'none';
//     return createImage(imagePath[2]);
//   })
//   .then(img => {
//     currentImg = img;
//     return wait(2, 'image 3 loaded');
//   })
//   .then(() => {
//     currentImg.style.display = 'none';
//   })
//   .catch(err => console.error(err));

// #endregion

///////////////////////////////////////
// #region Consuming Promises with Async/Await and Error Handling With try...catch
// fetch(`https://countries-api-836d.onrender.com/countries/name/${country}`).then(res => console.log(res))

// const whereAmI = async function () {
//   // Geolocation
//   try {
//     const pos = await getPosition();
//     const { latitude: lat, longitude: lng } = pos.coords;

//     // Reverse geocoding
//     const resGeo = await fetch(
//       `https://geocode.xyz/${lat},${lng}?geoit=json&auth=${API_KEY}`
//     );
//     if (!resGeo.ok) throw new Error('Problem getting location data');

//     const dataGeo = await resGeo.json();
//     console.log(dataGeo);
//     // console.log(`Your current location: ${dataGeo.city} ${dataGeo.country}`);

//     // Country data
//     const res = await fetch(
//       `https://countries-api-836d.onrender.com/countries/name/${dataGeo.country}`
//     );
//     if (!res.ok) throw new Error('Problem getting country');

//     const data = await res.json();
//     renderCountry(data[0]);
//     console.log(data[0]);
//     console.log(
//       `Location: ${data[0].capital} ${data[0].name} (${data[0].region})`
//     );
//   } catch (err) {
//     console.error(`${err} 💥`);
//     renderError(`💥 ${err.message}`);
//   }
// };

// whereAmI();

// try {
//   let y = 1;
//   const x = 2;
//   y = 3;
// } catch (err) {
//   alert(err.message);
// }

// #endregion

///////////////////////////////////////
// #region Returning Values from Async Functions

// const whereAmI = async function () {
//   try {
//     // Geolocation
//     const pos = await getPosition();
//     const { latitude: lat, longitude: lng } = pos.coords;

//     // Reverse geocoding
//     const resGeo = await fetchReverseGeocodingData(lat, lng);
//     if (!resGeo.ok)
//       throw new Error(`Problem fetching location data (${resGeo.status})`);
//     const dataGeo = await resGeo.json();

//     // Country data
//     const res = await fetchCountryData(dataGeo.country);
//     if (!res.ok)
//       throw new Error(`Problem fetching country data (${res.status})`);
//     const data = await res.json();
//     renderCountry(data[0]);

//     return `Location: ${dataGeo.city} ${dataGeo.country}`;
//   } catch (err) {
//     console.error(err);
//     renderError(`${err.message} 💥`);

//     // Reject promise returned from async function
//     throw err;
//   }
// };

// console.log('1. Trying to get location');
// whereAmI()
//   .then(location => console.log(`2: ${location}`))
//   .catch(err => console.error(`2: ${err.message} 💥`))
//   .finally(() => console.log('3. Finished getting location'));

// // Self-Invoking Function
// (async function () {
//   console.log('1. Trying to get location');
//   try {
//     const location = await whereAmI();
//     console.log(`2: ${location}`);
//   } catch (err) {
//     console.error(`2: ${err.message} 💥`);
//   }
//   console.log('3. Finished getting location');
// })();

// #endregion

///////////////////////////////////////
// #region Running Promises in Parallel
// const get3Countries = async function (country1, country2, country3) {
//   try {
//     // const [data1] = await getJSON(
//     //   `https://countries-api-836d.onrender.com/countries/name/${country1}`
//     // );
//     // const [data2] = await getJSON(
//     //   `https://countries-api-836d.onrender.com/countries/name/${country2}`
//     // );
//     // const [data3] = await getJSON(
//     //   `https://countries-api-836d.onrender.com/countries/name/${country3}`
//     // );
//     // console.log([data1.capital, data2.capital, data3.capital]);

//     const data = await Promise.all([
//       getJSON(
//         `https://countries-api-836d.onrender.com/countries/name/${country1}`
//       ),
//       getJSON(
//         `https://countries-api-836d.onrender.com/countries/name/${country2}`
//       ),
//       getJSON(
//         `https://countries-api-836d.onrender.com/countries/name/${country3}`
//       ),
//     ]);
//     // console.log(data[0]);
//     data.map(d => renderCountry(d[0]));
//     console.log(data.map(d => `Capital of ${d[0].name} is ${d[0].capital}`));
//   } catch (err) {
//     console.error(err);
//   }
// };

// get3Countries('Portugal', 'Canada', 'Tanzania');

// #endregion

///////////////////////////////////////
// #region Other Promise Combinators: race, allSettled and any
// (async function () {
//   const res = await Promise.race([
//     getJSON(`https://countries-api-836d.onrender.com/countries/name/italy`),
//     getJSON(`https://countries-api-836d.onrender.com/countries/name/egypt`),
//     getJSON(`https://countries-api-836d.onrender.com/countries/name/mexico`),
//   ]);

//   // First promise fulfilled is returned
//   console.log(res[0]);
// })();

// const timeout = async function (sec) {
//   return new Promise(function (_, reject) {
//     setTimeout(() => {
//       reject(new Error('Request took too long'));
//     }, sec * 1000);
//   });
// };

// // If promise longer than 1 second to fulfill it's reject with Error
// Promise.race([
//   getJSON(`https://countries-api-836d.onrender.com/countries/name/finland`),
//   timeout(0.5),
// ])
//   .then(res => console.log(res[0]))
//   .catch(err => console.error(err));

// // Promise.allSettled() waits for all input promises to complete, regardless of whether or not one rejects
// Promise.allSettled([
//   Promise.resolve('Success'),
//   Promise.reject('ERROR'),
//   Promise.resolve('Another Success'),
// ]);

// // Promise.all() will reject immediately upon any of the input promises rejecting
// Promise.all([
//   Promise.resolve('Success'),
//   Promise.reject('ERROR'),
//   Promise.resolve('Another Success'),
// ])
//   .then(res => console.log(res))
//   .catch(err => console.error(err));

// // Promise.any() [ES2021] returns a single Promise from a list of promises, when any promise fulfill
// Promise.any([
//   Promise.resolve('Success'),
//   Promise.reject('ERROR'),
//   Promise.resolve('Another Success'),
// ])
//   .then(res => console.log(res))
//   .catch(err => console.error(err));

// #endregion

///////////////////////////////////////
// #region Coding Challenge #3
/* 
PART 1
Write an async function 'loadNPause' that recreates Coding Challenge #2, this time using async/await (only the part where the promise is consumed). Compare the two versions, think about the big differences, and see which one you like more.
Don't forget to test the error handler, and to set the network speed to 'Fast 3G' in the dev tools Network tab.

PART 2
1. Create an async function 'loadAll' that receives an array of image paths 'imgArr';
2. Use .map to loop over the array, to load all the images with the 'createImage' function (call the resulting array 'imgs')
3. Check out the 'imgs' array in the console! Is it like you expected?
4. Use a promise combinator function to actually get the images from the array 😉
5. Add the 'paralell' class to all the images (it has some CSS styles).

TEST DATA: ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']. To test, turn off the 'loadNPause' function.
*/

// const wait = function (seconds, message = '') {
//   return new Promise(function (resolve) {
//     if (message) console.log(message);
//     setTimeout(resolve, seconds * 1000);
//   });
// };

// const imgContainer = document.querySelector('.images');

// const createImage = function (imgPath) {
//   return new Promise(function (resolve, reject) {
//     const img = document.createElement('img');
//     img.src = imgPath;

//     img.addEventListener('load', function () {
//       imgContainer.append(img);
//       resolve(img);
//     });

//     img.addEventListener('error', function () {
//       reject(new Error('Image not found!'));
//     });
//   });
// };

// const imgArr = [
//   'img/img-1.jpg',
//   'img/img-2.jpg',
//   'img/img-3.jpg',
//   'img/img-4.jpg',
// ];

// const loadNPause = async function () {
//   try {
//     // Load Image 1
//     let img = await createImage('img/img-1.jpg');
//     console.log(typeof img);
//     console.log(img);
//     await wait(2, 'Image 1 loaded');
//     img.style.display = 'none';

//     // Load Image 2
//     img = await createImage('img/img-2.jpg');
//     console.log(img);
//     await wait(2, 'Image 2 loaded');
//     img.style.display = 'none';

//     // Load Image 3
//     img = await createImage('img/img-3.jpg');
//     console.log(img);
//     await wait(2, 'Image 3 loaded');
//     img.style.display = 'none';

//     // Load Image 4
//     img = await createImage('img/img-4.jpg');
//     console.log(img);
//     await wait(2, 'Image 4 loaded');
//     img.style.display = 'none';
//   } catch (err) {
//     console.error(err);
//   }
// };

// // When using array
// const loadNPause = async function () {
//   try {
//     for (let i = 0; i < imgArr.length; i++) {
//       let img = await createImage(imgArr[i]);
//       console.log(img);
//       await wait(2, `Image ${imgArr[i]} loaded!`);
//       img.style.display = 'none';
//     }
//   } catch (err) {
//     console.error(err);
//   }
// };
// loadNPause();

// const loadAll = async function (imageArray) {
//   try {
//     const images = imageArray.map(async img => createImage(img));
//     const imageElements = await Promise.all(images);
//     imageElements.forEach(img => img.classList.add('parallel'));
//   } catch (err) {
//     console.error(err);
//   }
// };
// loadAll(imgArr);

// #endregion
