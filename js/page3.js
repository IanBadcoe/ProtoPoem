'use strict';

(function () {
   angular.module("page3", [])
	.directive("page3", function () {
	   return {
	      templateUrl: "/templates/page3template.html",
	      restrict: "E",
	      controller: ['$scope', '$element', function ($scope, $element) {
	      }]
	   };
	});
})();