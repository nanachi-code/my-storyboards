import { Component, Easing, Origin, OsbColor, OsbVector2, Parameter, Sprite, Layer, randFloat, randInt, degToRad } from '@osbjs/osbjs'

export interface ParticlesOptions {
	duration?: number
	amount?: number
	startPosition?: OsbVector2
	endPosition?: OsbVector2
	easing?: Easing
	randomEasing?: boolean
	fadeInDuration?: number
	fadeOutDuration?: number
	color?: OsbColor
	startScale?: number
	endScale?: number
	randomScale?: boolean
	startRotation?: number
	endRotation?: number
	randomRotation?: boolean
	origin?: Origin
	additive?: boolean
	opacity?: number
}

export class Particles extends Component {
	path: string
	startTime: number
	endTime: number
	options = {
		duration: 2000,
		amount: 16,
		startPosition: new OsbVector2(-107, -500),
		endPosition: new OsbVector2(1500, 480),
		easing: Easing.Out,
		randomEasing: false,
		color: OsbColor.fromHexString('#e7b9c4'),
		startScale: 0.1,
		endScale: 1,
		randomScale: false,
		startRotation: 0,
		endRotation: 0,
		randomRotation: false,
		origin: Origin.Center,
		additive: true,
		opacity: 1,
	}
	constructor(path: string, startTime: number, endTime: number, options?: ParticlesOptions) {
		super()

		this.path = path
		this.startTime = startTime
		this.endTime = endTime
		this.options = { ...this.options, ...options }
	}

	generate() {
		//#region extract options
		const {
			randomScale,
			opacity,
			duration,
			amount,
			startPosition,
			endPosition,
			easing,
			randomEasing,
			color,
			startScale,
			endScale,
			startRotation,
			endRotation,
			randomRotation,
			origin,
			additive,
		} = this.options
		//#endregion

		const timestep = duration / amount
		for (let startTime = this.startTime - duration; startTime <= this.endTime; Math.round((startTime += timestep))) {
			let endTime = startTime + duration

			const spr = new Sprite(this.path, Layer.Background, origin)

			spr.ColorAtTime(startTime, color)
			if (startScale == endScale && startScale != 1) spr.ScaleAtTime(startTime, startScale)
			if (startRotation == endRotation && startRotation != 0) spr.RotateAtTime(startTime, degToRad(startRotation))
			if (additive) spr.ParameterAtTime(startTime, Parameter.AdditiveBlending)

			const eas = randomEasing ? Easing[Easing[randInt(0, 34)] as keyof typeof Easing] : easing
			const startX = startPosition.x
			const startY = randInt(startPosition.y, endPosition.y)
			const endX = randInt(startPosition.x, endPosition.x)
			const endY = endPosition.y
			spr.Move(startTime, endTime, new OsbVector2(startX, startY), new OsbVector2(endX, endY), eas)

			if (startTime < this.startTime) {
				spr.Fade(startTime, this.startTime, 0, 0)
				spr.Fade(this.startTime, endTime, opacity, opacity)
			} else {
				spr.FadeAtTime(startTime, opacity)
			}

			if (endTime > this.endTime) {
				spr.FadeAtTime(this.endTime, 0)
			} else {
				spr.FadeAtTime(endTime, 0)
			}

			if (startScale != endScale) {
				if (randomScale) spr.Scale(startTime, endTime, randFloat(startScale, endScale), randFloat(startScale, endScale), eas)
				else spr.Scale(startTime, endTime, startScale, endScale, eas)
			}

			if (startRotation != endRotation)
				if (randomRotation)
					spr.Rotate(startTime, endTime, degToRad(randFloat(startRotation, endRotation)), degToRad(randFloat(startRotation, endRotation)), eas)
				else spr.Rotate(startTime, endTime, degToRad(startRotation), degToRad(endRotation), eas)

			this.registerComponents(spr)
		}
	}
}
