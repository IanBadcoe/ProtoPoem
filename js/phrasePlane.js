(function () {
  angular.module("phrasePlaneModule", [])
    .directive("phrasePlane", function () {
      return {
        templateUrl: "templates/phrasePlaneTemplate.html",
        restrict: "E",
        scope: {
            phrases: "=",
            caption: "=",
            subPageNum: "="
        },
        controller: ['$scope', '$element', function ($scope, $element) {
            $scope.foundFilter = function(x)
            {
                return x.found;
            }
        }]
      };
    });
})();