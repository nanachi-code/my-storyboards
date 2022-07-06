using OpenTK;
using OpenTK.Graphics;
using StorybrewCommon.Animations;
using StorybrewCommon.Mapset;
using StorybrewCommon.Scripting;
using StorybrewCommon.Storyboarding;
using StorybrewCommon.Storyboarding.Util;
using StorybrewCommon.Subtitles;
using StorybrewCommon.Util;
using System;
using System.Collections.Generic;
using System.Linq;

namespace StorybrewScripts
{
    public class Spectrum : StoryboardObjectGenerator
    {
        private double beat;
        public override void Generate()
        {
            beat = Beatmap.GetTimingPointAt(870).BeatDuration;

            BarSpectrum(122250, 166043);
            BarSpectrum(232595, 298802);
        }

        private void BarSpectrum(double startTime, double endTime)
        {
            var barCount = 40;
            var fftTimeStep = beat / 4;
            var fftOffset = fftTimeStep * 0.2;
            var logScale = 600;
            var barBitmap = GetMapsetBitmap("sb/bar.png");
            float fullWidth = 640;
            float barWidth = fullWidth / barCount;
            var barYKeyframes = new KeyframedValue<float>[barCount];
            float barMargin = 840f / (barCount - 1);
            float maxHeight = 70;
            float minHeight = 0.05f;
            var tolerance = 0.2;
            var scaleRatio = barWidth / barBitmap.Width;

            for (var i = 0; i < barCount; i++)
            {
                barYKeyframes[i] = new KeyframedValue<float>(null);
            }

            for (var time = (double)startTime; time < endTime; time += fftTimeStep)
            {
                var fft = GetFft(time + fftOffset, barCount, null);
                for (var i = 0; i < barCount; i++)
                {
                    float height = (float)Math.Log10(1 + fft[i] * logScale) * maxHeight / barBitmap.Height;
                    if (height < minHeight) height = minHeight;

                    barYKeyframes[i].Add(time, height);
                }
            }

            var scaleX = barWidth / barBitmap.Width;
            scaleX = (float)Math.Floor(scaleX * 10) / 10.0f;
            var barX = 320 - fullWidth / 2;

            for (var i = 0; i < barCount; i++)
            {
                var keyframes = barYKeyframes[i];
                // remove keyframes with close value
                keyframes.Simplify1dKeyframes(tolerance, h => h);

                var barSprite = GetLayer("spectrum").CreateSprite("sb/bar.png", OsbOrigin.Centre, new Vector2(barX + barWidth * i, 240));
                barSprite.CommandSplitThreshold = 300; // what does this do
                barSprite.Fade(endTime - beat / 2, endTime, 0.3, 0);

                var hasScale = false;
                keyframes.ForEachPair(
                    (start, end) =>
                    {
                        hasScale = true;
                        barSprite.ScaleVec(start.Time, end.Time,
                            scaleX, start.Value,
                            scaleX, end.Value);
                    },
                    minHeight
                );
                if (!hasScale) barSprite.ScaleVec(startTime, scaleX, minHeight);
            }
        }
    }
}
