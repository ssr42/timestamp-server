/**
 * A service to generating timestamp events, by fetching the current timestamp and creating an event from this.
 */
class TimestampService {
  constructor($log, $http, $timeout, appConfig) {
    this.$log = $log;
    this.$http = $http;
    this.$timeout = $timeout;
    this.appConfig = appConfig;
    // The events is stored here.
    this.events = [];
  }

  /**
   * Start generating events.
   */
  start() {
    let pushEvent = (timestamp, message) => {
      this.events.unshift({time: new Date().toLocaleTimeString(), timestamp: timestamp, message: message});
    };
    let startTimer = (minDelay, maxDelay) => {
      minDelay = typeof minDelay === "undefined" ? this.appConfig.timestampServiceMinDelay : minDelay;
      maxDelay = typeof maxDelay === "undefined" ? this.appConfig.timestampServiceMaxDelay : maxDelay;
      let delay = (Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay) * 1000;
      this.$log.info("Will fetch timestamp in "+delay+"ms.");
      this.timer = this.$timeout(fetchTimestamp, delay, false);
    };
    let fetchTimestamp = () => {
      this.$log.info("Fetching timestamp.");
      this.$http.get("/timestamp", {timeout: 60000}).then((response) => {
        if (response.data && response.data.timestamp) {
          let encryptedTimestamp = response.data.timestamp;
          let timestamp;
          try {
            timestamp = CryptoJS.AES.decrypt(encryptedTimestamp, this.appConfig.password).toString(CryptoJS.enc.Utf8)
          } catch (e) {
          }
          if (timestamp) {
            pushEvent(timestamp);
          } else {
            pushEvent(null, "Could not decrypt timestamp from server. Check password...");
          }
        } else {
          pushEvent(null, "No proper response from server.");
        }
        startTimer();
      }, () => {
        pushEvent(null, "Error connecting to server.");
        startTimer();
      });
    };

    startTimer(0, 0);
  }

  /**
   * Stop generating events.
   */
  stop() {
    this.$timeout.cancel(this.timer);
  }
}

angular.module('myApp.timestampService', [])
  .service("timestampService", ["$log", "$http", "$timeout", "appConfig", TimestampService]);
