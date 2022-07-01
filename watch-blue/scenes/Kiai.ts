import { Scene } from '@osbjs/osbjs'
import { Girl } from '../components/Girl'
import { Particles, ParticlesOptions } from '../components/Particles'

export class Kiai extends Scene {
	startTime: number
	endTime: number
	constructor(startTime: number, endTime: number) {
		super()
		this.startTime = startTime
		this.endTime = endTime
	}

	generate() {
		const config: ParticlesOptions = {
			duration: 5000,
			amount: 50,
			opacity: 0.5,
			randomRotation: true,
			startRotation: 0,
			endRotation: 360,
			randomScale: true,
			startScale: 0.2,
			endScale: 0.3,
		}
		this.registerComponents(
			new Particles('sb/petal1.png', this.startTime, this.endTime, config),
			new Particles('sb/petal2.png', this.startTime, this.endTime, config),
			new Particles('sb/petal3.png', this.startTime, this.endTime, config),
			new Girl(this.startTime, this.endTime)
		)
	}
}
