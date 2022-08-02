import { additiveBlending, createSprite, fade, Layer, move, Origin, randFloat, scale, Vector2 } from '@osbjs/tiny-osbjs'

export default function Paricles(startTime: number, endTime: number, fadeIn: number = 0, fadeOut: number = 0) {
	const width = 854,
		minX = -107,
		maxX = 747
	const density = 40
	const distanceBetweenPoints = width / density
	const speed = 0.5 // px per sec
	const travelDistance = ((endTime - startTime) / 1000) * speed

	for (let x = minX; x < maxX; x += distanceBetweenPoints) {
		const startPosition: Vector2 = [x, randFloat(0, 480)],
			endPosition: Vector2 = [x, startPosition[1] - travelDistance]

		createSprite('sb/d.png', Layer.Background, Origin.Centre, [320, 240], () => {
			move([startTime, endTime], startPosition, endPosition)
			scale(startTime, randFloat(20, 50) / 480)
			fade([startTime, startTime + fadeIn], 0, 0.2)
			fade([endTime - fadeOut, endTime], 0.2, 0)
			additiveBlending([startTime, endTime])
		})
	}
}
