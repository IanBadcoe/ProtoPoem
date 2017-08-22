(function () {
    angular.module("compositionFloorModule", [])
        .directive("compositionFloor", [ "$rootScope", function ($rootScope) {
            function handleResize($scope, rootScope) {
                // wait until the image is loaded
                if (!$scope.config.natural_height) return;

                // fullscreen images are this high
                var unscaled_max_height = 900.0;

                // our graphics are created with a (max) height of unscaled_max_height
                // so our on-screen height/width need to be in that ratio
                $scope.scale_factor = rootScope.live_height / unscaled_max_height;
                $scope.calc_height = $scope.scale_factor * $scope.config.natural_height;
                $scope.style_height = $scope.calc_height + "px";
                $scope.style_width = $scope.scale_factor * $scope.config.natural_width + "px";

                recalcStyle($scope, rootScope);
            }

            function recalcStyle($scope, rootScope) {
                // wait until we've done a resize
                if (!$scope.style_height) return;

                // the visible part of the screen is this wide
                var inner_width = rootScope.live_width * 0.85;

                // we can scroll by the difference between that and our scroll_width
                var back_max_scroll = $scope.config.back_scroll_width - inner_width;
                var front_max_scroll = $scope.config.front_scroll_width - inner_width;

                var back_scroll = -$scope.config.scroll * back_max_scroll / 100.0 + $scope.config.left;
                var front_scroll = -$scope.config.scroll * front_max_scroll / 100.0 + $scope.config.left;

                var fb_diff = $scope.config.front_scroll_width - $scope.config.back_scroll_width;

                var scroll_diff = front_scroll - back_scroll;
                var skew = scroll_diff / $scope.calc_height;

                $scope.style_left = -$scope.config.scroll * front_max_scroll / 100.0 + $scope.config.left * $scope.scale_factor - scroll_diff / 2 + "px";
                $scope.style_bottom = $scope.config.bottom * $scope.scale_factor + "px";
                $scope.style_matrix = "matrix(1, 0, " + skew + ", 1, 0, 0)";
            }

            return {
                templateUrl: "templates/compositionFloorTemplate.html",
                restrict: "E",
                scope: {
                    config: "="
                },
                controller: ['$scope', '$element', function ($scope, $element) {
                    $scope.config.left = $scope.config.left || 0.0;
                    $scope.config.bottom = $scope.config.bottom || 0.0;
                    $scope.config.scroll = $scope.config.scroll || 0.0;

                    $scope.$watch("config.scroll", function () {
                        recalcStyle($scope, $rootScope);
                    });

                    $rootScope.$on("resize", function () {
                        handleResize($scope, $rootScope);
                    });

                    $scope.classes = "composition-floor no-hover zero-spacing";
                }],
                link: function ($scope, el, attrs, controller) {
                    var ang_el = angular.element(el);

                    var my_image = angular.element(ang_el.find("img")[0]);

                    my_image.bind('load', function() {
                        $scope.config.natural_height = my_image[0].naturalHeight;
                        $scope.config.natural_width = my_image[0].naturalWidth;

                        handleResize($scope, $rootScope);

                        $scope.$apply();
                    });
                }
            };
        }]);
})();