(function () {
    var phrases = ["Too many stoats", "not enough string", "but don't ask me..."];
    phrases = phrases.map(function (txt) {
        return { text: txt, in_use: false, found: false };
    });

    var sparklePlanes = [{ scale: 0.3 }, { scale: 0.6 }, { scale: 0.8 }, { scale: 1.0 }];

    function randomElement(ary) { return ary[Math.floor(Math.random() * ary.length)]; }

    function setSparkleAddRunning(scope)
    {
        function addSparkle() {
            var hp = phrases.filter(function(x) { !(x.found || x.in_use)});

            if (hp.length != 0)
            {
                var phrase = randomElement(hp);

                phrase.in_use = true;

                phrase.x = -100;
                phrase.y = Math.random() * 100;
                
                var plane = randomElement(sparklePlanes);

                phrase.v = sparklePlanes.scale;
                phrase.plane = plane;

                var el = angular.element("<sparkle/>");
                el.css({ top: phrase.y, left: phrase.x});

                plane.append(el);
            }

            if (scope.terminate)
            {
                setTimeout(addSparkle, 1000);
            }
        };
        
        setTimeout(addSparkle, 1000);
    };

    angular.module("page1", ['page1soundscapeModule', 'sparklePlaneModule', 'sparkleModule'])
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

                    $scope.terminate = false;

                    setSparkleAddRunning($scope);
                }]
            };
        });
})();