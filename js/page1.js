(function () {
  angular.module("page1", ['page1soundscapeModule'])
    .directive("page1", function () {
      return {
        templateUrl: "templates/page1template.html",
        restrict: "E",
        controller: ['$scope', '$element', 'page1soundscape', function ($scope, $element, page1soundscape) {
          page1soundscape.start();

          $element.on("$destroy", function() { page1soundscape.end(); });
        }],
        link: function(scope, elem, attrs) {
          background_ng_elem = elem.find(".fog-background");
          anim_ng_elem = angular.element(elem).find(".anim-div");
          scope.$watch(function() {
            var f_dom = background_ng_elem.get(0);

            var l = f_dom.offsetLeft;
            var t = f_dom.offsetTop;
            var w = f_dom.offsetWidth;
            var h = f_dom.offsetHeight;

            return { l: l, t: t, w: w, h: h }
          },
          function(newValue)
          {
            anim_ng_elem.css("left", newValue.l + "px");
            anim_ng_elem.css("top", newValue.t + "px");
            anim_ng_elem.css("width", newValue.w + "px");
            anim_ng_elem.css("height", newValue.h + "px");
          }, true);

          background_ng_elem.on("load", function() {
            scope.$apply();
          });
        }
      };
    });
})();