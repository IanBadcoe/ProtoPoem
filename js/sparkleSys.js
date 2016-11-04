(function () {
    angular.module("sparkleSys", ['$rootScope', '$timeOut'])
        .service("sparkleSys", ['$rootScope', '$timeOut', function ($rootScope, $timeOut) {
            this.init =
                function ($scope, phrases, subPage) {
                    function randomElement(ary) { return ary[Math.floor(Math.random() * ary.length)]; }

                    var _sparkle_plane_scales = [0.3, 0.6, 0.8, 1.0];

                    var _num_sparkles = 0;
                    var _sparkle_loop_cycle = 0;
                    var _time_step = 50;
                    var _step_scale = _time_step / 100;  // use this to scale things so hopefully if time_step is changed probabilities and velocities remain about the same
                    var _reverse_step = 0;
                    var _v_scale = 0.5;
                    var _terminate = false;
                    var _sub_page;

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
                                phrase.x = 0;
                            }
                            else {
                                phrase.x = Math.random() * 100;;
                            }
                            phrase.y = Math.random() * 100;

                            var plane_idx = Math.floor(Math.random() * 4);

                            phrase.v = _sparkle_plane_scales[plane_idx];
                            phrase.w = phrase.v * 10;

                            sparkles[plane_idx].push(phrase);
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

                        for (var i = 0; i < 4; i++) {
                            for (var j = 0; j < sparkles[i].length;) {
                                var phrase = sparkles[i][j];

                                sparkleStep(phrase);

                                phrase.style = {
                                    left: "{x}%".format(phrase),
                                    top: "{y}%".format(phrase),
                                    width: "{w}%".format(phrase),
                                    transform: "rotate({angle}deg)".format(phrase)
                                };

                                if (phrase.x > 100 || phrase.x < -20 || phrase.y > 110 || phrase.y < -10) {
                                    sparkles[i].splice(j, 1);
                                    phrase.in_use = false;
                                    _num_sparkles--;
                                }
                                else {
                                    j++;
                                }
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

                        sparkles = [[], [], [], []];

                        _num_sparkles = 0;
                    }

                    function initSubPageSparkles(subPage) {
                        resetSparkles();

                        _sub_page = subPage;

                        for (var i = 0; i < 10; i++) {
                            sparkleLoopAddOne(false);
                        }
                    }

                    initSubPageSparkles(subPage);

                    $timeout(sparkleLoop, _time_step);
                };

                resetSparkles();

                return {
                    end: end,
                    setSubPage: initSubPageSparkles
                };
        }])
})();