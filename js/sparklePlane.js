(function () {
  angular.module("sparklePlaneModule", [])
    .directive("sparklePlane", function () {
      return {
        templateUrl: "templates/sparklePlaneTemplate.html",
        restrict: "E",
        scope: { sparkles: "=" },
        controller: ['$scope', '$element', function ($scope, $element) {
        }]
      };
    });
})();