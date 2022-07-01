import { degToRad, Easing, Layer, Origin, OsbColor, OsbVector2, parseOsuTimestamp, Scene, Sprite, TextureGenerator } from '@osbjs/osbjs'
import { path } from '../osbjs.config'
import { join } from 'path'

export class Lyrics extends Scene {
	private _textureGenerator: TextureGenerator
	constructor() {
		super()

		this._textureGenerator = new TextureGenerator(path, 'sb/lyrics', { fontName: 'HinaMincho', fontSize: 72 })
		this._textureGenerator.registerFont(join(process.cwd(), 'HinaMincho.ttf'), 'HinaMincho')
	}

	generate() {
		const lyrics: Line[] = [
			{ startTime: '01:06:865', endTime: '01:09:107', text: '雨音が' },
			{ startTime: '01:09:450', endTime: '01:13:208', text: '少しずつ止んで' },
			{ startTime: '01:13:551', endTime: '01:17:325', text: '光がさす' },
			{ startTime: '01:17:664', endTime: '01:20:766', text: '窓際' },
			{ startTime: '01:22:811', endTime: '01:25:572', text: '気だるさをを' },
			{ startTime: '01:25:913', endTime: '01:29:682', text: '引きずったままで' },
			{ startTime: '01:30:031', endTime: '01:37:223', text: '晴れ間すらも気がかり' },
			{ startTime: '01:38:928', endTime: '01:40:981', text: '気付けば外の' },
			{ startTime: '01:41:324', endTime: '01:44:414', text: '色を知らずに' },
			{ startTime: '01:45:100', endTime: '01:46:471', text: 'いる' },
			{ startTime: '01:47:153', endTime: '01:52:995', text: '目を閉じても' },
			{ startTime: '01:55:395', endTime: '01:58:468', text: '思い出せなくなって' },
			{ startTime: '01:58:811', endTime: '02:02:930', text: '虚しくふと' },
			{ startTime: '02:03:615', endTime: '02:04:987', text: '窓から' },
			{ startTime: '02:07:730', endTime: '02:10:823', text: '確かめる' },
			//
			{ startTime: '02:12:795', endTime: '02:15:609', text: '見上げた空には' },
			{ startTime: '02:15:952', endTime: '02:20:058', text: '大きな青だけ' },
			{ startTime: '02:20:397', endTime: '02:23:842', text: '色褪せないまま' },
			{ startTime: '02:24:179', endTime: '02:28:289', text: '月日だけが残る' },
			{ startTime: '02:28:628', endTime: '02:32:069', text: '染まる移ろいに' },
			{ startTime: '02:32:412', endTime: '02:36:193', text: '戸惑いを隠して' },
			{ startTime: '02:36:536', endTime: '02:38:241', text: '目を' },
			{ startTime: '02:38:588', endTime: '02:41:664', text: '閉じる前に' },
			{ startTime: '02:42:011', endTime: '02:45:081', text: '空の青を見る' },
			//
			{ startTime: '04:07:370', endTime: '04:15:276', text: '見上げた空には大きな青だけ', center: true },
			{ startTime: '04:15:625', endTime: '04:23:334', text: '色褪せないまま月日だけが残る', center: true },
			{ startTime: '04:23:849', endTime: '04:31:392', text: '染まる移ろいに戸惑いを隠して', center: true },
			{ startTime: '04:31:734', endTime: '04:33:455', text: '目を', center: true },
			{ startTime: '04:33:794', endTime: '04:38:590', text: '閉じる前に空の', center: true },
			//
			{ startTime: '04:38:932', endTime: '04:40:304', text: '青を知る', center: true },
		]

		this._textureGenerator.emptyDir()

		lyrics.forEach((line) => {
			if (line.center) this.generateCenter(line, 0.3)
			else this.generateVertical(line, 0.3)
		})
	}

	generateCenter(line: Line, scale: number) {
		const startTime = parseOsuTimestamp(line.startTime),
			endTime = parseOsuTimestamp(line.endTime)

		let letterY = 240
		let lineWidth = 0,
			lineHeight = 0

		for (let i = 0; i < line.text.length; i++) {
			const letter = line.text[i]
			let texture = this._textureGenerator.generateTexture(letter, new OsbColor(255, 255, 255))
			lineWidth += texture.width * scale
			lineHeight = Math.max(lineHeight, texture.height * scale)
		}

		let letterX = 320 - lineWidth / 2

		for (let i = 0; i < line.text.length; i++) {
			const letter = line.text[i]
			let texture = this._textureGenerator.generateTexture(letter, new OsbColor(255, 255, 255))

			const sprite = new Sprite(texture.osbPath, Layer.Background, Origin.TopLeft, new OsbVector2(letterX, letterY))

			sprite.ScaleAtTime(startTime, scale)
			sprite.Fade(startTime, startTime + 200, 0, 1)
			sprite.Fade(endTime - 200, endTime, 1, 0)
			sprite.MoveX(startTime, startTime + 800, letterX + 15, letterX, Easing.OutExpo)
			sprite.MoveX(endTime - 800, endTime, letterX, letterX - 10, Easing.InExpo)
			sprite.MoveY(startTime, startTime + 800, letterY + 15, letterY, Easing.OutExpo)
			sprite.MoveY(endTime - 800, endTime, letterY, letterY - 10, Easing.InExpo)
			sprite.Rotate(startTime, startTime + 200, degToRad(5), 0)

			this.registerComponents(sprite)

			letterX += texture.width * scale
		}
	}

	generateVertical(line: Line, scale: number) {
		const startTime = parseOsuTimestamp(line.startTime),
			endTime = parseOsuTimestamp(line.endTime)

		let letterX = 60,
			letterY = 80

		let lineHeight = 0,
			lineWidth = 0

		for (let i = 0; i < line.text.length; i++) {
			const letter = line.text[i]
			let texture = this._textureGenerator.generateTexture(letter, new OsbColor(255, 255, 255))
			lineHeight += texture.height * scale
			lineWidth = Math.max(lineWidth, texture.width * scale)
		}

		const delay = 500
		const padding = 10
		const wrapperW = lineWidth + padding * 2,
			wrapperH = lineHeight + padding * 2,
			wrapperPos = new OsbVector2(letterX - padding, letterY - padding)

		// text wrapper
		const wrapper = new Sprite('sb/px.png', Layer.Background, Origin.TopLeft, wrapperPos)
		wrapper.Fade(startTime - delay, endTime, 1, 1)
		wrapper.ScaleVec(startTime - delay, startTime, new OsbVector2(wrapperW, 0), new OsbVector2(wrapperW, wrapperH), Easing.OutQuart)
		wrapper.ScaleVec(endTime - delay, endTime, new OsbVector2(wrapperW, wrapperH), new OsbVector2(wrapperW, 0), Easing.InQuart)
		wrapper.ColorAtTime(startTime, new OsbColor(0, 0, 0))
		this.registerComponents(wrapper)

		for (let i = 0; i < line.text.length; i++) {
			const letter = line.text[i]
			let texture = this._textureGenerator.generateTexture(letter, new OsbColor(255, 255, 255))

			const sprite = new Sprite(texture.osbPath, Layer.Background, Origin.TopLeft, new OsbVector2(letterX, letterY))

			sprite.ScaleAtTime(startTime - delay / 2, scale)
			sprite.Fade(startTime - delay / 2, startTime, 0, 1, Easing.OutQuart)
			sprite.Fade(endTime - delay, endTime - delay / 2, 1, 0, Easing.InQuart)

			this.registerComponents(sprite)

			letterY += texture.height * scale
		}
	}
}

type Line = {
	startTime: string
	endTime: string
	text: string
	center?: boolean
}
