import { createSprite, fade, scaleAtTime } from '@osbjs/tiny-osbjs'

export default function GlowingGirl(
	startTime: number,
	endTime: number,
	additionalEffects?: () => void,
	opacity: number = 1,
	fadeIn: number = 0,
	fadeOut: number = 0,
	scale: number = 854 / 1920
) {
	createSprite('sb/girl-glow.png', 'Background', 'Centre', { x: 320, y: 240 }, () => {
		scaleAtTime(startTime, scale)
		fade(startTime, startTime + fadeIn, 0, opacity)
		fade(endTime - fadeOut, endTime, opacity, 0)
		if (additionalEffects) additionalEffects()
	})
}
