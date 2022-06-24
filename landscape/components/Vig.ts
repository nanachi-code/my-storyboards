import { createSprite, fade, scaleAtTime } from '@osbjs/tiny-osbjs'

export default function Vig(componentsInvokeFns: () => void) {
	componentsInvokeFns()
	createSprite('sb/vig.png', 'Background', 'Centre', { x: 320, y: 240 }, () => {
		fade(0, 361656, 1, 1)
		scaleAtTime(0, 854 / 1920)
	})
}
