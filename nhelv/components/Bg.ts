import { createSprite, Layer, Origin, scaleVec, WIDTH, HEIGHT, fade } from '@osbjs/tiny-osbjs'

function Bg(startTime: number, endTime: number, opacity: number, fadeOut: boolean = true) {
	createSprite('nhelv.jpg', Layer.Background, Origin.Centre, [320, 240], () => {
		scaleVec(startTime, [WIDTH / 1920, HEIGHT / 1080])
		if (fadeOut) {
			fade([startTime, endTime - 500], opacity)
			fade([endTime - 500, endTime], opacity, 0)
		} else {
			fade([startTime, endTime], opacity)
		}
	})
}

export default Bg
