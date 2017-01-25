'use strict';

(function () {
   angular.module("page1out", ['page1soundscapeModule'])
	.directive("page1out", function () {
	   return {
	      templateUrl: "/templates/page1outTemplate.html",
	      restrict: "E",
	      controller: ['$scope', '$element', function ($scope, $element) {
	      }]
	   };
	});
})();