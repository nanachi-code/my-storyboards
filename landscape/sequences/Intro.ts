import { fade, Layer, Origin, scale } from '@osbjs/tiny-osbjs'
import { createText, measureLineWidth, useTxtGenContext } from '@osbjs/txtgen-tiny-osbjs'
import Letterbox from '../components/Letterbox'
import { Lyric } from '../types/Lyric'
import { SazanamiMinchoContext } from '../utils/txtGenContext'

export default function Intro() {
	Letterbox(1512, 40875)
	// Lyrics()
}

function Lyrics() {
	useTxtGenContext(SazanamiMinchoContext)

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

	const _scale = 0.3,
		fadeIn = 300,
		fadeOut = 300

	lyrics.forEach(({ text, startTime, endTime }) => {
		const spaceCount = (text.match(/ /g) || []).length
		const spaceW = 5
		const lineWidth = measureLineWidth(text) * _scale + spaceCount * spaceW

		let x = 320 - lineWidth / 2

		text.split('').forEach((letter) => {
			if (letter != ' ') {
				createText(letter, Layer.Background, Origin.TopLeft, [x, 425], ({ width }) => {
					scale(startTime, _scale)
					fade([startTime, startTime + fadeIn], 0, 1)
					fade([endTime - fadeOut, endTime], 1, 0)

					x += width * _scale
				})
			} else {
				x += spaceW
			}
		})
	})
}
