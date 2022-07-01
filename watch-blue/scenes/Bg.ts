import { Animation, Scene, LoopType, OsbVector2, Parameter, RemoveBackground, Sprite, wiggleXY, wiggleRotation, degToRad, wiggleOpacity } from '@osbjs/osbjs'

export class Bg extends Scene {
	constructor() {
		super()
	}

	generate() {
		const bg = new Sprite('bg.jpg')
		bg.ScaleAtTime(540, 854 / 1920)
		bg.Fade(540, 33457, 0, 0.8)
		bg.MoveX(540, 132195, 320, 320)

		bg.ScaleAtTime(132195, 1000 / 1920)
		bg.FadeAtTime(132195, 1)
		bg.MoveX(132195, 165081, 270, 370)
		bg.FadeAtTime(165081, 0.8)
		bg.ScaleAtTime(165081, 854 / 1920)
		bg.MoveX(165081, 280304, 320, 320)

		bg.FadeAtTime(198013, 1)
		bg.FadeAtTime(247370, 0)
		bg.FadeAtTime(280304, 1)
		bg.ScaleAtTime(280304, 1000 / 1920)
		bg.FadeAtTime(280304, 1)
		bg.MoveX(280304, 313221, 270, 370)
		// bg.MoveX(313221, 313222, 320, 320)
		// bg.Fade(313222, 346122, 1, 1)
		// bg.ScaleAtTime(313222, 854 / 1920)
		// bg.Fade(346122, 372914, 0.5, 0)

		const bg1 = new Sprite('bg.jpg')
		bg1.FadeAtTime(313222, 1)
		bg1.ScaleAtTime(313222, 870 / 1920)
		wiggleXY(bg1, 5, 4, 313222, 372914)
		wiggleRotation(bg1, 3, degToRad(1), 313222, 372914)
		wiggleOpacity(bg1, 4, 0.2, 313222, 346036, 0.8)
		bg1.FadeAtTime(346122, 0)

		const lsd1 = new Sprite('sb/lsd1.jpg')
		const lsd2 = new Sprite('sb/lsd2.jpg')
		const lsd3 = new Sprite('sb/lsd3.jpg')

		lsd1.ScaleAtTime(346122, 854 / 1920)
		lsd1.Fade(346122, 372914, 0.5, 0)
		lsd1.ParameterAtTime(346122, Parameter.AdditiveBlending)
		wiggleXY(lsd1, 2, 5, 346122, 372914, new OsbVector2(323, 243))

		lsd2.ScaleAtTime(346122, 854 / 1920)
		lsd2.Fade(346122, 372914, 0.5, 0)
		lsd2.ParameterAtTime(346122, Parameter.AdditiveBlending)
		wiggleXY(lsd2, 2, 5, 346122, 372914, new OsbVector2(318, 237))

		lsd3.ScaleAtTime(346122, 854 / 1920)
		lsd3.Fade(346122, 372914, 0.5, 0)
		lsd3.ParameterAtTime(346122, Parameter.AdditiveBlending)
		wiggleXY(lsd3, 2, 5, 346122, 372914, new OsbVector2(320, 240))

		const distortBg = new Animation('sb/bg-noise.jpg', 6, 75, LoopType.LoopForever)

		distortBg.Fade(131170, 132195, 0.5, 0.5)
		distortBg.ScaleAtTime(131170, 854 / 1920)
		distortBg.ParameterAtTime(131170, Parameter.AdditiveBlending)

		const removeBg = new RemoveBackground('bg.jpg')
		this.registerComponents(bg, bg1, lsd1, lsd2, lsd3, distortBg, removeBg)
	}
}
