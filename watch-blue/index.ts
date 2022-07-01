import { Storyboard } from '@osbjs/osbjs'
import { Bg } from './scenes/Bg'
import { Flash } from './components/Flash'
import { Vig } from './components/Vig'
import { path, filename } from './osbjs.config'
import { Credit } from './scenes/Credit'
import { Kiai } from './scenes/Kiai'
import { Lyrics } from './scenes/Lyrics'
import { Rain } from './components/Rain'

let storyboard = new Storyboard(filename, path)

storyboard.registerComponents(new Bg())
storyboard.registerComponents(
	new Kiai(132195, 165081),
	new Rain(198013, 247370, { angle: 10, startX: -300, endX: 1000, duration: 500 }),
	new Kiai(280304, 313222),
	new Rain(313222, 346122, { angle: 10, startX: -300, endX: 1000, duration: 300 })
)
storyboard.registerComponents(new Credit())
storyboard.registerComponents(new Lyrics())
storyboard.registerComponents(new Flash([132195, 148628, 165081, 198013, 247370, 280304, 292654, 296750, 313222, 329677, 346122]))
storyboard.registerComponents(new Vig())

storyboard.generate()
