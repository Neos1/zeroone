class EventEmitter {
  constructor() {
    this.events = {};
  }

  emit(event, data) {
    if (!this.events[event]) return;
    this.events[event].forEach((callback) => callback(data));
  }

  subscribe(event, callback) {
    if (!this.events[event]) this.events[event] = [];
    this.events[event].push(callback);
  }
}

const eventEmitter = new EventEmitter();
export default eventEmitter;
