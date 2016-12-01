(function () {
    function initPhrases($scope, phrases) {
        return phrases.map(function (txt, idx) {
            var ret = {
                text: txt,
                in_use: false,
                found: false,
                index: idx
            };

            ret.onClick = function() {
                $scope.foundPhrases.push({
                    text: ret.text,
                    index: ret.index
                });

                ret.found = true;
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

                        $scope.nextSubPage = function() {
                            $scope.mySubPage = $scope.mySubPage % 3 + 1;
                            $scope.sparkleSys.beginSubPage();
                        };

                        $scope.mySubPage = 1;

                        $scope.phrases = initPhrases($scope, [
                            "So deep.",
                            "So deep that all I hear",
                            "is metal stress;",
                            "the griping of the outer hull",
                            "as plates and rivets age at different rates.\n",
                            "The push",
                            "of time so pressing in",
                            "upon our moment here and now;",
                            "whatever 'now' may mean. Don't think",
                            "of that. Thoughts won't help us to survive;",
                            "if we still are an us? I'm wading",
                            "through the Lieutenant here",
                            "although there's so much blood I wonder...",
                            "Don't think of that."]);
                        $scope.captions = [ "Somewhere in Time",
                            "Time, later the same day",
                            "Another moment, possibly the same"];

                        $scope.sparkleSys = sparkleSys.init($scope.phrases, $scope);

                        $scope.foundPhrases = [];
                    }]
            };
        }])
        .directive("page1a", function() {
            return {
                templateUrl: "templates/page1aTemplate.html",
                restrict: "E",
                controller: ['$scope', function($scope) {
                    $scope.debug = "page1a";
                }]
            };
        })
        .directive("page1b", function() {
            return {
                templateUrl: "templates/page1bTemplate.html",
                restrict: "E",
                controller: ['$scope', function($scope) {
                    $scope.debug = "page1b";
                }]
            };
        })
        .directive("page1c", function() {
            return {
                templateUrl: "templates/page1cTemplate.html",
                restrict: "E",
                controller: ['$scope', function($scope) {
                    $scope.debug = "page1c";
                }]
            };
        });
})();