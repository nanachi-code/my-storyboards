import { createSprite, fadeAtTime, Layer, Origin, scaleAtTime, Vector2 } from '@osbjs/tiny-osbjs'

export default function EquilateralTri(
	startTime: number,
	endTime: number,
	sideLength: number,
	position: Vector2,
	additionalEffects?: () => void,
	layer: Layer = 'Background',
	origin: Origin = 'Centre'
) {
	createSprite('sb/tri.png', layer, origin, position, () => {
		scaleAtTime(startTime, sideLength / 600)
		fadeAtTime(startTime, 1)
		fadeAtTime(endTime, 0)
		if (additionalEffects) additionalEffects()
	})
}
