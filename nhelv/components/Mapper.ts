import { Layer, Origin, scale, fade, color, DefaultPallete, Easing, moveX } from '@osbjs/tiny-osbjs'
import { createOutlineText, createText, useTxtGenContext } from '@osbjs/txtgen-tiny-osbjs'
import { txtgenContext } from '../config'

function Mapper() {
	useTxtGenContext(txtgenContext)

	const mappers = [
		{
			name: 'Laquarius',
			startTime: 23051,
			endTime: 100380,
		},
		{
			name: 't ony',
			startTime: 100380,
			endTime: 155369,
		},
	]

	const x = 480,
		y = 420,
		_scale = 0.5

	mappers.forEach(({ name, startTime, endTime }) => {
		createOutlineText(name, Layer.Background, Origin.CentreLeft, [x, y + 3], () => {
			scale(startTime, _scale)
			fade([startTime, startTime + 500], 0, 1)
			fade([endTime - 500, endTime], 1, 0)
			moveX([startTime, startTime + 500], x, x + 3, Easing.OutCirc)
			color(startTime, DefaultPallete.DeepSkyBlue)
		})

		createText(name, Layer.Background, Origin.CentreLeft, [x, y], () => {
			scale(startTime, _scale)
			fade([startTime, startTime + 500], 0, 1)
			fade([endTime - 500, endTime], 1, 0)
			color(startTime, DefaultPallete.White)
		})
	})
}

export default Mapper
