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
    public class Background : StoryboardObjectGenerator
    {
        private double beat;
        public override void Generate()
        {
            beat = Beatmap.GetTimingPointAt(870).BeatDuration;

            Vignette();
            Intro();
            Logo();

            SetBackground("sb/gray.jpg", 11905, 33974, 33284);
            SetBackground("sb/gray.jpg", 33974, 56043, 55698);
            FlashArray(new int[] { 11905, 33974, 45008 });

            // kiai 1
            Kiai1();

            // buildup 1 
            RotateGrid(78112, 98457, 20);
            BuildUpTransition(89146, 98457);
            ColorBackground(98457, 99836, new Color4(48, 48, 54, 0));
            ColorBackground(99836, 100181, Color4.White);

            SquaresTransition();

            // kiai 2
            Kiai2();

            // cooldown 1
            SetBackground("sb/gray.jpg", 166388, 188457, 187939);
            SetBackground("sb/gray.jpg", 188457, 210526, 209836);
            FlashArray(new int[] { 166388, 188457, 199491 });

            // buildup 2
            RotateGrid(210526, 231905, 20);
            BuildUpTransition(227077, 231905);
            ColorBackground(231905, 232595, new Color4(48, 48, 54, 0));

            SpinningSquareTransition();

            // kiai 3
            Kiai3();

            // cooldown 2
            SetBackground("sb/gray.jpg", 298802, 320871, 320181);
            Flash(298802);
        }

        private void Vignette()
        {
            var vig = GetLayer("vig").CreateSprite("sb/vig.png", OsbOrigin.Centre);
            var bitmap = GetMapsetBitmap("sb/vig.png");
            vig.Scale(870, 480.0f / bitmap.Height);
            vig.Fade(870, 320871, 1, 1);
        }

        private void Intro()
        {
            // intro
            var white = GetLayer("background").CreateSprite("sb/dot.png", OsbOrigin.Centre);
            white.ScaleVec(870, new Vector2(854, 480));
            white.Fade(870, 11905, 0.1, 0.8);

            var leftCol = GetLayer("transition").CreateSprite("sb/dot.png", OsbOrigin.BottomCentre);
            leftCol.Color(870, Color4.Black);
            leftCol.ScaleVec(870, new Vector2(1000, 300));
            leftCol.Rotate(870, 11905, 0, MathHelper.DegreesToRadians(10));
            leftCol.MoveY(OsbEasing.InCirc, 870, 11905, 0, 240);

            var rightCol = GetLayer("transition").CreateSprite("sb/dot.png", OsbOrigin.TopCentre);
            rightCol.Color(870, Color4.Black);
            rightCol.ScaleVec(870, new Vector2(1000, 300));
            rightCol.Rotate(870, 11905, 0, MathHelper.DegreesToRadians(10));
            rightCol.MoveY(OsbEasing.InCirc, 870, 11905, 480, 240);
        }

        private void Flash(double startTime, bool isShort = false, double opacity = 0.4)
        {
            var flash = GetLayer("flash").CreateSprite("sb/dot.png", OsbOrigin.Centre);
            var flashDuration = isShort ? beat : beat * 1.5;
            flash.ScaleVec(startTime, new Vector2(854, 480));
            flash.Fade(startTime, startTime + beat * 1.5, opacity, 0);
        }

        private void FlashArray(int[] timestamps)
        {
            foreach (var timestamp in timestamps)
            {
                Flash(timestamp);
            }
        }

        private void SetBackground(string path, int startTime, int endTime, int startFadeOut = 0, double opacity = 0.5)
        {
            double temp = startTime;
            double fullBeat = beat * 4;
            var bg = GetLayer("background").CreateSprite(path, OsbOrigin.Centre);
            var bitmap = GetMapsetBitmap(path);

            bg.Scale(startTime, 480.0f / bitmap.Height);
            bg.Fade(startTime, opacity);
            bg.Fade(endTime, 0);
            while (temp <= endTime)
            {
                bg.Rotate(temp, temp + fullBeat * 2, MathHelper.DegreesToRadians(-1), MathHelper.DegreesToRadians(1));
                bg.Rotate(temp + fullBeat * 2, temp + fullBeat * 4, MathHelper.DegreesToRadians(1), MathHelper.DegreesToRadians(-1));
                temp += fullBeat * 4;
            }

            if (startFadeOut != 0) bg.Fade(startFadeOut, endTime, opacity, 0.2);

        }

        private void RotateGrid(int startTime, int endTime, double degree)
        {
            Flash(startTime);
            var grid = GetLayer("grid").CreateSprite("sb/grid.png", OsbOrigin.Centre);
            grid.Scale(startTime, 0.8456983);
            grid.Rotate(startTime, endTime, MathHelper.DegreesToRadians(0 - degree / 2), MathHelper.DegreesToRadians(degree / 2));
            grid.Fade(startTime, endTime, 0.1, 0.1);
            grid.Additive(startTime, endTime);

            var gridColor = GetLayer("gridcolor").CreateSprite("sb/grid-color.png", OsbOrigin.Centre);
            gridColor.Scale(startTime, 0.6072328);
            gridColor.Color(startTime, endTime, new Color4(135, 191, 255, 0), new Color4(20, 129, 186, 0));
            gridColor.Fade(startTime, endTime, 1, 1);

            var ring = GetLayer("gridring").CreateSprite("sb/c2.png", OsbOrigin.Centre);
            ring.Scale(startTime, 0.5375483);
            ring.Fade(startTime, endTime, 1, 1);

            var centerBg = GetLayer("undergrid").CreateSprite("sb/gray.jpg", OsbOrigin.Centre);
            centerBg.Scale(startTime, 0.25);
            centerBg.Fade(startTime, endTime, 0.8, 0.8);
            centerBg.Rotate(startTime, endTime, MathHelper.DegreesToRadians(0 - degree / 2), MathHelper.DegreesToRadians(degree / 2));
        }

        private void BuildUpTransition(int startTime, int endTime)
        {
            var leftCol = GetLayer("transition").CreateSprite("sb/dot.png", OsbOrigin.BottomCentre);
            leftCol.Color(startTime, new Color4(48, 48, 54, 0));
            leftCol.ScaleVec(startTime, new Vector2(1500, 700));
            leftCol.Rotate(OsbEasing.InExpo, startTime, endTime, 0, MathHelper.DegreesToRadians(75));
            leftCol.MoveY(OsbEasing.InExpo, startTime, endTime, 0, 240);

            var rightCol = GetLayer("transition").CreateSprite("sb/dot.png", OsbOrigin.TopCentre);
            rightCol.Color(startTime, new Color4(48, 48, 54, 0));
            rightCol.ScaleVec(startTime, new Vector2(1500, 700));
            rightCol.Rotate(OsbEasing.InExpo, startTime, endTime, 0, MathHelper.DegreesToRadians(75));
            rightCol.MoveY(OsbEasing.InExpo, startTime, endTime, 480, 240);
        }

        private void ColorBackground(int startTime, int endTime, Color4 color)
        {
            var bg = GetLayer("color-background").CreateSprite("sb/dot.png", OsbOrigin.Centre);
            bg.ScaleVec(startTime, new Vector2(847, 480));
            bg.Color(startTime, color);
            bg.Fade(startTime, endTime, 1, 1);
        }

        private void Kiai1()
        {
            var bg = GetLayer("background").CreateSprite("bg.jpg", OsbOrigin.Centre);
            var bitmap = GetMapsetBitmap("bg.jpg");
            var startTime = 56043;
            var endTime = 78112;
            var scale = 480.0f / bitmap.Height;
            int[] zoom = new int[] { 56043, 58802, 61560, 64319, 67077, 69836, 72595, 75353 };
            int[] flash = new int[] { 56043, 56560, 58802, 59319, 61560, 62077, 64319, 64836, 67077, 67595, 69836, 70353, 72595, 73112, 75353, 75871, 76388, 76905 };
            bg.Fade(startTime, 0.8);
            bg.Fade(endTime, 0);
            foreach (var timestamp in zoom)
            {
                bg.Scale(OsbEasing.OutBack, timestamp, timestamp + beat * 1.5, scale * 0.9, scale);
                bg.Rotate(timestamp, timestamp + beat * 1.5, MathHelper.DegreesToRadians(1), 0);
            }

            foreach (var timestamp in flash)
            {
                Flash(timestamp, true, 0.5);
            }

            bg.Fade(66733, 67077, 0.8, 0);
            bg.Fade(67077, 0.8);
            bg.Fade(77422, endTime, 0.8, 0);
        }

        private void Kiai2()
        {
            var startTime = 100181;
            var endTime = 166388;
            var bg = GetLayer("background").CreateSprite("bg.jpg", OsbOrigin.Centre);
            var bitmap = GetMapsetBitmap("bg.jpg");
            var scale = 480.0f / bitmap.Height;
            var opacity = 0.7;
            bg.Fade(startTime, opacity);
            bg.Fade(endTime, 0);

            // flash pattern
            double t = 100181;
            List<double> flash = new List<double>();
            int[] zoom = new int[] { 100181, 105698, 111215, 117077, 122250, 133284, 144319, 155353 };
            while (t <= 119491)
            {
                flash.Add(t);
                flash.Add(t + beat);
                flash.Add(t + beat * 2.5);
                flash.Add(t + beat * 3);
                t += beat * 4;
            }

            t = 119491;
            while (t <= 121560)
            {
                flash.Add(t);
                t += beat;
            }

            t = 122250;
            while (t <= 141560)
            {
                flash.Add(t);
                flash.Add(t + beat);
                flash.Add(t + beat * 2.5);
                flash.Add(t + beat * 3);
                t += beat * 4;
            }

            t = 141560;
            while (t <= 143284)
            {
                flash.Add(t);
                t += beat;
            }

            flash.AddRange(new double[] { 143284, 143457, 143802, 143974 });

            t = 144319;
            while (t <= 163629)
            {
                flash.Add(t);
                flash.Add(t + beat);
                flash.Add(t + beat * 2.5);
                flash.Add(t + beat * 3);
                t += beat * 4;
            }

            t = 163629;
            while (t <= 165008)
            {
                flash.Add(t);
                t += beat;
            }

            // ==
            foreach (var timestamp in zoom)
            {
                bg.Scale(OsbEasing.OutBack, timestamp, timestamp + beat, scale * 0.95, scale);
                bg.Rotate(timestamp, timestamp + beat, MathHelper.DegreesToRadians(1), 0);
            }

            foreach (var timestamp in flash)
            {
                Flash(timestamp, true, 0.5);
            }

            bg.Fade(121560, 122250, opacity, 0.2);
            bg.Fade(122250, opacity);
            bg.Fade(143974, 144319, opacity, 0.2);
            bg.Fade(144319, opacity);
            bg.Fade(165008, 166388, opacity, 0.2);
        }

        private void Kiai3()
        {
            var startTime = 232595;
            var endTime = 298802;
            var bg = GetLayer("background").CreateSprite("bg.jpg", OsbOrigin.Centre);
            var bitmap = GetMapsetBitmap("bg.jpg");
            var scale = 480.0f / bitmap.Height;
            var opacity = 0.7;
            bg.Fade(startTime, opacity);
            bg.Fade(endTime, 0);

            // flash pattern
            double t = 232595;
            List<double> flash = new List<double>();

            while (t < 253284)
            {
                flash.Add(t);
                t += beat;
            }

            t = 254664;
            while (t <= 276043)
            {
                flash.Add(t);
                t += beat;
            }

            t = 276733;
            while (t <= 298802)
            {
                flash.Add(t);
                t += beat;
            }

            // ==
            foreach (var timestamp in flash)
            {
                Flash(timestamp, true, 0.5);
                bg.Scale(OsbEasing.OutBack, timestamp, timestamp + beat, scale * 0.98, scale);
            }

            bg.Fade(253974, 254664, opacity, 0.2);
            bg.Fade(254664, opacity);
            bg.Fade(276043, 276733, opacity, 0.2);
            bg.Fade(276733, opacity);
            bg.Fade(298457, endTime, opacity, 0.2);
        }

        private void SpinningSquareTransition()
        {
            var square = GetLayer("transition").CreateSprite("sb/b.png", OsbOrigin.Centre);
            square.Rotate(OsbEasing.InSine, 231905, 232595, 0, MathHelper.DegreesToRadians(-360));
            square.Fade(231905, 232595, 0.8, 0.8);
            square.Scale(OsbEasing.InSine, 231905, 232595, 0, 6);
        }

        private void SquaresTransition()
        {
            var scale = new Vector2(70, 70);

            var pos1 = new Vector2(320 - 35 - 20 - 35, 240);
            var pos2 = new Vector2(320, 240);
            var pos3 = new Vector2(320 + 35 + 20 + 35, 240);
            var pos4 = new Vector2(320, 240 + 35 + 20 + 35);
            var pos5 = new Vector2(320, 240 - 35 - 20 - 35);

            var startTime = 98629;
            var endTime = 100181;
            var gTime = 99664;
            var tTime = 99836;

            var square1 = GetLayer("transition").CreateSprite("sb/dot.png", OsbOrigin.Centre, pos1);
            square1.Fade(startTime, startTime + beat / 2, 0.8, 0.8);
            square1.Fade(startTime + beat / 2, 0);
            square1.Fade(gTime, endTime, 0.8, 0.8);
            square1.ScaleVec(startTime, scale);
            square1.Color(startTime, Color4.White);
            square1.Color(tTime, Color4.Black);
            square1.ScaleVec(OsbEasing.OutSine, tTime, endTime, scale, Vector2.Zero);
            square1.Rotate(OsbEasing.OutSine, tTime, endTime, 0, MathHelper.DegreesToRadians(45));

            var square2 = GetLayer("transition").CreateSprite("sb/dot.png", OsbOrigin.Centre, pos2);
            square2.Fade(startTime, 0);
            square2.Fade(startTime + beat / 2, startTime + beat, 0.8, 0.8);
            square2.Fade(startTime + beat, 0);
            square2.Fade(startTime + beat * 2, startTime + beat * 5 / 2, 0.8, 0.8);
            square2.Fade(startTime + beat * 5 / 2, 0);
            square2.Fade(gTime, endTime, 0.8, 0.8);
            square2.ScaleVec(startTime + beat / 2, scale);
            square2.Color(startTime, Color4.White);
            square2.Color(tTime, Color4.Black);
            square2.ScaleVec(OsbEasing.OutSine, tTime, endTime, scale, Vector2.Zero);
            square2.Rotate(OsbEasing.OutSine, tTime, endTime, 0, MathHelper.DegreesToRadians(45));

            var square3 = GetLayer("transition").CreateSprite("sb/dot.png", OsbOrigin.Centre, pos3);
            square3.Fade(startTime, 0);
            square3.Fade(startTime + beat, startTime + beat * 3 / 2, 0.8, 0.8);
            square3.Fade(startTime + beat * 3 / 2, 0);
            square3.Fade(gTime, endTime, 0.8, 0.8);
            square3.ScaleVec(startTime + beat, scale);
            square3.Color(startTime, Color4.White);
            square3.Color(tTime, Color4.Black);
            square3.ScaleVec(OsbEasing.OutSine, tTime, endTime, scale, Vector2.Zero);
            square3.Rotate(OsbEasing.OutSine, tTime, endTime, 0, MathHelper.DegreesToRadians(45));

            var square4 = GetLayer("transition").CreateSprite("sb/dot.png", OsbOrigin.Centre, pos4);
            square4.Fade(startTime, 0);
            square4.Fade(startTime + beat * 3 / 2, startTime + beat * 2, 0.8, 0.8);
            square4.Fade(startTime + beat * 2, 0);
            square4.Fade(gTime, endTime, 0.8, 0.8);
            square4.ScaleVec(startTime + beat * 3 / 2, scale);
            square4.Color(startTime, Color4.White);
            square4.Color(tTime, Color4.Black);
            square4.ScaleVec(OsbEasing.OutSine, tTime, endTime, scale, Vector2.Zero);
            square4.Rotate(OsbEasing.OutSine, tTime, endTime, 0, MathHelper.DegreesToRadians(45));

            var square5 = GetLayer("transition").CreateSprite("sb/dot.png", OsbOrigin.Centre, pos5);
            square5.Fade(startTime, 0);
            square5.Fade(startTime + beat * 5 / 2, startTime + beat * 3, 0.8, 0.8);
            square5.Fade(startTime + beat * 3, 0);
            square5.Fade(gTime, endTime, 0.8, 0.8);
            square5.ScaleVec(startTime + beat * 5 / 2, scale);
            square5.Color(startTime, Color4.White);
            square5.Color(tTime, Color4.Black);
            square5.ScaleVec(OsbEasing.OutSine, tTime, endTime, scale, Vector2.Zero);
            square5.Rotate(OsbEasing.OutSine, tTime, endTime, 0, MathHelper.DegreesToRadians(45));
        }

        private void Logo()
        {
            var logo = GetLayer("logo").CreateSprite("sb/logo.png", OsbOrigin.Centre);
            var bitmap = GetMapsetBitmap("sb/logo.png");

            logo.Scale(6043, 30f / bitmap.Height);
            double temp = 6043;
            for (int i = 0; i < 3; i++)
            {
                logo.Fade(temp, 0.8);
                logo.Fade(temp + beat / 6, 0);
                temp += beat / 3;
            }
            logo.Fade(6388, 0.8);
            logo.Fade(7422, 7767, 0.8, 0);
        }
    }
}
