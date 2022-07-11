import { extractFrames, loadSpectrumSchema } from '@osbjs/spectrum-tiny-osbjs'
import {
	addVec,
	colorAtTime,
	createSprite,
	degToRad,
	Easing,
	fade,
	fadeAtTime,
	moveX,
	mulVecScalar,
	Parameter,
	parameter,
	rotate,
	rotateAtTime,
	scaleAtTime,
	scaleVec,
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

		Rect(
			263646,
			282168,
			{ x: barCount * width + margin * (barCount - 1) + 2 * 10, y: maxHeight + 2 * 10 },
			{ x: x + 10, y: y + 10 },
			undefined,
			'BottomRight'
		)

		for (let i = 0; i < barCount; i++) {
			const frames = extractedFrames.map((frame) => frame[i])

			createSprite('sb/pixel.png', 'Background', 'BottomLeft', { x, y }, () => {
				fadeAtTime(263646, 1)
				colorAtTime(263646, Pallete.Lilac)

				for (let j = 0; j < frames.length; j++) {
					scaleVec(
						263646 + timestep * j,
						263646 + timestep * (j + 1),
						{ x: width, y: frames[j] * maxHeight },
						{ x: width, y: frames[j + 1] * maxHeight }
					)
				}
			})

			x -= width + margin
		}
	}

	function Girl() {
		createSprite('sb/girl.png', 'Background', 'BottomLeft', { x: -200, y: 600 }, () => {
			fade(263646, 282168, 1, 1)
			moveX(263646, 282168, -200, -170)
			parameter(263646, 282168, Parameter.FlipHorizontal)
			scaleAtTime(263646, 0.8)
		})
	}

	function Composer() {
		useTxtGenContext(SazanamiMinchoBigContext)
		const text = '稲見繭'

		let x = 700,
			y = 0

		text.split('').forEach((letter) => {
			createOutlineText(letter, 'Background', 'TopRight', { x, y }, ({ height }) => {
				fade(263646, 282168, 0.5, 0.5)
				y += height
			})
		})
	}

	function SongName() {
		useTxtGenContext(SazanamiMinchoContext)

		const text = 'landscape'
		const scale = 0.3
		const lineW = measureLineWidth(text) * scale

		let x = 700 - lineW,
			y = 25

		text.split('').forEach((letter) => {
			createText(letter, 'Background', 'TopLeft', { x, y }, ({ width }) => {
				fade(263646, 282168, 1, 1)
				colorAtTime(263646, Pallete.Lilac)
				scaleAtTime(263646, scale)
				x += width * scale
			})
		})
	}

	function Artist() {
		useTxtGenContext(AuthenticContext)

		const text = 'afloat storage'
		const scale = 0.6

		createText(text, 'Background', 'CentreRight', { x: 700, y: 445 }, () => {
			fade(263646, 282168, 1, 1)
			colorAtTime(263646, Pallete.Lilac)
			scaleAtTime(263646, scale)
		})
	}

	ColorBg(263646, 282168, Pallete.Lilac)
	Composer()
	DotGrid(263646, 282168, 854, { x: 320, y: 240 })
	Spectrum()
	Letterbox(263646, 282168, Pallete.White)
	SongName()
	Artist()
	Girl()
	Flash(263646)
	Flash(274123)
}

function TransitionMid() {
	function GirlW() {
		createSprite('sb/girlw.png', 'Background', 'Centre', { x: 330, y: 240 }, () => {
			fade(273639, 274123, 1, 1)
			scaleAtTime(273639, 0.15)
		})
	}

	function SurroundingSqrs() {
		const count = 12
		const stepAngle = degToRad(360 / count)
		const timeStep = 40
		const endTime = 274123
		const radius = 135
		const size = 15
		const origin = { x: 320, y: 240 }

		let angle = 0,
			startTime = 273639

		for (let i = 0; i < count; i++) {
			let position = addVec(origin, mulVecScalar({ x: Math.sin(angle), y: -Math.cos(angle) }, radius))

			Rect(startTime, endTime, { x: 0, y: 0 }, position, () => {
				scaleVec(startTime, endTime, { x: 0, y: 0 }, { x: size, y: size }, Easing.Out)
				rotateAtTime(startTime, angle + degToRad(45))
				colorAtTime(startTime, Pallete.Lilac)
			})

			angle += stepAngle
			startTime += timeStep
		}
	}

	ColorBg(273639, 274123, Pallete.White)
	Circ(273639, 274123, 190, { x: 320, y: 240 }, () => {
		colorAtTime(273639, Pallete.Lilac)
	})
	GirlW()
	SurroundingSqrs()
}

function TransitionEnd() {
	ColorBg(282168, 284789, Pallete.White)

	function RotatingSqr(startTime: number, endTime: number, size: number, startAngle: number) {
		Rect(startTime, 284303, { x: size, y: size }, { x: 320, y: 240 }, () => {
			rotate(startTime, endTime, degToRad(startAngle), degToRad(startAngle + 22.5), Easing.Out)
			colorAtTime(startTime, Pallete.Lilac)
		})
		Rect(startTime, 284303, { x: size - 5, y: size - 5 }, { x: 320, y: 240 }, () => {
			rotate(startTime, endTime, degToRad(startAngle), degToRad(startAngle + 22.5), Easing.Out)
		})
	}

	RotatingSqr(283654, 284140, 420, 90)
	RotatingSqr(283168, 283654, 280, 67.5)
	RotatingSqr(282668, 283168, 160, 45)
	RotatingSqr(282168, 282668, 80, 22.5)

	function Lyrics() {
		useTxtGenContext(SazanamiMinchoContext)

		const text = '出逢え'
		const scale = 0.4
		const lineW = measureLineWidth(text) * scale
		const lineH = measureLineHeight(text, (pr, cr) => Math.max(pr, cr)) * scale
		const padding = 2

		let x = 320 - lineW / 2,
			y = 240 - lineH / 2

		Rect(
			284303,
			284789,
			{ x: 1, y: lineH + padding * 2 },
			{ x: x - padding, y: y - padding },
			() => {
				scaleVec(284303, 284789, { x: 1, y: lineH + padding * 2 }, { x: lineW + padding * 2, y: lineH + padding * 2 }, Easing.OutCubic)
				colorAtTime(284303, Pallete.Lilac)
			},
			'TopLeft'
		)

		text.split('').forEach((letter) => {
			createText(letter, 'Background', 'TopLeft', { x, y }, ({ width }) => {
				fade(284303, 284789, 1, 1)
				scaleAtTime(284303, scale)
				x += width * scale
			})
		})
	}

	Lyrics()
}
