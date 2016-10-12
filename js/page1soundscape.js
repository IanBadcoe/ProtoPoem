(function () {
    angular.module('page1soundscapeModule', [])
        .service('page1soundscape', function()
        {
            sounds = [
                new Howl({
                    src: ["sound/wind/1.mp3"],
                    panningModel: 'HRTF',
                    refDistance: 10,
                    rolloffFactor: 1,
                    distanceModel: 'inverse'
                }),
                new Howl({
                    src: ["sound/wind/2.mp3"],
                    panningModel: 'HRTF',
                    refDistance: 10,
                    rolloffFactor: 1,
                    distanceModel: 'inverse'
                }),
                new Howl({
                    src: ["sound/wind/3.mp3"],
                    panningModel: 'HRTF',
                    refDistance: 10,
                    rolloffFactor: 1,
                    distanceModel: 'inverse'
                }),
                new Howl({
                    src: ["sound/wind/4.mp3"],
                    panningModel: 'HRTF',
                    refDistance: 10,
                    rolloffFactor: 1,
                    distanceModel: 'inverse'
                })
            ];

            function launchSound()
            {
                var x = Math.random() * 1000 - 500;
                var y = Math.random() * 1000 - 500;
                var z = Math.random() * 1000 - 500;

                var which = sounds[Math.floor(Math.random() * 4)];

                var id = which.play();
                which.pos(x, y, z, id);
            }

            var running;

            function step()
            {
                if (!running) return;

                launchSound();

                setTimeout(step, 1000);
            }

            this.start = function() { running = true; step(); };
            this.end = function() { running = false; };
        });
})();