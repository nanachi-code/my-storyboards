import { colorAtTime } from '@osbjs/tiny-osbjs'
import Pallete from '../utils/pallete'
import Rect from './Rect'

export default function Letterbox(startTime: number, endTime: number, height: number, additionalEffects?: () => void) {
	const barDimensions = { x: 854, y: height }

	Rect(
		startTime,
		endTime,
		barDimensions,
		{ x: 320, y: 0 },
		() => {
			colorAtTime(startTime, Pallete.Black)
			if (additionalEffects) additionalEffects()
		},
		'TopCentre'
	)

	Rect(
		startTime,
		endTime,
		barDimensions,
		{ x: 320, y: 480 },
		() => {
			colorAtTime(startTime, Pallete.Black)
			if (additionalEffects) additionalEffects()
		},
		'BottomCentre'
	)
}
