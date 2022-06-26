import { generateStoryboardOsb } from '@osbjs/tiny-osbjs'
import fs from 'fs'
import path from 'path'
import { beatmapFolder, storyboardFileName } from '../config'

export default function eject() {
	fs.writeFileSync(path.join(beatmapFolder, storyboardFileName), generateStoryboardOsb(), 'utf8')
}
