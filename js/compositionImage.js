(function () {
  angular.module("compositionImageModule", [])
    .directive("compositionImage", function () {
      return {
        templateUrl: "templates/compositionImageTemplate.html",
        restrict: "E",
        scope: {
            left: "=",
            bottom: "=",
            height: "=",
            image: "=",
            highlit_image: "="
        },
        controller: ['$scope', '$element', function ($scope, $element) {
        }]
      };
    });
})();