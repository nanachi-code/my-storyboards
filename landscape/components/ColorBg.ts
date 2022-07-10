import { Color, colorAtTime } from '@osbjs/tiny-osbjs'
import Rect from './Rect'

export default function ColorBg(startTime: number, endTime: number, color: Color) {
	Rect(startTime, endTime, { x: 854, y: 480 }, { x: 320, y: 240 }, () => {
		colorAtTime(startTime, color)
	})
}
