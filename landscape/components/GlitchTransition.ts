import { createAnimation, fade, scaleAtTime } from '@osbjs/tiny-osbjs'

export default function GlitchTransition(time: number, opacity: number = 1) {
	createAnimation('sb/glitch.jpg', 'Background', 'Centre', { x: 320, y: 240 }, 2, 100, 'LoopOnce', () => {
		fade(time, time + 200, opacity, opacity)
		scaleAtTime(time, 854 / 1920)
	})
}
