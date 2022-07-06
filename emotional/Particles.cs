using OpenTK;
using OpenTK.Graphics;
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
    public class Particles : StoryboardObjectGenerator
    {
        private double beat;
        public override void Generate()
        {
            beat = Beatmap.GetTimingPointAt(870).BeatDuration;

            Circles(11905, 56043);
            Circles(166388, 210526);
            Circles(298802, 320871);
            Squares(11905, 56043);
            Squares(166388, 210526);
            Squares(298802, 320871);
        }

        private void Circles(double startTime, double endTime)
        {
            var timestep = beat;
            // calc wave
            int wave = (int)((endTime - startTime) / timestep);
            int amountPerWave = 1;
            double timeTravel = beat * 4 * 22;
            var startY = 0;
            var endY = 480;

            var st = startTime;
            for (int i = 0; i < wave; i++)
            {
                var et = st + timeTravel;
                for (int j = 0; j < amountPerWave; j++)
                {
                    var sprite = GetLayer("particles").CreateSprite("sb/p.png", OsbOrigin.Centre, new Vector2(Random(-107, 747), startY));
                    sprite.Scale(st, Random(0.4, 0.6));
                    sprite.Fade(st, 0.15);
                    sprite.Fade(endTime - beat, endTime, 0.15, 0);
                    sprite.MoveY(st, et, startY, endY);
                }
                st += timestep;
            }
        }

        private void Squares(double startTime, double endTime)
        {
            var timestep = beat * 8;
            // calc wave
            int wave = (int)((endTime - startTime) / timestep);
            int amountPerWave = 1;
            double timeTravel = beat * 4 * 22;
            var startY = 0;
            var endY = 480;

            var st = startTime;
            for (int i = 0; i < wave; i++)
            {
                var et = st + timeTravel;
                for (int j = 0; j < amountPerWave; j++)
                {
                    var square = GetLayer("particles").CreateSprite("sb/b.png", OsbOrigin.Centre, new Vector2(Random(-107, 747), startY));
                    square.Scale(st, Random(0.2, 0.4));
                    square.Fade(st, 0.15);
                    square.Fade(endTime - beat, endTime, 0.15, 0);
                    square.MoveY(st, et, startY, endY);
                }
                st += timestep;
            }
        }
    }
}
