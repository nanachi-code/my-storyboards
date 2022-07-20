import { createAnimation, fade, Layer, LoopType, Origin, scale } from '@osbjs/tiny-osbjs'

export default function GlitchTransition(time: number, opacity: number = 1) {
	createAnimation('sb/glitch.jpg', Layer.Background, Origin.Centre, [320, 240], 2, 100, LoopType.Once, () => {
		fade([time, time + 200], opacity, opacity)
		scale(time, 854 / 1920)
	})
}
