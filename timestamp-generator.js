const cron = require("node-cron");

/**
 * A timestamp generator that will generate a timestamp at a specified interval.
 */
class TimestampGenerator {
  /**
   *
   * @param {string} cronExpression a cron expression for the interval for generating the timestamp
   */
  constructor(cronExpression) {
    this.resolves = [];
    cron.schedule(cronExpression, () => {
      this.latestTimestamp = this.generateTimestamp();
      // deliver timestamp for all waiting
      for (let resolve of this.resolves) {
        resolve(this.latestTimestamp);
      }
      this.resolves = [];
    }, {});
  }

  /**
   * Generate a timestamp
   *
   * @return {string} a timestamp representing the current date and time.
   */
  generateTimestamp() {
    return new Date().toISOString();
  }

  /**
   *
   * @return {Promise} a promise for the timestamp. This will be unfulfilled until the first timestamp is generated
   */
  getCurrentTimestamp() {
    if (this.latestTimestamp) {
      // timestamp is available immediately
      return Promise.resolve(this.latestTimestamp);
    } else {
      return new Promise((resolve) => {
        // put client in queue for timestamp
        this.resolves.push(resolve);
      });
    }
  }
}

module.exports = TimestampGenerator;


