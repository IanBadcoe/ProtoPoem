'use strict';

(function () {
    angular.module("page2", [])
        .directive("page2", ["$rootScope", function ($rootScope) {
            return {
                templateUrl: "templates/page2template.html",
                restrict: "E",
                controller: ['$scope', '$element', '$interval', function ($scope, $element, $interval) {
                    $scope.mySubPage = 1;

                    $scope.far_parallax_x = "0%";
                    $scope.mid_parallax_x = "0%";
                    $scope.near_parallax_x = "0%";

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

                            var vals = { near: scroll * 1.2, mid: scroll * 1.1, far: scroll }

                            $scope.far_parallax_x = "{far}%".format(vals);
                            $scope.mid_parallax_x = "{mid}%".format(vals);
                            $scope.near_parallax_x = "{near}%".format(vals);
                        }, 100);
                    }

                    $scope.leftStart = function (e) {
                        startMove(-1);
                    };

                    $scope.rightStart = function (e) {
                        startMove(1);
                    };

                    $scope.moveEnd = function (e) {
                        cancelMove();
                    };
                }]
            };
        }]);
})();