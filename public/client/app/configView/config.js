"use strict";

angular.module("myApp.configView", ["ngRoute"])

.config(["$routeProvider", function($routeProvider) {
  $routeProvider.when("/config", {
    templateUrl: "configView/config.html"
  });
}])

.controller("ConfigCtrl", ["$scope", "appConfig", function($scope, appConfig) {
  this.password = appConfig.password;
  $scope.$watch(() => { return this.password }, (newPassword) => {
    // update global config with new password
    appConfig.password = newPassword;
  });
}]);