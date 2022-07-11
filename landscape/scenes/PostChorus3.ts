import {
	colorAtTime,
	createSprite,
	degToRad,
	Easing,
	fade,
	moveX,
	moveY,
	Parameter,
	parameter,
	rotate,
	rotateAtTime,
	scale,
	scaleAtTime,
	scaleVec,
	Vector2,
} from '@osbjs/tiny-osbjs'
import { createOutlineText, createText, measureLineHeight, measureLineWidth, useTxtGenContext } from '@osbjs/txtgen-tiny-osbjs'
import Circ from '../components/Circ'
import ColorBg from '../components/ColorBg'
import EquilateralTri from '../components/EquilateralTri'
import Flash from '../components/Flash'
import Letterbox from '../components/Letterbox'
import Rect from '../components/Rect'
import Pallete from '../utils/pallete'
import { AuthenticContext, SazanamiMinchoBigContext, SazanamiMinchoContext } from '../utils/txtGenContext'

export default function PostChorus3() {
	FirstHalf()
	SecondHalf()
	Break(332672, 335283)
	Break(341184, 343820)
}

function Break(startTime: number, endTime: number) {
	function GirlW() {
		createSprite('sb/girlw.png', 'Background', 'Centre', { x: 330, y: 240 }, () => {
			fade(startTime, endTime, 1, 1)
			scaleAtTime(startTime, 0.15)
			colorAtTime(startTime, Pallete.Lilac)
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
				fade(startTime, endTime, 1, 1)
				colorAtTime(startTime, Pallete.Lilac)
				scaleAtTime(startTime, scale)
				x += width * scale
			})
		})
	}

	function Artist() {
		useTxtGenContext(AuthenticContext)

		const text = 'afloat storage'
		const scale = 0.6

		createText(text, 'Background', 'Centre', { x: 320, y: 445 }, () => {
			fade(startTime, endTime, 1, 1)
			colorAtTime(startTime, Pallete.Lilac)
			scaleAtTime(startTime, scale)
		})
	}

	function RotatingSqr(size: number, startAngle: number, travelAngle: number) {
		Rect(startTime, endTime, { x: size, y: size }, { x: 320, y: 240 }, () => {
			rotate(startTime, endTime, degToRad(startAngle), degToRad(startAngle + travelAngle))
		})
		Rect(startTime, endTime, { x: size - 3, y: size - 3 }, { x: 320, y: 240 }, () => {
			rotate(startTime, endTime, degToRad(startAngle), degToRad(startAngle + travelAngle))
			colorAtTime(startTime, Pallete.Lilac)
		})
	}

	RotatingSqr(420, 15, 5)
	RotatingSqr(280, 30, -5)
	Circ(startTime, endTime, 190, { x: 320, y: 240 })
	GirlW()
	Letterbox(startTime, endTime, Pallete.White)
	SongName()
	Artist()
	Flash(startTime)
}

function FirstHalf() {
	function _1() {
		Circ(326760, 328412, 700, { x: 320, y: 240 }, () => {
			scale(326760, 328412, 7 / 8, 6.5 / 8)
		})

		Circ(326760, 328412, 695, { x: 320, y: 240 }, () => {
			scale(326760, 328412, 6.97 / 8, 6.47 / 8)
			colorAtTime(326760, Pallete.Lilac)
		})

		createSprite('sb/girl.png', 'Background', 'BottomCentre', { x: 320, y: 480 }, () => {
			fade(326760, 328412, 1, 1)
			scale(326760, 328412, 0.5, 0.51)
		})

		ColorBg(328412, 328743, Pallete.White)

		Circ(328412, 328743, 100, { x: 320, y: 240 }, () => {
			scale(328412, 328743, 1 / 8, 1 / 10, Easing.Out)
			colorAtTime(328412, Pallete.Lilac)
		})

		Flash(326760)
	}

	function _2() {
		function RotatingTri(sideLength: number, startAngle: number, travelAngle: number, position: Vector2 = { x: 120, y: 160 }) {
			const startTime = 328743,
				endTime = 330371
			EquilateralTri(startTime, endTime, sideLength, position, () => {
				fade(startTime, endTime, 1, 1)
				rotate(startTime, endTime, degToRad(startAngle), degToRad(startAngle + travelAngle))
			})

			EquilateralTri(startTime, endTime, sideLength - 3, position, () => {
				fade(startTime, endTime, 1, 1)
				rotate(startTime, endTime, degToRad(startAngle), degToRad(startAngle + travelAngle))
				colorAtTime(startTime, Pallete.Lilac)
			})
		}

		RotatingTri(300, 75, 5)

		createSprite('sb/girl.png', 'Background', 'TopLeft', { x: 320, y: 0 }, () => {
			fade(328743, 330371, 1, 1)
			moveY(328743, 330371, 0, -13)
		})

		ColorBg(330371, 330694, Pallete.White)

		Circ(330371, 330694, 80, { x: 320, y: 240 }, () => {
			colorAtTime(330371, Pallete.Lilac)
			moveX(330371, 330694, 320, 270, Easing.Out)
		})

		Circ(330371, 330694, 80, { x: 320, y: 240 }, () => {
			colorAtTime(330371, Pallete.Lilac)
			moveX(330371, 330694, 320, 370, Easing.Out)
		})

		Flash(328743)
	}

	function _3() {
		function Composer() {
			useTxtGenContext(SazanamiMinchoBigContext)
			const text = '稲見繭'

			const lineH = measureLineHeight(text)

			let x = 700,
				y = 240 - lineH / 2

			text.split('').forEach((letter) => {
				createOutlineText(letter, 'Background', 'TopRight', { x, y }, ({ height }) => {
					fade(330694, 332342, 0.5, 0.5)
					y += height
				})
			})
		}

		Composer()

		createSprite('sb/girl.png', 'Background', 'TopCentre', { x: 120, y: -250 }, () => {
			fade(330694, 332342, 1, 1)
			scaleAtTime(330694, 2)
			moveX(330694, 332342, 120, 115)
			parameter(330694, 332342, Parameter.FlipHorizontal)
		})

		ColorBg(332342, 332672, Pallete.White)

		Circ(332342, 332672, 80, { x: 270, y: 240 }, () => {
			colorAtTime(332342, Pallete.Lilac)
			moveY(332342, 332672, 240, 190, Easing.Out)
		})

		Circ(332342, 332672, 80, { x: 270, y: 240 }, () => {
			colorAtTime(332342, Pallete.Lilac)
			moveY(332342, 332672, 240, 290, Easing.Out)
		})

		Circ(332342, 332672, 80, { x: 370, y: 240 }, () => {
			colorAtTime(332342, Pallete.Lilac)
			moveY(332342, 332672, 240, 190, Easing.Out)
		})

		Circ(332342, 332672, 80, { x: 370, y: 240 }, () => {
			colorAtTime(332342, Pallete.Lilac)
			moveY(332342, 332672, 240, 290, Easing.Out)
		})

		Flash(330694)
	}

	_1()
	_2()
	_3()
}

function SecondHalf() {
	function Message(text: string, startTime: number, endTime: number) {
		useTxtGenContext(SazanamiMinchoContext)

		const spaceCount = (text.match(/ /g) || []).length
		const spaceW = 7
		const _scale = 0.4
		const lineW = measureLineWidth(text.replace(' ', '')) * _scale + spaceCount * spaceW
		const lineH = measureLineHeight(text, (pr, cr) => Math.max(pr, cr)) * _scale
		const travelDistanceStep = 5

		let startX = 320 - lineW / 2
		let y = 240 - lineH / 2

		text.split('').forEach((letter, i) => {
			if (letter != ' ') {
				let endX = startX - (travelDistanceStep * (text.length / 2 - 1 - i)) / 2

				createText(letter, 'Background', 'TopLeft', { x: startX, y }, ({ width }) => {
					moveX(startTime, endTime, startX, endX, Easing.Out)
					fade(startTime, endTime, 1, 1)
					scaleAtTime(startTime, _scale)
					colorAtTime(startTime, Pallete.Lilac)
					startX += width * _scale
				})
			} else {
				startX += spaceW
			}
		})
	}

	function _1() {
		EquilateralTri(335283, 336922, 250, { x: 460, y: 240 }, () => {
			rotateAtTime(335283, degToRad(-90))
			moveX(335283, 336922, 460, 465)
		})

		EquilateralTri(335283, 336922, 245, { x: 460, y: 240 }, () => {
			rotateAtTime(335283, degToRad(-90))
			moveX(335283, 336922, 460, 465)
			colorAtTime(335283, Pallete.Lilac)
		})

		EquilateralTri(335283, 336922, 250, { x: 180, y: 240 }, () => {
			rotateAtTime(335283, degToRad(90))
			moveX(335283, 336922, 180, 175)
		})

		EquilateralTri(335283, 336922, 245, { x: 180, y: 240 }, () => {
			rotateAtTime(335283, degToRad(90))
			moveX(335283, 336922, 180, 175)
			colorAtTime(335283, Pallete.Lilac)
		})

		createSprite('sb/girl.png', 'Background', 'BottomLeft', { x: -50, y: 480 }, () => {
			fade(335283, 336922, 1, 1)
			moveY(335283, 336922, 480, 485)
			scaleAtTime(335283, 0.5)
		})

		createSprite('sb/girl.png', 'Background', 'TopRight', { x: 690, y: 0 }, () => {
			fade(335283, 336922, 1, 1)
			moveY(335283, 336922, 0, -5)
			scaleAtTime(335283, 0.5)
			parameter(335283, 336922, Parameter.FlipVertical)
			parameter(335283, 336922, Parameter.FlipHorizontal)
		})

		ColorBg(336922, 337250, Pallete.White)
		Message('you & i', 336922, 337250)
		Flash(335283)
	}

	function _2() {
		function Composer() {
			useTxtGenContext(SazanamiMinchoBigContext)
			const text = '稲見繭'

			const lineW = measureLineWidth(text)

			let x = 320 - lineW / 2,
				y = 240

			text.split('').forEach((letter) => {
				createOutlineText(letter, 'Background', 'CentreLeft', { x, y }, ({ width }) => {
					fade(337250, 338889, 0.5, 0.5)
					x += width
				})
			})
		}

		Composer()

		createSprite('sb/girl.png', 'Background', 'TopRight', { x: 690, y: 280 }, () => {
			fade(337250, 338889, 1, 1)
			moveX(337250, 338889, 690, 685)
			scaleAtTime(337250, 0.5)
		})

		createSprite('sb/girl.png', 'Background', 'BottomLeft', { x: -50, y: 200 }, () => {
			fade(337250, 338889, 1, 1)
			moveX(337250, 338889, -50, -45)
			scaleAtTime(337250, 0.5)
			parameter(337250, 338889, Parameter.FlipVertical)
			parameter(337250, 338889, Parameter.FlipHorizontal)
		})

		const thickness = 2

		Rect(
			337250,
			338889,
			{ x: 185, y: thickness },
			{ x: 677, y: 70 },
			() => {
				scaleVec(337250, 338889, { x: 185, y: thickness }, { x: 370, y: thickness })
			},
			'CentreRight'
		)

		Rect(
			337250,
			338889,
			{ x: 185, y: thickness },
			{ x: -37, y: 410 },
			() => {
				scaleVec(337250, 338889, { x: 185, y: thickness }, { x: 370, y: thickness })
			},
			'CentreLeft'
		)

		ColorBg(338889, 339217, Pallete.White)
		Message('together', 338889, 339217)
		Flash(337250)
	}

	function _3() {
		Circ(339217, 340856, 700, { x: 320, y: 240 }, () => {
			scale(339217, 340856, 7 / 8, 6.9 / 8)
		})

		Circ(339217, 340856, 695, { x: 320, y: 240 }, () => {
			scale(339217, 340856, 6.97 / 8, 6.87 / 8)
			colorAtTime(339217, Pallete.Lilac)
		})

		Rect(339217, 340856, { x: 500, y: 500 }, { x: 700, y: 400 }, () => {
			rotate(339217, 340856, degToRad(10), degToRad(12))
		})

		Rect(339217, 340856, { x: 500, y: 500 }, { x: -60, y: 80 }, () => {
			rotate(339217, 340856, degToRad(10), degToRad(12))
		})

		createSprite('sb/girl.png', 'Background', 'Centre', { x: 320, y: 240 }, () => {
			fade(339217, 340856, 1, 1)
			scale(339217, 340856, 0.4, 0.41)
		})

		ColorBg(340856, 341184, Pallete.White)
		Message('forever', 340856, 341184)
		Flash(339217)
	}

	_1()
	_2()
	_3()
}
