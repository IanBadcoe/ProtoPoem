'use strict';

(function () {
    angular.module("page2", ['page2soundscapeModule', 'compositionImageModule', 'compositionFloorModule'])
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

                    $scope.back = { image: "img/page2-far.png", scroll_width: 2400 };

                    $scope.floor = { image: "img/floor.png", front_scroll_width: 2880, back_scroll_width: 2400 };

                    $scope.components = [
                        { image: "img/panel.png", image_hl: "img/panel-hl.png", scroll_width: 2400, left: 1400, bottom: 450 },
//                        { image: "img/page2-mid.png", scroll_width: 2640 },
                        { image: "img/instruments.png", image_hl: "img/instruments-hl.png", scroll_width: 2650, left: -50, bottom: 15 },
                        { image: "img/cabinet.png", image_hl: "img/cabinet-hl.png", scroll_width: 2650, left: 2203, bottom: 80 },
                        { image: "img/jengine.png", image_hl: "img/jengine-hl.png", scroll_width: 2760, left: 700, bottom: 5 },
                        { image: "img/page2-near.png", scroll_width: 2880 },
                        { image: "img/check-list.png", scroll_width: 2880, left: 1225, bottom: 350 },
                        { image: "img/pillar.png", image_hl: "img/pillar-hl.png", scroll_width: 2950, left: -70, bottom: -100 },
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

                            $scope.floor.scroll = scroll;
                            $scope.back.scroll = scroll;
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