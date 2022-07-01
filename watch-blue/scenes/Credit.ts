import { Easing, Layer, Origin, OsbColor, OsbVector2, parseOsuTimestamp, Scene, Sprite, TextureGenerator } from '@osbjs/osbjs'
import { path } from '../osbjs.config'
import { join } from 'path'

export class Credit extends Scene {
	_textureGenerator: TextureGenerator
	constructor() {
		super()

		this._textureGenerator = new TextureGenerator(path, 'sb/credits', { fontName: 'HinaMincho', fontSize: 72 })
		this._textureGenerator.registerFont(join(process.cwd(), 'HinaMincho.ttf'), 'HinaMincho')
	}

	generate() {
		this._textureGenerator.emptyDir()

		// Song - artist
		const credits: Line[] = [
			{
				startTime: '00:00:540',
				text: 'クレナズム',
				scale: 1,
				origin: new OsbVector2(320, 200),
			},
			{
				startTime: '00:00:540',
				text: '青を見る',
				scale: 0.5,
				origin: new OsbVector2(320, 270),
			},
			{
				startTime: '00:04:635',
				text: 'Map',
				scale: 0.2,
				origin: new OsbVector2(250, 350),
			},
			{
				startTime: '00:04:635',
				text: 'Storyboard',
				scale: 0.2,
				origin: new OsbVector2(250, 400),
			},
			{
				startTime: '00:04:635',
				text: 'Nagaraia',
				scale: 0.3,
				origin: new OsbVector2(370, 350),
			},
			{
				startTime: '00:04:635',
				text: 'Nanachi',
				scale: 0.3,
				origin: new OsbVector2(370, 400),
			},
		]

		credits.forEach((credit) => {
			this.generateCredit(credit)
		})
	}

	generateCredit(line: Line) {
		const startTime = parseOsuTimestamp(line.startTime)

		let lineWidth = 0,
			lineHeight = 0

		for (let i = 0; i < line.text.length; i++) {
			const letter = line.text[i]
			let texture = this._textureGenerator.generateTexture(letter, new OsbColor(255, 255, 255))
			lineWidth += texture.width * line.scale
			lineHeight = Math.max(lineHeight, texture.height * line.scale)
		}

		let letterX = line.origin.x - lineWidth / 2,
			letterY = line.origin.y - lineHeight / 2

		let _startTime = startTime
		for (let i = 0; i < line.text.length; i++) {
			const letter = line.text[i]
			let texture = this._textureGenerator.generateTexture(letter, new OsbColor(255, 255, 255))

			const sprite = new Sprite(texture.osbPath, Layer.Background, Origin.TopLeft, new OsbVector2(letterX, letterY))

			sprite.ScaleAtTime(startTime, line.scale)
			sprite.Fade(_startTime, _startTime + 800, 0, 1)
			sprite.MoveY(_startTime, _startTime + 800, letterY - 50, letterY, Easing.OutCirc)
			sprite.Fade(12872, 16994, 1, 0)

			this.registerComponents(sprite)

			letterX += texture.width * line.scale
			_startTime += 400
		}
	}
}

type Line = {
	startTime: string
	text: string
	scale: number
	origin: OsbVector2
}
