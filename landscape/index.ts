import { createContext, useContext, warnsEmptyObjects } from '@osbjs/tiny-osbjs'
import { HideBg } from './components/Bg'
import Vig from './components/Vig'
import eject from './eject'
import Intro from './scenes/Intro'
import PreVerse1 from './scenes/PreVerse1'
import Verse1 from './scenes/Verse1'
import reportBuildTime from './utils/reportBuildTime'

reportBuildTime(() => {
	useContext(createContext())
	warnsEmptyObjects()

	Vig(() => {
		HideBg()
		Intro()
		PreVerse1()
		Verse1()
	})

	eject()
})
