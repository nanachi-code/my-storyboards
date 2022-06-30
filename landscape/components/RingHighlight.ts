import { filterHitObjectsInPeriod } from '@osbjs/hitobjects-tiny-osbjs'
import { createSprite, fade, scale } from '@osbjs/tiny-osbjs'
import hitobjects from '../utils/hitobjects'

export default function RingHighlight(startTime: number, endTime: number) {
	const { sliders, circles } = filterHitObjectsInPeriod(startTime, endTime, hitobjects)

	const fadeIn = 1000
	const opacity = 0.5

	circles.forEach((circle) => {
		createSprite('sb/ring.png', 'Background', 'Centre', circle.position, () => {
			fade(circle.time, circle.time + fadeIn, opacity, 0)
			scale(circle.time, circle.time + fadeIn, 0.5, 1)
		})
	})

	sliders.forEach((slider) => {
		createSprite('sb/ring.png', 'Background', 'Centre', slider.positionAtTime(slider.startTime), () => {
			fade(slider.startTime, slider.startTime + fadeIn, opacity, 0)
			scale(slider.startTime, slider.startTime + fadeIn, 0.5, 1)
		})
	})
}
