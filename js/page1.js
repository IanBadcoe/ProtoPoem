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
            var hp = phrases.filter(function(x) { return !(x.found || x.in_use)});

            if (hp.length != 0)
            {
                var phrase = randomElement(hp);

                phrase.in_use = true;

                phrase.x = 0;
                phrase.y = Math.random() * 100;

                var plane_rec = randomElement(sparklePlanes);
                var plane = plane_rec.plane;

                phrase.v = plane_rec.scale;
                phrase.plane = plane;

                var el = angular.element("<sparkle/>");
                el.css(
                    {
                        top: "{y}px".supplant(phrase),
                        left: "{x}px".supplant(phrase),
                    }
                    );

                plane.append(el);
            }

            if (!scope.terminate)
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

                    $element.on("$destroy", function () {
                      page1soundscape.end();
                      scope.terminate = true;
                    });

                    // one per plane
                    $scope.phrases = [[], [], [], []];

                    $scope.terminate = false;

//                    setSparkleAddRunning($scope);
                }]
            };
        });
})();