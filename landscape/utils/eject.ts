import { generateStoryboardOsb } from '@osbjs/tiny-osbjs'
import { ejectAllTextImages } from '@osbjs/txtgen-tiny-osbjs'
import fs from 'fs'
import path from 'path'
import { beatmapFolder, storyboardFileName } from '../config'

export default function eject(end: () => void) {
	fs.writeFileSync(path.join(beatmapFolder, storyboardFileName), generateStoryboardOsb(), 'utf8')

	ejectAllTextImages().then(() => end())
}
