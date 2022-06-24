import { generateStoryboardOsb } from '@osbjs/tiny-osbjs'
import fs from 'fs'
import path from 'path'
import { beatmapFolder, storyboardFileName } from './config'

export default function eject() {
	console.clear()
	console.log('Start rebuilding...')
	const startTime = Date.now()

	fs.writeFileSync(path.join(beatmapFolder, storyboardFileName), generateStoryboardOsb(), 'utf8')

	console.log(`Done in ${(Date.now() - startTime) / 1000} s.`)
}
