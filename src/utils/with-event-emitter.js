import EventEmitter from './EventEmitter';

export default (target) => (
  class extends target {
    constructor(...args) {
      super(...args);
      this.eventEmitter = new EventEmitter();
    }

    emit(eventName, data) {
      if (super.emit) super.emit(eventName, data);
      if (!this.eventEmitter) return;
      this.eventEmitter.emit(eventName, data);
    }

    subscribe(eventName, fn) {
      if (super.subscribe) super.subscribe(eventName, fn);
      return this.eventEmitter.subscribe(eventName, fn);
    }

    on(eventName, fn) {
      return this.subscribe(eventName, fn);
    }
  }
);
