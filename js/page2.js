'use strict';

(function () {
   angular.module("page2", [])
	.directive("page2", function () {
	   return {
	      templateUrl: "/templates/page2template.html",
	      restrict: "E",
	      controller: ['$scope', '$element', function ($scope, $element) {
              $scope.mySubPage = 1;
	      }]
	   };
	});
})();