(function () {
    function updateStyle(scope) {
        scope.phrase.x = Math.random() * 100;
        scope.phrase.y = Math.random() * 100;
        
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