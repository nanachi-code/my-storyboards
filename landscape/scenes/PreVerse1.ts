import BgBlur from '../components/BgBlur'
import Flare from '../components/Flare'
import Flash from '../components/Flash'
import GlowingGirl from '../components/GlowingGirl'
import DotParticles from '../components/DotParticles'
import Spectrum from '../components/Spectrum'
import Stars from '../components/Stars'
import RingHighlight from '../components/RingHighlight'

export default function PreVerse1() {
	BgBlur(40875, 72316, undefined, 1, 0, 325)
	Spectrum(40875, 72316)
	Stars(40875, 72316)
	DotParticles(40875, 72316)
	RingHighlight(40875, 72316)
	GlowingGirl(40875, 72316, undefined, 1, 0, 325)
	Flare(40875, 72316)
	Flash(40875)
	Flash(56595)
}
