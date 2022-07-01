import { Component, Easing, Layer, Origin, OsbColor, OsbVector2, parseOsuTimestamp, Sprite } from '@osbjs/osbjs'
import { TextureGenerator } from '@osbjs/txtgen'

export class Mapper extends Component {
	name = 'Mapper'
	constructor(folderPath) {
		super()

		this.folderPath = folderPath
		this._textureGenerator = new TextureGenerator(folderPath, 'sb/mappers', { fontName: 'MedusaGothic', fontSize: 56 })
		this._textureGenerator.registerFont('./MedusaGothic.otf', 'MedusaGothic')
	}

	generate() {
		this._textureGenerator.emptyDir()
		const mappers = [
			{
				name: 'Nagaraia',
				startTime: '00:00:848',
				endTime: '00:17:409',
			},
			{
				name: 'Kyuuchie',
				startTime: '00:17:409',
				endTime: '00:36:687',
			},
			{
				name: 'Sekairi',
				startTime: '00:36:687',
				endTime: '00:47:685',
			},
			{
				name: 'Tsukinyuni',
				startTime: '00:47:685',
				endTime: '00:58:716',
			},
			{
				name: 'Daiyousei',
				startTime: '00:58:716',
				endTime: '01:09:780',
			},
			{
				name: 'Sekairi',
				startTime: '01:09:780',
				endTime: '01:20:807',
			},
			{
				name: 'Pacifiren',
				startTime: '01:20:807',
				endTime: '01:31:884',
			},
			{
				name: 'Ougi',
				startTime: '01:31:884',
				endTime: '01:42:862',
			},
			{
				name: 'Nanachi',
				startTime: '01:42:862',
				endTime: '01:54:267',
			},
			{
				name: 'Kyuuchie',
				startTime: '01:54:267',
				endTime: '02:05:654',
			},
			{
				name: 'Ougi',
				startTime: '02:05:654',
				endTime: '02:16:336',
			},
			{
				name: 'Nagaraia',
				startTime: '02:16:336',
				endTime: '02:26:535',
			},
			{
				name: 'Ren',
				startTime: '02:26:535',
				endTime: '02:35:663',
			},
			{
				name: 'LeCandy',
				startTime: '02:56:908',
				endTime: '03:09:970',
			},
			{
				name: 'Kyuuchie',
				startTime: '03:09:970',
				endTime: '03:20:981',
			},
			{
				name: 'Tsukiyuni',
				startTime: '03:20:981',
				endTime: '03:32:396',
			},
			{
				name: 'Nagaraia',
				startTime: '03:32:396',
				endTime: '03:43:106',
			},
			{
				name: 'Ougi',
				startTime: '03:43:106',
				endTime: '03:54:100',
			},
			{
				name: 'LeCandy',
				startTime: '03:54:100',
				endTime: '04:05:172',
			},
			{
				name: 'Midorijeon',
				startTime: '04:05:172',
				endTime: '04:16:146',
			},
			{
				name: 'Nanachi',
				startTime: '04:16:146',
				endTime: '04:29:919',
			},
		]

		const scale = 0.6

		for (let i = 0; i < mappers.length; i++) {
			const mapper = mappers[i]
			const startTime = parseOsuTimestamp(mapper.startTime),
				endTime = parseOsuTimestamp(mapper.endTime)

			let letterY = 400
			let lineWidth = 0

			for (let i = 0; i < mapper.name.length; i++) {
				const letter = mapper.name[i]
				let texture = this._textureGenerator.generateTexture(letter, { r: 255, g: 255, b: 255 })
				lineWidth += texture.width * scale
			}

			let letterX = 320 - lineWidth / 2

			for (let i = 0; i < mapper.name.length; i++) {
				const letter = mapper.name[i]
				let texture = this._textureGenerator.generateTexture(letter, { r: 255, g: 255, b: 255 })

				let letterPosition = new OsbVector2(letterX, letterY),
					shadePosition = new OsbVector2(letterX + 2, letterY + 2)

				let sprite = new Sprite(texture.osbPath, Layer.Background, Origin.TopLeft, letterPosition)

				sprite.ScaleAtTime(startTime, scale)
				sprite.Fade(startTime, startTime + 500, 0, 1)
				sprite.Fade(endTime - 500, endTime, 1, 0)
				floatLetter(sprite, letterPosition.x, letterPosition.y, startTime, endTime, i * 200)

				let shade = new Sprite(texture.osbPath, Layer.Background, Origin.TopLeft, shadePosition)

				shade.ScaleAtTime(startTime, scale)
				shade.Fade(startTime, startTime + 500, 0, 1)
				shade.Fade(endTime - 500, endTime, 1, 0)
				shade.ColorAtTime(startTime, new OsbColor(0, 0, 0))
				floatLetter(shade, shadePosition.x, shadePosition.y, startTime, endTime, i * 200)

				this.registerComponents(shade, sprite)

				letterX += texture.width * scale
			}
		}

		this._credit()
	}

	_credit() {
		const a = 'Itsue',
			t = 'Time fluctuation',
			s = 'sb by Nanachi'

		const aPos = new OsbVector2(320, 200),
			aShadePos = new OsbVector2(322, 202),
			tPos = new OsbVector2(320, 240),
			tShadePos = new OsbVector2(322, 242)

		const aTxt = this._textureGenerator.generateTexture(a, { r: 255, g: 255, b: 255 }),
			tTxt = this._textureGenerator.generateTexture(t, { r: 255, g: 255, b: 255 })

		const aSpr = new Sprite(aTxt.osbPath, Layer.Background, Origin.Center, aPos),
			aShadeSpr = new Sprite(aTxt.osbPath, Layer.Background, Origin.Center, aShadePos)

		const antStartTime = parseOsuTimestamp('00:06:365'),
			antEndTime = parseOsuTimestamp('00:09:124')

		aSpr.Scale(antStartTime, antEndTime, 0.35, 0.4)
		aSpr.Fade(antEndTime - 300, antEndTime, 1, 0)
		aSpr.FadeAtTime(antStartTime, 1)

		aShadeSpr.Scale(antStartTime, antEndTime, 0.35, 0.4)
		aShadeSpr.FadeAtTime(antStartTime, 1)
		aShadeSpr.Fade(antEndTime - 300, antEndTime, 1, 0)
		aShadeSpr.ColorAtTime(antStartTime, new OsbColor(0, 0, 0))

		this.registerComponents(aShadeSpr, aSpr)

		const tSpr = new Sprite(tTxt.osbPath, Layer.Background, Origin.Center, tPos),
			tShadeSpr = new Sprite(tTxt.osbPath, Layer.Background, Origin.Center, tShadePos)

		tSpr.Scale(antStartTime, antEndTime, 0.75, 0.8)
		tSpr.Fade(antEndTime - 300, antEndTime, 1, 0)
		tSpr.FadeAtTime(antStartTime, 1)

		tShadeSpr.Scale(antStartTime, antEndTime, 0.75, 0.8)
		tShadeSpr.FadeAtTime(antStartTime, 1)
		tShadeSpr.Fade(antEndTime - 300, antEndTime, 1, 0)
		tShadeSpr.ColorAtTime(antStartTime, new OsbColor(0, 0, 0))

		this.registerComponents(tShadeSpr, tSpr)

		const sPos = new OsbVector2(320, 240),
			sShadePos = new OsbVector2(322, 242)

		const sTxt = this._textureGenerator.generateTexture(s, { r: 255, g: 255, b: 255 })

		const sSpr = new Sprite(sTxt.osbPath, Layer.Background, Origin.Center, sPos),
			sShadeSpr = new Sprite(sTxt.osbPath, Layer.Background, Origin.Center, sShadePos)

		const sStartTime = parseOsuTimestamp('00:09:124'),
			sEndTime = parseOsuTimestamp('00:11:882')

		sSpr.Scale(sStartTime, sEndTime, 0.35, 0.4)
		sSpr.Fade(sStartTime, sStartTime + 300, 0, 1)
		sSpr.Fade(sEndTime - 300, sEndTime, 1, 0)

		sShadeSpr.Scale(sStartTime, sEndTime, 0.35, 0.4)
		sShadeSpr.Fade(sStartTime, sStartTime + 300, 0, 1)
		sShadeSpr.Fade(sEndTime - 300, sEndTime, 1, 0)
		sShadeSpr.ColorAtTime(sStartTime, new OsbColor(0, 0, 0))

		this.registerComponents(sShadeSpr, sSpr)
	}
}

function floatLetter(sprite, x, originY, startTime, endTime, offset) {
	const timestep = 1000.0
	const amplitude = 3
	for (let time = startTime + offset; time < endTime + offset; time += timestep * 2) {
		sprite.Move(time, time + timestep, new OsbVector2(x, originY), new OsbVector2(x, originY + amplitude), Easing.InOutQuad)
		sprite.Move(time + timestep, time + timestep * 2, new OsbVector2(x, originY + amplitude), new OsbVector2(x, originY), Easing.InOutQuad)
	}
}
