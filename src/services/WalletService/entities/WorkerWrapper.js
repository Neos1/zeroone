let requestId = 0;

/**  Wrapper class for Workers */
class WorkerWrapper {
    worker;

    stack = {};
    /**
     * @constructor
     * @param {function} worker instance of worker, which will be used
     */

    constructor(worker) {
      this.worker = worker;
      this._listen();
    }

    /**
     * sends Data in worker
     * @function
     * @param {object} data data for worker
     * @return {Promise} promise, which resolves with worker message
     */
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
