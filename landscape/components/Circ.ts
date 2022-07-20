import { createSprite, fade, Layer, Origin, scale, Vector2 } from '@osbjs/tiny-osbjs'

export default function Circ(
	startTime: number,
	endTime: number,
	diameter: number,
	position: Vector2,
	additionalEffects?: () => void,
	origin: Origin = Origin.Centre,
	layer: Layer = Layer.Background
) {
	createSprite('sb/circ.png', layer, origin, position, () => {
		scale(startTime, diameter / 800)
		fade(startTime, 1)
		fade(endTime, 0)
		if (additionalEffects) additionalEffects()
	})
}
