/**
 * Class for calling cb by interval
 */
class AsyncInterval {
  /** Updating is disabled */
  disabled = false;

  /** Timeout timer id */
  timerId;

  /** Interval update period */
  timeoutInterval;

  /** Callback function for calling by interval */
  cb;

  constructor({
    cb,
    timeoutInterval,
  }) {
    this.cb = cb;
    this.timeoutInterval = timeoutInterval;
    this.start();
  }

  start = async () => {
    if (this.disabled) return;
    await this.cb();
    if (this.disabled) return;
    this.timerId = setTimeout(() => {
      this.start();
    }, this.timeoutInterval);
  }

  cancel = () => {
    this.disabled = true;
    clearTimeout(this.timerId);
  }
}

export default AsyncInterval;
