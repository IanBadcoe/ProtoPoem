(function () {
    function checkMergeFoundPhrases($scope, page1soundscape) {
        var ff = $scope.foundPhrases;
        var found = -1;
        for(var i = 0; i < ff.length - 1; ) {
            if (ff[i].end_index === ff[i + 1].start_index - 1)
            {
                found = i;
                if (ff[i].paragraph_at_end) {
                    ff[i].lines.push("");
                    // only do this once
                    ff[i].paragraph_at_end = false;
                }

                if (!ff[i + 1].linefeed_before)
                {
                    var here_length = ff[i].lines.length;

                    ff[i].lines[here_length - 1] = ff[i].lines[here_length - 1].concat(ff[i + 1].lines[0]);
                    ff[i + 1].lines.splice(0, 1);
                    // only do this once
                    ff[i + 1].linefeed_before = false;
                }

                ff[i + 1].lines.forEach(function(elem) { ff[i].lines.push(elem); });

                // we still end at the same point...
                ff[i].end_index = ff[i + 1].end_index;
                ff[i].paragraph_at_end = ff[i + 1].paragraph_at_end;

                // discard merged elephant
                ff.splice(i + 1, 1);
            }
            else
            {
                i++;
            }

            // if we get the unfound phrases down to none and the found ones all merged into one
            // then we're done
            if (ff.length === 1 && $scope.phrases.filter(function (x) { return !(x.found) }).length == 0) {
                $scope.$emit("pageEnd", 1);
            }
        }

        if (found != -1) {
            page1soundscape.playVoiceRange(ff[found].start_index, ff[found].end_index);
        }
    };

    function initPhrases($scope, phrases, page1soundscape) {
        return phrases.map(function (txt, idx) {
            var ret = {
                text: txt,
                in_use: false,
                found: false,
                index: idx
            };

            ret.onClick = function () {
                var f_phrase = {
                    lines: ret.text.split("*").filter(function(elem) { return elem.length > 0}),
                    start_index: ret.index,
                    end_index: ret.index,
                    paragraph_at_end: ret.text.endsWith("**"),
                    linefeed_before: ret.text.startsWith("*"),
                };
                f_phrase.play = function() {
                    page1soundscape.playVoiceRange(f_phrase.start_index, f_phrase.end_index);
                };

                $scope.foundPhrases.push(f_phrase);
                f_phrase.play();

                ret.found = true;

                checkMergeFoundPhrases($scope, page1soundscape);
            }

            return ret;
        });
    };

    angular.module("page1", ['page1soundscapeModule', 'sparklePlaneModule', 'sparkleModule', 'animationEndModule',
        'sparkleSysModule', 'phrasePlaneModule'])
        .directive("page1", ['sparkleSys', function (sparkleSys) {
            return {
                templateUrl: "templates/page1template.html",
                restrict: "E",
                controller: ['$scope', '$element', 'page1soundscape',
                    function ($scope, $element, page1soundscape) {
                        page1soundscape.start();

                        $element.on("$destroy", function () {
                            page1soundscape.end();
                            $scope.sparkleSys.end();
                        });

                        $scope.terminate = false;

                        $scope.nextSubPage = function () {
                            $scope.mySubPage = $scope.mySubPage % 3 + 1;
                            $scope.sparkleSys.beginSubPage();
                        };

                        $scope.mySubPage = 1;

                        $scope.phrases = initPhrases($scope, [
                            "*So deep. *",
                            "*So deep that all I hear *",
                            "*is metal stress; *",
                            "*the griping of the outer hull *",
                            "*as plates and rivets age at different rates. **",
                            "*The push *of time so pressing in *",
                            "*upon our moment here and now; *",
                            "*whatever 'now' may mean. ",
                            "Don't think *of that. ",
                            "Thoughts won't help us to survive; *",
                            "* if we still are an us? ",
                            "I'm wading *through the Lieutenant here *",
                            "*although there's so much blood I wonder... *",
                            "*Don't think of that."],
                            page1soundscape);
                        $scope.captions = ["Somewhere in Time",
                            "Time, later the same day",
                            "Another moment, possibly the same"];

                        $scope.sparkleSys = sparkleSys.init($scope.phrases, $scope);

                        $scope.foundPhrases = [];

                        $scope.onPhraseDrop = function (e) {
                            var ang_el_drag = angular.element(e.dragEl);
                            var ang_el_drop = angular.element(e.dropEl);

                            var scope_drag = ang_el_drag.scope();
                            var scope_drop = ang_el_drop.scope();

                            if (scope_drag.foundPhrase != scope_drop.foundPhrase) {
                                var start_idx = $scope.foundPhrases.findIndex(function (element) { return scope_drag.foundPhrase === element; });
                                var p = $scope.foundPhrases.splice(start_idx, 1);
                                var dest_idx = $scope.foundPhrases.findIndex(function (element) { return scope_drop.foundPhrase === element; });
                                if (!e.above) dest_idx++;

                                $scope.foundPhrases.splice(dest_idx, 0, p[0]);

                                checkMergeFoundPhrases($scope, page1soundscape);
                            }
                        }
                    }]
            };
        }])
        .directive("page1a", function () {
            return {
                templateUrl: "templates/page1aTemplate.html",
                restrict: "E",
                controller: ['$scope', function ($scope) {
                    $scope.debug = "page1a";
                }]
            };
        })
        .directive("page1b", function () {
            return {
                templateUrl: "templates/page1bTemplate.html",
                restrict: "E",
                controller: ['$scope', function ($scope) {
                    $scope.debug = "page1b";
                }]
            };
        })
        .directive("page1c", function () {
            return {
                templateUrl: "templates/page1cTemplate.html",
                restrict: "E",
                controller: ['$scope', function ($scope) {
                    $scope.debug = "page1c";
                }]
            };
        });
})();