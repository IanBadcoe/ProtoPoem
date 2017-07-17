(function () {
  angular.module("compositionImageModule", [])
    .directive("compositionImage", function () {
      return {
        templateUrl: "templates/compositionImageTemplate.html",
        restrict: "E",
        scope: {
//            left: "=",
//            bottom: "=",
//            height: "=",
            image: "@",
//            highlit_image: "@",
//            scroll: "="
        },
        controller: ['$scope', '$element', function ($scope, $element) {
            if ($scope.highlit_image === null)
            {
                $scope.highlit_image = $scope.image;
            }
        }]
      };
    });
})();