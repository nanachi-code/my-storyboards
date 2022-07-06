import { createContext, useContext, warnsEmptyObjects } from '@osbjs/tiny-osbjs'
import { clearOutputFolder } from '@osbjs/txtgen-tiny-osbjs'
import { HideBg } from './components/Bg'
import Vig from './components/Vig'
import Chorus1 from './scenes/Chorus1'
import Chorus2 from './scenes/Chorus2'
import Chorus2Cooldown from './scenes/Chorus2Cooldown'
import Chorus3 from './scenes/Chorus3'
import Intro from './scenes/Intro'
import Outro from './scenes/Outro'
import PreChorus3 from './scenes/PreChorus3'
import PreVerse1 from './scenes/PreVerse1'
import Verse1 from './scenes/Verse1'
import Verse2 from './scenes/Verse2'
import eject from './utils/eject'
import reportBuildTime from './utils/reportBuildTime'
import { AuthenticContext, HinaMinchoContext, HinaMinchoOutlineContext } from './utils/txtGenContext'

reportBuildTime(() => {
	useContext(createContext())
	warnsEmptyObjects()

	// clearOutputFolder(HinaMinchoContext)
	// clearOutputFolder(HinaMinchoOutlineContext)
	// clearOutputFolder(AuthenticContext)

	HideBg()
	
	Vig(() => {
		Intro()
		PreVerse1()
		Verse1()
		Chorus1()
		Verse2()
		Chorus2()
		Chorus2Cooldown()
		PreChorus3()
		Chorus3()
		Outro()
	})

	eject()
})
