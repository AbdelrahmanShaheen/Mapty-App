'use strict';
import { Running } from './Running.js';
import { Cycling } from './Cycling.js';
///////////////////////////
// APPLICATION ARCHITECTURE
const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');
const inputReset = document.querySelector('.btn--clear-all');

class App {
  #map;
  #mapEvent;
  #workouts = [];
  #markers = [];
  #mapZoomLevel = 14;
  constructor() {
    // Get user's position
    this._getPosition();
    // Get data from local storage
    this._getLocalStorage();
    // Attach event handlers
    inputType.addEventListener('change', this._toggleElevationField);
    form.addEventListener('submit', this._newWorkout.bind(this));
    containerWorkouts.addEventListener('click', this._moveToPopup.bind(this));
    inputReset.addEventListener('click', this.resetLocalStorage.bind(this));
  }
  _getPosition() {
    navigator.geolocation.getCurrentPosition(
      this._loadMap.bind(this),
      function () {
        console.log('Error!');
      }
    );
  }
  _loadMap(position) {
    const { latitude, longitude } = position.coords;
    const coords = [latitude, longitude];
    this.#map = L.map('map').setView(coords, this.#mapZoomLevel);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);
    // Handling clicks on map
    this.#map.on('click', this._showForm.bind(this));
    // Render each workout in the map as marker
    this.#workouts.forEach(workout => this._renderWorkoutMarker(workout));
  }
  _showForm(mapEvent_) {
    this.#mapEvent = mapEvent_;
    form.classList.remove('hidden');
    inputDistance.focus();
  }
  _hideForm() {
    form.style.display = 'none';
    form.classList.add('hidden');
    setTimeout(() => (form.style.display = 'grid'), 1000);
  }
  _toggleElevationField() {
    inputCadence.parentElement.classList.toggle('form__row--hidden');
    inputElevation.parentElement.classList.toggle('form__row--hidden');
  }

  _renderWorkoutMarker(workout) {
    const marker = L.marker(workout.coords);
    this.#markers.push(marker);

    marker
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 150,
          minWidth: 80,
          autoClose: false,
          closeOnClick: false,
          className: `${workout.type}-popup`,
        })
      )
      .setPopupContent(`${workout.description}`)
      .openPopup();
  }
  _moveToPopup(event) {
    const workoutEl = event.target.closest('.workout');
    if (!workoutEl) return;
    const id = workoutEl.dataset.id;
    const workoutObj = this.#workouts.find(workout => workout.id === id);
    if (event.target.classList.contains('workout__delete')) {
      this._deleteWorkout(id);
      return;
    }
    this.#map.setView(workoutObj.coords, this.#mapZoomLevel, {
      animate: true,
      pan: {
        duration: 1,
      },
    });
  }

  _renderWorkout(Workout) {
    const html = `<li class="workout workout--${Workout.type}" data-id=${
      Workout.id
    }>
    <div class = "workoutDesc">
    <h2 >
    <span class="myfirstspan">${Workout.description}</span>
    <span class="workout__delete">🗑</span>
    </h2>
    </div>
    <div class="Cont_Info">
    <div class="workout__details">
      <span class="workout__icon">${
        Workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'
      }</span>
      <span class="workout__value">${Workout.distance}</span>
      <span class="workout__unit">km</span>
    </div>
    <div class="workout__details">
      <span class="workout__icon">⏱</span>
      <span class="workout__value">${Workout.duration}</span>
      <span class="workout__unit">min</span>
    </div>
    <div class="workout__details">
      <span class="workout__icon">⚡️</span>
      <span class="workout__value">${
        Workout.type === 'running'
          ? Workout.pace.toFixed(1)
          : Workout.speed.toFixed(1)
      }</span>
      <span class="workout__unit">${
        Workout.type === 'running' ? 'min/km' : 'km/h'
      }</span>
    </div>
    <div class="workout__details">
      <span class="workout__icon">${
        Workout.type === 'running' ? '🦶🏼' : '⛰'
      }</span>
      <span class="workout__value">${
        Workout.type === 'running' ? Workout.cadence : Workout.elevationGain
      }</span>
      <span class="workout__unit">${
        Workout.type === 'running' ? 'spm' : 'm'
      }</span>
    </div>
    </div>
  </li>`;

    containerWorkouts.insertAdjacentHTML('beforeend', html);
  }
  _setLocalStorage() {
    localStorage.setItem('workouts', JSON.stringify(this.#workouts));
  }
  _getLocalStorage() {
    const data = localStorage.getItem('workouts');
    if (!data) return;
    this.#workouts = JSON.parse(data);
    this.#workouts.forEach(workout => this._renderWorkout(workout));
  }
  resetLocalStorage() {
    localStorage.removeItem('workouts');
    location.reload();
  }
  _newWorkout(event) {
    event.preventDefault();
    //helper functions
    const Numbers = (...inputs) =>
      inputs.every(input => Number.isFinite(input));
    const positiveNumbers = (...inputs) => inputs.every(input => input > 0);
    //.................
    const { lat, lng } = this.#mapEvent.latlng;
    // Get data from form
    const distance = Number(inputDistance.value);
    const duration = Number(inputDuration.value);
    const workoutType = inputType.value;
    let Workout;
    // If workout running, create running object
    if (workoutType === 'running') {
      const cadence = Number(inputCadence.value);
      // Check if data is valid
      if (
        !Numbers(distance, duration, cadence) ||
        !positiveNumbers(distance, duration, cadence)
      )
        return alert(`inputs have to be positive numbers!`);
      Workout = new Running(distance, duration, [lat, lng], cadence);
    }
    // If workout cycling, create cycling object
    if (workoutType === 'cycling') {
      const elevation = Number(inputElevation.value);
      if (
        !Numbers(distance, duration, elevation) ||
        !positiveNumbers(distance, duration)
      )
        return alert(`inputs have to be positive numbers!`);
      Workout = new Cycling(distance, duration, [lat, lng], elevation);
    }
    // Add new object to workout array
    this.#workouts.push(Workout);
    // Render workout on map as marker
    this._renderWorkoutMarker(Workout);
    // Render workout on list
    this._renderWorkout(Workout);
    //clear input form
    inputDistance.value =
      inputDuration.value =
      inputCadence.value =
      inputElevation.value =
        '';
    // Hide form + clear input fields
    this._hideForm();
    //store the data(all workouts) in the local storage
    this._setLocalStorage();
  }
  _deleteWorkout(id) {
    const domEl = document.querySelector(`[data-id="${id}"]`);
    this.#workouts.forEach((workout, index) => {
      if (workout.id === id) {
        this.#workouts.splice(index, 1);
        this.#markers[index].remove();
        this.#markers.splice(index, 1);
      }
    });
    domEl.remove();
    this._setLocalStorage();
  }
}

const mapty = new App();
