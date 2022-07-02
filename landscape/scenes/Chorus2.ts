import { Easing, fade, moveY } from '@osbjs/tiny-osbjs'
import { createOutlineText, measureLineWidth, useTxtGenContext } from '@osbjs/txtgen-tiny-osbjs'
import Bg2Blur from '../components/Bg2Blur'
import DotParticles from '../components/DotParticles'
import Flare from '../components/Flare'
import Flash from '../components/Flash'
import GlowingGirl2 from '../components/GlowingGirl2'
import GradientSpectrum from '../components/GradientSpectrum'
import RingHighlight from '../components/RingHighlight'
import { Lyric } from '../types/Lyric'
import { HinaMinchoOutlineContext } from '../utils/txtGenContext'

export default function Chorus2() {
	Bg2Blur(186445, 217898, undefined, 0.8)
	DotParticles(186445, 217898)
	GradientSpectrum(186445, 217898)
	RingHighlight(186445, 217898)
	Lyrics1()
	Flare(186445, 217898)
	GlowingGirl2(186445, 217898, undefined, 1)
	Flash(186445)
	Flash(202159)
	Flash(217898)
}

function Lyrics1() {
	const lyrics: Lyric[] = [
		{
			text: '息を忘れゆくほど',
			startTime: 186445,
			endTime: 190043,
		},
		{
			text: '委ねる音にこの身を',
			startTime: 190362,
			endTime: 193633,
		},
		{
			text: '遮るものも',
			startTime: 193633,
			endTime: 199211,
		},
		{
			text: '飛び越えていこう',
			startTime: 199869,
			endTime: 208074,
		},
		{
			text: '失くさないように',
			startTime: 209063,
			endTime: 214973,
		},
		{
			text: 'この光を',
			startTime: 215620,
			endTime: 217898,
		},
	]

	const travelTime = 1000
	const timeBetweenLetter = 50
	const fadeTime = 300
	const speed = 2.5 / 1000
	const yMain = 160

	lyrics.forEach(({ text, startTime, endTime }) => {
		const lineWidth = measureLineWidth(text)

		let x = 320 - lineWidth * 0.5
		let _startTime = startTime,
			_endTime = endTime

		text.split('').forEach((letter) => {
			const y1 = yMain + 20
			const y2 = yMain + speed * (endTime - startTime - travelTime * 2)
			const y3 = y2 - 20

			useTxtGenContext(HinaMinchoOutlineContext)

			createOutlineText(letter, 'Background', 'CentreLeft', { x, y: 240 }, ({ width }) => {
				moveY(_startTime, _startTime + travelTime, y1, yMain, Easing.Out)
				moveY(_startTime + travelTime, endTime - travelTime, yMain, y2)
				moveY(_endTime - travelTime, _endTime, y2, y3, Easing.In)
				fade(_startTime, _startTime + fadeTime, 0, 1)
				fade(_endTime - fadeTime, _endTime, 1, 0)

				x += width
			})

			_startTime += timeBetweenLetter
			_endTime += timeBetweenLetter
		})
	})
}
