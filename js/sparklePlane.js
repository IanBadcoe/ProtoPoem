(function () {
  angular.module("sparklePlaneModule", [])
    .directive("sparklePlane", function () {
      return {
        templateUrl: "templates/sparklePlaneTemplate.html",
        restrict: "E",
        controller: ['$scope', '$element', function ($scope, $element) {
        }],
        transclude: true
      };
    });
})();