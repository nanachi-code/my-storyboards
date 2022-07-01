import { Component, OsbVector2, Sprite } from '@osbjs/osbjs'

export class Flash extends Component {
	startTime: number[]
	constructor(startTime: number[]) {
		super()
		this.startTime = startTime
	}

	generate() {
		const fl = new Sprite('sb/px.png')
		fl.ScaleVecAtTime(this.startTime[0], new OsbVector2(854, 480))
		this.startTime.forEach((startTime) => {
			fl.Fade(startTime, startTime + 500, 1, 0)
		})

		this.registerComponents(fl)
	}
}
