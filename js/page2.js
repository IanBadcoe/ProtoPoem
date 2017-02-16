'use strict';

(function () {
   angular.module("page2", [])
	.directive("page2", [ "$rootScope", function ($rootScope) {
	   return {
	      templateUrl: "/templates/page2template.html",
	      restrict: "E",
	      controller: ['$scope', '$element', function ($scope, $element) {
              $scope.mySubPage = 1;

              $scope.far_parallax_x = "7.5%";
              $scope.near_parallax_x = "7.5%";

              $scope.onMouseMove = function(e) {
                  // image is visible between 15% and 100% of the parent div
                  var fx = (e.clientX - $rootScope.live_left) / $rootScope.live_width;
                  fx = (fx - 0.15) / 0.85;

                  var parallax = (fx - 0.5) * 15;

                  var vals = { near: -parallax, far: parallax}

                  $scope.far_parallax_x = "{far}%";
                  $scope.near_parallax_x = "{near}%";
              };
	      }]
	   };
	}]);
})();