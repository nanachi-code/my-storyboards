import { createSprite, fade, fadeAtTime, scaleAtTime } from '@osbjs/tiny-osbjs'

export default function Bg(
	startTime: number,
	endTime: number,
	additionalEffects?: () => void,
	opacity: number = 1,
	fadeIn: number = 0,
	fadeOut: number = 0
) {
	createSprite('bg.jpg', 'Background', 'Centre', { x: 320, y: 240 }, () => {
		scaleAtTime(startTime, 854 / 1920)
		fade(startTime, startTime + fadeIn, 0, opacity)
		fade(endTime - fadeOut, endTime, opacity, 0)
		if (additionalEffects) additionalEffects()
	})
}

export function HideBg() {
	createSprite('bg.jpg', 'Background', 'Centre', { x: 320, y: 240 }, () => {
		fadeAtTime(0, 0)
	})
}
