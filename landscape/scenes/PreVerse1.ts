import BgBlur from '../components/BgBlur'
import DotParticles from '../components/DotParticles'
import Flare from '../components/Flare'
import Flash from '../components/Flash'
import RingHighlight from '../components/RingHighlight'
import Spectrum from '../components/Spectrum'
import Stars from '../components/Stars'
import { wigglePosition } from '../expressions/wiggle'

export default function PreVerse1() {
	BgBlur(
		40875,
		72316,
		() => {
			wigglePosition(40875, 72316, 1 / 3, 10)
		},
		1,
		0,
		325
	)
	Spectrum(40875, 72316)
	Stars(40875, 72316)
	DotParticles(40875, 72316)
	RingHighlight(40875, 72316)
	Flare(40875, 72316)
	Flash(40875)
	Flash(56595)
}
