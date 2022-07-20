import { createSprite, fade, Layer, Origin, scaleVec, Vector2 } from '@osbjs/tiny-osbjs'

export default function Rect(
	startTime: number,
	endTime: number,
	dimensions: Vector2,
	position: Vector2,
	additionalEffects?: () => void,
	origin: Origin = Origin.Centre,
	layer: Layer = Layer.Background
) {
	createSprite('sb/pixel.png', layer, origin, position, () => {
		scaleVec(startTime, dimensions)
		fade(startTime, 1)
		fade(endTime, 0)
		if (additionalEffects) additionalEffects()
	})
}
