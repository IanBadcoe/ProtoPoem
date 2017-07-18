(function () {
    function recalcStyle(scope, rootScope) {
        var aspect = scope.config.scroll_width / 900;

        var inner_aspect_ratio = rootScope.aspect_ratio * 0.85;

        // each image has aspect_ratio - screen_aspect_ratio sticking out beyond the screen edge
        // only 15% larger since I put the phrase plane on the left
        var extra = aspect - inner_aspect_ratio;

        // so the max movement of each image as a % is 100 * that, and the current movement is -scroll * that
        // HOWEVER divide by the aspect ratio as we've calculated all this as a fraction of the height
        // not the width
        var vals = {
            left: -scope.config.scroll * extra / inner_aspect_ratio
        };

        scope.left = "{left}%".format(vals);
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
                    $scope.left = "0%";

                    $scope.$watch("config.scroll", function () {
                        recalcStyle($scope, $rootScope);
                    });
                }]
            };
        }]);
})();