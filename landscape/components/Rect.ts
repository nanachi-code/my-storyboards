import { createSprite, fadeAtTime, Layer, Origin, scaleVecAtTime, Vector2 } from '@osbjs/tiny-osbjs'

export default function Rect(
	startTime: number,
	endTime: number,
	dimensions: Vector2,
	position: Vector2,
	additionalEffects?: () => void,
	origin: Origin = 'Centre',
	layer: Layer = 'Background'
) {
	createSprite('sb/pixel.png', layer, origin, position, () => {
		scaleVecAtTime(startTime, dimensions)
		fadeAtTime(startTime, 1)
		fadeAtTime(endTime, 0)
		if (additionalEffects) additionalEffects()
	})
}
