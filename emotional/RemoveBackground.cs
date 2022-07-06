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
    public class RemoveBackground : StoryboardObjectGenerator
    {
        [Configurable]
        public string Path = "";

        public override void Generate()
        {
            var sprite = GetLayer("").CreateSprite(Path);
            sprite.Fade(0, 0);
        }
    }
}
