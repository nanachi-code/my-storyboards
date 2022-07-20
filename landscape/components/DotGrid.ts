import { createSprite, fade, Layer, Origin, scale, Vector2 } from '@osbjs/tiny-osbjs'

export default function DotGrid(
	startTime: number,
	endTime: number,
	size: number,
	position: Vector2,
	additionalEffects?: () => void,
	origin: Origin = Origin.Centre,
	layer: Layer = Layer.Background
) {
	createSprite('sb/dots.png', layer, origin, position, () => {
		scale(startTime, size / 872)
		fade(startTime, 1)
		fade(endTime, 0)
		if (additionalEffects) additionalEffects()
	})
}
