import { createContext, useContext, warnsEmptyObjects } from '@osbjs/tiny-osbjs'
import { HideBg } from './components/Bg'
import Vig from './components/Vig'
import Intro from './scenes/Intro'
import PreVerse1 from './scenes/PreVerse1'
import Verse1 from './scenes/Verse1'
import eject from './utils/eject'
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
