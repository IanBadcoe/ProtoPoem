(function () {
    angular.module("compositionImageModule", [])
        .directive("compositionImage", [ "$rootScope", function ($rootScope) {
            function handleResize($scope, root$scope) {
                // wait until the image is loaded
                if (!$scope.config.natural_height) return;

                // fullscreen images are this high
                var unscaled_max_height = 900.0;

                // our graphics are created with a (max) height of unscaled_max_height
                // so our on-screen height/width need to be in that ratio
                $scope.scale_factor = root$scope.live_height / unscaled_max_height;
                $scope.style_height = $scope.scale_factor * $scope.config.natural_height + "px";
                $scope.style_width = $scope.scale_factor * $scope.config.natural_width + "px";

                recalcStyle($scope, root$scope);
            }

            function recalcStyle($scope, root$scope) {
                // wait until we've done a resize
                if (!$scope.style_height) return;

                // the visible part of the screen is this wide
                var inner_width = root$scope.live_width * 0.85;

                // we can scroll by the difference between that and our scroll_width
                var max_scroll = $scope.config.scroll_width - inner_width;

                $scope.style_left = -$scope.config.scroll * max_scroll / 100.0 + $scope.config.left * $scope.scale_factor + "px";
                $scope.style_bottom = $scope.config.bottom * $scope.scale_factor + "px";
            }

            return {
                templateUrl: "templates/compositionImageTemplate.html",
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