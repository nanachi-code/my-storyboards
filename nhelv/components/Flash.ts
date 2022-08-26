import { createSprite, fade, HEIGHT, Layer, Origin, scaleVec, WIDTH } from '@osbjs/tiny-osbjs'

function Flash(time: number) {
	createSprite('sb/d.png', Layer.Background, Origin.Centre, [320, 240], () => {
		scaleVec(time, [WIDTH, HEIGHT])
		fade([time, time + 300], 1, 0)
	})
}

export default Flash
