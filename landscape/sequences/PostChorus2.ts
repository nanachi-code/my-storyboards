import { createSprite, Layer, Origin, scale, color, fade, additiveBlending } from '@osbjs/tiny-osbjs'
import ColorBg from '../components/ColorBg'
import FallingLeaves from '../components/FallingLeaves'
import Flash from '../components/Flash'
import FlowField from '../components/FlowField'
import Paricles from '../components/Particles'
import Pallete from '../utils/pallete'

export function PostChorus2() {
	const fadeOut = 249339 - 247405

	function Highlight() {
		createSprite('sb/highlight.png', Layer.Background, Origin.Centre, [0, 0], () => {
			scale(217898, 2)
			additiveBlending([217898, 249339])
			fade([217898, 247405], 0.4)
			fade([247405, 249339], 0.4, 0)
		})
	}

	ColorBg(217898, 249339, Pallete.RussianViolet, 0, fadeOut)
	Paricles(217898, 249339, 0, fadeOut)
	FallingLeaves(217898, 249339, 0, fadeOut)
	Highlight()
	Flash(217898)
}
