import { extractFrom, loadSpectrumSchema } from '@osbjs/spectrum-tiny-osbjs'
import { colorAtTime, createSprite, fade, Parameter, parameter, scaleVec } from '@osbjs/tiny-osbjs'
import { schemaPath } from '../config'

export default function Spectrum(startTime: number, endTime: number) {
	const { fps, spectrumFrames: _spectrumFrames } = loadSpectrumSchema(schemaPath)

	const spectrumFrames = extractFrom(_spectrumFrames, startTime, endTime, fps)

	const sprW = 17,
		sprH = 22
	const timestep = 1000 / fps
	const width = 7
	const margin = 2
	const maxHeight = 120
	const count = 64

	let x = 320 - ((width + margin) * count) / 2

	for (let i = 0; i < count; i++) {
		const frames = spectrumFrames.map((frame) => frame[i])

		createSprite('sb/bar.png', 'Background', 'Centre', { x, y: 240 }, () => {
			fade(startTime, startTime + 300, 0, 0.2)
			fade(endTime - 300, endTime, 0.2, 0)
			colorAtTime(startTime, { r: 255, g: 255, b: 255 })
			parameter(startTime, endTime, Parameter.AdditiveBlending)

			for (let j = 0; j < frames.length; j++) {
				scaleVec(
					Math.trunc(startTime + timestep * j),
					Math.trunc(startTime + timestep * (j + 1)),
					{ x: width / sprW, y: (frames[j] * maxHeight) / sprH },
					{ x: width / sprW, y: (frames[j + 1] * maxHeight) / sprH }
				)
			}
		})

		x += width + 2
	}
}
