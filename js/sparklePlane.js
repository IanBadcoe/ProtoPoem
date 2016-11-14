(function () {
  angular.module("sparklePlaneModule", ['sparkleModule'])
    .directive("sparklePlane", function () {
      return {
        templateUrl: "templates/sparklePlaneTemplate.html",
        restrict: "E",
        scope: {
            phrases: "=",
            minDepth: "=",
            maxDepth: "="
        },
        controller: ['$scope', '$element', function ($scope, $element) {
            $scope.depthFilter = function(x)
            {
                return x.depth >= $scope.minDepth && x.depth < $scope.maxDepth && !x.found;
            }
        }]
      };
    });
})();