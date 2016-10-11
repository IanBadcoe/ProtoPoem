'use strict';

(function () {
/*    var sound = new Howl({
        src: ['sound/pin.mp3'],
        panningModel: 'HRTF',
        refDistance: 200,
        rolloffFactor: 1,
        distanceModel: 'linear'
    });

    function pin() {
        var x = Math.random() * 1000 - 500;
        var y = Math.random() * 1000 - 500;
        sound.pos(x, y, 0);
        sound.play();
    };

    sound.on('end', function(){
        pin();
    }); */

    angular.module('app', ["page1", "page2", "page3"])
        .controller('pageController', ['$scope', '$location', '$window', function ($scope, $location, $window) {
            $scope.myPage = 1;
            $scope.pageNavigate = function(i) { $scope.myPage = i; };
            angular.element($window).on("resize", function() {
                $scope.$apply();
            });

/*            Howler.pos(0, 0, 0);

            pin(); */
        }
        ])
})();
