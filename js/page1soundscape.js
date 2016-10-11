(function () {
    angular.module('page1soundscapeModule', [])
        .service('page1soundscape', function()
        {
            this.page1soundscape = {
                start: function() { alert("started"); },
                end: function() { alert("ended"); }
            };
        });
})();