import { Color, color as setColor } from '@osbjs/tiny-osbjs'
import Rect from './Rect'

export default function ColorBg(startTime: number, endTime: number, color: Color) {
	Rect(startTime, endTime, [854, 480], [320, 240], () => {
		setColor(startTime, color)
	})
}
