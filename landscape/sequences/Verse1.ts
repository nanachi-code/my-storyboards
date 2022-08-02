import { additiveBlending, color, createSprite, DefaultPallete, Easing, fade, Layer, Origin, scale, scaleVec } from '@osbjs/tiny-osbjs'
import { createText, maxLineHeight, measureLineWidth, useTxtGenContext } from '@osbjs/txtgen-tiny-osbjs'
import ColorBg from '../components/ColorBg'
import FallingLeaves from '../components/FallingLeaves'
import Paricles from '../components/Particles'
import Rect from '../components/Rect'
import { Lyric } from '../types/Lyric'
import Pallete from '../utils/pallete'
import { SazanamiMinchoContext } from '../utils/txtGenContext'

export default function Verse1() {
	const fadeOut = 103861 - 103140
	const fadeIn = 300

	function Highlight() {
		createSprite('sb/highlight.png', Layer.Background, Origin.Centre, [0, 0], () => {
			scale(72316, 2)
			additiveBlending([72316, 103861])
			fade([72316, 103140], 0.4)
			fade([103140, 103861], 0.4, 0)
		})
	}

	ColorBg(72316, 103861, Pallete.RussianViolet, fadeIn, fadeOut)
	Paricles(72316, 103861, fadeIn, fadeOut)
	FallingLeaves(72316, 103861, fadeIn, fadeOut)
	Highlight()
	Lyrics()
	PostLyrics()
}

function Lyrics() {
	useTxtGenContext(SazanamiMinchoContext)

	const textScale = 0.35
	const fadeDuration = 300

	const lyrics: Lyric[] = [
		{
			text: 'Left in dim',
			startTime: 72316,
			endTime: 78237,
		},
		{
			text: 'All I have is me',
			startTime: 79552,
			endTime: 85144,
		},
		{
			text: 'While the bright sun goes up high',
			startTime: 87447,
			endTime: 91059,
		},
		{
			text: 'Will about to finally decide',
			startTime: 91387,
			endTime: 94662,
		},
		{
			text: "I'm all alone",
			startTime: 94987,
			endTime: 101832,
		},
	]

	let maxH = lyrics.reduce((prH, { text }) => Math.max(prH, maxLineHeight(text, 'word')), 0) * textScale

	Rect(72316, 103861, [854, maxH], [320, 240], () => {
		color(72316, Pallete.Black)
		fade([103861 - 300, 103861], 1, 0)
	})

	const y = 248 - maxH / 2

	lyrics.forEach(({ text, startTime, endTime }) => {
		const lineW = measureLineWidth(text) * textScale

		let x = 320 - lineW / 2

		text.split(' ').forEach((word) => {
			createText(word, Layer.Background, Origin.TopLeft, [x, y], ({ width }) => {
				fade([startTime, startTime + fadeDuration], 0, 1)
				fade([endTime - fadeDuration, endTime], 1, 0)
				scale(startTime, textScale)
				x += width * textScale + 8
			})
		})
	})
}

function PostLyrics() {
	useTxtGenContext(SazanamiMinchoContext)

	const lyrics: Lyric[] = [
		{
			text: 'Memories',
			startTime: 105148,
			endTime: 111649,
		},
		{
			text: 'are now thrown',
			startTime: 107079,
			endTime: 111649,
		},
	]

	const textScale = 0.6

	let x = 0,
		y = 200

	lyrics.forEach(({ text, startTime, endTime }, i) => {
		text.split(' ').forEach((word) => {
			createText(word, Layer.Background, Origin.TopLeft, [x, y], ({ width }) => {
				fade([startTime, endTime], 1)
				scale(startTime, textScale)
				if (i === 0) color([startTime, endTime], Pallete.White, DefaultPallete.Red, Easing.In)
				x += width * textScale + 10
			})
		})

		const lineW = measureLineWidth(text) * textScale
		const lineH = maxLineHeight(text) * textScale

		const letterDuration = 60 // ms per letter
		const scaleDuration = text.length * letterDuration

		Rect(
			startTime,
			endTime,
			[lineW, lineH],
			[x, y],
			() => {
				scaleVec([startTime, startTime + scaleDuration], [lineW, lineH], [0, lineH], Easing.Out)
				color(startTime, Pallete.Black)
			},
			Origin.TopRight
		)
	})

	Rect(
		103861,
		111649,
		[0, 2],
		[747, 250],
		() => {
			scaleVec([103861, 111649], [0, 2], [854, 2])
		},
		Origin.CentreRight
	)
}
