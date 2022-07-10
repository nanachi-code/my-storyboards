import { createContext, useContext, warnsEmptyObjects } from '@osbjs/tiny-osbjs'
import { clearOutputFolder } from '@osbjs/txtgen-tiny-osbjs'
import HideBg from './components/HideBg'
import Vig from './components/Vig'
import Chorus3 from './scenes/Chorus3'
import Intro from './scenes/Intro'
import Outro from './scenes/Outro'
import PreChorus3 from './scenes/PreChorus3'
import eject from './utils/eject'
import reportBuildTime from './utils/reportBuildTime'
import { AuthenticContext, SazanamiMinchoContext, SazanamiMinchoOutlineContext } from './utils/txtGenContext'

reportBuildTime(() => {
	useContext(createContext())
	warnsEmptyObjects()

	clearOutputFolder(SazanamiMinchoContext)
	clearOutputFolder(SazanamiMinchoOutlineContext)
	clearOutputFolder(AuthenticContext)

	HideBg(() => {
		Vig(() => {
			Intro()
			PreChorus3()
			Chorus3()
			Outro()
		})
	})

	eject()
})
