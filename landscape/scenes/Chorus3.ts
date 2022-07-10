import { colorAtTime, createSprite, degToRad, Easing, fade, move, moveX, moveY, rotateAtTime, scale, scaleAtTime, scaleVec } from '@osbjs/tiny-osbjs'
import { createOutlineText, createText, measureLineHeight, measureLineWidth, useTxtGenContext } from '@osbjs/txtgen-tiny-osbjs'
import Circ from '../components/Circ'
import ColorBg from '../components/ColorBg'
import Flash from '../components/Flash'
import Rect from '../components/Rect'
import { Lyric } from '../types/Lyric'
import Pallete from '../utils/pallete'
import { SazanamiMinchoContext, SazanamiMinchoOutlineContext } from '../utils/txtGenContext'

export default function Chorus3() {
	ColorBg(284789, 324145, Pallete.Lilac)
	FirstHalf()
    SecondHalf()
}

function FirstHalf() {
	function Lyrics1() {
		function Girl() {
			createSprite('sb/girl.png', 'Background', 'Centre', { x: 500, y: 240 }, () => {
				fade(284789, 289550, 1, 1)
				scaleAtTime(284789, 0.7)
				move(284789, 286923, { x: 600, y: 280 }, { x: 550, y: 240 }, Easing.OutCirc)
				scale(286923, 287416, 0.7, 0.85, Easing.InCirc)
				move(287416, 289386, { x: 550, y: 240 }, { x: 545, y: 245 })
			})
		}

		const lyrics: Lyric[][] = [
			[
				{
					startTime: 284789,
					endTime: 287416,
					text: 'た喜び',
				},
				{
					startTime: 285445,
					endTime: 287416,
					text: '手を伸',
				},
				{
					startTime: 286102,
					endTime: 287416,
					text: 'ばしてみる',
				},
			],
			[
				{
					startTime: 287416,
					endTime: 289550,
					text: '胸踊る',
				},
				{
					startTime: 288073,
					endTime: 289550,
					text: '夢に',
				},
				{
					startTime: 288565,
					endTime: 289550,
					text: 'ただたゆたう',
				},
			],
		]

		useTxtGenContext(SazanamiMinchoOutlineContext)

		lyrics.forEach((line) =>
			line.forEach(({ text, startTime, endTime }, i) => {
				const lineH = measureLineHeight(text, (pr, cr) => Math.max(pr, cr))
				const lineMargin = 10
				const angle = degToRad(-5)
				const travelDistance = 30

				let endX = -107 + (lineH * i + lineMargin * (i - 1)) * Math.sin(Math.abs(angle)),
					endY = 40 + (lineH * i + lineMargin * (i - 1)) * Math.cos(angle)

				let startX = endX + travelDistance * Math.cos(angle),
					startY = endY + travelDistance * Math.sin(angle)

				text.split('').forEach((letter) => {
					createOutlineText(letter, 'Background', 'TopLeft', { x: startX, y: startY }, ({ width }) => {
						fade(startTime, startTime + 300, 0, 0.5)
						fade(endTime - 300, endTime, 0.5, 0)
						scaleAtTime(startTime, 1)
						rotateAtTime(startTime, angle)
						moveX(startTime, startTime + 300, startX, endX, Easing.OutCirc)
						moveY(startTime, startTime + 300, startY, endY, Easing.OutCirc)
						endX += width * Math.cos(angle)
						endY += width * Math.sin(angle)
						startX += width * Math.cos(angle)
						startY += width * Math.sin(angle)
					})
				})
			})
		)

		Girl()

		useTxtGenContext(SazanamiMinchoContext)

		lyrics.forEach((line) => {
			let x = 0

			line.forEach(({ text, startTime, endTime }, i) => {
				const scale = 0.4
				const lineMargin = 40
				const padding = 2
				const lineW = measureLineWidth(text, (pr, cr) => Math.max(pr, cr)) * scale
				const lineH = measureLineHeight(text) * scale

				let y = 60

				Rect(
					startTime,
					endTime,
					{ x: lineW + padding * 2, y: 1 },
					{ x: x - padding, y: y - padding },
					() => {
						scaleVec(
							startTime,
							startTime + text.length * 100,
							{ x: lineW + padding * 2, y: 1 },
							{ x: lineW + padding * 2, y: lineH + padding * 2 },
							Easing.OutCubic
						)
						fade(startTime, startTime + 300, 0, 1)
						fade(endTime - 300, endTime, 1, 0)
					},
					'TopLeft'
				)

				text.split('').forEach((letter) => {
					createText(letter, 'Background', 'TopLeft', { x, y }, ({ height }) => {
						fade(startTime, startTime + 300, 0, 1)
						fade(endTime - 300, endTime, 1, 0)
						scaleAtTime(startTime, scale)
						colorAtTime(startTime, Pallete.Lilac)
						y += height * scale
					})
				})

				x += lineW + lineMargin
			})
		})
	}

	function Lyrics2() {
		useTxtGenContext(SazanamiMinchoContext)
		function Ring() {
			Circ(289550, 290043, 700, { x: 320, y: 240 }, () => {
				scale(289550, 290043, 7 / 8, 6 / 8, Easing.Out)
			})

			Circ(289550, 290043, 695, { x: 320, y: 240 }, () => {
				scale(289550, 290043, 6.95 / 8, 5.95 / 8, Easing.Out)
				colorAtTime(289550, Pallete.Lilac)
			})
		}
		Ring()

		const text = '痛い'
		const _scale = 0.5
		const lineH = measureLineHeight(text) * _scale
		let x = 320,
			y = 240 - lineH / 2

		text.split('').forEach((letter) => {
			createText(letter, 'Background', 'TopCentre', { x, y }, ({ height }) => {
				moveY(289550, 290043, y + 30, y, Easing.Out)
				fade(289550, 290043, 1, 1)
				scaleAtTime(289550, _scale)
				y += height * _scale
			})
		})
	}

	function Lyrics3() {
		function Girl() {
			createSprite('sb/girl.png', 'Background', 'Centre', { x: 320, y: 240 }, () => {
				fade(290043, 295282, 1, 1)
				moveY(290043, 293677, 280, 240, Easing.OutCirc)
				scale(290043, 293185, 0.75, 0.7)
				scale(293185, 293677, 0.7, 0.9, Easing.InCirc)
				moveY(293677, 295282, 240, 245)
			})
		}

		function Line1() {
			useTxtGenContext(SazanamiMinchoContext)

			const text = 'を伝う大粒の汗が'
			const _scale = 0.4
			const lineW = measureLineWidth(text) * _scale
			const travelDistanceStep = 20

			let endX = 320 - lineW / 2
			let y = 240

			text.split('').forEach((letter, i) => {
				let startX = endX - (travelDistanceStep * (text.length / 2 - 1 - i)) / 2

				createText(letter, 'Background', 'CentreLeft', { x: startX, y }, ({ width }) => {
					moveX(290043, 293185, startX, endX, Easing.Out)
					fade(290043, 293185, 1, 1)
					fade(293185, 293677, 1, 0)
					scaleAtTime(290043, _scale)
					endX += width * _scale
				})
			})
		}

		function Line2() {
			useTxtGenContext(SazanamiMinchoOutlineContext)

			const text = '悩ましいよ'
			const lineW = measureLineWidth(text)

			let x = 320 - lineW / 2
			let y = 240

			let startTime = 293677

			text.split('').forEach((letter) => {
				createOutlineText(letter, 'Background', 'CentreLeft', { x, y }, ({ width }) => {
					fade(startTime, 295282, 1, 1)
					moveY(startTime, startTime + 300, 260, 240, Easing.OutCirc)
					x += width
				})
				startTime += 50
			})
		}

		Girl()
		Line1()
		Line2()
	}

	function Lyrics4() {
		function Girl() {
			createSprite('sb/girl.png', 'Background', 'Centre', { x: 800, y: 580 }, () => {
				fade(295282, 304149, 1, 1)
				scaleAtTime(295282, 2)
				moveX(295282, 304149, 515, 500)
			})
		}

		Girl()

		useTxtGenContext(SazanamiMinchoContext)
		const text = '離したくない'

		const _scale = 0.4
		const lineH = measureLineHeight(text) * _scale

		let y = 240 - lineH / 2
		let x = 320

		text.split('').forEach((letter, i) => {
			const travelDistance = i % 2 ? 20 : -20

			createText(letter, 'Background', 'TopCentre', { x, y }, ({ height }) => {
				moveX(299898, 300543, x + travelDistance, x, Easing.OutCirc)
				moveY(300543, 304149, y, y - (10 * (text.length / 2 - 1 - i)) / 2)
				fade(299898, 303821, 1, 1)
				fade(303821, 304149, 1, 0)
				scaleAtTime(299898, _scale)
				y += height * _scale
			})
		})
	}

	function Lyrics5() {
		useTxtGenContext(SazanamiMinchoOutlineContext)

		const text = 'これから'
		const paddingY = 60
		const marginX = 30
		const lineW = measureLineWidth(text) + marginX * (text.length - 1)
		const lineH = measureLineHeight(text, (pr, cr) => Math.max(pr, cr))

		let x = 320 - lineW / 2
		let y = 240 - lineH / 2

		let startTime = 304149

		text.split('').forEach((letter, i) => {
			const letterW = measureLineWidth(letter)

			Rect(
				startTime,
				305788,
				{ x: letterW, y: 1 },
				{ x: x, y: i % 2 ? y - paddingY : y + paddingY + lineH },
				() => {
					scaleVec(startTime, startTime + text.length * 100, { x: letterW, y: 1 }, { x: letterW, y: lineH + paddingY * 2 }, Easing.OutCubic)
					fade(startTime, 305788, 1, 1)
				},
				i % 2 ? 'TopLeft' : 'BottomLeft'
			)

			createOutlineText(letter, 'Background', 'TopLeft', { x, y }, ({ width }) => {
				fade(startTime, 305788, 1, 1)
				colorAtTime(startTime, Pallete.Lilac)
				x += width + marginX
			})
			startTime += 328
		})
	}

	Lyrics1()
	Lyrics2()
	Lyrics3()
	Lyrics4()
	Lyrics5()
	Flash(284789)
	Flash(295282)
	Flash(305788)
}

function SecondHalf() {}
