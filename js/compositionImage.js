(function () {
    angular.module("compositionImageModule", [])
        .directive("compositionImage", [ "$rootScope", function ($rootScope) {
            function handleResize($scope, rootScope) {
                // wait until the image is loaded
                if (!$scope.config.natural_height) return;

                // fullscreen images are this high
                var unscaled_max_height = 900.0;

                // our graphics are created with a (max) height of unscaled_max_height
                // so our on-screen height/width need to be in that ratio
                $scope.scale_factor = rootScope.live_height / unscaled_max_height;
                $scope.style_height = $scope.scale_factor * $scope.config.natural_height + "px";
                $scope.style_width = $scope.scale_factor * $scope.config.natural_width + "px";

                {
                    var l = 0;
                    $scope.config.image.forEach(function (x) {
                        var w = $scope.widths[x.image];
                        var h = $scope.heights[x.image];
                        if (w) {
                            x.width = w * $scope.scale_factor;
                            x.height = h * $scope.scale_factor;
                            x.left = l;
                            console.log(x.image + ": " + w + "(" + x.width + ") " + l + "\n");
                            l = l + x.width;
                        }
                    });
                }

                if ($scope.config.image_hl)
                {
                    var l = 0;
                    $scope.config.image_hl.forEach(function (x) {
                        var w = $scope.widths[x.image];
                        var h = $scope.heights[x.image];
                        if (w) {
                            x.width = w * $scope.scale_factor;
                            x.height = h * $scope.scale_factor;
                            x.left = l;
                            console.log(x.image + ": " + w + "(" + x.width + ") " + l + "\n");
                            l = l + x.width;
                        }
                    });
                }

                recalcStyle($scope, rootScope);
            }

            function recalcStyle($scope, rootScope) {
                // wait until we've done a resize
                if (!$scope.style_height) return;

                // the visible part of the screen is this wide
                var inner_width = rootScope.live_width * 0.85;

                // we can scroll by the difference between that and our scroll_width
                var max_scroll = $scope.config.scroll_width - inner_width;

                $scope.style_left = -$scope.config.scroll * max_scroll / 100.0 + $scope.config.left * $scope.scale_factor + "px";
                $scope.style_bottom = $scope.config.bottom * $scope.scale_factor + "px";
            }

            return {
                templateUrl: "templates/compositionImageTemplate.html",
                restrict: "E",
                scope: {
                    config: "="
                },
                controller: ['$scope', '$element', function ($scope, $element) {
                    $scope.widths = {};
                    $scope.heights = {};

                    $scope.config.left = $scope.config.left || 0.0;
                    $scope.config.bottom = $scope.config.bottom || 0.0;
                    $scope.config.scroll = $scope.config.scroll || 0.0;

                    $scope.$watch("config.scroll", function () {
                        recalcStyle($scope, $rootScope);
                    });

                    $scope.classes = "no-hover";

                    if (!Array.isArray($scope.config.image))
                    {
                        $scope.config.image = [ $scope.config.image ];
                    }

                    $scope.config.image = $scope.config.image.map(function (x) {
                        return {
                            image: x,
                            left: 0,
                            width: 0,
                            height: 0
                        }
                    });

                    $scope.hl = false;

                    if ($scope.config.image_hl) {
                        if (!Array.isArray($scope.config.image_hl))
                        {
                            $scope.config.image_hl = [ $scope.config.image_hl ];
                        }

                        $scope.mouseEnter = function() {
                            if ($scope.config.on)
                                $scope.hl = true;
                        };

                        $scope.mouseLeave = function() {
                            $scope.hl = false;
                        };

                        $scope.onClick = function() {
                            return $scope.config.onClick();
                        };

                        $scope.classes = "hover";

                        $scope.config.image_hl = $scope.config.image_hl.map(function (x) {
                            return {
                                image: x,
                                left: 0,
                                width: 0
                            }
                        });
                    }

                    $rootScope.$on("resize", function () {
                        handleResize($scope, $rootScope);
                    });
                }],
                link: function ($scope, el, attrs, controller) {
                    el.ready(function () {
                        var ang_el = angular.element(el);

                        var my_images = angular.element(ang_el.find("img"));

                        angular.element(my_images[0]).on("load", function(ev) {
                            $scope.config.natural_height = ev.target.naturalHeight;

                            handleResize($scope, $rootScope);

                            $scope.$apply();
                        });

                        $scope.config.natural_width = 0;
                        my_images.one("load", function(ev){
                            $scope.config.natural_width += ev.target.naturalWidth;
                            var name = ev.target.src;
                            name = name.substring(name.lastIndexOf("img/"));
                            $scope.widths[name] = ev.target.naturalWidth;
                            $scope.heights[name] = ev.target.naturalHeight;

                            handleResize($scope, $rootScope);

                            $scope.$apply();
                        });
                    });
                }
            };
        }]);
})();