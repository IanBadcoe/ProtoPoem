(function () {
    angular.module('page2soundscapeModule', [])
        .service('page2soundscape', function () {
            function stdHowl(file) {
                return new Howl({
                    src: [file],
                    panningModel: 'HRTF',
                    refDistance: 500,
                    rolloffFactor: 0.5,
                    distanceModel: 'inverse'
                });
            };

            var sounds = [
                stdHowl("sound/hull/bang.mp3"),
                stdHowl("sound/hull/craaang.mp3"),
                stdHowl("sound/hull/skreach1.mp3"),
                stdHowl("sound/hull/skreach2.mp3")
            ];

            var voices = [
//                stdHowl("voice/1-00-So Deep.mp3"),
            ];

            var clock = stdHowl("sound/inside/clock.mp3")

            var voiceHowl = null;
            var voiceId = null;

            var clockId = null;

            function launchSound() {
                var x = Math.random() * 1000 - 500;
                var y = Math.random() * 1000 - 500;
                var z = Math.random() * 1000 - 500;

                var which = sounds[Math.floor(Math.random() * 4)];

                var id = which.play();
                which.pos(x, y, z, id);
                which.fade(0, 1, 200, id);
                which.once("fade", function () {
                    // duration in seconds, fade in milliseconds
                    var remain = (which.duration(id) - which.seek(id)) * 1000;
                    // fade doesn't work on vanishingly small periods
                    // and who can hear < 1ms anyway?
                    if (remain > 1) {
                        which.fade(1, 0, remain, id);
                    }
                }, id);
            }

            var running;

            function step() {
                if (!running) return;

                launchSound();

                setTimeout(step, Math.random() * 3000 + 3000);
            }

            function playClock() {
                if (!running) return;

                clockId = clock.play();
                clock.on("end", function() { playClock(); }, clockId);
            }

            this.start = function () {
                running = true;
                step();
                playClock();
            };
            this.end = function () { running = false; };
            this.playVoiceRange = function (startIdx, endIdx, endCallback = null) {
                if (voiceHowl != null) {
                    voiceHowl.fade(1, 0, 100, voiceId);
                    voiceHowl.off("end", null, voiceId);
                    voiceHowl = null;
                    voiceId = null;
                }

                voiceStart = startIdx;
                voiceEnd = endIdx;
                voiceNext = startIdx - 1;

                playNextVoice();

                function playNextVoice() {
                    voiceNext++;

                    if (voiceNext <= voiceEnd) {
                        voiceHowl = voices[voiceNext];
                        voiceId = voiceHowl.play();
                        voiceHowl.on("end", function () { playNextVoice() }, voiceId);
                    }
                    else if (endCallback != null) {
                        endCallback();
                    }
                };
            }
        });
})();