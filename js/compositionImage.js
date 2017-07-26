(function () {
    var natural_height;
    var natural_width;

    function recalcStyle(scope, rootScope) {
        // wait until the image is loaded
        if (!natural_height) return;

        // fullscreen images are this high
        var unscaled_max_height = 900.0;

        // our graphics are created with a (max) height of unscaled_max_height
        // so our on-screen height/width need to be in that ratio
        var style_height = rootScope.live_height / unscaled_max_height * natural_height;
        var style_width = rootScope.live_height / unscaled_max_height * natural_width;

        // the visible part of the screen is this wide
        var inner_width = rootScope.live_width * 0.85;

        // we can scroll by the difference between that and our scroll_width
        var max_scroll = scope.config.scroll_width - inner_width;

        var vals = {
            left: -scope.config.scroll * max_scroll / 100.0,
            bottom: scope.config.bottom,
            height: style_height,
            width: style_width
        };

        scope.style_left = "{left}px".format(vals);
        scope.style_bottom = "{bottom}px".format(vals);
        scope.style_width = "{width}px".format(vals);
        scope.style_height = "{height}px".format(vals);
    }

    angular.module("compositionImageModule", [])
        .directive("compositionImage", [ "$rootScope", function ($rootScope) {
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
                }],
                link: function (scope, el, attrs, controller) {
                    var ang_el = angular.element(el);

                    var my_image = angular.element(ang_el.find("img")[0]);

                    my_image.bind('load', function() {
                        natural_height = my_image[0].naturalHeight;
                        natural_width = my_image[0].naturalWidth;

                        recalcStyle(scope, $rootScope);
                    });
                }
            };
        }]);
})();