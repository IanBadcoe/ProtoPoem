(function () {
  angular.module("phrasePlaneModule", ['phraseModule'])
    .directive("phrasePlane", function () {
      return {
        templateUrl: "templates/phrasePlaneTemplate.html",
        restrict: "E",
        scope: {
            phrases: "="
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