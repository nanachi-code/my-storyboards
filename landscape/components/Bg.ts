import { createSprite, fade, scaleAtTime } from '@osbjs/tiny-osbjs'
export default function Bg(
	startTime: number,
	endTime: number,
	opacity: number = 1,
	fadeIn: number = 300,
	fadeOut: number = 300,
	scale: number = 854 / 1920
) {
	createSprite('bg.jpg', 'Background', 'Centre', { x: 320, y: 240 }, () => {
		fade(startTime, startTime + fadeIn, 0, opacity)
		fade(endTime - fadeOut, endTime, opacity, 0)
		scaleAtTime(startTime, scale)
	})
}
