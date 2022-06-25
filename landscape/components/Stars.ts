import { createSprite, degToRad, fade, move, randFloat, randInt, rotateAtTime, scaleAtTime, Vector2 } from '@osbjs/tiny-osbjs'

export default function Stars(
	startTime: number,
	endTime: number,
	amount: number = 15,
	minPosition: Vector2 = { x: -107, y: 100 },
	maxPosition: Vector2 = { x: 747, y: 480 },
	minScale: number = 0.2,
	maxScale: number = 0.4,
	fadeIn: number = 150,
	fadeOut: number = 325
) {
	for (let i = 0; i < amount; i++) {
		const startPosition = { x: randInt(minPosition.x, maxPosition.x), y: randInt(minPosition.y, maxPosition.y) },
			endPosition = { x: startPosition.x, y: startPosition.y - randInt(70, 150) }

		createSprite('sb/star.png', 'Background', 'Centre', { x: 320, y: 240 }, () => {
			fade(startTime, startTime + fadeIn, 0, 1)
			fade(endTime - fadeOut, endTime, 1, 0)
			scaleAtTime(startTime, randFloat(minScale, maxScale))
			rotateAtTime(startTime, randFloat(degToRad(-55), degToRad(10)))
			move(startTime, endTime, startPosition, endPosition)
		})
	}
}
