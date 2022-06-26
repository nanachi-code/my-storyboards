import { createSprite, degToRad, fade, Parameter, parameter, randFloat, rotate, scale } from '@osbjs/tiny-osbjs'

export default function Flare(startTime: number, endTime: number, fadeIn: number = 300, fadeOut: number = 300) {
	createSprite('sb/flare.png', 'Background', 'Centre', { x: 320, y: 240 }, () => {
		rotate(startTime, endTime, 0, degToRad(10))
		parameter(startTime, endTime, Parameter.AdditiveBlending)
		scale(startTime, endTime, 0.45, 0.6)

		const timestep = 200

		let t = startTime + fadeIn
		let opacity = randFloat(0.7, 1)

		fade(startTime, startTime + fadeIn, 0, opacity)

		do {
			let nextOpacity = randFloat(0.7, 1)
			fade(t, t + timestep, opacity, nextOpacity)
			opacity = nextOpacity
			t += timestep
		} while (t <= endTime - fadeOut - timestep)

		fade(endTime - fadeOut, endTime, opacity, 0)
	})
}
