'use strict';

(function () {
    angular.module('app', ["page1", "page2", "page3"])
        .controller('pageController', ['$scope', '$location', '$window', function ($scope, $location, $window) {
            function resizeLiveArea() {
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

                var live_width;
                var live_left;
                var live_top;
                var live_height;

                if (act_rat > des_rat)
                {
                    // screen wider than we need
                    live_width = h * des_rat;
                    live_left = (w - live_width) / 2;
                    live_top = 0;
                    live_height = h;
                }
                else
                {
                    // screen taller than we need
                    live_height = w / des_rat;
                    live_top = (h - live_height) / 2;
                    live_left = 0;
                    live_width = w;
                }

                live_area_ng_elem.css("left", live_left + "px");
                live_area_ng_elem.css("top", live_top + "px");
                live_area_ng_elem.css("width", live_width + "px");
                live_area_ng_elem.css("height", live_height + "px");        
            }
            
            $scope.myPage = 2;
            $scope.pageNavigate = function(i) { $scope.myPage = i; };
            angular.element($window).on("resize", function() {
                resizeLiveArea();
            });

            Howler.pos(0, 0, 0);
        }
        ])
})();
