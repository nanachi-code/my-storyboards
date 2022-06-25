import { Color, colorAtTime, createSprite, fade, Parameter, parameter } from '@osbjs/tiny-osbjs'

export default function Gradient(
	startTime: number,
	endTime: number,
	color: Color = { r: 75, g: 75, b: 75 },
	opacity: number = 1,
	fadeIn: number = 300,
	fadeOut: number = 300
) {
	createSprite('sb/grad.png', 'Background', 'Centre', { x: 320, y: 240 }, () => {
		fade(startTime, startTime + fadeIn, 0, opacity)
		fade(endTime - fadeOut, endTime, opacity, 0)
		colorAtTime(startTime, color)
		parameter(startTime, endTime, Parameter.AdditiveBlending)
	})
}
