import { Storyboard } from '@osbjs/osbjs'
import { path, filename } from './osbjs.config.js'
import { Lyrics } from './components/Lyrics.js'
import { Mapper } from './components/Mapper.js'
import { Background } from './components/Background.js'

let storyboard = new Storyboard(filename, path)

storyboard.registerComponents(new Background(path), new Mapper(path), new Lyrics(path))

storyboard.generate()
