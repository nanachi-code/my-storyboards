import { Color, color as setColor, fade } from '@osbjs/tiny-osbjs'
import Rect from './Rect'

export default function ColorBg(startTime: number, endTime: number, color: Color, fadeIn: number = 0, fadeOut: number = 0) {
	Rect(startTime, endTime, [854, 480], [320, 240], () => {
		setColor(startTime, color)
		if (fadeIn) fade([startTime, startTime + fadeIn], 0, 1)
		if (fadeOut) fade([endTime - fadeOut, endTime], 1, 0)
	})
}
