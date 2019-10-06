"use strict";

class AppConfig {
  constructor(DefaultPassword) {
    this.password = DefaultPassword;
    this.timestampServiceMinDelay = 2;
    this.timestampServiceMaxDelay = 10;
  }
}

angular.module('myApp.appConfig', [])
  // This service is used to handle application configuration
  .service("appConfig", ["DefaultPassword", AppConfig]);
