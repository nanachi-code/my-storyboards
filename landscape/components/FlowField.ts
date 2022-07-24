import {
	addVec,
	areEqualVecs,
	color,
	createSprite,
	fade,
	interpolate,
	Layer,
	mulVecScalar,
	Origin,
	randFloat,
	scale,
	Vector2,
} from '@osbjs/tiny-osbjs'
import SimplexNoise from 'simplex-noise'

export default function FlowField(startTime: number, endTime: number) {
	const simplex = new SimplexNoise()

	const width = 854,
		height = 480,
		minX = -107,
		maxX = 747

	const fps = 24
	const timestep = 1000 / fps

	const positions: Vector2[] = []
	const memoizedPositions: Vector2[] = []
	const density = 20
	const distanceBetweenPoints = width / density

	const mult = 0.005

	for (let x = minX; x < maxX; x += distanceBetweenPoints) {
		positions.push([x + randFloat(-30, 30), 0])
	}

	// render
	function renderFrame(time: number) {
		for (let i = 0; i < positions.length; i++) {
			const position = positions[i]
			const [x, y] = position
			const length = 30
			const vecMag = 2

			const angle = interpolate(simplex.noise2D(x * mult, y * mult), [-1, 1], [0, Math.PI * 4])
			const nextPosition: Vector2 = addVec(position, mulVecScalar([Math.cos(angle), Math.sin(angle)], vecMag))
			const [pX, pY] = nextPosition

			const r = interpolate(x, [minX, maxX], [50, 255])
			const g = interpolate(y, [0, height], [50, 100])
			const b = interpolate(x, [minX, maxX], [30, 50])

			// dont render if out-of-bounds
			if (!(pX < -107 || pX > 747 || pY < 0 || pY > 480)) {
				if (!memoizedPositions.some((p) => areEqualVecs(p, nextPosition))) {
					createSprite('sb/d.png', Layer.Background, Origin.Centre, nextPosition, () => {
						scale(time, length / 480)
						fade([time, endTime], 1)
						color(time, [r, g, b])
					})
					memoizedPositions.push(nextPosition)
				}
			}

			positions[i] = nextPosition
		}
	}

	let t = startTime
	do {
		renderFrame(t)
		t += timestep
	} while (t <= endTime)
}
