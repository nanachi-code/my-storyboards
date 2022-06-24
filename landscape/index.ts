import { createContext, useContext, warnsEmptyObjects } from '@osbjs/tiny-osbjs'
import Vig from './components/Vig'
import eject from './eject'
import Intro from './scenes/Intro'
import Verse1 from './scenes/Verse1'

useContext(createContext())
warnsEmptyObjects()

Vig(() => {
	Intro()
	Verse1()
})

eject()
