(function () {
  angular.module("page1", [])
    .directive("page1", function () {
      return {
        templateUrl: "templates/page1template.html",
        restrict: "E",
        controller: ['$scope', '$element', function ($scope, $element) {
        }]
      };
    });
})();