import { Component, Sprite } from '@osbjs/osbjs'

export class Vig extends Component {
	constructor() {
		super()
	}

	generate() {
		const vig = new Sprite('sb/vig.png')

		vig.Fade(540, 376456, 1, 1)
		vig.ScaleAtTime(540, 480 / 1080)
		this.registerComponents(vig)
	}
}
