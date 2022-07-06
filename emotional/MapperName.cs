using OpenTK;
using OpenTK.Graphics;
using StorybrewCommon.Mapset;
using StorybrewCommon.Scripting;
using StorybrewCommon.Storyboarding;
using StorybrewCommon.Storyboarding.Util;
using StorybrewCommon.Subtitles;
using StorybrewCommon.Util;
using System;
using System.Drawing;
using System.Collections.Generic;
using System.Linq;

namespace StorybrewScripts
{
    public class MapperName : StoryboardObjectGenerator
    {
        private double beat;
        public override void Generate()
        {
            beat = Beatmap.GetTimingPointAt(870).BeatDuration;

            Display();
        }

        private void Display()
        {
            // init font
            var font = LoadFont("sb/font", new FontDescription()
            {
                FontPath = "ADELIA.otf",
                FontSize = 36,
                Color = Color4.White,
                Padding = Vector2.Zero,
                FontStyle = FontStyle.Regular,
                TrimTransparency = true
            });

            // list
            Dictionary<int[], string> list = new Dictionary<int[], string>();
            list.Add(new int[] { 870, 11905 }, "ohm");
            list.Add(new int[] { 11905, 22939 }, "NathanBound");
            list.Add(new int[] { 22939, 33974 }, "Ducky");
            list.Add(new int[] { 33974, 45008 }, "Nanachi");
            list.Add(new int[] { 45008, 56043 }, "Kyrian");
            list.Add(new int[] { 56043, 67077 }, "Nagaraia");
            list.Add(new int[] { 67077, 78112 }, "Aqua");
            list.Add(new int[] { 78112, 89146 }, "Ducky");
            list.Add(new int[] { 89146, 100181 }, "ohm");
            list.Add(new int[] { 100181, 111215 }, "Aqua");
            list.Add(new int[] { 111215, 122250 }, "Nagaraia");
            list.Add(new int[] { 122250, 133284 }, "Nanachi");
            list.Add(new int[] { 133284, 144319 }, "Kyrian");
            list.Add(new int[] { 144319, 155353 }, "ohm");
            list.Add(new int[] { 155353, 166388 }, "Kris");
            list.Add(new int[] { 166388, 177422 }, "Nagaraia");
            list.Add(new int[] { 177422, 188457 }, "Nanachi");
            list.Add(new int[] { 188457, 199491 }, "Aqua");
            list.Add(new int[] { 199491, 210526 }, "Kris");
            list.Add(new int[] { 210526, 221560 }, "Ducky");
            list.Add(new int[] { 221560, 232595 }, "Kondou");
            list.Add(new int[] { 232595, 243629 }, "Nanachi");
            list.Add(new int[] { 243629, 254664 }, "Kyrian");
            list.Add(new int[] { 254664, 265698 }, "NathanBound");
            list.Add(new int[] { 265698, 276733 }, "Nanachi");
            list.Add(new int[] { 276733, 287767 }, "Aqua");
            list.Add(new int[] { 287767, 298802 }, "Kris");
            list.Add(new int[] { 298802, 309836 }, "Ducky");
            list.Add(new int[] { 309836, 320871 }, "Kondou");

            double temp;

            var bg = GetLayer("mapperbg").CreateSprite("sb/dot.png", OsbOrigin.Centre, new Vector2(590, 390));
            bg.Color(870, new Color4(13, 24, 33, 0));
            bg.Fade(870d, 870d + beat, 0, 1);
            bg.Fade(320871d - beat, 320871, 1, 0);
            float maxWidth = 0;
            float maxHeight = 0;

            foreach (var mapper in list)
            {
                string name = mapper.Value;
                var startTime = mapper.Key[0];
                var endTime = mapper.Key[1];
                float fontScale = 0.4f;

                var texture = font.GetTexture(name);
                var position = new Vector2(590, 390);

                temp = startTime;

                var sprite = GetLayer("mapper").CreateSprite(texture.Path, OsbOrigin.Centre, position);
                sprite.Fade(startTime, startTime + beat, 0, 1);
                sprite.Fade(endTime - beat, endTime, 1, 0);
                sprite.Scale(OsbEasing.OutBack, startTime, startTime + beat * 1.5, 0f, fontScale);
                sprite.Scale(OsbEasing.InBack, endTime - beat * 1.5, endTime, fontScale, 0);
                while (temp <= endTime)
                {
                    sprite.Rotate(temp, temp + beat * 4, MathHelper.DegreesToRadians(-1), MathHelper.DegreesToRadians(1));
                    sprite.Rotate(temp + beat * 4, temp + beat * 8, MathHelper.DegreesToRadians(1), MathHelper.DegreesToRadians(-1));
                    temp += beat * 8;
                }

                if (maxHeight < texture.BaseHeight * fontScale) maxHeight = texture.BaseHeight * fontScale;
                if (maxWidth < texture.BaseWidth * fontScale) maxWidth = texture.BaseWidth * fontScale;
            }

            bg.ScaleVec(OsbEasing.OutBack, 870, 870d + beat * 1.5, new Vector2(0, maxHeight + 30), new Vector2(maxWidth + 30, maxHeight + 30));
            bg.ScaleVec(OsbEasing.InBack, 320871d - beat * 1.5, 320871, new Vector2(maxWidth + 30, maxHeight + 30), new Vector2(0, maxHeight + 30));
        }
    }
}
