import { extractFrames, loadSpectrumSchema } from '@osbjs/spectrum-tiny-osbjs'
import {
	addVec,
	color,
	createSprite,
	degToRad,
	Easing,
	fade,
	flipHorizontal,
	Layer,
	moveX,
	mulVecScalar,
	Origin,
	rotate,
	scale,
	scaleVec,
	Vector2,
} from '@osbjs/tiny-osbjs'
import { createOutlineText, createText, measureLineHeight, measureLineWidth, useTxtGenContext } from '@osbjs/txtgen-tiny-osbjs'
import Circ from '../components/Circ'
import ColorBg from '../components/ColorBg'
import DotGrid from '../components/DotGrid'
import Flash from '../components/Flash'
import Letterbox from '../components/Letterbox'
import Rect from '../components/Rect'
import Pallete from '../utils/pallete'
import { AuthenticContext, SazanamiMinchoBigContext, SazanamiMinchoContext } from '../utils/txtGenContext'

export default function PreChorus3() {
	Main()
	TransitionMid()
	TransitionEnd()
}

function Main() {
	function Spectrum() {
		const { spectrumFrames, fps } = loadSpectrumSchema('schema.json')
		const extractedFrames = extractFrames(spectrumFrames, 263646, 282168, fps)

		const timestep = 1000 / fps
		const width = 2
		const maxHeight = 60
		const margin = 3
		const barCount = 64

		let x = 700,
			y = 363

		Rect(263646, 282168, [barCount * width + margin * (barCount - 1) + 2 * 10, maxHeight + 2 * 10], [x + 10, y + 10], undefined, Origin.BottomRight)

		for (let i = 0; i < barCount; i++) {
			const frames = extractedFrames.map((frame) => frame[i])

			createSprite('sb/pixel.png', Layer.Background, Origin.BottomLeft, [x, y], () => {
				fade(263646, 1)
				color(263646, Pallete.Lilac)

				for (let j = 0; j < frames.length; j++) {
					scaleVec([263646 + timestep * j, 263646 + timestep * (j + 1)], [width, frames[j] * maxHeight], [width, frames[j + 1] * maxHeight])
				}
			})

			x -= width + margin
		}
	}

	function Girl() {
		createSprite('sb/girl.png', Layer.Background, Origin.BottomLeft, [-200, 600], () => {
			fade([263646, 282168], 1, 1)
			moveX([263646, 282168], -200, -170)
			flipHorizontal([263646, 282168])
			scale(263646, 0.8)
		})
	}

	function Composer() {
		useTxtGenContext(SazanamiMinchoBigContext)
		const text = '稲見繭'

		let x = 700,
			y = 0

		text.split('').forEach((letter) => {
			createOutlineText(letter, Layer.Background, Origin.TopRight, [x, y], ({ height }) => {
				fade([263646, 282168], 0.5, 0.5)
				y += height
			})
		})
	}

	function SongName() {
		useTxtGenContext(SazanamiMinchoContext)

		const text = 'landscape'
		const scaleFactor = 0.3
		const lineW = measureLineWidth(text) * scaleFactor

		let x = 700 - lineW,
			y = 25

		text.split('').forEach((letter) => {
			createText(letter, Layer.Background, Origin.TopLeft, [x, y], ({ width }) => {
				fade([263646, 282168], 1)
				color(263646, Pallete.Lilac)
				scale(263646, scaleFactor)
				x += width * scaleFactor
			})
		})
	}

	function Artist() {
		useTxtGenContext(AuthenticContext)

		const text = 'afloat storage'
		const scaleFactor = 0.6

		createText(text, Layer.Background, Origin.CentreRight, [700, 445], () => {
			fade([263646, 282168], 1)
			color(263646, Pallete.Lilac)
			scale(263646, scaleFactor)
		})
	}

	ColorBg(263646, 282168, Pallete.Lilac)
	Composer()
	DotGrid(263646, 282168, 854, [320, 240])
	Spectrum()
	Letterbox(263646, 282168)
	SongName()
	Artist()
	Girl()
	Flash(263646)
	Flash(274123)
}

function TransitionMid() {
	function GirlW() {
		createSprite('sb/girlw.png', Layer.Background, Origin.Centre, [330, 240], () => {
			fade([273639, 274123], 1, 1)
			scale(273639, 0.15)
		})
	}

	function SurroundingSqrs() {
		const count = 12
		const stepAngle = degToRad(360 / count)
		const timeStep = 40
		const endTime = 274123
		const radius = 135
		const size = 15
		const origin: Vector2 = [320, 240]

		let angle = 0,
			startTime = 273639

		for (let i = 0; i < count; i++) {
			let position = addVec(origin, mulVecScalar([Math.sin(angle), -Math.cos(angle)], radius))

			Rect(startTime, endTime, [0, 0], position, () => {
				scaleVec([startTime, endTime], [0, 0], [size, size], Easing.Out)
				rotate(startTime, angle + degToRad(45))
				color(startTime, Pallete.Lilac)
			})

			angle += stepAngle
			startTime += timeStep
		}
	}

	ColorBg(273639, 274123, Pallete.White)
	Circ(273639, 274123, 190, [320, 240], () => {
		color(273639, Pallete.Lilac)
	})
	GirlW()
	SurroundingSqrs()
}

function TransitionEnd() {
	ColorBg(282168, 284789, Pallete.White)

	function RotatingSqr(startTime: number, endTime: number, size: number, startAngle: number) {
		Rect(startTime, 284303, [size, size], [320, 240], () => {
			rotate([startTime, endTime], degToRad(startAngle), degToRad(startAngle + 22.5), Easing.Out)
			color(startTime, Pallete.Lilac)
		})
		Rect(startTime, 284303, [size - 5, size - 5], [320, 240], () => {
			rotate([startTime, endTime], degToRad(startAngle), degToRad(startAngle + 22.5), Easing.Out)
		})
	}

	RotatingSqr(283654, 284140, 420, 90)
	RotatingSqr(283168, 283654, 280, 67.5)
	RotatingSqr(282668, 283168, 160, 45)
	RotatingSqr(282168, 282668, 80, 22.5)

	function Lyrics() {
		useTxtGenContext(SazanamiMinchoContext)

		const text = '出逢え'
		const scaleFactor = 0.4
		const lineW = measureLineWidth(text) * scaleFactor
		const lineH = measureLineHeight(text, (pr, cr) => Math.max(pr, cr)) * scaleFactor
		const padding = 2

		let x = 320 - lineW / 2,
			y = 240 - lineH / 2

		Rect(
			284303,
			284789,
			[1, lineH + padding * 2],
			[x - padding, y - padding],
			() => {
				scaleVec([284303, 284789], [1, lineH + padding * 2], [lineW + padding * 2, lineH + padding * 2], Easing.OutCubic)
				color(284303, Pallete.Lilac)
			},
			Origin.TopLeft
		)

		text.split('').forEach((letter) => {
			createText(letter, Layer.Background, Origin.TopLeft, [x, y], ({ width }) => {
				fade([284303, 284789], 1, 1)
				scale(284303, scaleFactor)
				x += width * scaleFactor
			})
		})
	}

	Lyrics()
}
