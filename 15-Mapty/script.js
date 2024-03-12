'use strict';

class Workout {
  date = new Date();
  id = (Date.now() + '').slice(-10);
  clicks = 0;

  constructor(coords, distance, duration) {
    this.coords = coords; // [lat, lng]
    this.distance = distance; // in km
    this.duration = duration; // in min
  }

  _setDescription() {
    // prettier-ignore
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${
      months[this.date.getMonth()]
    } ${this.date.getDate()}`;
  }

  click() {
    this.clicks++;
  }
}

class Running extends Workout {
  type = 'running';

  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this.calcPace();
    this._setDescription();
  }

  calcPace() {
    // min/km
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}

class Cycling extends Workout {
  type = 'cycling';

  constructor(coords, distance, duration, elevationGain) {
    super(coords, distance, duration);
    this.elevationGain = elevationGain;
    // this.type = 'cycling';
    this.calcSpeed();
    this._setDescription();
  }

  calcSpeed() {
    // km/h
    this.speed = this.distance / (this.duration / 60);
    return this.speed;
  }
}

// const run1 = new Running([60.24, 25.254], 5.2, 24, 178);
// const cycling1 = new Cycling([60.1, 25.1], 27, 95, 523);
// console.log(run1, cycling1);

///////////////////////////////////////
// APPLICATION ARCHITECTURE
const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');
// const runningTotalKm = document.getElementById('run__kms');
// const runningTotalMin = document.getElementById('run__mins');
// const runningAvgPace = document.getElementById('avg__page');
// const cyclingTotalKm = document.getElementById('cyc__kms');
// const cyclingTotalMin = document.getElementById('cyc__mins');
// const cyclingAvgSpeed = document.getElementById('avg__speed');

class App {
  #map;
  #mapEvent;
  #mapZoomLevel = 13;
  #workouts = [];
  //   #adresses = [];

  constructor() {
    // Get user's position
    this._getPosition();

    // Get data from local storage
    this._getLocalStorage();

    form.addEventListener('submit', this._newWorkout.bind(this));
    inputType.addEventListener('change', this._toggleElevationField);
    containerWorkouts.addEventListener('click', this._moveToPopup.bind(this));
    // this._countTotalWorkoutDistance();
  }

  _getPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),
        function () {
          alert(`Couldn't track your current position`);
        }
      );
    }
  }

  _loadMap(position) {
    const { latitude, longitude } = position.coords;
    const coords = [latitude, longitude];
    // console.log(latitude, longitude);
    // console.log(`https://www.google.pt/maps/@${latitude},${longitude}`);
    // console.log(this);

    // // Reverse geocoding to get address from coordinates
    // fetch(
    //   `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
    // )
    //   .then(response => response.json())
    //   .then(data => {
    //     const { display_name } = data;
    //     const address = display_name || 'Unknown Location';

    //     // Update HTML element with address
    //     document.querySelector(
    //       '.location'
    //     ).textContent = `Location: ${address}`;
    //     this.#adresses.push(address);
    //     console.log(address);
    //   })
    //   .catch(error => {
    //     console.error('Error fetching address:', error);
    //   });

    this.#map = L.map('map').setView(coords, this.#mapZoomLevel);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(this.#map);

    // handling clicks on map
    this.#map.on('click', this._showForm.bind(this));

    this.#workouts.forEach(work => {
      this._renderWorkoutMarker(work);
    });
  }

  _showForm(mapE) {
    this.#mapEvent = mapE;
    form.classList.remove('hidden');
    inputDistance.focus();
  }

  _hideForm() {
    // Empty inputs
    inputDistance.value =
      inputDuration.value =
      inputCadence.value =
      inputElevation.value =
        '';

    form.style.display = 'none';
    form.classList.add('hidden');
    setTimeout(() => (form.style.display = 'grid'), 1000);
  }

  _toggleElevationField() {
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  }

  _newWorkout(event) {
    event.preventDefault();

    const validInputs = (...inputs) =>
      inputs.every(input => Number.isFinite(input));
    const allPositive = (...inputs) => inputs.every(input => input > 0);

    // Get data from form
    const type = inputType.value;
    const distance = +inputDistance.value; //Number(inputDistance.value)
    const duration = +inputDuration.value;
    const { lat, lng } = this.#mapEvent.latlng;
    let workout;

    // If workout running, create running object
    if (type === 'running') {
      const cadence = +inputCadence.value;

      // Check if data is valid
      if (
        // !Number.isFinite(distance) ||
        // !Number.isFinite(duration) ||
        // !Number.isFinite(cadence)
        !validInputs(distance, duration, cadence) ||
        !allPositive(distance, duration, cadence)
      )
        return alert('Inputs have to be positive numbers!');

      workout = new Running([lat, lng], distance, duration, cadence);
    }

    // If workout cycling, create cycling object
    if (type === 'cycling') {
      const elevation = +inputElevation.value;

      if (
        !validInputs(distance, duration, elevation) ||
        !allPositive(distance, duration)
      )
        return alert('Inputs have to be positive numbers!');

      workout = new Cycling([lat, lng], distance, duration, elevation);
    }

    // console.log(workout);
    // Add data to new array
    this.#workouts.push(workout);

    // // Show adressess
    // this.#adresses.forEach(addr => {
    //   console.log(addr);
    // });

    // Render workout on map as marker
    this._renderWorkoutMarker(workout);

    // Render workout on list
    this._renderWorkout(workout);

    // Clear inputs and hide form
    this._hideForm();

    // Set local storage to all workouts
    this._setLocalStorage();

    // // Count distances
    // this._countTotalWorkoutDistance();
  }

  _renderWorkoutMarker(workout) {
    L.marker(workout.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 200,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${workout.type}-popup`,
        })
      )
      .setPopupContent(
        `${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'} ${workout.description}`
      )
      .openPopup();
  }

  _renderWorkout(workout) {
    let html = `
      <li class="workout workout--${workout.type}" data-id="${workout.id}">
        <h2 class="workout__title">${workout.description}</h2>
        <div class="workout__details">
          <span class="workout__icon">${
            workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'
          }
          </span>
          <span class="workout__value">${workout.distance}</span>
          <span class="workout__unit">km</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">⏱</span>
          <span class="workout__value">${workout.duration}</span>
          <span class="workout__unit">min</span>
        </div>
    `;

    if (workout.type === 'running')
      html += `
        <div class="workout__details">
          <span class="workout__icon">⚡️</span>
          <span class="workout__value">${workout.pace.toFixed(1)}</span>
          <span class="workout__unit">min/km</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">🦶🏼</span>
          <span class="workout__value">${workout.cadence}</span>
          <span class="workout__unit">spm</span>
        </div>
    </li>
        `;

    if (workout.type === 'cycling')
      html += `
        <div class="workout__details">
          <span class="workout__icon">⚡️</span>
          <span class="workout__value">${workout.speed.toFixed(1)}</span>
          <span class="workout__unit">km/h</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">⛰</span>
          <span class="workout__value">${workout.elevationGain}</span>
          <span class="workout__unit">m</span>
        </div>
      </li>
        `;

    form.insertAdjacentHTML('afterend', html);
  }

  _countTotalWorkoutDistance() {
    if (!this.#workouts || this.#workouts.length === 0) {
      return;
    }

    const countTotalKms = workoutType =>
      this.#workouts
        .filter(work => work.type === workoutType)
        .map(work => work.distance)
        .reduce((acc, curr) => acc + curr, 0);

    const countTotalMinutes = workoutType =>
      this.#workouts
        .filter(work => work.type === workoutType)
        .map(work => work.duration)
        .reduce((acc, curr) => acc + curr, 0);

    const setElementDisplay = function (number, elem) {
      isNaN(number)
        ? (elem.style.display = 'none')
        : (elem.style.display = 'inline');
    };

    const totalRunningKms = countTotalKms('running');
    const totalRunningMinutes = countTotalMinutes('running');
    const totalCyclingKms = countTotalKms('cycling');
    const totalCyclingMinutes = countTotalMinutes('cycling');
    const runningAveragePace = +(totalRunningMinutes / totalRunningKms).toFixed(
      1
    );
    const cyclingAverageSpeed = +(
      totalCyclingKms /
      (totalCyclingMinutes / 60)
    ).toFixed(1);

    setElementDisplay(runningAveragePace, runningAvgPace);
    setElementDisplay(cyclingAverageSpeed, cyclingAvgSpeed);

    runningTotalKm.textContent = `Total 🏃‍♂️:  ${totalRunningKms} (km)`;
    runningTotalMin.textContent = `Total 🏃‍♂️: ${totalRunningMinutes} (min)`;
    runningAvgPace.textContent = `Total 🏃‍♂️ avg pace: ${runningAveragePace} (min/km)`;
    cyclingTotalKm.textContent = `Total 🚴‍♀️:  ${totalCyclingKms} (km)`;
    cyclingTotalMin.textContent = `Total 🚴‍♀️: ${totalCyclingMinutes} (min)`;
    cyclingAvgSpeed.textContent = `Total 🚴‍♀️ avg speed: ${cyclingAverageSpeed} (km/h)`;
  }

  _moveToPopup(event) {
    // BUGFIX: When we click on a workout before the map has loaded, we get an error. But there is an easy fix:
    if (!this.#map) return;

    const workoutElem = event.target.closest('.workout');
    if (!workoutElem) return;

    const workout = this.#workouts.find(
      work => work.id === workoutElem.dataset.id
    );

    this.#map.setView(workout.coords, this.#mapZoomLevel, {
      animate: true,
      pan: {
        duration: 1,
      },
    });

    // using the public interface
    // workout.click();
  }

  _setLocalStorage() {
    localStorage.setItem('workouts', JSON.stringify(this.#workouts));
  }

  _getLocalStorage() {
    const data = JSON.parse(localStorage.getItem('workouts'));
    // console.log(data);
    if (!data) return;

    this.#workouts = data;

    this.#workouts.forEach(work => {
      this._renderWorkout(work);
    });
  }

  reset() {
    localStorage.removeItem('workouts');
    location.reload();
    // this.#adresses = [];
  }
}

const app = new App();
