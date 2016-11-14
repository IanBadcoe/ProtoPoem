(function () {
    angular.module("phraseModule", [])
        .directive("phrase", function () {
            return {
                templateUrl: "templates/phraseTemplate.html",
                restrict: "E",
                controller: ['$scope', '$element', function ($scope, $element) {
                }]
            };
        });
})();