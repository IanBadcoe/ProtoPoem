(function () {
    var phrases = ["Too many stoats", "not enough string", "but don't ask me...",
        "I have no", "all good prunes", "sppons",
        "hats", "tree", "ape",
        "nose", "belief"];
    phrases = phrases.map(function (txt, idx) {
        return { text: txt, in_use: false, found: false, index: idx };
    });

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

                        $scope.sparkleSys = sparkleSys.init(phrases, $scope);

                        $scope.phrases = phrases;
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