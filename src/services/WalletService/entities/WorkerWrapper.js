/* eslint-disable no-console */
let requestId = 0;

class WorkerWrapper {
    worker;

    stack = {};

    constructor(worker) {
      this.worker = worker;
      this._listen();
    }

    send(data) {
      const { worker, stack } = this;
      requestId += 1;
      const id = requestId;
      const request = {
        id,
        payload: data,
      };
      worker.postMessage(request);
      return new Promise((resolve) => {
        stack[id] = (response) => {
          stack[id] = undefined;
          return resolve(response);
        };
      });
    }

    _listen() {
      const { worker } = this;
      worker.addEventListener('message', this._handleMessage.bind(this));
    }

    _handleMessage(event) {
      const { stack } = this;
      const { id, payload, error } = event.data;
      if (!stack[id] || !(typeof stack[id] === 'function')) return;
      if (error) {
        throw new Error(error);
      }
      stack[id](payload);
    }
}

export default WorkerWrapper;
