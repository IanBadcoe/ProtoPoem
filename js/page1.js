(function () {
    var phrases = ["Too many stoats", "not enough string", "but don't ask me..."];
    phrases = phrases.map(function (txt) {
        return { text: txt, in_use: false, found: false };
    });

    var sparkle_plane_scales = [0.3, 0.6, 0.8, 1.0];

    var num_sparkles = 0;
    var sparkle_loop_cycle = 0;

    function randomElement(ary) { return ary[Math.floor(Math.random() * ary.length)]; }

    function setSparkleLoopRunning($scope, $timeout) {
        function sparkleLoop() {
            sparkle_loop_cycle = (sparkle_loop_cycle + 1) % 10;

            if (!sparkle_loop_cycle) {
                var hp = phrases.filter(function (x) { return !(x.found || x.in_use) });

                if (hp.length != 0 && num_sparkles < 10) {
                    var phrase = randomElement(hp);

                    phrase.in_use = true;

                    phrase.x = 0;
                    phrase.y = Math.random() * 100;

                    var plane_idx = Math.floor(Math.random() * 4);

                    phrase.v = sparkle_plane_scales[plane_idx];

                    $scope.phrases[plane_idx].push(phrase);
                    num_sparkles++;
                }
            }

            var hp = [].concat.apply([], $scope.phrases).filter(function (x) { return x.in_use; });

            for(phrase in hp)
            {
                if (phrase.x > 100)
                {}
            }

            if (!$scope.terminate) {
                $timeout(sparkleLoop, 50);
            }
        };

        $timeout(sparkleLoop, 50);
    };

    angular.module("page1", ['page1soundscapeModule', 'sparklePlaneModule', 'sparkleModule'])
        .directive("page1", function () {
            return {
                templateUrl: "templates/page1template.html",
                restrict: "E",
                controller: ['$scope', '$element', 'page1soundscape', '$timeout',
                    function ($scope, $element, page1soundscape, $timeout) {
                        page1soundscape.start();

                        $element.on("$destroy", function () {
                            page1soundscape.end();
                            scope.terminate = true;
                        });

                        // one per plane
                        $scope.phrases = [[], [], [], []];

                        $scope.terminate = false;

                        setSparkleLoopRunning($scope, $timeout);
                    }]
            };
        });
})();