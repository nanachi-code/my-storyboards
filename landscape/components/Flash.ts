import { createSprite, fade, scaleVecAtTime } from '@osbjs/tiny-osbjs'

export default function Flash(time: number, duration: number = 300) {
	createSprite('sb/pixel.png', 'Background', 'Centre', { x: 320, y: 240 }, () => {
		fade(time, time + duration, 0.8, 0)
		scaleVecAtTime(time, { x: 854, y: 480 })
	})
}
