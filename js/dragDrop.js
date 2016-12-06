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
        return {
            restrict: 'A',
            scope: {
                onDrop: '&'
            },
            link: function (scope, el, attrs, controller) {
                var ang_el = angular.element(el);
                var id = ang_el.attr("id");

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

                el.bind("dragenter", function (e) {
                    // this / e.target is the current hover target.
                    angular.element(e.originalEvent.target).addClass('drag-drop-over');
                });

                el.bind("dragleave", function (e) {
                    angular.element(e.originalEvent.target).removeClass('drag-drop-over');  // this / e.target is previous target element.
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

                    scope.onDrop()({ dragEl: src, dropEl: dest });
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