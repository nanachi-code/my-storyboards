import { useFont, createTxtGenContext, useTxtGenContext } from '@osbjs/txtgen-tiny-osbjs'

export const beatmapFolder = 'D:/Games/osu!/Songs/1832398 Silentroom - Nhelv'
export const storyboardFileName = 'Silentroom - Nhelv (Laquarius).osb'
export const mapFileName = 'Silentroom - Nhelv (Laquarius) [h].osu'

useFont('TT Norms Pro Bold Italic.otf', 'TT Norms')
export const txtgenContext = createTxtGenContext('sb/mapper', beatmapFolder, {
	name: 'TT Norms',
	size: 72,
	isItalic: true,
	padding: {
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
	},
})
