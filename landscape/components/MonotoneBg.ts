import { Color, colorAtTime, createSprite, fade, scaleVecAtTime } from '@osbjs/tiny-osbjs'

export default function MonotoneBg(
	startTime: number,
	endTime: number,
	color: Color,
	additionalEffects?: () => void,
	opacity: number = 1,
	fadeIn: number = 0,
	fadeOut: number = 0
) {
	createSprite('sb/pixel.png', 'Background', 'Centre', { x: 320, y: 240 }, () => {
		colorAtTime(startTime, color)
		fade(startTime, startTime + fadeIn, 0, opacity)
		fade(endTime - fadeOut, endTime, opacity, 0)
		scaleVecAtTime(startTime, { x: 854, y: 480 })
		if (additionalEffects) additionalEffects()
	})
}
