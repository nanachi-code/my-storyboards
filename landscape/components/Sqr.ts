import { createSprite, fade, Layer, Origin, scale, Vector2 } from '@osbjs/tiny-osbjs'

export default function Sqr(
	startTime: number,
	endTime: number,
	size: number,
	position: Vector2,
	additionalEffects?: () => void,
	origin: Origin = Origin.Centre,
	layer: Layer = Layer.Background
) {
	createSprite('sb/pixel.png', layer, origin, position, () => {
		scale(startTime, size)
		fade([startTime, endTime], 1)
		if (additionalEffects) additionalEffects()
	})
}
