'use strict';

(function () {
    function resizeLiveArea($rootScope) {
        var whole_screen_ng_elem = angular.element(".whole-screen");
        var live_area_ng_elem = angular.element(".live-area");
        var nav_bar_ng_elem = angular.element(".my-nav-bar");

        var ws = whole_screen_ng_elem.get(0);
        var nb = nav_bar_ng_elem.get(0);

        var l = ws.offsetLeft;
        var t = ws.offsetTop;
        var w = ws.offsetWidth;
        var h = ws.offsetHeight - nb.offsetHeight;

        var des_rat = 16 / 9;
        var act_rat = w / h;

        if (act_rat > des_rat) {
            // screen wider than we need
            $rootScope.live_width = h * des_rat;
            $rootScope.live_left = (w - $rootScope.live_width) / 2;
            $rootScope.live_top = 0;
            $rootScope.live_height = h;
        }
        else {
            // screen taller than we need
            $rootScope.live_height = w / des_rat;
            $rootScope.live_top = (h - $rootScope.live_height) / 2;
            $rootScope.live_left = 0;
            $rootScope.live_width = w;
        }

        $rootScope.aspect_ratio = $rootScope.live_width / $rootScope.live_height;

        live_area_ng_elem.css("left", $rootScope.live_left + "px");
        live_area_ng_elem.css("top", $rootScope.live_top + "px");
        live_area_ng_elem.css("width", $rootScope.live_width + "px");
        live_area_ng_elem.css("height", $rootScope.live_height + "px");

        $rootScope.$emit("resize");
    }

    angular.module('app', ["page1", "page2", "page3", "page1out"])
        .controller('pageController', ['$scope', '$location', '$window', '$rootScope',
        function ($scope, $location, $window, $rootScope) {
            $scope.myPage = 1;
            $scope.pageNavigate = function (i) { $scope.myPage = i; };

            function doResizeLiveArea() { resizeLiveArea($rootScope); }
            angular.element($window).on("resize", doResizeLiveArea);

            setTimeout(doResizeLiveArea, 0);

            Howler.pos(0, 0, 0);

            $rootScope.$on("pageEnd", function(event, num) {
                $scope.fadeTo(function() {
                    if (num === 1)
                    {
                        // page 4 is the page 1 -> page 2 cut-scene
                        $scope.myPage = 4;
                    } else if (num === 4)
                    {
                        // page 4 is the page 1 -> page 2 cut-scene
                        $scope.myPage = 2;
                    }
                });
            });

            $scope.fadeOutEndInternal = function(){
                $scope.fadingOut = false;
                $scope.fadingIn = true;
                $scope.fadeEnd();
                $scope.$apply();
            };

            $scope.fadeInEndInternal = function(){
                $scope.fadingIn = false;
                $scope.$apply();
            };

            $scope.fadeTo = function (func) {
                $scope.fadeEnd = func;
                $scope.fadingOut = true;
                $scope.$apply();
            };

        }
        ]);
})();
