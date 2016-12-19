angular.module("dragdropModule", ['uuidModule'])
    .directive('myDraggable', ['$rootScope', 'uuid', function ($rootScope, uuid) {
        return {
            restrict: 'A',
            link: function (scope, el, attrs, controller) {
                console.log("linking draggable element");

                var ang_el = angular.element(el);
                ang_el.attr("draggable", "true");
                var id = ang_el.attr("id");

                if (!id) {
                    id = uuid.new()
                    ang_el.attr("id", id);
                }

                el.bind("dragstart", function (e) {
                    e.originalEvent.dataTransfer.setData('text', id);

                    $rootScope.$emit("DRAG-START");
                });

                el.bind("dragend", function (e) {
                    $rootScope.$emit("DRAG-END");
                });
            }
        }
    }])
    .directive('myDropTarget', ['$rootScope', 'uuid', function ($rootScope, uuid) {
        function dropTargetParent(e) {
            var f = angular.element(e)
            while(f[0].parentElement && !f.attr("my-drop-target"))
                f = angular.element(f[0].parentElement);

            return f;
        };

        var mouseOver = null;
        var above = false;

        return {
            restrict: 'A',
            scope: {
                onDrop: '&'
            },
            link: function (scope, el, attrs, controller) {
                var ang_el = angular.element(el);
                var id = ang_el.attr("id");

                ang_el.attr("my-drop-target", true);

                if (!id) {
                    id = uuid.new()
                    ang_el.attr("id", id);
                }

                el.bind("dragover", function (e) {
                    if (e.originalEvent.preventDefault) {
                        e.originalEvent.preventDefault(); // Necessary. Allows us to drop.
                    }

                    e.originalEvent.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.
                    return false;
                });

                function unmouse(el) {
                    if (el)
                    {
                        el.removeClass('drag-drop-over-before');
                        el.removeClass('drag-drop-over-after');
                    }
                };

                el.bind("dragover", function(e){
                    var t = dropTargetParent(e.originalEvent.target);
                    var rect = t[0].getBoundingClientRect();
                    var el_top = rect.top;
                    var el_height = t[0].offsetHeight;

                    var frac_y = (e.pageY - el_top) / el_height;

                    console.log(e.pageY - el_top, el_height, frac_y);

                    above = frac_y < 0.5;

                    if (above)
                    {
                        t.addClass('drag-drop-over-before');
                        t.removeClass('drag-drop-over-after');
                    }
                    else
                    {
                        t.removeClass('drag-drop-over-before');
                        t.addClass('drag-drop-over-after');
                    }
                });

                el.bind("dragenter", function (e) {
                    var t = dropTargetParent(e.originalEvent.target);

                    unmouse(mouseOver);

                    mouseOver = t;
                });

                el.bind("dragleave", function (e) {
                    unmouse(mouseOver);
                });

                el.bind("drop", function (e) {
                    if (e.originalEvent.preventDefault) {
                        e.originalEvent.preventDefault(); // Necessary. Allows us to drop.
                    }

                    if (e.originalEvent.stopPropogation) {
                        e.originalEvent.stopPropogation(); // Necessary. Allows us to drop.
                    }
                    var data = e.originalEvent.dataTransfer.getData("text");
                    var dest = document.getElementById(id);
                    var src = document.getElementById(data);

                    scope.onDrop()({ dragEl: src, dropEl: dest, above: above });

                    unmouse(mouseOver);
                });

                $rootScope.$on("DRAG-START", function () {
                    var el = document.getElementById(id);
                    angular.element(el).addClass("drag-drop-target");
                });

                $rootScope.$on("DRAG-END", function () {
                    var el = document.getElementById(id);
                    angular.element(el).removeClass("drag-drop-target");
                    angular.element(el).removeClass("drag-drop-over");
                });
            }
        }
    }]);