import {
	color,
	createSprite,
	degToRad,
	Easing,
	fade,
	flipHorizontal,
	Layer,
	move,
	moveX,
	moveY,
	Origin,
	rotate,
	scale,
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
			createSprite('sb/girl.png', Layer.Background, Origin.Centre, [500, 240], () => {
				fade([284789, 289550], 1, 1)
				scale(284789, 0.7)
				move([284789, 286923], [600, 280], [550, 240], Easing.OutCirc)
				scale([286923, 287416], 0.7, 0.85, Easing.InCirc)
				move([287416, 289386], [550, 240], [545, 245])
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
					createOutlineText(letter, Layer.Background, Origin.TopLeft, [startX, startY], ({ width }) => {
						fade([startTime, startTime + 300], 0, 0.5)
						fade([endTime - 300, endTime], 0.5, 0)
						scale(startTime, 1)
						rotate(startTime, angle)
						moveX([startTime, startTime + 300], startX, endX, Easing.OutCirc)
						moveY([startTime, startTime + 300], startY, endY, Easing.OutCirc)
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
				const _scale = 0.4
				const lineMargin = 40
				const padding = 2
				const lineW = measureLineWidth(text, (pr, cr) => Math.max(pr, cr)) * _scale
				const lineH = measureLineHeight(text) * _scale

				let y = 60

				Rect(
					startTime,
					endTime,
					[lineW + padding * 2, 1],
					[x - padding, y - padding],
					() => {
						scaleVec(
							[startTime, startTime + text.length * 100],
							[lineW + padding * 2, 1],
							[lineW + padding * 2, lineH + padding * 2],
							Easing.OutCubic
						)
						fade([startTime, startTime + 300], 0, 1)
						fade([endTime - 300, endTime], 1, 0)
					},
					Origin.TopLeft
				)

				text.split('').forEach((letter) => {
					createText(letter, Layer.Background, Origin.TopLeft, [x, y], ({ height }) => {
						fade([startTime, startTime + 300], 0, 1)
						fade([endTime - 300, endTime], 1, 0)
						scale(startTime, _scale)
						color(startTime, Pallete.Lilac)
						y += height * _scale
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
			Circ(startTime, endTime, 700, [320, 240], () => {
				scale([startTime, endTime], 7 / 8, 6 / 8, Easing.Out)
			})

			Circ(startTime, endTime, 695, [320, 240], () => {
				scale([startTime, endTime], 6.95 / 8, 5.95 / 8, Easing.Out)
				color(startTime, Pallete.Lilac)
			})
		}
		Ring()

		const text = '痛い'
		const _scale = 0.4
		const lineH = measureLineHeight(text) * _scale
		let x = 320,
			y = 240 - lineH / 2

		text.split('').forEach((letter) => {
			createText(letter, Layer.Background, Origin.TopCentre, [x, y], ({ height }) => {
				moveY([startTime, endTime], y + 20, y, Easing.Out)
				fade([startTime, endTime], 1, 1)
				scale(startTime, _scale)
				y += height * _scale
			})
		})
	}

	function Lyrics3() {
		function Girl() {
			createSprite('sb/girl.png', Layer.Background, Origin.Centre, [320, 240], () => {
				fade([290043, 295282], 1, 1)
				moveY([290043, 293677], 280, 240, Easing.OutCirc)
				scale([290043, 293185], 0.75, 0.7)
				scale([293185, 293677], 0.7, 0.9, Easing.InCirc)
				moveY([293677, 295282], 240, 245)
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

				createText(letter, Layer.Background, Origin.CentreLeft, [startX, y], ({ width }) => {
					moveX([290043, 293185], startX, endX, Easing.Out)
					fade([290043, 293185], 1, 1)
					fade([293185, 293677], 1, 0)
					scale(290043, _scale)
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
				createText(letter, Layer.Background, Origin.CentreLeft, [x, y], ({ width }) => {
					fade([startTime, 295282], 1, 1)
					moveY([startTime, 295282], 260, 240, Easing.OutCirc)
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
			createSprite('sb/girl.png', Layer.Background, Origin.TopCentre, [120, -250], () => {
				fade([295282, 304149], 1)
				scale(295282, 2)
				moveX([295282, 304149], 120, 100)
				flipHorizontal([295282, 304149])
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

			createText(letter, Layer.Background, Origin.TopCentre, [x, y], ({ height }) => {
				moveX([299898, 300543], x + travelDistance, x, Easing.OutCirc)
				moveY([300543, 304149], y, y - (10 * (text.length / 2 - 1 - i)) / 2)
				fade([299898, 303821], 1, 1)
				fade([303821, 304149], 1, 0)
				scale(299898, _scale)
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
				[letterW + paddingX * 2, 1],
				[x - paddingX, i % 2 ? y - paddingY : y + paddingY + lineH],
				() => {
					scaleVec(
						[startTime, startTime + text.length * 100],
						[letterW + paddingX * 2, 1],
						[letterW + paddingX * 2, lineH + paddingY * 2],
						Easing.OutCubic
					)
					fade([startTime, endTime], 1)
				},
				i % 2 ? Origin.TopLeft : Origin.BottomLeft
			)

			createText(letter, Layer.Background, Origin.TopLeft, [x, y], ({ width }) => {
				fade([startTime, endTime], 1)
				color(startTime, Pallete.Lilac)
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
			Rect(startTime, endTime, [600, 600], [320, 240], () => {
				scaleVec([startTime, endTime], [600, 600], [500, 500], Easing.Out)
				rotate(startTime, degToRad(45))
			})

			Rect(startTime, endTime, [595, 595], [320, 240], () => {
				rotate(startTime, degToRad(45))
				scaleVec([startTime, endTime], [595, 595], [495, 495], Easing.Out)
				color(startTime, Pallete.Lilac)
			})
		}

		Sqr()

		const text = '行方'
		const _scale = 0.4
		const lineH = measureLineHeight(text) * _scale
		let x = 320,
			y = 240 - lineH / 2

		text.split('').forEach((letter) => {
			createText(letter, Layer.Background, Origin.TopCentre, [x, y], ({ height }) => {
				moveY([startTime, endTime], y + 20, y, Easing.Out)
				fade([startTime, endTime], 1)
				scale(startTime, _scale)
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
			createSprite('sb/girl.png', Layer.Background, Origin.Centre, [500, 240], () => {
				fade([305788, 310534], 1, 1)
				scale(305788, 0.7)
				move([305788, 307915], [600, 280], [550, 240], Easing.OutCirc)
				scale([307915, 308406], 0.7, 0.85, Easing.InCirc)
				move([308406, 310534], [550, 240], [545, 245])
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
					createOutlineText(letter, Layer.Background, Origin.TopLeft, [startX, startY], ({ width }) => {
						fade([startTime, startTime + 300], 0, 0.5)
						fade([endTime - 300, endTime], 0.5, 0)
						scale(startTime, 1)
						rotate(startTime, angle)
						moveX([startTime, startTime + 300], startX, endX, Easing.OutCirc)
						moveY([startTime, startTime + 300], startY, endY, Easing.OutCirc)
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
				const _scale = 0.4
				const lineMargin = 40
				const padding = 2
				const lineW = measureLineWidth(text, (pr, cr) => Math.max(pr, cr)) * _scale
				const lineH = measureLineHeight(text) * _scale

				let y = 60

				Rect(
					startTime,
					endTime,
					[lineW + padding * 2, 1],
					[x - padding, y - padding],
					() => {
						scaleVec(
							[startTime, startTime + text.length * 100],
							[lineW + padding * 2, 1],
							[lineW + padding * 2, lineH + padding * 2],
							Easing.OutCubic
						)
						fade([startTime, startTime + 300], 0, 1)
						fade(endTime - 300, endTime, 1, 0)
					},
					Origin.TopLeft
				)

				text.split('').forEach((letter) => {
					createText(letter, Layer.Background, Origin.TopLeft, [x, y], ({ height }) => {
						fade([startTime, startTime + 300], 0, 1)
						fade([endTime - 300, endTime], 1, 0)
						scale(startTime, _scale)
						color(startTime, Pallete.Lilac)
						y += height * _scale
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
			Circ(startTime, endTime, 700, [320, 240], () => {
				scale([startTime, endTime], 7 / 8, 6 / 8, Easing.Out)
			})

			Circ(startTime, endTime, 695, [320, 240], () => {
				scale([startTime, endTime], 6.95 / 8, 5.95 / 8, Easing.Out)
				color(startTime, Pallete.Lilac)
			})
		}
		Ring()

		const text = '目には'
		const _scale = 0.4
		const lineH = measureLineHeight(text) * _scale
		let x = 320,
			y = 240 - lineH / 2

		text.split('').forEach((letter) => {
			createText(letter, Layer.Background, Origin.TopCentre, [x, y], ({ height }) => {
				moveY([startTime, endTime], y + 20, y, Easing.Out)
				fade([startTime, endTime], 1, 1)
				scale(startTime, _scale)
				y += height * _scale
			})
		})
	}

	function Lyrics3() {
		function Girl() {
			createSprite('sb/girl.png', Layer.Background, Origin.Centre, [320, 240], () => {
				fade([311025, 316222], 1, 1)
				moveY([311025, 314625], 280, 240, Easing.OutCirc)
				scale([311025, 314134], 0.75, 0.7)
				scale([314134, 314625], 0.7, 0.9, Easing.InCirc)
				moveY([314625, 316222], 240, 245)
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

				createText(letter, Layer.Background, Origin.CentreLeft, [startX, y], ({ width }) => {
					moveX([311025, 314298], startX, endX, Easing.Out)
					fade([311025, 314298], 1, 1)
					fade([314298, 314625], 1, 0)
					scale(311025, _scale)
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
				createText(letter, Layer.Background, Origin.CentreLeft, [x, y], ({ width }) => {
					fade([startTime, 316222], 1, 1)
					moveY([startTime, 316222], 260, 240, Easing.OutCirc)
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
			createSprite('sb/girl.png', Layer.Background, Origin.TopCentre, [120, -250], () => {
				fade([316222, 324145], 1, 1)
				scale(316222, 2)
				moveX([316222, 324145], 120, 100)
				flipHorizontal([316222, 324145])
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

			createText(letter, Layer.Background, Origin.TopCentre, [x, y], ({ height }) => {
				moveX([320689, 321517], x + travelDistance, x, Easing.OutCirc)
				moveY([321517, 324145], y, y - (10 * (text.length / 2 - 1 - i)) / 2)
				fade([320689, 323815], 1)
				fade([323815, 324145], 1, 0)
				scale(320689, _scale)
				y += height * _scale
			})
		})
	}

	function Lyrics5() {
		function GirlW() {
			createSprite('sb/girlw.png', Layer.Background, Origin.BottomLeft, [-50, 480], () => {
				moveX([324145, 326760], -50, -45)
				fade([324145, 326760], 1, 1)
				scale(324145, 0.5)
			})
		}

		function _Lyrics() {
			useTxtGenContext(SazanamiMinchoContext)

			const text = 'この景色を'
			const _scale = 0.4
			const lineW = measureLineWidth(text) * _scale
			const lineH = measureLineHeight(text, (pr, cr) => Math.max(pr, cr)) * _scale
			const padding = 2

			let x = 400,
				y = 240 - lineH / 2

			Rect(
				325139,
				326760,
				[1, lineH + padding * 2],
				[x - padding, y - padding],
				() => {
					scaleVec([325139, 326760], [1, lineH + padding * 2], [lineW + padding * 2, lineH + padding * 2], Easing.OutCubic)
				},
				Origin.TopLeft
			)

			text.split('').forEach((letter) => {
				createText(letter, Layer.Background, Origin.TopLeft, [x, y], ({ width }) => {
					fade([325139, 326760], 1)
					color(325139, Pallete.Lilac)
					scale(325139, _scale)
					x += width * _scale
				})
			})
		}

		function SongName() {
			useTxtGenContext(SazanamiMinchoContext)

			const text = 'landscape'
			const _scale = 0.3
			const lineW = measureLineWidth(text) * _scale

			let x = 320 - lineW / 2,
				y = 25

			text.split('').forEach((letter) => {
				createText(letter, Layer.Background, Origin.TopLeft, [x, y], ({ width }) => {
					fade([324145, 326760], 1)
					color(324145, Pallete.Lilac)
					scale(324145, _scale)
					x += width * _scale
				})
			})
		}

		function Artist() {
			useTxtGenContext(AuthenticContext)

			const text = 'afloat storage'
			const _scale = 0.6

			createText(text, Layer.Background, Origin.Centre, [320, 445], () => {
				fade([324145, 326760], 1, 1)
				color(324145, Pallete.Lilac)
				scale(324145, _scale)
			})
		}

		GirlW()
		_Lyrics()
		Letterbox(324145, 326760)
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
