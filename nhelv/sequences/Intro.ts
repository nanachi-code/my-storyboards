import { createSprite, Layer, Origin, fade, scale } from '@osbjs/tiny-osbjs'
import { createText, useTxtGenContext } from '@osbjs/txtgen-tiny-osbjs'
import { txtgenContext } from '../config'

function Intro() {
	createSprite('sb/silentroom.png', Layer.Background, Origin.Centre, [320, 240], () => {
		fade([1400, 1900], 0, 1)
		fade([3649, 4149], 1, 0)
	})

	useTxtGenContext(txtgenContext)

	createText('Nhelv', Layer.Background, Origin.Centre, [320, 240], () => {
		fade([6898, 6898 + 300], 0, 1)
		fade([12397 - 500, 12397], 1, 0)
	})

	createText('map by:', Layer.Background, Origin.Centre, [320, 220], () => {
		scale(12397, 0.5)
		fade([12397, 12397 + 300], 0, 1)
		fade([23051 - 500, 23051], 1, 0)
	})

	createText('Laquarius', Layer.Background, Origin.Centre, [320, 280], () => {
		fade([12397, 12397 + 300], 0, 1)
		fade([19271 - 500, 19271], 1, 0)
	})

    createText('t ony', Layer.Background, Origin.Centre, [320, 280], () => {
		fade([19271, 19271 + 300], 0, 1)
		fade([23051 - 500, 23051], 1, 0)
	})
}

export default Intro
