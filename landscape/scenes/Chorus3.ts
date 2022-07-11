import {
	colorAtTime,
	createSprite,
	degToRad,
	Easing,
	fade,
	move,
	moveX,
	moveY,
	Parameter,
	parameter,
	rotateAtTime,
	scale,
	scaleAtTime,
	scaleVec,
} from '@osbjs/tiny-osbjs'
import { createOutlineText, createText, measureLineHeight, measureLineWidth, useTxtGenContext } from '@osbjs/txtgen-tiny-osbjs'
import Circ from '../components/Circ'
import ColorBg from '../components/ColorBg'
import Flash from '../components/Flash'
import Letterbox from '../components/Letterbox'
import Rect from '../components/Rect'
import { Lyric } from '../types/Lyric'
import Pallete from '../utils/pallete'
import { AuthenticContext, SazanamiMinchoBigContext, SazanamiMinchoContext } from '../utils/txtGenContext'

export default function Chorus3() {
	ColorBg(284789, 343820, Pallete.Lilac)
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

		useTxtGenContext(SazanamiMinchoBigContext)

		lyrics.forEach((line) => {
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
		})

		Girl()

		useTxtGenContext(SazanamiMinchoContext)

		lyrics.forEach((line) => {
			let x = 0

			line.forEach(({ text, startTime, endTime }) => {
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

		const startTime = 289550,
			endTime = 290043

		function Ring() {
			Circ(startTime, endTime, 700, { x: 320, y: 240 }, () => {
				scale(startTime, endTime, 7 / 8, 6 / 8, Easing.Out)
			})

			Circ(startTime, endTime, 695, { x: 320, y: 240 }, () => {
				scale(startTime, endTime, 6.95 / 8, 5.95 / 8, Easing.Out)
				colorAtTime(startTime, Pallete.Lilac)
			})
		}
		Ring()

		const text = '痛い'
		const _scale = 0.4
		const lineH = measureLineHeight(text) * _scale
		let x = 320,
			y = 240 - lineH / 2

		text.split('').forEach((letter) => {
			createText(letter, 'Background', 'TopCentre', { x, y }, ({ height }) => {
				moveY(startTime, endTime, y + 20, y, Easing.Out)
				fade(startTime, endTime, 1, 1)
				scaleAtTime(startTime, _scale)
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
			useTxtGenContext(SazanamiMinchoBigContext)

			const text = '悩ましいよ'
			const lineW = measureLineWidth(text)

			let x = 320 - lineW / 2
			let y = 240

			let startTime = 293677

			text.split('').forEach((letter) => {
				createText(letter, 'Background', 'CentreLeft', { x, y }, ({ width }) => {
					fade(startTime, 295282, 1, 1)
					moveY(startTime, 295282, 260, 240, Easing.OutCirc)
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
			createSprite('sb/girl.png', 'Background', 'TopCentre', { x: 120, y: -250 }, () => {
				fade(295282, 304149, 1, 1)
				scaleAtTime(295282, 2)
				moveX(295282, 304149, 120, 100)
				parameter(295282, 304149, Parameter.FlipHorizontal)
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
		useTxtGenContext(SazanamiMinchoContext)

		const text = 'これから'
		const endTime = 305461
		const paddingY = 60
		const paddingX = 7
		const marginX = 15
		const lineW = measureLineWidth(text) + marginX * (text.length - 1) + paddingX * 2 * text.length
		const lineH = measureLineHeight(text, (pr, cr) => Math.max(pr, cr))

		let x = 320 - lineW / 2
		let y = 240 - lineH / 2

		let startTime = 304149

		text.split('').forEach((letter, i) => {
			const letterW = measureLineWidth(letter)

			Rect(
				startTime,
				endTime,
				{ x: letterW, y: 1 },
				{ x: x - paddingX, y: i % 2 ? y - paddingY : y + paddingY + lineH },
				() => {
					scaleVec(
						startTime,
						startTime + text.length * 100,
						{ x: letterW + paddingX * 2, y: 1 },
						{ x: letterW + paddingX * 2, y: lineH + paddingY * 2 },
						Easing.OutCubic
					)
					fade(startTime, endTime, 1, 1)
				},
				i % 2 ? 'TopLeft' : 'BottomLeft'
			)

			createText(letter, 'Background', 'TopLeft', { x, y }, ({ width }) => {
				fade(startTime, endTime, 1, 1)
				colorAtTime(startTime, Pallete.Lilac)
				x += width + marginX + paddingX * 2
			})
			startTime += 328
		})
	}

	function Lyrics6() {
		useTxtGenContext(SazanamiMinchoContext)

		const startTime = 305461
		const endTime = 305788

		function Sqr() {
			Rect(startTime, endTime, { x: 600, y: 600 }, { x: 320, y: 240 }, () => {
				scaleVec(startTime, endTime, { x: 600, y: 600 }, { x: 500, y: 500 }, Easing.Out)
				rotateAtTime(startTime, degToRad(45))
			})

			Rect(startTime, endTime, { x: 595, y: 595 }, { x: 320, y: 240 }, () => {
				rotateAtTime(startTime, degToRad(45))
				scaleVec(startTime, endTime, { x: 595, y: 595 }, { x: 495, y: 495 }, Easing.Out)
				colorAtTime(startTime, Pallete.Lilac)
			})
		}

		Sqr()

		const text = '行方'
		const _scale = 0.4
		const lineH = measureLineHeight(text) * _scale
		let x = 320,
			y = 240 - lineH / 2

		text.split('').forEach((letter) => {
			createText(letter, 'Background', 'TopCentre', { x, y }, ({ height }) => {
				moveY(startTime, endTime, y + 20, y, Easing.Out)
				fade(startTime, endTime, 1, 1)
				scaleAtTime(startTime, _scale)
				y += height * _scale
			})
		})
	}

	Lyrics1()
	Lyrics2()
	Lyrics3()
	Lyrics4()
	Lyrics5()
	Lyrics6()
	Flash(284789)
	Flash(295282)
	Flash(305788)
}

function SecondHalf() {
	function Lyrics1() {
		function Girl() {
			createSprite('sb/girl.png', 'Background', 'Centre', { x: 500, y: 240 }, () => {
				fade(305788, 310534, 1, 1)
				scaleAtTime(305788, 0.7)
				move(305788, 307915, { x: 600, y: 280 }, { x: 550, y: 240 }, Easing.OutCirc)
				scale(307915, 308406, 0.7, 0.85, Easing.InCirc)
				move(308406, 310534, { x: 550, y: 240 }, { x: 545, y: 245 })
			})
		}

		const lyrics: Lyric[][] = [
			[
				{
					startTime: 305788,
					endTime: 308406,
					text: 'ない道',
				},
				{
					startTime: 306769,
					endTime: 308406,
					text: '手探りでも',
				},
				{
					startTime: 307588,
					endTime: 308406,
					text: '進む',
				},
			],
			[
				{
					startTime: 308406,
					endTime: 310534,
					text: '見つめる',
				},
				{
					startTime: 308897,
					endTime: 310534,
					text: '先に',
				},
				{
					startTime: 309552,
					endTime: 310534,
					text: '繋がつて',
				},
			],
		]

		useTxtGenContext(SazanamiMinchoBigContext)

		lyrics.forEach((line) => {
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
		})

		Girl()

		useTxtGenContext(SazanamiMinchoContext)

		lyrics.forEach((line) => {
			let x = 0

			line.forEach(({ text, startTime, endTime }) => {
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

		const startTime = 310534,
			endTime = 311025

		function Ring() {
			Circ(startTime, endTime, 700, { x: 320, y: 240 }, () => {
				scale(startTime, endTime, 7 / 8, 6 / 8, Easing.Out)
			})

			Circ(startTime, endTime, 695, { x: 320, y: 240 }, () => {
				scale(startTime, endTime, 6.95 / 8, 5.95 / 8, Easing.Out)
				colorAtTime(startTime, Pallete.Lilac)
			})
		}
		Ring()

		const text = '目には'
		const _scale = 0.4
		const lineH = measureLineHeight(text) * _scale
		let x = 320,
			y = 240 - lineH / 2

		text.split('').forEach((letter) => {
			createText(letter, 'Background', 'TopCentre', { x, y }, ({ height }) => {
				moveY(startTime, endTime, y + 20, y, Easing.Out)
				fade(startTime, endTime, 1, 1)
				scaleAtTime(startTime, _scale)
				y += height * _scale
			})
		})
	}

	function Lyrics3() {
		function Girl() {
			createSprite('sb/girl.png', 'Background', 'Centre', { x: 320, y: 240 }, () => {
				fade(311025, 316222, 1, 1)
				moveY(311025, 314625, 280, 240, Easing.OutCirc)
				scale(311025, 314134, 0.75, 0.7)
				scale(314134, 314625, 0.7, 0.9, Easing.InCirc)
				moveY(314625, 316222, 240, 245)
			})
		}

		function Line1() {
			useTxtGenContext(SazanamiMinchoContext)

			const text = '見えぬ無数の道標が'
			const _scale = 0.4
			const lineW = measureLineWidth(text) * _scale
			const travelDistanceStep = 20

			let endX = 320 - lineW / 2
			let y = 240

			text.split('').forEach((letter, i) => {
				let startX = endX - (travelDistanceStep * (text.length / 2 - 1 - i)) / 2

				createText(letter, 'Background', 'CentreLeft', { x: startX, y }, ({ width }) => {
					moveX(311025, 314298, startX, endX, Easing.Out)
					fade(311025, 314298, 1, 1)
					fade(314298, 314625, 1, 0)
					scaleAtTime(311025, _scale)
					endX += width * _scale
				})
			})
		}

		function Line2() {
			useTxtGenContext(SazanamiMinchoBigContext)

			const text = '待つているよ'
			const lineW = measureLineWidth(text)

			let x = 320 - lineW / 2
			let y = 240

			let startTime = 314625

			text.split('').forEach((letter) => {
				createText(letter, 'Background', 'CentreLeft', { x, y }, ({ width }) => {
					fade(startTime, 316222, 1, 1)
					moveY(startTime, 316222, 260, 240, Easing.OutCirc)
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
			createSprite('sb/girl.png', 'Background', 'TopCentre', { x: 120, y: -250 }, () => {
				fade(316222, 324145, 1, 1)
				scaleAtTime(316222, 2)
				moveX(316222, 324145, 120, 100)
				parameter(316222, 324145, Parameter.FlipHorizontal)
			})
		}

		Girl()

		useTxtGenContext(SazanamiMinchoContext)
		const text = 'ずつと見ていたい'

		const _scale = 0.4
		const lineH = measureLineHeight(text) * _scale

		let y = 240 - lineH / 2
		let x = 320

		text.split('').forEach((letter, i) => {
			const travelDistance = i % 2 ? 20 : -20

			createText(letter, 'Background', 'TopCentre', { x, y }, ({ height }) => {
				moveX(320689, 321517, x + travelDistance, x, Easing.OutCirc)
				moveY(321517, 324145, y, y - (10 * (text.length / 2 - 1 - i)) / 2)
				fade(320689, 323815, 1, 1)
				fade(323815, 324145, 1, 0)
				scaleAtTime(320689, _scale)
				y += height * _scale
			})
		})
	}

	function Lyrics5() {
		function GirlW() {
			createSprite('sb/girlw.png', 'Background', 'BottomLeft', { x: -50, y: 480 }, () => {
				moveX(324145, 326760, -50, -45)
				fade(324145, 326760, 1, 1)
				scaleAtTime(324145, 0.5)
			})
		}

		function _Lyrics() {
			useTxtGenContext(SazanamiMinchoContext)

			const text = 'この景色を'
			const scale = 0.4
			const lineW = measureLineWidth(text) * scale
			const lineH = measureLineHeight(text, (pr, cr) => Math.max(pr, cr)) * scale
			const padding = 2

			let x = 400,
				y = 240 - lineH / 2

			Rect(
				325139,
				326760,
				{ x: 1, y: lineH + padding * 2 },
				{ x: x - padding, y: y - padding },
				() => {
					scaleVec(325139, 326760, { x: 1, y: lineH + padding * 2 }, { x: lineW + padding * 2, y: lineH + padding * 2 }, Easing.OutCubic)
				},
				'TopLeft'
			)

			text.split('').forEach((letter) => {
				createText(letter, 'Background', 'TopLeft', { x, y }, ({ width }) => {
					fade(325139, 326760, 1, 1)
					colorAtTime(325139, Pallete.Lilac)
					scaleAtTime(325139, scale)
					x += width * scale
				})
			})
		}

		function SongName() {
			useTxtGenContext(SazanamiMinchoContext)

			const text = 'landscape'
			const scale = 0.3
			const lineW = measureLineWidth(text) * scale

			let x = 320 - lineW / 2,
				y = 25

			text.split('').forEach((letter) => {
				createText(letter, 'Background', 'TopLeft', { x, y }, ({ width }) => {
					fade(324145, 326760, 1, 1)
					colorAtTime(324145, Pallete.Lilac)
					scaleAtTime(324145, scale)
					x += width * scale
				})
			})
		}

		function Artist() {
			useTxtGenContext(AuthenticContext)

			const text = 'afloat storage'
			const scale = 0.6

			createText(text, 'Background', 'Centre', { x: 320, y: 445 }, () => {
				fade(324145, 326760, 1, 1)
				colorAtTime(324145, Pallete.Lilac)
				scaleAtTime(324145, scale)
			})
		}

		GirlW()
		_Lyrics()
		Letterbox(324145, 326760, Pallete.White)
		SongName()
		Artist()
	}

	Lyrics1()
	Lyrics2()
	Lyrics3()
	Lyrics4()
	Lyrics5()
	Flash(316222)
	Flash(324145)
}
