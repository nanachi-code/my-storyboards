import { colorAtTime, Easing, fade, moveX, moveY, randInt, scaleAtTime, scaleVec } from '@osbjs/tiny-osbjs'
import { createText, getTexturePositionForAlignment, measureLineHeight, measureLineWidth, useTxtGenContext } from '@osbjs/txtgen-tiny-osbjs'
import BgBlur from '../components/BgBlur'
import GlowingGirl from '../components/GlowingGirl'
import Gradient from '../components/Gradient'
import Letterbox from '../components/Letterbox'
import Rect from '../components/Rect'
import { Lyric } from '../types/Lyric'
import Pallete from '../utils/pallete'
import { HinaMinchoContext } from '../utils/txtGenContext'

export default function Verse1() {
	BgBlur(
		72316,
		103861,
		() => {
			moveY(72316, 103861, 40, 80)
		},
		0.8,
		300,
		300,
		0.8
	)

	GlowingGirl(
		72316,
		103861,
		() => {
			moveY(72316, 103861, 40, 80)
		},
		0.8,
		300,
		300,
		0.8
	)

	Letterbox(72316, 103861, 70)

	Lyrics1()

	Rect(
		103861,
		111017,
		{ x: 0, y: 150 },
		{ x: -107, y: 240 },
		() => {
			scaleVec(103861, 104826, { x: 1, y: 150 }, { x: 854, y: 150 }, Easing.OutSine)
		},
		'CentreLeft'
	)

	Rect(
		111017,
		111649,
		{ x: 0, y: 150 },
		{ x: 747, y: 240 },
		() => {
			scaleVec(111017, 111649, { x: 854, y: 150 }, { x: 0, y: 150 }, Easing.InSine)
		},
		'CentreRight'
	)

	Gradient(103861, 111649)

	Lyrics2()
}

function Lyrics1() {
	useTxtGenContext(HinaMinchoContext)

	const lyrics: (Lyric | Lyric[])[] = [
		{
			text: 'Left in dim',
			startTime: 72316,
			endTime: 77250,
		},
		[
			{
				text: 'All I have',
				startTime: 79552,
				endTime: 85144,
			},
			{
				text: 'is me',
				startTime: 83335,
				endTime: 85144,
			},
		],
		[
			{
				text: 'While the bright sun',
				startTime: 87447,
				endTime: 91059,
			},
			{
				text: 'goes up high',
				startTime: 89417,
				endTime: 91059,
			},
		],
		[
			{
				text: 'Will about to',
				startTime: 91387,
				endTime: 94662,
			},
			{
				text: 'finally decide',
				startTime: 93356,
				endTime: 94662,
			},
		],
		{
			text: 'I’m all alone',
			startTime: 94987,
			endTime: 100851,
		},
	]

	const scale = 0.4,
		fadeIn = 150,
		fadeOut = fadeIn

	function render(lyric: Lyric, x: number, y: number) {
		const { text, startTime, endTime } = lyric

		let _x = x

		text
			.replaceAll(' ', '    ')
			.split('')
			.forEach((letter) => {
				const __x = _x,
					yMove = randInt(-4, 4)

				createText(letter, 'Background', 'Centre', { x: 320, y: 240 }, ({ width, height }) => {
					const correctPos = getTexturePositionForAlignment({ x: __x, y }, 'Centre', width, height, scale)
					moveX(startTime, endTime, correctPos.x, correctPos.x + 10)
					moveY(startTime, endTime, correctPos.y, correctPos.y + yMove)
					scaleAtTime(startTime, scale)
					fade(startTime, startTime + fadeIn, 0, 1)
					fade(endTime - fadeOut, endTime, 1, 0)

					_x += width * scale
				})

				createText(letter, 'Background', 'Centre', { x: 320, y: 240 }, ({ width, height }) => {
					const correctPos = getTexturePositionForAlignment({ x: __x - 2, y: y + 2 }, 'Centre', width, height, scale)
					moveX(startTime, endTime, correctPos.x, correctPos.x + 10)
					moveY(startTime, endTime, correctPos.y, correctPos.y + yMove)
					scaleAtTime(startTime, scale)
					fade(startTime, startTime + fadeIn, 0, 0.3)
					fade(endTime - fadeOut, endTime, 0.3, 0)
				})
			})
	}

	lyrics.forEach((lyric) => {
		if (!Array.isArray(lyric)) {
			render(lyric, randInt(300, 320), 125)
		} else {
			lyric.forEach((_lyric, i) => render(_lyric, randInt(290, 320) + 100 * i, 100 + 50 * i))
		}
	})
}

function Lyrics2() {
	const lyrics: Lyric[] = [
		{
			text: 'Memories ',
			startTime: 105148,
			endTime: 111649,
		},
		{
			text: 'are now thrown',
			startTime: 107079,
			endTime: 111649,
		},
	]

	const line = 'Memories    are    now    thrown',
		scale = 0.4,
		fadeIn = 150,
		fadeOut = fadeIn,
		lineWidth = measureLineWidth(line) * scale,
		y = 240 - (measureLineHeight('M') * scale) / 2

	let x = 320 - lineWidth / 2
	let _endTime = 111649 - line.length * 30

	lyrics
		.map(({ text, startTime, endTime }) => ({ text: text.replaceAll(' ', '    '), startTime, endTime }))
		.forEach(({ text, startTime }) => {
			let _startTime = startTime

			text.split('').forEach((letter) => {
				const yMove = randInt(-4, 4)

				createText(letter, 'Background', 'Centre', { x: 320, y: 240 }, ({ width, height }) => {
					const correctPos = getTexturePositionForAlignment({ x, y }, 'Centre', width, height, scale)
					moveX(startTime, _endTime, correctPos.x, correctPos.x + 10)
					moveY(startTime, _endTime, correctPos.y, correctPos.y + yMove)
					scaleAtTime(_startTime, scale)
					fade(_startTime, _startTime + fadeIn, 0, 1)
					fade(_endTime - fadeOut, _endTime, 1, 0)
					colorAtTime(_startTime, Pallete.Black)

					x += width * scale
				})

				_startTime += 30
				_endTime += 30
			})
		})
}
