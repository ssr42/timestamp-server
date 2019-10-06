"use strict";

// Declare app level module which depends on views, and core components
angular.module("myApp", [
  "ngRoute",
  "myApp.appConfig",
  "myApp.timestampService",
  "myApp.configView",
  "myApp.timestampView"]
)
  .value("DefaultPassword", "secret")
  .config(["$locationProvider", "$routeProvider", function($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix("!");
    $routeProvider.otherwise({redirectTo: "/config"});
  }]);
