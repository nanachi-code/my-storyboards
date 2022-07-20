import { createSprite, fade, Layer, Origin, scale } from '@osbjs/tiny-osbjs'

export default function Vig(children: () => void) {
	children()

	createSprite('sb/vig.png', Layer.Background, Origin.Centre, [320, 240], () => {
		fade([0, 361954], 1)
		scale(0, 854 / 1920)
	})
}
