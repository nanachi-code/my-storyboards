import { moveX, moveY } from '@osbjs/tiny-osbjs'
import SimplexNoise from 'simplex-noise'

const simplex = new SimplexNoise('177013')

export function wigglePosition(
	startTime: number,
	endTime: number,
	frequency: number,
	amplitude: number,
	originX: number = 320,
	originY: number = 240
) {
	let x = originX,
		y = originY
	let t = startTime
	const timestep = 1000 / frequency

	do {
		const newX = amplitude * simplex.noise2D(originX, t) + originX
		const newY = amplitude * simplex.noise2D(originY, t) + originY

		moveX(t, t + timestep, x, newX)
		moveY(t, t + timestep, y, newY)

		x = newX
		y = newY
		t += timestep
	} while (t < endTime)
}
