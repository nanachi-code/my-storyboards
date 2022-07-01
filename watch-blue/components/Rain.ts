import { Component, degToRad, Layer, Origin, OsbVector2, Parameter, randFloat, randInt, Sprite } from '@osbjs/osbjs'

export interface RainOptions {
	amount?: number
	duration?: number
	maxWidth?: number
	minWidth?: number
	maxLength?: number
	minLength?: number
	angleVariation?: number
	angle?: number
	startY?: number
	endY?: number
	startX?: number
	endX?: number
	pixelPath?: string
	additive?: boolean
	opacity?: number
}

export class Rain extends Component {
	startTime: number
	endTime: number
	options = {
		amount: 100,
		duration: 1000,
		maxWidth: 2,
		minWidth: 1,
		maxLength: 60,
		minLength: 30,
		angleVariation: 0,
		startY: 0,
		endY: 480,
		startX: -107,
		endX: 747,
		angle: 0,
		pixelPath: 'sb/px.png',
		additive: true,
		opacity: 0.3,
	}
	constructor(startTime: number, endTime: number, options?: RainOptions) {
		super()
		this.startTime = startTime
		this.endTime = endTime
		this.options = { ...this.options, ...options }
	}

	generate() {
		const {
			amount,
			duration,
			maxWidth,
			minWidth,
			maxLength,
			minLength,
			angleVariation,
			angle,
			startY,
			endY,
			startX,
			endX,
			pixelPath,
			additive,
			opacity,
		} = this.options

		const timestep = duration / amount

		for (let startTime = this.startTime - duration; startTime <= this.endTime; Math.round((startTime += timestep))) {
			let endTime = startTime + duration

			const spr = new Sprite(pixelPath, Layer.Background, Origin.TopCenter)

			spr.ScaleVecAtTime(startTime, new OsbVector2(randFloat(minWidth, maxWidth), randFloat(minLength, maxLength)))
			let _rotateAngle
			if (angleVariation != 0) _rotateAngle = degToRad(randFloat(angle - Math.round(angleVariation), angle + Math.round(angleVariation)))
			else _rotateAngle = degToRad(angle)
			spr.RotateAtTime(startTime, _rotateAngle)

			const x = randInt(startX, endX)
			spr.Move(startTime, endTime, new OsbVector2(x, startY), new OsbVector2(x + Math.tan(_rotateAngle) * (startY - endY), endY))

			if (startTime < this.startTime) {
				spr.Fade(startTime, this.startTime, 0, 0)
				spr.Fade(this.startTime, endTime, opacity, opacity)
			} else {
				spr.FadeAtTime(startTime, opacity)
			}

			if (endTime > this.endTime) {
				spr.Fade(this.endTime, endTime, 0, 0)
			} else {
				spr.FadeAtTime(endTime, 0)
			}


			if (additive) spr.ParameterAtTime(startTime, Parameter.AdditiveBlending)

			this.registerComponents(spr)
		}
	}
}
