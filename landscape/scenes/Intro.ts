import { degToRad, Easing, fade, moveAtTime, moveY, rotateAtTime, scaleAtTime, scaleVec } from '@osbjs/tiny-osbjs'
import { createText, getTexturePositionForAlignment, measureLineWidth, useTxtGenContext } from '@osbjs/txtgen-tiny-osbjs'
import BgBlur from '../components/BgBlur'
import Letterbox from '../components/Letterbox'
import { Lyric } from '../types/Lyric'
import { AuthenticContext, HinaMinchoContext } from '../utils/txtGenContext'

export default function Intro() {
	useTxtGenContext(AuthenticContext)

	createText('afloat storage', 'Background', 'Centre', { x: 320, y: 200 }, (_) => {
		rotateAtTime(0, degToRad(-10))
		fade(0, 304, 0, 1)
		fade(908, 1512, 1, 0)
	})

	useTxtGenContext(HinaMinchoContext)

	createText('「landscape」', 'Background', 'Centre', { x: 320, y: 320 }, (_) => {
		fade(0, 304, 0, 1)
		fade(908, 1512, 1, 0)
		scaleAtTime(0, 0.5)
	})

	BgBlur(
		1512,
		39915,
		() => {
			moveY(1512, 39915, 50, 100)
		},
		0.5,
		300,
		300,
		0.8
	)

	Letterbox(1512, 39915, 70, () => {
		scaleVec(34152, 39915, { x: 854, y: 70 }, { x: 854, y: 240 }, Easing.InSine)
	})

	Lyrics()
}

function Lyrics() {
	useTxtGenContext(HinaMinchoContext)

	const lyrics: Lyric[] = [
		{
			text: 'Left in dim',
			startTime: 1512,
			endTime: 6380,
		},
		{
			text: 'The end is here',
			startTime: 9029,
			endTime: 14274,
		},
		{
			text: 'Watching you lay by my side',
			startTime: 16569,
			endTime: 20175,
		},
		{
			text: 'We’ll end spending sleepless night',
			startTime: 20503,
			endTime: 23815,
		},
		{
			text: 'I’m all alone',
			startTime: 24147,
			endTime: 29030,
		},
	]

	const scale = 0.3,
		fadeIn = 150,
		fadeOut = fadeIn

	lyrics
		.map(({ text, startTime, endTime }) => ({ text: text.replaceAll(' ', '   '), startTime, endTime }))
		.forEach(({ text, startTime, endTime }) => {
			const lineWidth = measureLineWidth(text) * scale

			let x = 320 - lineWidth / 2

			text.split('').forEach((letter) => {
				createText(letter, 'Background', 'Centre', { x: 320, y: 240 }, ({ width, height }) => {
					const correctPos = getTexturePositionForAlignment({ x, y: 425 }, 'Centre', width, height, scale)
					moveAtTime(startTime, correctPos)
					scaleAtTime(startTime, scale)
					fade(startTime, startTime + fadeIn, 0, 1)
					fade(endTime - fadeOut, endTime, 1, 0)

					x += width * scale
				})
			})
		})
}
