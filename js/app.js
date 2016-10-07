(function () {
    angular.module('app', ["page1", "page2", "page3"])
        .controller('pageController', ['$scope', '$location', '$window', function ($scope, $location, $window) {
            $scope.myPage = 1;
            $scope.pageNavigate = function(i) { $scope.myPage = i; };
            angular.element($window).on("resize", function() {
                $scope.$apply();
            });
        }
        ])
})();
