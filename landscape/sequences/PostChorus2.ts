import { color, createSprite, fade, Layer, Origin, scale } from '@osbjs/tiny-osbjs'
import ColorBg from '../components/ColorBg'
import Flash from '../components/Flash'
import FlowField from '../components/FlowField'
import Pallete from '../utils/pallete'

export function PostChorus2() {
	// ColorBg(217898, 249339, Pallete.ElectricViolet)

	// createSprite('sb/highlight.png', Layer.Background, Origin.Centre, [320, 240], () => {
	// 	scale(217898, 4)
	// 	color(217898, [0, 0, 0])
	// 	fade([217898, 249339], 1)
	// })

    FlowField(217898, 249339)

	// Flash(217898)
}
