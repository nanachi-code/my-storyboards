import { createTxtGenContext, useFont } from '@osbjs/txtgen-tiny-osbjs'
import { beatmapFolder } from '../config'
import Pallete from './pallete'

useFont('./HinaMincho.ttf', 'HinaMincho')
useFont('./AuthenticSignature.otf', 'AuthenticSignature')

export const HinaMinchoContext = createTxtGenContext('sb/lyrics/hinamincho', beatmapFolder, {
	name: 'HinaMincho',
	size: 72,
	color: Pallete.White,
	padding: { top: 0, bottom: 0, left: 0, right: 0 },
})

export const HinaMinchoOutlineContext = createTxtGenContext('sb/lyrics/hinaminchooutline', beatmapFolder, {
	name: 'HinaMincho',
	size: 72,
	color: Pallete.White,
	padding: { top: 0, bottom: 0, left: 0, right: 0 },
})

export const AuthenticContext = createTxtGenContext('sb/lyrics/authentic', beatmapFolder, {
	name: 'AuthenticSignature',
	size: 144,
	color: Pallete.White,
	padding: { top: 0, bottom: 0, left: 0, right: 0 },
})
