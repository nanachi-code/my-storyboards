import { Component, Sprite } from '@osbjs/osbjs'

export class Girl extends Component {
	startTime: number
	endTime: number
	constructor(startTime: number, endTime: number) {
		super()
		this.startTime = startTime
		this.endTime = endTime
	}

	generate() {
		const girl = new Sprite('sb/girl-glow.png')

		girl.Fade(this.startTime, this.endTime, 1, 1)
		girl.ScaleAtTime(this.startTime, 1000 / 1920)
		girl.FadeAtTime(this.startTime, 0.8)
		girl.MoveX(this.startTime, this.endTime, 270, 370)

		this.registerComponents(girl)
	}
}
