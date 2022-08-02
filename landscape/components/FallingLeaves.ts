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

export default function FallingLeaves(startTime: number, endTime: number, fadeIn: number = 0, fadeOut: number = 0) {
	const width = 854,
		minX = -107,
		maxX = 747
	const density = 7
	const distanceBetweenPoints = width / density

	const speed = 0.5 // px per sec
	const travelDistance = ((endTime - startTime) / 1000) * speed

	for (let x = minX; x < maxX; x += distanceBetweenPoints) {
		const startPosition: Vector2 = [x, randInt(0, 480, `schizo${x}`)],
			endPosition: Vector2 = [startPosition[0], startPosition[1] + travelDistance]

		createSprite(`sb/petal${randInt(1, 3)}.png`, Layer.Background, Origin.Centre, startPosition, () => {
			move([startTime, endTime], startPosition, endPosition)
			rotate(startTime, degToRad(randInt(-30, 30)))
			scale(startTime, randFloat(0.5, 1.5))
			color(startTime, Pallete.LightCoral)
			additiveBlending([startTime, endTime])
			fade([startTime, startTime + fadeIn], 0, 0.8)
			fade([endTime - fadeOut, endTime], 0.8, 0)
		})
	}
}
