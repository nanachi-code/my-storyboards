import { createContext, generateStoryboardOsb, HideBg, useContext } from '@osbjs/tiny-osbjs'
import { ejectAllTextImages } from '@osbjs/txtgen-tiny-osbjs'
import { writeFileSync } from 'fs'
import path, { join } from 'path'
import Bg from './components/Bg'
import Flash from './components/Flash'
import Mapper from './components/Mapper'
import Spectrum from './components/Spectrum'
// remember to update path to your beatmap folder
import { beatmapFolder, storyboardFileName } from './config'
import Intro from './sequences/Intro'

useContext(createContext())
HideBg('nhelv.jpg')
Intro()

Bg(23395, 45391, 0.6)
Bg(45391, 89382, 1)
Bg(89382, 100380, 0.6)
Bg(100380, 111378, 1)
Bg(111378, 122376, 0)
Bg(122376, 149870, 1)
Bg(149870, 155369, 0.6)
Mapper()
Spectrum(45391, 89382, './spectrum.json', 'sb/d.png')
Spectrum(100380, 111378, './spectrum.json', 'sb/d.png')
Spectrum(122376, 149870, './spectrum.json', 'sb/d.png')
Flash(45391)
Flash(67386)
Flash(89382)
Flash(100380)
Flash(111378)
Flash(122376)
Flash(133373)
Flash(141622)
Flash(149870)

writeFileSync(path.join(beatmapFolder, storyboardFileName), generateStoryboardOsb(), 'utf8')
ejectAllTextImages().then(() => {
	console.log('Generated')
})
