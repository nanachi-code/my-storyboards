import { addVec, color, createSprite, fade, interpolate, Layer, Origin, randFloat, scale, Vector2 } from '@osbjs/tiny-osbjs'
import SimplexNoise from 'simplex-noise'

export default function FlowField(startTime: number, endTime: number) {
	const simplex = new SimplexNoise('landscape')

	const width = 854,
		height = 480,
		minX = -107,
		maxX = 747

	const fps = 10
	const timestep = 1000 / fps

	const points: Vector2[] = []
	const density = 10
	const distanceBetweenPoints = width / density

	const mult = 0.005

	for (let x = minX; x < maxX; x += distanceBetweenPoints) {
		for (let y = 0; y < height; y += distanceBetweenPoints) {
			points.push([x + randFloat(-30, 30), y + randFloat(-30, 30)])
		}
	}

	// render
	function renderFrame(time: number) {
		for (let i = 0; i < points.length; i++) {
			let point = points[i]
			const [x, y] = point
			const length = 1

			const angle = interpolate(simplex.noise2D(x * mult, y * mult), [-1, 1], [0, Math.PI * 4])
			const position: Vector2 = addVec(point, [Math.cos(angle) * length, Math.sin(angle) * length])
			const [pX, pY] = position

			const r = interpolate(x, [minX, maxX], [50, 255])
			const g = interpolate(y, [0, height], [50, 100])
			const b = interpolate(x, [minX, maxX], [30, 50])

			// dont render if out-of-bounds
			if (!(pX < -107 || pX > 747 || pY < 0 || pY > 480))
				createSprite('sb/pixel.png', Layer.Background, Origin.Centre, position, () => {
					scale(time, length)
					fade([time, endTime], 1)
					color(time, [r, g, b])
				})

			points[i] = position
		}
	}

	let t = startTime
	do {
		renderFrame(t)
		t += timestep
	} while (t <= endTime)
}
