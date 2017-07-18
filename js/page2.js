'use strict';

(function () {
    angular.module("page2", ['page2soundscapeModule', 'compositionImageModule'])
        .directive("page2", ["$rootScope", function ($rootScope) {
            return {
                templateUrl: "templates/page2template.html",
                restrict: "E",
                controller: ['$scope', '$element', '$interval', 'page2soundscape', function ($scope, $element, $interval, page2soundscape) {
                    page2soundscape.start();

                    $element.on("$destroy", function () {
                        page2soundscape.end();
                    });

                    $scope.captions = ["Engine compartment"];

                    $scope.components = [
                        { image: "img/page2-far.png", scroll_width: 2400 },
                        { image: "img/page2-mid.png", scroll_width: 2640 },
                        { image: "img/page2-near.png", scroll_width: 2880 },
                    ];

                    var interval_promise = null;
                    var scroll = 0;

                    function cancelMove () {
                        if (interval_promise) {
                            $interval.cancel(interval_promise);
                            interval_promise = null;
                        }
                    }

                    function startMove (vel) {
                        cancelMove();

                        interval_promise = $interval(function () {
                            scroll = Math.min(Math.max(0, scroll + vel), 100);

                            $scope.components.forEach(function(component) {
                                component.scroll = scroll;
                            }, this);
                        }, 10);
                    }

                    $scope.leftStart = function (e) {
                        startMove(-.15);
                    };

                    $scope.rightStart = function (e) {
                        startMove(.15);
                    };

                    $scope.moveEnd = function (e) {
                        cancelMove();
                    };

//                    startMove(0);
                }]
            };
        }]);
})();