(function () {
    var phrases = ["Too many stoats", "not enough string", "but don't ask me..."];

    var sparklePlanes = [{ scale: 0.3 }, { scale: 0.6 }, { scale: 0.8 }, { scale: 1.0 }];

    angular.module("page1", ['page1soundscapeModule', 'sparklePlaneModule'])
        .directive("page1", function () {
            return {
                templateUrl: "templates/page1template.html",
                restrict: "E",
                controller: ['$scope', '$element', 'page1soundscape', function ($scope, $element, page1soundscape) {
                    page1soundscape.start();

                    $element.on("$destroy", function () { page1soundscape.end(); });

                    sparklePlanes[0].plane = angular.element("#sparkle-plane-1");
                    sparklePlanes[1].plane = angular.element("#sparkle-plane-2");
                    sparklePlanes[2].plane = angular.element("#sparkle-plane-3");
                    sparklePlanes[3].plane = angular.element("#sparkle-plane-4");
                }]
            };
        });
})();