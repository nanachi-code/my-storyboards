import { createSprite, fade, scaleVecAtTime } from '@osbjs/tiny-osbjs'

export default function Flash(startTime: number, duration: number = 500, opacity: number = 0.7) {
	createSprite('sb/pixel.png', 'Background', 'Centre', { x: 320, y: 240 }, () => {
		scaleVecAtTime(startTime, { x: 854, y: 480 })
		fade(startTime, startTime + duration, opacity, 0)
	})
}
