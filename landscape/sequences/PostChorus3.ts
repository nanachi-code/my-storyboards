import {
	color,
	createSprite,
	degToRad,
	Easing,
	fade,
	flipHorizontal,
	flipVertical,
	Layer,
	moveX,
	moveY,
	Origin,
	rotate,
	scale,
	scaleVec,
	Vector2,
} from '@osbjs/tiny-osbjs'
import { createOutlineText, createText, maxLineHeight, measureLineHeight, measureLineWidth, useTxtGenContext } from '@osbjs/txtgen-tiny-osbjs'
import Circ from '../components/Circ'
import ColorBg from '../components/ColorBg'
import DotGrid from '../components/DotGrid'
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
		createSprite('sb/girlw.png', Layer.Background, Origin.Centre, [330, 240], () => {
			fade([startTime, endTime], 1)
			scale(startTime, 0.15)
			color(startTime, Pallete.Lilac)
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
				fade([startTime, endTime], 1, 1)
				color(startTime, Pallete.Lilac)
				scale(startTime, _scale)
				x += width * _scale
			})
		})
	}

	function Artist() {
		useTxtGenContext(AuthenticContext)

		const text = 'afloat storage'
		const _scale = 0.6

		createText(text, Layer.Background, Origin.Centre, [320, 445], () => {
			fade([startTime, endTime], 1)
			color(startTime, Pallete.Lilac)
			scale(startTime, _scale)
		})
	}

	function RotatingSqr(size: number, startAngle: number, travelAngle: number) {
		Rect(startTime, endTime, [size, size], [320, 240], () => {
			rotate([startTime, endTime], degToRad(startAngle), degToRad(startAngle + travelAngle))
		})
		Rect(startTime, endTime, [size - 3, size - 3], [320, 240], () => {
			rotate([startTime, endTime], degToRad(startAngle), degToRad(startAngle + travelAngle))
			color(startTime, Pallete.Lilac)
		})
	}

	RotatingSqr(420, 15, 5)
	RotatingSqr(280, 30, -5)
	Circ(startTime, endTime, 190, [320, 240])
	GirlW()
	Letterbox(startTime, endTime)
	SongName()
	Artist()
	Flash(startTime)
}

function FirstHalf() {
	function _1() {
		Circ(326760, 328412, 700, [320, 240], () => {
			scale([326760, 328412], 7 / 8, 6.5 / 8)
		})

		Circ(326760, 328412, 695, [320, 240], () => {
			scale([326760, 328412], 6.97 / 8, 6.47 / 8)
			color(326760, Pallete.Lilac)
		})

		DotGrid(326760, 328412, 854, [320, 240])

		createSprite('sb/girl.png', Layer.Background, Origin.BottomCentre, [320, 480], () => {
			fade([326760, 328412], 1, 1)
			scale([326760, 328412], 0.5, 0.51)
		})

		ColorBg(328412, 328743, Pallete.White)

		Circ(328412, 328743, 100, [320, 240], () => {
			scale([328412, 328743], 1 / 8, 1 / 10, Easing.Out)
			color(328412, Pallete.Lilac)
		})

		Flash(326760)
	}

	function _2() {
		function RotatingTri(sideLength: number, startAngle: number, travelAngle: number, position: Vector2 = [120, 160]) {
			const startTime = 328743,
				endTime = 330371
			EquilateralTri(startTime, endTime, sideLength, position, () => {
				fade([startTime, endTime], 1)
				rotate([startTime, endTime], degToRad(startAngle), degToRad(startAngle + travelAngle))
			})

			EquilateralTri(startTime, endTime, sideLength - 3, position, () => {
				fade([startTime, endTime], 1)
				rotate([startTime, endTime], degToRad(startAngle), degToRad(startAngle + travelAngle))
				color(startTime, Pallete.Lilac)
			})
		}

		RotatingTri(300, 75, 5)

		DotGrid(328743, 330371, 854, [320, 240])

		createSprite('sb/girl.png', Layer.Background, Origin.TopLeft, [320, 0], () => {
			fade([328743, 330371], 1, 1)
			moveY([328743, 330371], 0, -13)
		})

		ColorBg(330371, 330694, Pallete.White)

		Circ(330371, 330694, 80, [320, 240], () => {
			color(330371, Pallete.Lilac)
			moveX([330371, 330694], 320, 270, Easing.Out)
		})

		Circ(330371, 330694, 80, [320, 240], () => {
			color(330371, Pallete.Lilac)
			moveX([330371, 330694], 320, 370, Easing.Out)
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
				createOutlineText(letter, Layer.Background, Origin.TopRight, [x, y], ({ height }) => {
					fade([330694, 332342], 0.5)
					y += height
				})
			})
		}

		Composer()

		DotGrid(330694, 332342, 854, [320, 240])

		createSprite('sb/girl.png', Layer.Background, Origin.TopCentre, [120, -250], () => {
			fade([330694, 332342], 1)
			scale(330694, 2)
			moveX([330694, 332342], 120, 115)
			flipHorizontal([330694, 332342])
		})

		ColorBg(332342, 332672, Pallete.White)

		Circ(332342, 332672, 80, [270, 240], () => {
			color(332342, Pallete.Lilac)
			moveY([332342, 332672], 240, 190, Easing.Out)
		})

		Circ(332342, 332672, 80, [270, 240], () => {
			color(332342, Pallete.Lilac)
			moveY([332342, 332672], 240, 290, Easing.Out)
		})

		Circ(332342, 332672, 80, [370, 240], () => {
			color(332342, Pallete.Lilac)
			moveY([332342, 332672], 240, 190, Easing.Out)
		})

		Circ(332342, 332672, 80, [370, 240], () => {
			color(332342, Pallete.Lilac)
			moveY([332342, 332672], 240, 290, Easing.Out)
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
		const lineH = maxLineHeight(text) * _scale
		const travelDistanceStep = 5

		let startX = 320 - lineW / 2
		let y = 240 - lineH / 2

		text.split('').forEach((letter, i) => {
			if (letter != ' ') {
				let endX = startX - (travelDistanceStep * (text.length / 2 - 1 - i)) / 2

				createText(letter, Layer.Background, Origin.TopLeft, [startX, y], ({ width }) => {
					fade([startTime, endTime], 1)
					moveX([startTime, endTime], startX, endX, Easing.Out)
					scale(startTime, _scale)
					color(startTime, Pallete.Lilac)
					startX += width * _scale
				})
			} else {
				startX += spaceW
			}
		})
	}

	function _1() {
		EquilateralTri(335283, 336922, 250, [460, 240], () => {
			rotate(335283, degToRad(-90))
			moveX([335283, 336922], 460, 465)
		})

		EquilateralTri(335283, 336922, 245, [460, 240], () => {
			rotate(335283, degToRad(-90))
			moveX([335283, 336922], 460, 465)
			color(335283, Pallete.Lilac)
		})

		EquilateralTri(335283, 336922, 250, [180, 240], () => {
			rotate(335283, degToRad(90))
			moveX([335283, 336922], 180, 175)
		})

		EquilateralTri(335283, 336922, 245, [180, 240], () => {
			rotate(335283, degToRad(90))
			moveX([335283, 336922], 180, 175)
			color(335283, Pallete.Lilac)
		})

		DotGrid(335283, 336922, 854, [320, 240])

		createSprite('sb/girl.png', Layer.Background, Origin.BottomLeft, [-50, 480], () => {
			fade([335283, 336922], 1, 1)
			moveY([335283, 336922], 480, 485)
			scale(335283, 0.5)
		})

		createSprite('sb/girl.png', Layer.Background, Origin.TopRight, [690, 0], () => {
			fade([335283, 336922], 1, 1)
			moveY([335283, 336922], 0, -5)
			scale(335283, 0.5)
			flipHorizontal([335283, 336922])
			flipVertical([335283, 336922])
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
				createOutlineText(letter, Layer.Background, Origin.CentreLeft, [x, y], ({ width }) => {
					fade([337250, 338889], 0.5)
					x += width
				})
			})
		}

		Composer()

		DotGrid(337250, 338889, 854, [320, 240])

		createSprite('sb/girl.png', Layer.Background, Origin.TopRight, [690, 280], () => {
			fade([337250, 338889], 1)
			moveX([337250, 338889], 690, 685)
			scale(337250, 0.5)
		})

		createSprite('sb/girl.png', Layer.Background, Origin.BottomLeft, [-50, 200], () => {
			fade([337250, 338889], 1)
			moveX([337250, 338889], -50, -45)
			scale(337250, 0.5)
			flipVertical([337250, 338889])
			flipHorizontal([337250, 338889])
		})

		const thickness = 2

		Rect(
			337250,
			338889,
			[185, thickness],
			[677, 70],
			() => {
				scaleVec([337250, 338889], [185, thickness], [370, thickness])
			},
			Origin.CentreRight
		)

		Rect(
			337250,
			338889,
			[185, thickness],
			[-37, 410],
			() => {
				scaleVec([337250, 338889], [185, thickness], [370, thickness])
			},
			Origin.CentreLeft
		)

		ColorBg(338889, 339217, Pallete.White)
		Message('together', 338889, 339217)
		Flash(337250)
	}

	function _3() {
		Rect(339217, 340856, [500, 500], [700, 400], () => {
			rotate([339217, 340856], degToRad(10), degToRad(12))
		})

		Rect(339217, 340856, [497, 497], [700, 400], () => {
			rotate([339217, 340856], degToRad(10), degToRad(12))
			color(339217, Pallete.Lilac)
		})

		Rect(339217, 340856, [500, 500], [-60, 80], () => {
			rotate([339217, 340856], degToRad(10), degToRad(12))
		})

		Rect(339217, 340856, [497, 497], [-60, 80], () => {
			rotate([339217, 340856], degToRad(10), degToRad(12))
			color(339217, Pallete.Lilac)
		})

		DotGrid(339217, 340856, 854, [320, 240])

		createSprite('sb/girl.png', Layer.Background, Origin.Centre, [320, 240], () => {
			fade([339217, 340856], 1)
			scale([339217, 340856], 0.4, 0.41)
		})

		ColorBg(340856, 341184, Pallete.White)
		Message('forever', 340856, 341184)
		Flash(339217)
	}

	_1()
	_2()
	_3()
}
