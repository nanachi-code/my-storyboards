import { createTxtGenContext, useFont } from '@osbjs/txtgen-tiny-osbjs'
import { beatmapFolder } from '../config'

useFont('./SazanamiMincho.ttf', 'SazanamiMincho')
useFont('./AuthenticSignature.otf', 'AuthenticSignature')

export const SazanamiMinchoContext = createTxtGenContext('sb/lyrics/SazanamiMincho', beatmapFolder, {
	name: 'SazanamiMincho',
	size: 72,
	isItalic: false,
	padding: { top: 0, bottom: 0, left: 0, right: 0 },
})

export const SazanamiMinchoBigContext = createTxtGenContext('sb/lyrics/SazanamiMinchoBig', beatmapFolder, {
	name: 'SazanamiMincho',
	size: 144,
	isItalic: false,
	padding: { top: 0, bottom: 0, left: 0, right: 0 },
})

export const AuthenticContext = createTxtGenContext('sb/lyrics/authentic', beatmapFolder, {
	name: 'AuthenticSignature',
	size: 72,
	isItalic: false,
	padding: { top: 0, bottom: 0, left: 0, right: 0 },
})
