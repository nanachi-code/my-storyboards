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
    public class HitObjectHighlight : StoryboardObjectGenerator
    {
        private double beat;
        public override void Generate()
        {
            beat = Beatmap.GetTimingPointAt(870).BeatDuration;
            Color4 kiai = new Color4(235, 220, 203, 0);

            // pre kiai 1
            ThinRing(11905, 55957);
            Cross(21560, 22853, new Color4(152, 210, 235, 0), 0.5, true);
            Cross(43629, 44922, new Color4(152, 210, 235, 0), 0.5, true);

            // kiai 1
            Cross(56043, 78026, kiai);
            Ring(56043, 78026, kiai);

            // kiai 2
            Cross(100181, 166302, kiai);
            Ring(100181, 166302, kiai);

            // cooldown 1
            ThinRing(166388, 210439);

            // kiai 3
            Cross(232595, 298802, kiai);
            Ring(232595, 298802, kiai);

            // cooldown 2
            ThinRing(298802, 320871);

        }

        private void Cross(double startTime, double endTime, Color4 color, double horizontalOpacity = 0.7, bool isHorizontalOnly = false)
        {
            foreach (var hitobject in Beatmap.HitObjects)
            {
                if (hitobject.StartTime < startTime - 5 || endTime - 5 <= hitobject.StartTime)
                    continue;

                var horizontalSprite = GetLayer("cross").CreateSprite("sb/beam.png", OsbOrigin.Centre, hitobject.Position);
                horizontalSprite.Scale(hitobject.StartTime, 3);
                horizontalSprite.Fade(hitobject.StartTime, hitobject.EndTime + beat / 4, horizontalOpacity, 0);
                horizontalSprite.Rotate(hitobject.StartTime, hitobject.EndTime + beat / 4, MathHelper.DegreesToRadians(2), 0);
                horizontalSprite.Color(hitobject.StartTime, color);

                var verticalSprite = GetLayer("cross").CreateSprite("sb/beam.png", OsbOrigin.Centre, hitobject.Position);
                if (!isHorizontalOnly)
                {
                    verticalSprite.Scale(hitobject.StartTime, 3);
                    verticalSprite.Fade(hitobject.StartTime, hitobject.EndTime + beat / 4, 0.4, 0);
                    verticalSprite.Rotate(hitobject.StartTime, MathHelper.DegreesToRadians(90));
                    verticalSprite.Color(hitobject.StartTime, color);
                }

                if (hitobject is OsuSlider)
                {
                    var st = hitobject.StartTime;
                    while (true)
                    {
                        var et = st + beat / 4;

                        var complete = hitobject.EndTime - (st + beat / 4) < 5;
                        if (complete) et = hitobject.EndTime;

                        var startPosition = horizontalSprite.PositionAt(st);
                        horizontalSprite.Move(st, et, startPosition, hitobject.PositionAtTime(et));
                        if (!isHorizontalOnly)
                        {
                            verticalSprite.Move(st, et, startPosition, hitobject.PositionAtTime(et));
                        }

                        if (complete) break;
                        st += beat / 4;
                    }
                }
            }
        }

        private void Ring(double startTime, double endTime, Color4 color)
        {
            foreach (var hitobject in Beatmap.HitObjects)
            {
                if (hitobject.StartTime < startTime - 5 || endTime - 5 <= hitobject.StartTime)
                    continue;

                var sprite = GetLayer("ring").CreateSprite("sb/ring.png", OsbOrigin.Centre, hitobject.Position);
                sprite.Scale(hitobject.StartTime, hitobject.StartTime + beat * 1.5, 0.3, 0.5);
                if (hitobject.StartTime + beat * 1.5 < endTime)
                {
                    sprite.Fade(hitobject.StartTime, hitobject.StartTime + beat * 1.5, 0.5, 0);
                }
                else
                {
                    sprite.Fade(hitobject.StartTime, endTime, 0.5, 0);
                }

                sprite.Color(hitobject.StartTime, color);
            }
        }

        private void ThinRing(double startTime, double endTime)
        {
            foreach (var hitobject in Beatmap.HitObjects)
            {
                if (hitobject.StartTime < startTime - 5 || endTime - 5 <= hitobject.StartTime)
                    continue;

                var sprite = GetLayer("ring").CreateSprite("sb/ring2.png", OsbOrigin.Centre, hitobject.Position);
                sprite.Scale(hitobject.StartTime, hitobject.StartTime + beat * 1.5, 0.3, 0.5);
                if (hitobject.StartTime + beat * 1.5 < endTime)
                {
                    sprite.Fade(hitobject.StartTime, hitobject.StartTime + beat * 1.5, 0.3, 0);
                }
                else
                {
                    sprite.Fade(hitobject.StartTime, endTime, 0.3, 0);
                }
            }
        }
    }
}
