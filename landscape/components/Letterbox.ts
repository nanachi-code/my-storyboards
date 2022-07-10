import { Color, colorAtTime } from '@osbjs/tiny-osbjs'
import Pallete from '../utils/pallete'
import Rect from './Rect'

export default function Letterbox(startTime: number, endTime: number, color: Color = Pallete.Black) {
	const barDimensions = { x: 854, y: 70 }

	Rect(
		startTime,
		endTime,
		barDimensions,
		{ x: 320, y: 0 },
		() => {
			colorAtTime(startTime, color)
		},
		'TopCentre'
	)

	Rect(
		startTime,
		endTime,
		barDimensions,
		{ x: 320, y: 480 },
		() => {
			colorAtTime(startTime, color)
		},
		'BottomCentre'
	)
}
