(function () {
  angular.module("phrasePlaneModule", [ "dragdropModule", "phraseModule" ])
    .directive("phrasePlane", function () {
      return {
        templateUrl: "templates/phrasePlaneTemplate.html",
        restrict: "E",
        scope: {
            foundPhrases: "=",
            captions: "=",
            subPageNum: "="
        },
        controller: ['$scope', '$element', function ($scope, $element) {
        }]
      };
    });
})();