'use strict';

(function () {
    angular.module("page1out", ['page1soundscapeModule'])
        .directive("page1out", function () {
            return {
                templateUrl: "/templates/page1outTemplate.html",
                restrict: "E",
                controller: ['$scope', '$element', 'page1soundscape', function ($scope, $element, page1soundscape) {
                    page1soundscape.start();

                    var callback = function () {
                        $scope.$emit("pageEnd", 4);
                    };
                    page1soundscape.playVoiceRange(0, 13, callback);

                    $element.on("$destroy", function () {
                        page1soundscape.end();
                    });

                }]
            };
        });
})();