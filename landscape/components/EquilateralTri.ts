import { createSprite, fade, Layer, Origin, scale, Vector2 } from '@osbjs/tiny-osbjs'

export default function EquilateralTri(
	startTime: number,
	endTime: number,
	sideLength: number,
	position: Vector2,
	additionalEffects?: () => void,
	layer: Layer = Layer.Background,
	origin: Origin = Origin.Centre
) {
	createSprite('sb/tri.png', layer, origin, position, () => {
		scale(startTime, sideLength / 600)
		fade(startTime, 1)
		fade(endTime, 0)
		if (additionalEffects) additionalEffects()
	})
}
