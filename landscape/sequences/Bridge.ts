import { cloneVec, color, degToRad, Easing, fade, interpolate, move, rotate, scale, Vector2 } from '@osbjs/tiny-osbjs'
import Circ from '../components/Circ'
import ColorBg from '../components/ColorBg'
import Flash from '../components/Flash'
import Letterbox from '../components/Letterbox'
import Sqr from '../components/Sqr'
import Pallete from '../utils/pallete'

export default function Bridge() {
	FirstHalf()
	MidTransition()
	SecondHalf()
	EndTransition()
	Cooldown()
}

function FirstHalf() {
	// Letterbox(249339, 256252, [854, 150])
	Flash(249339)
}

function MidTransition() {
	function RotatingCircs() {
		const maxRotationRadius = 100,
			minRotationRadius = 0
		const circDia = 80

		Circ(256252, 257223, circDia, [320, 240], () => {
			color(256252, Pallete.Lilac)
			move([256252, 256576], [320, 240], [320 - maxRotationRadius, 240], Easing.Out)

			let time = 256576
			const timestep = 1000 / 30
			let prevPos: Vector2 = [320 - maxRotationRadius, 240]
			do {
				const rotationRadius = interpolate(time, [256576, 257223], [maxRotationRadius, minRotationRadius], Easing.Out)
				const angle = interpolate(time, [256576, 257223], [-Math.PI, 0])
				const position: Vector2 = [320 + Math.cos(angle) * rotationRadius, 240 + Math.sin(angle) * rotationRadius]
				move([time, time + timestep], prevPos, position)

				time += timestep
				prevPos = cloneVec(position)
			} while (time <= 257223)
		})

		Circ(256252, 257223, circDia, [320, 240], () => {
			color(256252, Pallete.Lilac)
			move([256252, 256576], [320, 240], [320 + maxRotationRadius, 240], Easing.Out)

			let time = 256576
			const timestep = 1000 / 30
			let prevPos: Vector2 = [320 + maxRotationRadius, 240]
			do {
				const rotationRadius = interpolate(time, [256576, 257223], [maxRotationRadius, minRotationRadius], Easing.Out)
				const angle = interpolate(time, [256576, 257223], [0, Math.PI])
				const position: Vector2 = [320 + Math.cos(angle) * rotationRadius, 240 + Math.sin(angle) * rotationRadius]
				move([time, time + timestep], prevPos, position)

				time += timestep
				prevPos = cloneVec(position)
			} while (time <= 257223)
		})
	}
	ColorBg(256252, 257223, Pallete.White)
	RotatingCircs()
}

function SecondHalf() {
	// Letterbox(256252, 261172, Pallete.White, [854, 150])

	Flash(257223)
}

function EndTransition() {
	ColorBg(260185, 261172, Pallete.White)

	const startMargin = 20,
		endMargin = 10

	// center
	Sqr(260185, 261172, 90, [320, 240], () => {
		scale([260185, 260514], 90, 80, Easing.Out)
		rotate(260185, degToRad(45))
		color(260185, Pallete.Lilac)
	})

	function _1() {
		const startDistance = (80 + startMargin) / Math.sqrt(2),
			endDistance = (80 + endMargin) / Math.sqrt(2)

		Sqr(260514, 261172, 80, [320 - startDistance, 240 - startDistance], () => {
			fade([260514, 260843], 0, 1, Easing.Out)
			move([260514, 260843], [320 - startDistance, 240 - startDistance], [320 - endDistance, 240 - endDistance], Easing.Out)
			rotate(260514, degToRad(45))
			color(260514, Pallete.Lilac)
		})

		Sqr(260514, 261172, 80, [320 - startDistance, 240 + startDistance], () => {
			fade([260514, 260843], 0, 1, Easing.Out)
			move([260514, 260843], [320 - startDistance, 240 + startDistance], [320 - endDistance, 240 + endDistance], Easing.Out)
			rotate(260514, degToRad(45))
			color(260514, Pallete.Lilac)
		})

		Sqr(260514, 261172, 80, [320 + startDistance, 240 - startDistance], () => {
			fade([260514, 260843], 0, 1, Easing.Out)
			move([260514, 260843], [320 + startDistance, 240 - startDistance], [320 + endDistance, 240 - endDistance], Easing.Out)
			rotate(260514, degToRad(45))
			color(260514, Pallete.Lilac)
		})

		Sqr(260514, 261172, 80, [320 + startDistance, 240 + startDistance], () => {
			fade([260514, 260843], 0, 1, Easing.Out)
			move([260514, 260843], [320 + startDistance, 240 + startDistance], [320 + endDistance, 240 + endDistance], Easing.Out)
			rotate(260514, degToRad(45))
			color(260514, Pallete.Lilac)
		})
	}

	function _2() {
		const startDistance = (80 + startMargin) * Math.sqrt(2),
			endDistance = (80 + endMargin) * Math.sqrt(2)

		Sqr(260843, 261172, 80, [320 - startDistance, 240], () => {
			fade([260843, 261172], 0, 1, Easing.Out)
			move([260843, 261172], [320 - startDistance, 240], [320 - endDistance, 240], Easing.Out)
			rotate(260843, degToRad(45))
			color(260843, Pallete.Lilac)
		})

		Sqr(260843, 261172, 80, [320 + startDistance, 240], () => {
			fade([260843, 261172], 0, 1, Easing.Out)
			move([260843, 261172], [320 + startDistance, 240], [320 + endDistance, 240], Easing.Out)
			rotate(260843, degToRad(45))
			color(260843, Pallete.Lilac)
		})

		Sqr(260843, 261172, 80, [320, 240 + startDistance], () => {
			fade([260843, 261172], 0, 1, Easing.Out)
			move([260843, 261172], [320, 240 + startDistance], [320, 240 + endDistance], Easing.Out)
			rotate(260843, degToRad(45))
			color(260843, Pallete.Lilac)
		})

		Sqr(260843, 261172, 80, [320, 240 - startDistance], () => {
			fade([260843, 261172], 0, 1, Easing.Out)
			move([260843, 261172], [320, 240 - startDistance], [320, 240 - endDistance], Easing.Out)
			rotate(260843, degToRad(45))
			color(260843, Pallete.Lilac)
		})
	}

	_1()
	_2()
}

function Cooldown() {
	Flash(261172)
}
