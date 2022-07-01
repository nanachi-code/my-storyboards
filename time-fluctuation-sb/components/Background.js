import { Component, Layer, OsbVector2, parseOsuTimestamp, Sprite } from '@osbjs/osbjs'
import imageSize from 'image-size'
import { join } from 'path'

export class Background extends Component {
	constructor(folderPath) {
		super()
		this.bgFilename = 'a73c6ad8-31ab-492e-a849-e42903468146.png'
		this.bgPath = join(folderPath, this.bgFilename)

		this.vigFilename = 'sb/vig.png'
		this.vigPath = join(folderPath, this.vigFilename)
	}

	generate() {
		const bg = new Sprite(this.bgFilename, Layer.Background)
		const startTime = parseOsuTimestamp('00:06:365'),
			endTime = parseOsuTimestamp('04:29:919'),
			kiai11Time = parseOsuTimestamp('01:31:884'),
			kiai12Time = parseOsuTimestamp('01:42:865'),
			kiai21Time = parseOsuTimestamp('03:09:970'),
			kiai22Time = parseOsuTimestamp('03:20:981'),
			kiai23Time = parseOsuTimestamp('03:32:396'),
			kiai24Time = parseOsuTimestamp('03:43:103'),
			break1StartTime = parseOsuTimestamp('02:35:663'),
			break1EndTime = parseOsuTimestamp('02:56:908'),
			break2StartTime = parseOsuTimestamp('03:54:100'),
			break2EndTime = parseOsuTimestamp('04:05:172')
		const bgHeight = imageSize(this.bgPath).height

		bg.ScaleAtTime(startTime, 480 / bgHeight)
		bg.Fade(startTime, break1StartTime, 1, 1)
		bg.Fade(break1StartTime, break1EndTime, 0, 0)
		bg.Fade(break1EndTime, break2StartTime, 1, 1)
		bg.Fade(break2StartTime, break2EndTime, 0, 0)
		bg.Fade(break2EndTime, endTime, 1, 1)
		bg.Fade(endTime, endTime + 300, 1, 0)

		this.registerComponents(bg)

		this._flash(startTime)
		this._flash(kiai11Time)
		this._flash(kiai12Time)
		this._flash(break1StartTime)
		this._flash(break1EndTime)
		this._flash(kiai21Time)
		this._flash(kiai22Time)
		this._flash(kiai23Time)
		this._flash(kiai24Time)
		this._flash(break2StartTime)
		this._flash(break2EndTime)

		const vigHeight = imageSize(this.vigPath).height
		const vig = new Sprite(this.vigFilename, Layer.Background)
		vig.ScaleAtTime(startTime, 480 / vigHeight)
		vig.Fade(startTime, endTime + 300, 1, 1)
		this.registerComponents(vig)
	}

	_flash(startTime) {
		const flash = new Sprite('sb/px.png', Layer.Background)
		flash.ScaleVecAtTime(startTime, new OsbVector2(854, 480))
		flash.Fade(startTime, startTime + 500, 0.5, 0)
		this.registerComponents(flash)
	}
}
