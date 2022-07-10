import { colorAtTime, degToRad, Easing, fade, rotate, scaleAtTime, scaleVec } from '@osbjs/tiny-osbjs'
import { createText, measureLineHeight, measureLineWidth, useTxtGenContext } from '@osbjs/txtgen-tiny-osbjs'
import Rect from '../components/Rect'
import Pallete from '../utils/pallete'
import { SazanamiMinchoContext } from '../utils/txtGenContext'

export default function PreChorus3() {
	Rect(282168, 284789, { x: 854, y: 480 }, { x: 320, y: 240 })

	TransitionEnd()
}

function TransitionEnd() {
	function RotatingSqr(startTime: number, endTime: number, size: number, startAngle: number) {
		Rect(startTime, 284303, { x: size, y: size }, { x: 320, y: 240 }, () => {
			rotate(startTime, endTime, degToRad(startAngle), degToRad(startAngle + 22.5), Easing.Out)
			colorAtTime(startTime, Pallete.Black)
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
				colorAtTime(284303, Pallete.Black)
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
