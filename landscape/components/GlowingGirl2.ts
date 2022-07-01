import { createSprite, fade, scaleAtTime } from '@osbjs/tiny-osbjs'

export default function GlowingGirl2(
	startTime: number,
	endTime: number,
	additionalEffects?: () => void,
	opacity: number = 1,
	fadeIn: number = 0,
	fadeOut: number = 0,
	scale: number = 1200 / 1920
) {
	createSprite('sb/girl-2-glow.png', 'Background', 'Centre', { x: 320, y: 240 }, () => {
		scaleAtTime(startTime, scale)
		fade(startTime, startTime + fadeIn, 0, opacity)
		fade(endTime - fadeOut, endTime, opacity, 0)
		if (additionalEffects) additionalEffects()
	})
}
