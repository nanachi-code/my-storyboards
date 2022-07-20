import { Color, color as setColor, Origin, Vector2 } from '@osbjs/tiny-osbjs'
import Pallete from '../utils/pallete'
import Rect from './Rect'

export default function Letterbox(startTime: number, endTime: number, color: Color = Pallete.Black) {
	const barDimensions: Vector2 = [854, 70]

	Rect(
		startTime,
		endTime,
		barDimensions,
		[320, 0],
		() => {
			setColor(startTime, color)
		},
		Origin.TopCentre
	)

	Rect(
		startTime,
		endTime,
		barDimensions,
		[320, 480],
		() => {
			setColor(startTime, color)
		},
		Origin.BottomCentre
	)
}
