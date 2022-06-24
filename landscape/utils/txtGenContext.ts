import { createTxtGenContext, useFont } from '@osbjs/txtgen-tiny-osbjs'
import { beatmapFolder } from '../config'

useFont('./HinaMincho.ttf', 'HinaMincho')
useFont('./AuthenticSignature.otf', 'AuthenticSignature')

export const HinaMinchoContext = createTxtGenContext('sb/lyrics/hinamincho', beatmapFolder, {
	name: 'HinaMincho',
	size: 72,
	color: { r: 255, g: 255, b: 255 },
	padding: { top: 0, bottom: 0, left: 0, right: 0 },
})

export const AuthenticContext = createTxtGenContext('sb/lyrics', beatmapFolder, {
	name: 'AuthenticSignature',
	size: 144,
	color: { r: 255, g: 255, b: 255 },
	padding: { top: 0, bottom: 0, left: 0, right: 0 },
})
