(function () {
    var phrases = ["Too many stoats", "not enough string", "but don't ask me...",
        "I have no", "all good prunes", "sppons",
        "hats", "tree", "ape",
        "nose", "belief"];
    phrases = phrases.map(function (txt) {
        return { text: txt, in_use: false, found: false };
    });

    var sparkle_plane_scales = [0.3, 0.6, 0.8, 1.0];

    var num_sparkles = 0;
    var sparkle_loop_cycle = 0;

    function randomElement(ary) { return ary[Math.floor(Math.random() * ary.length)]; }

    function setSparkleLoopRunning($scope, $timeout, $rootScope) {
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

            for(var i = 0; i < 4; i++)
            {
                if ($scope.phrases[i] === null)
                    alert("bob");

                for(var j = 0; j < $scope.phrases[i].length; )
                {
                    var phrase = $scope.phrases[i][j];

                    phrase.x += phrase.v;
                    phrase.style = {
                        left: "{x}%".format(phrase),
                        top: "{y}%".format(phrase),
                        width: "{w}%".format( { w: phrase.v * 10 } )
                    };

                    if (phrase.x > 100)
                    {
                        $scope.phrases[i].splice(j, 1);
                        phrase.in_use = false;
                        num_sparkles--;
                    }
                    else
                    {
                        j++;
                    }
                }
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
                controller: ['$scope', '$element', 'page1soundscape', '$timeout', '$rootScope',
                    function ($scope, $element, page1soundscape, $timeout, $rootScope) {
                        page1soundscape.start();

                        $element.on("$destroy", function () {
                            page1soundscape.end();
                            scope.terminate = true;
                        });

                        // one per plane
                        $scope.phrases = [[], [], [], []];

                        $scope.terminate = false;

                        setSparkleLoopRunning($scope, $timeout, $rootScope);
                    }]
            };
        });
})();