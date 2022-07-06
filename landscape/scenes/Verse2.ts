import { degToRad, Easing, fade, move, moveX, moveY, moveYAtTime, Parameter, parameter, randInt, rotate, scaleAtTime } from '@osbjs/tiny-osbjs'
import { createText, measureLineHeight, measureLineWidth } from '@osbjs/txtgen-tiny-osbjs'
import BgBlur from '../components/BgBlur'
import Flash from '../components/Flash'
import Letterbox from '../components/Letterbox'
import MonotoneBg from '../components/MonotoneBg'
import { Lyric } from '../types/Lyric'
import Pallete from '../utils/pallete'

export default function Verse2() {
	P1()
	P2()
	Letterbox(147067, 178575)
	Flash(147067)
}

function P1() {
	MonotoneBg(147067, 162150, Pallete.White, undefined, 0.1, 300, 300)
	BgBlur(
		147067,
		162150,
		() => {
			moveYAtTime(147067, 80)
			parameter(147067, 162150, Parameter.AdditiveBlending)
			rotate(147067, 162150, degToRad(-10), degToRad(10))
		},
		1,
		300,
		300,
		0.8
	)
	Lyrics1()
}

function Lyrics1() {
	const lyrics: Lyric[] = [
		{
			text: 'Here in dim',
			startTime: 147067,
			endTime: 152687,
		},
		{
			text: 'All the sound is here',
			startTime: 154309,
			endTime: 159908,
		},
	]

	const scale = 0.4
	lyrics.forEach(({ text, startTime, endTime }) => {
		const x = randInt(320, 340),
			y = randInt(100, 120)

		let _x = x
		text.split('').forEach((letter) => {
			if (letter != ' ') {
				createText(letter, 'Background', 'TopLeft', { x: _x, y }, ({ width }) => {
					moveX(startTime, endTime, _x, _x + 10)
					moveY(startTime, endTime, y, y + randInt(-4, 4))
					scaleAtTime(startTime, scale)
					fade(startTime, startTime + 300, 0, 1)
					fade(endTime - 300, endTime, 1, 0)
					_x += width * scale
				})
			} else {
				_x += 8
			}
		})
	})
}

function P2() {
	MonotoneBg(162150, 178575, Pallete.PurpleNavy, undefined, 1, 300, 300)
	t_Even_spotlights()
}

function t_Even_spotlights() {
	const t_Even = 'Even'
	const t_spotlights = 'spotlights'
	const evenStartTime = 162150
	const spotlightsStartTime = 162828
	const endTime = 163788
	const evenWidth = measureLineWidth(t_Even)
	const evenSpotlightsWidth = measureLineWidth(t_Even + t_spotlights) + 20
	const lineHeight = measureLineHeight(t_Even + t_spotlights, (pr, cr) => Math.max(pr, cr))

	let x = 320 - evenWidth / 2,
		y = 240 - lineHeight / 2,
		x1 = 320 - evenSpotlightsWidth / 2

	t_Even.split('').forEach((letter) => {
		createText(letter, 'Background', 'TopLeft', { x, y }, ({ width }) => {
			move(evenStartTime, evenStartTime + 300, { x, y: y + 20 }, { x, y }, Easing.Out)
			move(spotlightsStartTime, spotlightsStartTime + 300, { x, y }, { x: x1, y }, Easing.Out)
			fade(evenStartTime, evenStartTime + 300, 0, 1)
			fade(endTime - 300, endTime, 1, 0)
			x += width
			x1 += width
		})
	})

	x1 = x1 + 20
	t_spotlights.split('').forEach((letter) => {
		createText(letter, 'Background', 'TopLeft', { x, y }, ({ width }) => {
			move(spotlightsStartTime, spotlightsStartTime + 300, { x: x1 - 20, y }, { x: x1, y }, Easing.Out)
			fade(spotlightsStartTime, spotlightsStartTime + 300, 0, 1)
			fade(endTime - 300, endTime, 1, 0)
			x1 += width
		})
	})
}

function t_fade_in_dark(){
    
}