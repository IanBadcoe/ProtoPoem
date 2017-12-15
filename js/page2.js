'use strict';

(function () {
    angular.module("page2", ['page2soundscapeModule', 'compositionImageModule', 'compositionFloorModule'])
        .directive("page2", ["$rootScope", function ($rootScope) {
            return {
                templateUrl: "templates/page2template.html",
                restrict: "E",
                controller: ['$scope', '$element', '$interval', 'page2soundscape', function ($scope, $element, $interval, page2soundscape) {
                    page2soundscape.start();

                    $element.on("$destroy", function () {
                        page2soundscape.end();
                    });

                    $scope.captions = ["Engine compartment"];

                    $scope.back = { image: "img/page2-far.png", scroll_width: 2400 };

                    $scope.floor = { image: "img/floor.png", front_scroll_width: 2880, back_scroll_width: 2400 };

                    $scope.components = [
                        { on: false, next: 2, image: "img/panel.png", image_hl: "img/panel-hl.png", scroll_width: 2400, left: 1800, bottom: 450, voice: 2, text: "Hull" },
                        { on: false, next: 6, image: "img/instruments.png", image_hl: "img/instruments-hl.png", scroll_width: 2650, left: -50, bottom: 15, voice: 4, text: "Position" },
                        { on: false, next: 1, image: "img/cabinet.png", image_hl: "img/cabinet-hl.png", scroll_width: 2650, left: 2203, bottom: 80, voice: 3, text: "Air" },
                        { on: false, next: 0, image: ["img/jengine-l.png", "img/jengine-r.png"], image_hl: ["img/jengine-l-hl.png", "img/jengine-r-hl.png"], scroll_width: 2760, left: 650, bottom: 5, voice: 1, text: "Engine" },
                        { on: false, image: "img/page2-near.png", scroll_width: 2880 },
                        { on: true, next: 3, image: "img/check-list.png", image_hl: "img/check-list-hl.png", scroll_width: 2880, left: 1225, bottom: 350, voice: 0, text: "* Checklist:" },
                        { on: false, next: -1, image: "img/pillar.png", image_hl: "img/pillar-hl.png", scroll_width: 2950, left: -70, bottom: -100, voice: 5, text: "Intercom" },
                    ].map(function (x) {
                        x.onClick = function() {
                            x.on = false;

                            var f_phrase = {
                                lines: x.text.split("*").filter(function (elem) { return elem.length > 0 }),
                                start_index: -1,
                                end_index: -1,
                                paragraph_at_end: x.text.endsWith("**"),
                                linefeed_before: x.text.startsWith("*"),
                            };

                            $scope.foundPhrases.push(f_phrase);

                            if (x.next != -1)
                            {
                                page2soundscape.playVoiceRange(x.voice, x.voice, null);
                                $scope.components[x.next].on = true;
                            }
                            else
                            {
                                page2soundscape.playVoiceRange(6, 6, function() {
                                    $scope.$emit("pageEnd", 2);
                                });

                                $scope.foundPhrases = [
                                    "Situational assessment: do not say fucked",
                                    "instead the check-list. Engine:",
                                    "good: great lump of clock-springs",
                                    "that it is, but wound-- if only I'd a course",
                                    "to steer. Hull: I'm alive...",
                                    "and for the air: see also as above.",
                                    "Position: unknown: some shrapnel smashed the gauges",
                                    "but what needles remain are jammed",
                                    "against the end stops. We're falling-free, I guess,",
                                    "",
                                    "somewhen/where deep in history. Now...",
                                    "can I call the bridge up",
                                    "on the blower. Hallo... hallo... Kapitän?",
                                    "Nothing. Hallo? Well maybe this is for the best.",
                                    "The Lieutenant told me, late on watch,",
                                    "he'd seen the belfry of the Z-16",
                                    "five thousand years beneath us",
                                    "a skeleton in a Captain's cap",
                                    "still standing at the wheel. That's odd,"].map(
                                        function(t) {
                                            return {
                                                lines: [t],
                                                start_index: -1,
                                                end_index: -1,
                                                paragraph_at_end: true,
                                                linefeed_before: true
                                            };
                                        });
                            }
                        };
                        return x;
                    });

                    var interval_promise = null;
                    var scroll = 0;

                    function cancelMove () {
                        if (interval_promise) {
                            $interval.cancel(interval_promise);
                            interval_promise = null;
                        }
                    }

                    function startMove (vel) {
                        cancelMove();

                        interval_promise = $interval(function () {
                            scroll = Math.min(Math.max(0, scroll + vel), 100);

                            $scope.components.forEach(function(component) {
                                component.scroll = scroll;
                            }, this);

                            $scope.floor.scroll = scroll;
                            $scope.back.scroll = scroll;
                        }, 10);
                    }

                    $scope.leftStart = function (e) {
                        startMove(-.15);
                    };

                    $scope.rightStart = function (e) {
                        startMove(.15);
                    };

                    $scope.moveEnd = function (e) {
                        cancelMove();
                    };

                    $scope.foundPhrases = [];
                }]
            };
        }]);
})();