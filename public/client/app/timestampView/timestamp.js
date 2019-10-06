"use strict";

class TimestampViewCtrl {
  constructor(timestampService) {
    this.timestampService = timestampService;
    this.events = timestampService.events;
    timestampService.start();
  }

  $onDestroy() {
    this.timestampService.stop();
  }
}

angular.module("myApp.timestampView", ["ngRoute"])

.config(["$routeProvider", function($routeProvider) {
  $routeProvider.when("/timestamp", {
    templateUrl: "timestampView/timestamp.html"
  });
}])

.controller("TimestampViewCtrl", ["timestampService", TimestampViewCtrl]);
