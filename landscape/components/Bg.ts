import { Color, createSprite, fade, Layer, Origin, scale, color as setColor } from '@osbjs/tiny-osbjs'
export default function Bg(
	startTime: number,
	endTime: number,
	opacity: number = 1,
	fadeIn: number = 300,
	fadeOut: number = 300,
	scaleFactor: number = 854 / 1920,
	color?: Color
) {
	createSprite('bg.jpg', Layer.Background, Origin.Centre, [320, 240], () => {
		fade([startTime, startTime + fadeIn], 0, opacity)
		fade([endTime - fadeOut, endTime], opacity, 0)
		scale(startTime, scaleFactor)
		if (color) setColor(startTime, color)
	})
}
