import { createSprite, Layer, Origin, scaleVec, WIDTH, HEIGHT, fade } from '@osbjs/tiny-osbjs'

function Bg(startTime: number, endTime: number, opacity: number) {
	createSprite('nhelv.jpg', Layer.Background, Origin.Centre, [320, 240], () => {
		scaleVec(startTime, [WIDTH / 1920, HEIGHT / 1080])
		fade([startTime, endTime], opacity)
	})
}

export default Bg
