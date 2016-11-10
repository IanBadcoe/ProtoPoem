(function () {
    angular.module("animationEndModule", [])
        .directive("animationEnd", function () {
            return {
                restrict: "A",
                scope: {
                    animationEnd: '&'
                },
                link: function ($scope, element) {
                    var events = 'animationend webkitAnimationEnd MSAnimationEnd' +
                                 ' transitionend webkitTransitionEnd';

                    element.on(events, function (event) {
                        $scope.animationEnd().call(element[0], event);
                        $scope.$apply();
                    });
                }
            };
        });
})();