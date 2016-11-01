(function () {
    angular.module("animationEndModule", [])
        .directive("animationEnd", function () {
            return {
                restrict: "A",
                scope: {
                    animationEnd: '&'
                },
                link: function (scope, element) {
                    var callback = scope.animationEnd(),
                        events = 'animationend webkitAnimationEnd MSAnimationEnd' +
                            'transitionend webkitTransitionEnd';

                    element.on(events, function (event) {
                        callback.call(element[0], event);
                    });
                }
            };
        });
})();