import { Color, colorAtTime, createSprite, fade, scaleVecAtTime } from '@osbjs/tiny-osbjs'

export default function MonotoneBg(startTime: number, endTime: number, color: Color) {
	createSprite('sb/pixel.png', 'Background', 'Centre', { x: 320, y: 240 }, () => {
		colorAtTime(startTime, color)
		fade(startTime, endTime, 1, 1)
		scaleVecAtTime(startTime, { x: 854, y: 480 })
	})
}
