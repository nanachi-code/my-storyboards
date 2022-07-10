import { createSprite, fadeAtTime, Layer, Origin, scaleAtTime, Vector2 } from '@osbjs/tiny-osbjs'

export default function Circ(
	startTime: number,
	endTime: number,
	width: number,
	position: Vector2,
	additionalEffects?: () => void,
	origin: Origin = 'Centre',
	layer: Layer = 'Background'
) {
	createSprite('sb/circ.png', layer, origin, position, () => {
		scaleAtTime(startTime, width / 800)
		fadeAtTime(startTime, 1)
		fadeAtTime(endTime, 0)
		if (additionalEffects) additionalEffects()
	})
}
