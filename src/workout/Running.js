import { Workout } from './Workout.js';
export class Running extends Workout {
  type = 'running';
  constructor(distance, duration, coords, cadence) {
    super(distance, duration, coords);
    this.cadence = cadence; // step/min
    this._clacPace();
    this._setDescriprion();
  }
  _clacPace() {
    /* pace is simply a measurement where you answer the question how long it takes to cover particular distance and it is used for running
     */
    // min/km
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}
