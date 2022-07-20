import { createSprite, fade, Layer, Origin, scaleVec } from '@osbjs/tiny-osbjs'

export default function Flash(time: number, duration: number = 300) {
	createSprite('sb/pixel.png', Layer.Background, Origin.Centre, [320, 240], () => {
		fade([time, time + duration], 0.8, 0)
		scaleVec(time, [854, 480])
	})
}
