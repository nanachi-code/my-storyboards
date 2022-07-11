import { createSprite, fadeAtTime, Layer, Origin, scaleAtTime, Vector2 } from '@osbjs/tiny-osbjs'

export default function DotGrid(
	startTime: number,
	endTime: number,
	size: number,
	position: Vector2,
	additionalEffects?: () => void,
	origin: Origin = 'Centre',
	layer: Layer = 'Background'
) {
	createSprite('sb/dots.png', layer, origin, position, () => {
		scaleAtTime(startTime, size / 872)
		fadeAtTime(startTime, 1)
		fadeAtTime(endTime, 0)
		if (additionalEffects) additionalEffects()
	})
}
