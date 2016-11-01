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
    var step_scale = time_step / 100;  // use this to scale things so hopefully if time_step is changed probabilities and velocities remain about the same
    var reverse_step = 0;
    var v_scale = 0.5;

    function randomElement(ary) { return ary[Math.floor(Math.random() * ary.length)]; }

    function setSparkleLoopRunning($scope, $timeout, $rootScope) {
        function sparkleStep(phrase)
        {
            if (reverse_step > 0 && phrase.x < reverse_step)
            {
                phrase.x -= phrase.v * v_scale * step_scale;
            }
            else if (phrase.loopAng > 0)
            {
                // everything about 2PI cancels and if we want to go around the circle
                // at the same speed we were moving, only the radius and speed matter to the step_size
                phrase.loopAng -= v_scale / phrase.loopXSize * step_scale;
                var sa = Math.sin(-phrase.loopAng);
                var ca = Math.cos(-phrase.loopAng);

                phrase.x += ca * phrase.v * phrase.loopXSize;
                phrase.y += sa * phrase.v * phrase.loopYSize;
            }
            else
            {
                if (Math.random() < time_step * 0.0006)
                {
                    phrase.loopAng = 2 * Math.PI;
                    phrase.loopXSize = (Math.random() + 1) / 2;
                    phrase.loopYSize = phrase.loopXSize * (Math.random() > 0.5 ? -1 : 1) * $rootScope.aspect_ratio;
                }

                phrase.x += phrase.v * v_scale * step_scale;
            }

            phrase.y += Math.sin(phrase.x * phrase.wobble_freq + phrase.wobble_phase) * step_scale * phrase.wobble_scale * $rootScope.aspect_ratio;
            phrase.angle += phrase.rotation * step_scale;
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
                    phrase.loopAng = -1;
                    phrase.wobble_scale = (Math.random() + 1) / 5;
                    phrase.wobble_phase = Math.random() * 2 * Math.PI;
                    phrase.wobble_freq = (Math.random() + 0.5) / 4;
                    phrase.angle = Math.random() * Math.PI * 2;
                    phrase.rotation = (Math.random() - 0.3) * 20;

                    phrase.x = 0;
                    phrase.y = Math.random() * 100;

                    var plane_idx = Math.floor(Math.random() * 4);

                    phrase.v = sparkle_plane_scales[plane_idx];
                    phrase.w = phrase.v * 10;

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
                        width: "{w}%".format(phrase),
                        transform: "rotate({angle}deg)".format(phrase)
                    };

                    if (phrase.x > 100 || phrase.x < -20 || phrase.y > 110 || phrase.y < -10 )
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

    angular.module("page1", ['page1soundscapeModule', 'sparklePlaneModule', 'sparkleModule', 'animationEndModule'])
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

                        $scope.test = function() { alert("xxx"); };
                    }]
            };
        });
})();