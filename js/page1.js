(function () {
  angular.module("page1", ['page1soundscapeModule'])
    .directive("page1", function () {
      return {
        templateUrl: "templates/page1template.html",
        restrict: "E",
        controller: ['$scope', '$element', 'page1soundscape', function ($scope, $element, page1soundscape) {
          page1soundscape.start();

          $element.on("$destroy", function() { page1soundscape.end(); });
        }]
      };
    });
})();