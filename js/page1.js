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
    var time_step = 50;
    var reverse_step = 0;

    function randomElement(ary) { return ary[Math.floor(Math.random() * ary.length)]; }

    function setSparkleLoopRunning($scope, $timeout, $rootScope) {
        function sparkleStep(phrase)
        {
            if (reverse_step > 0 && phrase.x < reverse_step)
            {
                phrase.x -= phrase.v * 0.5;
            }
            else if (phrase.loopStep != 0)
            {
                var ang = phrase.loopStep / 8 * Math.PI;
                var sa = Math.sin(ang);
                var ca = Math.cos(ang);

                phrase.x += ca * phrase.v * phrase.loopXSize;
                phrase.y += sa * phrase.v * $rootScope.aspect_ratio * phrase.loopYSize;

                phrase.loopStep--;
            }
            else
            {
                if (Math.random() < time_step * 0.0003)
                {
                    phrase.loopStep = 16;
                    phrase.loopXSize = (Math.random() + 1) / 2;
                    phrase.loopYSize = phrase.loopXSize * (Math.random() > 0.5 ? -1 : 1);
                }

                phrase.x += phrase.v * 0.5;
            }
        }
        function sparkleLoop() {
            sparkle_loop_cycle = (sparkle_loop_cycle + 1) % 10;

            if (reverse_step > -100)
            {
                reverse_step -= 3;
            }
            else
            {
                if (Math.random() < time_step * 0.0001) reverse_step = 100;
            }

            if (!sparkle_loop_cycle) {
                var hp = phrases.filter(function (x) { return !(x.found || x.in_use) });

                if (hp.length != 0 && num_sparkles < 10) {
                    var phrase = randomElement(hp);

                    phrase.in_use = true;
                    phrase.reverseStep = 0;
                    phrase.loopStep = 0;

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
                for(var j = 0; j < $scope.phrases[i].length; )
                {
                    var phrase = $scope.phrases[i][j];

                    sparkleStep(phrase);

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
                $timeout(sparkleLoop, time_step);
            }
        };

        $timeout(sparkleLoop, time_step);
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