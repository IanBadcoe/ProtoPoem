(function () {
    angular.module("sparkleModule", [])
        .directive("sparkle", function () {
            return {
                templateUrl: "templates/sparkleTemplate.html",
                restrict: "E",
                controller: ['$scope', '$element', function ($scope, $element) {
                    $scope.onClick = function() {
                        $scope.phrase.onClick();
                    }
                }]
            };
        });
})();