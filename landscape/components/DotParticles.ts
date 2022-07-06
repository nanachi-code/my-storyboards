import { createSprite, fade, fadeAtTime, move, randFloat, randInt, scaleAtTime, Vector2 } from '@osbjs/tiny-osbjs'

export default function DotParticles(startTime: number, endTime: number) {
	const particleCount = 64
	const fadeOut = 325
	const opacity = 0.1
	const lifeTime = 12000
	const timestep = Math.floor(lifeTime / particleCount)

	for (let _startTime = startTime - lifeTime; _startTime <= endTime - fadeOut; _startTime += timestep) {
		const _endTime = _startTime + lifeTime
		const startPostion: Vector2 = { x: 500, y: 0 }
		const endPosition: Vector2 = { x: randInt(-107, 854), y: randInt(240, 480) }
		const scale = randFloat(0.5, 0.7)

		createSprite('sb/dot.png', 'Background', 'Centre', { x: 320, y: 240 }, () => {
			if (_startTime < startTime) {
				fade(_startTime, startTime, 0, 0)
				fade(startTime, _endTime, opacity, opacity)
			} else {
				fadeAtTime(_startTime, opacity)
			}

			if (_endTime >= endTime) {
				fade(endTime - fadeOut, endTime, opacity, 0)
			} else {
				fade(_endTime - fadeOut, _endTime, opacity, 0)
			}

			move(_startTime, _endTime, startPostion, endPosition)
			scaleAtTime(_startTime, scale)
		})
	}
}
