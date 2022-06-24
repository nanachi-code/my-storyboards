import { colorAtTime, degToRad, Easing, fade, rotateAtTime, scaleAtTime, scaleVec } from '@osbjs/tiny-osbjs'
import { createText, useTxtGenContext } from '@osbjs/txtgen-tiny-osbjs'
import { HideBg } from '../components/Bg'
import BgBlur from '../components/BgBlur'
import Rect from '../components/Rect'
import Pallete from '../pallete'
import { AuthenticContext, HinaMinchoContext } from '../utils/txtGenContext'

export default function Intro() {
	HideBg()

	useTxtGenContext(AuthenticContext)

	createText('afloat storage', 'Background', 'Centre', { x: 320, y: 200 }, (_) => {
		rotateAtTime(0, degToRad(-10))
		fade(0, 304, 0, 1)
		fade(908, 1512, 1, 0)
	})

	useTxtGenContext(HinaMinchoContext)

	createText('「landscape」', 'Background', 'Centre', { x: 320, y: 320 }, (_) => {
		fade(0, 304, 0, 1)
		fade(908, 1512, 1, 0)
		scaleAtTime(0, 0.5)
	})

	BgBlur(1512, 39915, undefined, 0.5, 300, 300)

	const barDimensions = { x: 854, y: 40 }
	Rect(
		1512,
		39915,
		barDimensions,
		{ x: 320, y: 0 },
		() => {
			colorAtTime(1512, Pallete.Black)
			scaleVec(34152, 39915, barDimensions, { x: 854, y: 240 }, Easing.InSine)
		},
		'TopCentre'
	)

	Rect(
		1512,
		39915,
		barDimensions,
		{ x: 320, y: 480 },
		() => {
			colorAtTime(1512, Pallete.Black)
			scaleVec(34152, 39915, barDimensions, { x: 854, y: 240 }, Easing.InSine)
		},
		'BottomCentre'
	)
}
