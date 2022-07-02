import { createContext, useContext, warnsEmptyObjects } from '@osbjs/tiny-osbjs'
import { clearOutputFolder } from '@osbjs/txtgen-tiny-osbjs'
import { HideBg } from './components/Bg'
import Vig from './components/Vig'
import Chorus1 from './scenes/Chorus1'
import Chorus2 from './scenes/Chorus2'
import Intro from './scenes/Intro'
import PreVerse1 from './scenes/PreVerse1'
import Verse1 from './scenes/Verse1'
import eject from './utils/eject'
import reportBuildTime from './utils/reportBuildTime'
import { AuthenticContext, HinaMinchoContext, HinaMinchoOutlineContext } from './utils/txtGenContext'

reportBuildTime(() => {
	useContext(createContext())
	warnsEmptyObjects()

	clearOutputFolder(HinaMinchoContext)
	clearOutputFolder(HinaMinchoOutlineContext)
	clearOutputFolder(AuthenticContext)

	Vig(() => {
		HideBg()
		Intro()
		PreVerse1()
		Verse1()
		Chorus1()
		Chorus2()
	})

	eject()
})
