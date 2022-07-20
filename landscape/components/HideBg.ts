import { createSprite, fade, Layer, Origin } from '@osbjs/tiny-osbjs'

export default function HideBg(children: () => void) {
	children()

	createSprite('bg.jpg', Layer.Background, Origin.Centre, [320, 240], () => {
		fade(0, 0)
	})
}
