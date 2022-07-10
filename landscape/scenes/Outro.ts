import { fade, scaleAtTime } from '@osbjs/tiny-osbjs'
import { createText, measureLineWidth, useTxtGenContext } from '@osbjs/txtgen-tiny-osbjs'
import Bg from '../components/Bg'
import GlitchTransition from '../components/GlitchTransition'
import { AuthenticContext, SazanamiMinchoContext } from '../utils/txtGenContext'

export default function Outro() {
	Bg(343820, 361954, 0.7, 0)
	GlitchTransition(343820, 0.7)
	GlitchTransition(361456, 0.7)

	Credit('Lyrics: 稲見繭', 343820, 345640)
	Credit('Composition: afloat storage', 346027, 347867)
	Credit('Artwork: 哆啦小熙', 348242, 350152)
	Credit('Storyboard: Nanachi', 350534, 352409)
	Credit('Map: Laquarius', 352784, 354668)
	Credit('Hitsound: Nagaraia', 355048, 356971)
	Credit('Special thanks: Perell L.Brown @dreamybullxxx', 357363, 359286)
	Logo()
}

function Credit(line: string, startTime: number, endTime: number) {
	useTxtGenContext(SazanamiMinchoContext)

	const spaceCount = (line.match(/ /g) || []).length
	const spaceW = 5
	const scale = 0.3
	const fadeIn = 300
	const fadeOut = 300
	const lineW = measureLineWidth(line) * scale + spaceCount * spaceW

	let x = 320 - lineW / 2,
		y = 210

	line.split('').forEach((letter) => {
		if (letter != ' ') {
			createText(letter, 'Background', 'TopLeft', { x, y }, ({ width }) => {
				scaleAtTime(startTime, scale)
				fade(startTime, startTime + fadeIn, 0, 1)
				fade(endTime - fadeOut, endTime, 1, 0)

				x += width * scale
			})
		} else {
			x += spaceW
		}
	})
}

function Logo() {
	const startTime = 359670,
		endTime = 361954

	useTxtGenContext(AuthenticContext)

	createText('afloat storage', 'Background', 'Centre', { x: 320, y: 240 }, () => {
		fade(startTime, startTime + 300, 0, 1)
		fade(endTime - 300, endTime, 1, 0)
	})
}
