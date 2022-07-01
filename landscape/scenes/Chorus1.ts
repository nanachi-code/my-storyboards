import { Easing, fade, moveY } from '@osbjs/tiny-osbjs'
import { createOutlineText, measureLineWidth, useTxtGenContext } from '@osbjs/txtgen-tiny-osbjs'
import Bg2Blur from '../components/Bg2Blur'
import DotParticles from '../components/DotParticles'
import Flare from '../components/Flare'
import Flash from '../components/Flash'
import GlowingGirl2 from '../components/GlowingGirl2'
import GradientSpectrum from '../components/GradientSpectrum'
import MonotoneBg from '../components/MonotoneBg'
import RingHighlight from '../components/RingHighlight'
import { Lyric } from '../types/Lyric'
import Pallete from '../utils/pallete'
import { HinaMinchoOutlineContext } from '../utils/txtGenContext'

export default function Chorus1() {
	Bg2Blur(111649, 143153, undefined, 0.8)
	DotParticles(111649, 143153)
	GradientSpectrum(111649, 143153)
	RingHighlight(111649, 143153)
	Lyrics1()
	Flare(111649, 143153)
	GlowingGirl2(111649, 143153, undefined, 1)
	MonotoneBg(143153, 147067, Pallete.Black)
	Flash(111649)
	Flash(127415)
	Flash(143153)
}

function Lyrics1() {
	const lyrics: Lyric[] = [
		{
			text: '息を忘れゆくほど',
			startTime: 111649,
			endTime: 115306,
		},
		{
			text: '委ねる音にこの身を',
			startTime: 115625,
			endTime: 118580,
		},
		{
			text: '絶え間ないように',
			startTime: 118580,
			endTime: 124461,
		},
		{
			text: '紡いでいこう',
			startTime: 125115,
			endTime: 132358,
		},
		{
			text: '忘れないように',
			startTime: 134321,
			endTime: 140195,
		},
		{
			text: 'あの光を',
			startTime: 140846,
			endTime: 143153,
		},
	]

	const travelTime = 1000
	const timeBetweenLetter = 50
	const fadeTime = 300

	lyrics.forEach(({ text, startTime, endTime }) => {
		const lineWidth = measureLineWidth(text) + 140

		let x = text.length % 2 == 1 ? 360 - lineWidth * 0.5 : 320 - lineWidth * 0.5
		let _startTime = startTime

		text.split('').forEach((letter, i) => {
			useTxtGenContext(HinaMinchoOutlineContext)

			createOutlineText(letter, 'Background', 'CentreLeft', { x, y: 240 }, ({ width }) => {
				moveY(_startTime, _startTime + travelTime, 260, 240, Easing.Out)
				moveY(_startTime + travelTime, endTime - travelTime, 240, 237)
				moveY(endTime - travelTime, endTime, 237, 217, Easing.In)
				fade(_startTime, _startTime + fadeTime, 0.5, 1)
				fade(endTime - fadeTime, endTime, 1, 0)

				if (i == Math.floor(text.length / 2) - 1) x += 140
				x += width
			})

			_startTime += timeBetweenLetter
		})
	})
}
