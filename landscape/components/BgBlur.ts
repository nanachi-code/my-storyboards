import { createSprite, fade, scaleAtTime } from '@osbjs/tiny-osbjs'

export default function BgBlur(
	startTime: number,
	endTime: number,
	additionalEffects?: () => void,
	opacity: number = 1,
	fadeIn: number = 0,
	fadeOut: number = 0
) {
	createSprite('sb/bg-blur.jpg', 'Background', 'Centre', { x: 320, y: 240 }, () => {
		scaleAtTime(startTime, 854 / 1920)
		fade(startTime, startTime + fadeIn, 0, opacity)
		fade(endTime - fadeOut, endTime, opacity, 0)
		if (additionalEffects) additionalEffects()
	})
}
