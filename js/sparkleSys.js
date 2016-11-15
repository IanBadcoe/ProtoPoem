(function () {
    angular.module("sparkleSysModule", [])
        .service("sparkleSys", ['$rootScope', '$timeout', function ($rootScope, $timeout) {
            this.init =
                function (phrases, $scope) {
                    function randomElement(ary) { return ary[Math.floor(Math.random() * ary.length)]; }

                    var _num_sparkles = 0;
                    var _sparkle_loop_cycle = 0;
                    var _time_step = 50;
                    var _step_scale = _time_step / 100;  // use this to scale things so hopefully if time_step is changed probabilities and velocities remain about the same
                    var _reverse_step = 0;
                    var _v_scale = 0.15;
                    var _terminate = false;

                    function end()
                    {
                        _terminate = true;
                    }

                    function sparkleStep(phrase) {
                        if (_reverse_step > 0 && phrase.x < _reverse_step) {
                            phrase.x -= phrase.v * _v_scale * _step_scale;
                        }
                        else if (phrase.loopAng > 0) {
                            // everything about 2PI cancels and if we want to go around the circle
                            // at the same speed we were moving, only the radius and speed matter to the step_size
                            phrase.loopAng -= _v_scale / phrase.loopXSize * _step_scale;
                            var sa = Math.sin(-phrase.loopAng);
                            var ca = Math.cos(-phrase.loopAng);

                            phrase.x += ca * phrase.v * phrase.loopXSize;
                            phrase.y += sa * phrase.v * phrase.loopYSize;
                        }
                        else {
                            if (Math.random() < _time_step * 0.0006) {
                                phrase.loopAng = 2 * Math.PI;
                                phrase.loopXSize = (Math.random() + 1) / 2;
                                phrase.loopYSize = phrase.loopXSize * (Math.random() > 0.5 ? -1 : 1) * $rootScope.aspect_ratio;
                            }

                            phrase.x += phrase.v * _v_scale * _step_scale;
                        }

                        phrase.y += Math.sin(phrase.x * phrase.wobble_freq + phrase.wobble_phase) * _step_scale * phrase.wobble_scale * $rootScope.aspect_ratio;
                        phrase.angle += phrase.rotation * _step_scale;
                    }

                    function sparkleLoopAddOne(atStart) {
                        var hp = phrases.filter(function (x) { return !(x.found || x.in_use) });

                        if (hp.length != 0 && _num_sparkles < 10) {
                            var phrase = randomElement(hp);

                            phrase.in_use = true;
                            phrase.loopAng = -1;
                            phrase.wobble_scale = (Math.random() + 1) / 5;
                            phrase.wobble_phase = Math.random() * 2 * Math.PI;
                            phrase.wobble_freq = (Math.random() + 0.5) / 4;
                            phrase.angle = Math.random() * Math.PI * 2;
                            phrase.rotation = (Math.random() - 0.3) * 20;

                            if (atStart) {
                                phrase.x = 14;
                            }
                            else {
                                phrase.x = Math.random() * 100;;
                            }
                            phrase.y = Math.random() * 100;

                            phrase.depth = Math.random() * 99 + 1;

                            phrase.v = 25 / phrase.depth;
                            phrase.w = phrase.v * 10;

                            $scope.sparkles.push(phrase);
                            _num_sparkles++;
                        }

                    }

                    function sparkleLoop() {
                        _sparkle_loop_cycle = (_sparkle_loop_cycle + 1) % 10;

                        if (_reverse_step > -100) {
                            _reverse_step -= 3;
                        }
                        else {
                            if (Math.random() < _time_step * 0.0001) _reverse_step = 100;
                        }

                        if (!_sparkle_loop_cycle) {
                            sparkleLoopAddOne(true);
                        }

                        for (var j = 0; j < $scope.sparkles.length;) {
                            var phrase = $scope.sparkles[j];

                            sparkleStep(phrase);

                            phrase.style = {
                                left: "{x}%".format(phrase),
                                top: "{y}%".format(phrase),
                                width: "{w}%".format(phrase),
                                transform: "rotate({angle}deg)".format(phrase)
                            };

                            if (phrase.found || phrase.x > 100 || phrase.x < -20 || phrase.y > 110 || phrase.y < -10) {
                                $scope.sparkles.splice(j, 1);
                                phrase.in_use = false;
                                _num_sparkles--;
                            }
                            else {
                                j++;
                            }
                        }

                        if (!_terminate) {
                            $timeout(sparkleLoop, _time_step);
                        }
                    };

                    function resetSparkles() {
                        phrases.forEach(function (phrase) {
                            phrase.in_use = false;
                        });

                        $scope.sparkles = [];

                        _num_sparkles = 0;
                    }

                    function initSubPageSparkles() {
                        resetSparkles();

                        for (var i = 0; i < 10; i++) {
                            sparkleLoopAddOne(false);
                        }
                    }

                    initSubPageSparkles();

                    $timeout(sparkleLoop, _time_step);

                    return {
                        end: end,
                        beginSubPage: initSubPageSparkles
                    };
                };
        }])
})();