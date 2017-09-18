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
                        { on: false, next: 2, image: "img/panel.png", image_hl: "img/panel-hl.png", scroll_width: 2400, left: 1800, bottom: 450 },
                        { on: false, next: 6, image: "img/instruments.png", image_hl: "img/instruments-hl.png", scroll_width: 2650, left: -50, bottom: 15 },
                        { on: false, next: 1, image: "img/cabinet.png", image_hl: "img/cabinet-hl.png", scroll_width: 2650, left: 2203, bottom: 80 },
                        { on: false, next: 0, image: ["img/jengine-l.png", "img/jengine-r.png"], image_hl: ["img/jengine-l-hl.png", "img/jengine-r-hl.png"], scroll_width: 2760, left: 650, bottom: 5 },
                        { on: false, image: "img/page2-near.png", scroll_width: 2880 },
                        { on: true, next: 3, image: "img/check-list.png", image_hl: "img/check-list-hl.png", scroll_width: 2880, left: 1225, bottom: 350 },
                        { on: false, next: -1, image: "img/pillar.png", image_hl: "img/pillar-hl.png", scroll_width: 2950, left: -70, bottom: -100 },
                    ].map(function (x) {
                        x.onClick = function() {
                            x.on = false;
                            if (x.next != -1)
                            {
                                $scope.components[x.next].on = true;
                            }
                            else
                            {
                                nextPage();
                            }
                        };
                        return x;
                    });

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