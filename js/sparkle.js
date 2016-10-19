(function () {
  angular.module("sparkleModule", [])
    .directive("sparkle", function () {
      return {
        templateUrl: "templates/sparklePlane.html",
        restrict: "E",
        controller: ['$scope', '$element', function ($scope, $element) {
        }]
      };
    });
})();