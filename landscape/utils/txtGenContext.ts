import { createTxtGenContext, useFont } from '@osbjs/txtgen-tiny-osbjs'
import { beatmapFolder } from '../config'
import Pallete from './pallete'

useFont('./SazanamiMincho.ttf', 'SazanamiMincho')
useFont('./AuthenticSignature.otf', 'AuthenticSignature')

export const SazanamiMinchoContext = createTxtGenContext('sb/lyrics/SazanamiMincho', beatmapFolder, {
	name: 'SazanamiMincho',
	size: 72,
	color: Pallete.White,
	padding: { top: 0, bottom: 0, left: 0, right: 0 },
})

// export const HanaMinchoOutlineContext = createTxtGenContext('sb/lyrics/hanaminchooutline', beatmapFolder, {
// 	name: 'HanaMincho',
// 	size: 72,
// 	color: Pallete.White,
// 	padding: { top: 0, bottom: 0, left: 0, right: 0 },
// })

export const AuthenticContext = createTxtGenContext('sb/lyrics/authentic', beatmapFolder, {
	name: 'AuthenticSignature',
	size: 144,
	color: Pallete.White,
	padding: { top: 0, bottom: 0, left: 0, right: 0 },
})
