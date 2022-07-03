export class Workout {
  id = uuid.v4();
  date = new Date();
  description;
  clicks = 0;
  constructor(distance, duration, coords) {
    this.distance = distance; //km
    this.duration = duration; //min
    this.coords = coords; // [lat ,long]
  }
  _setDescriprion() {
    // prettier-ignore
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${
      months[this.date.getMonth()]
    } ${this.date.getDate()}`;
  }
}
