(function () {
    angular.module('page2soundscapeModule', [])
        .service('page2soundscape', function () {
            function stdHowl(file) {
                return new Howl({
                    src: [file],
                    panningModel: 'HRTF',
                    refDistance: 10,
                    rolloffFactor: 1,
                    distanceModel: 'inverse'
                });
            };

            var sounds = [
                stdHowl("sound/wind/1.mp3"),
                stdHowl("sound/wind/2.mp3"),
                stdHowl("sound/wind/3.mp3"),
                stdHowl("sound/wind/4.mp3")
            ];

            var voices = [
                stdHowl("voice/1-00-So Deep.mp3"),
                stdHowl("voice/1-01-So Deep That.mp3"),
                stdHowl("voice/1-02-Is Metal Stress.mp3"),
                stdHowl("voice/1-03-The Griping.mp3"),
                stdHowl("voice/1-04-As Plates.mp3"),
                stdHowl("voice/1-05-The Push.mp3"),
                stdHowl("voice/1-06-Upon Our Moment.mp3"),
                stdHowl("voice/1-07-Whatever Now.mp3"),
                stdHowl("voice/1-08-Don't Think.mp3"),
                stdHowl("voice/1-09-Thoughts Won't.mp3"),
                stdHowl("voice/1-10-If We.mp3"),
                stdHowl("voice/1-11-I'm Wading.mp3"),
                stdHowl("voice/1-12-Although There's.mp3"),
                stdHowl("voice/1-13-Don't Think.mp3")
            ];

            var voiceHowl = null;
            var voiceId = null;

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

                setTimeout(step, Math.random() * 500 + 500);
            }

            this.start = function () { running = true; step(); };
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