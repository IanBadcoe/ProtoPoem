(function () {
    angular.module('page1soundscapeModule', [])
        .service('page1soundscape', function()
        {
            this.start = function() { alert("started"); };
            this.end = function() { alert("ended"); };
        });
})();