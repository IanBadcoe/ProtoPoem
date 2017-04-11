'use strict';

(function () {
    angular.module("page2", ['page2soundscapeModule'])
        .directive("page2", ["$rootScope", function ($rootScope) {
            return {
                templateUrl: "templates/page2template.html",
                restrict: "E",
                controller: ['$scope', '$element', '$interval', 'page2soundscape', function ($scope, $element, $interval, page2soundscape) {
                    page2soundscape.start();

                    $element.on("$destroy", function () {
                        page2soundscape.end();
                        $scope.sparkleSys.end();
                    });
                    
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

                            // scroll runs from 0 -> 100
                            // images need to move their left by width - screen_width
                            var far_aspect = 2500 / 900;
                            var mid_aspect = 2640 / 900;
                            var near_aspect = 2880 / 900;

                            // each image has aspect_ratio - screen_aspect_ratio sticking out beyond the screen edge
                            var far_extra = far_aspect - $rootScope.aspect_ratio;
                            var mid_extra = mid_aspect - $rootScope.aspect_ratio;
                            var near_extra = near_aspect - $rootScope.aspect_ratio;

                            // so the max movement of each image as a % is 100 * that, and the current movement is -scroll * that
                            // HOWEVER divide by the aspect ratio as we've calculated all this as a fraction of the height
                            // not the width
                            var vals = { near: -scroll * near_extra / $rootScope.aspect_ratio,
                                mid: -scroll * mid_extra / $rootScope.aspect_ratio,
                                far: -scroll * far_extra / $rootScope.aspect_ratio,
                                cl: (-scroll * near_extra / $rootScope.aspect_ratio) + 78.06,
                                cl2: (-scroll * near_extra / $rootScope.aspect_ratio) + 83.81
                            }

                            $scope.far_parallax_x = "{far}%".format(vals);
                            $scope.mid_parallax_x = "{mid}%".format(vals);
                            $scope.near_parallax_x = "{near}%".format(vals);
                            $scope.cl_parallax_x = "{cl}%".format(vals);
                            $scope.cl_parallax_x2 = "{cl2}%".format(vals);
                            $scope.cl_top = "51.5%";
                            $scope.cl_bottom = "63.1%";

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

                    startMove(0);
                }]
            };
        }]);
})();