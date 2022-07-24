import {
	additiveBlending,
	color,
	createSprite,
	degToRad,
	fade,
	Layer,
	move,
	Origin,
	randFloat,
	randInt,
	rotate,
	scale,
	Vector2,
} from '@osbjs/tiny-osbjs'
import Pallete from '../utils/pallete'

export default function FallingLeaves(startTime: number, endTime: number, fadeOut: number = 0) {
	const count = 7
	const speed = 1 // px per sec
	const travelDistance = ((endTime - startTime) / 1000) * speed

	for (let i = 0; i < count; i++) {
		const startPosition: Vector2 = [randInt(-107, 747), randInt(0, 480)],
			endPosition: Vector2 = [startPosition[0], startPosition[1] + travelDistance]

		createSprite(`sb/petal${randInt(1, 3)}.png`, Layer.Background, Origin.Centre, startPosition, () => {
			move([startTime, endTime], startPosition, endPosition)
			rotate(startTime, degToRad(randInt(-30, 30)))
			scale(startTime, randFloat(0.5, 2))
			color(startTime, Pallete.LightCoral)
			additiveBlending([startTime, endTime])
			fade([startTime, endTime - fadeOut], 0.8)
			fade([endTime - fadeOut, endTime], 0.8, 0)
		})
	}
}
