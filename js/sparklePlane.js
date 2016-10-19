(function () {
  angular.module("sparklePlaneModule", [])
    .directive("sparklePlane", function () {
      return {
        templateUrl: "templates/sparklePlaneTemplate.html",
        restrict: "E",
        scope: { phrases: "=" },
        controller: ['$scope', '$element', function ($scope, $element) {
        }]
      };
    });
})();