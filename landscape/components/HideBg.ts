import { createSprite, fadeAtTime } from '@osbjs/tiny-osbjs'

export default function HideBg(children: () => void) {
    children()
    
	createSprite('bg.jpg', 'Background', 'Centre', { x: 320, y: 240 }, () => {
		fadeAtTime(0, 0)
	})
}
