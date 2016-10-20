(function () {
    function updateStyle(scope) {
        scope.style = {
            left: "{x}%".format(scope.phrase),
            top: "{y}%".format(scope.phrase),
        };
    }
    angular.module("sparkleModule", [])
        .directive("sparkle", function () {
            return {
                templateUrl: "templates/sparkleTemplate.html",
                restrict: "E",
                controller: ['$scope', '$element', function ($scope, $element) {
                    updateStyle($scope);
                }]
            };
        });
})();