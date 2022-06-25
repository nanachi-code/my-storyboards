import BgBlur from '../components/BgBlur'
import Flare from '../components/Flare'
import Flash from '../components/Flash'
import GlowingGirl from '../components/GlowingGirl'
import Stars from '../components/Stars'

export default function PreVerse1() {
	BgBlur(40875, 72316, undefined, 1, 0, 325)
	Stars(40875, 72316)
	GlowingGirl(40875, 72316, undefined, 1, 0, 325)
	Flare(40875, 72316)
	// Gradient(40875, 72316, Pallete.PinkLavender, 0.7, 0, 150)
	Flash(40875)
	Flash(56595)
}
