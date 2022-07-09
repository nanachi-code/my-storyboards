import { createContext, useContext, warnsEmptyObjects } from '@osbjs/tiny-osbjs'
import { clearOutputFolder } from '@osbjs/txtgen-tiny-osbjs'
import HideBg from './components/HideBg'
import Vig from './components/Vig'
import Intro from './scenes/Intro'
import Outro from './scenes/Outro'
import eject from './utils/eject'
import reportBuildTime from './utils/reportBuildTime'
import { AuthenticContext, SazanamiMinchoContext } from './utils/txtGenContext'

reportBuildTime(() => {
	useContext(createContext())
	warnsEmptyObjects()

	clearOutputFolder(SazanamiMinchoContext)
	// clearOutputFolder(HanaMinchoOutlineContext)
	clearOutputFolder(AuthenticContext)

	HideBg(() => {
		Vig(() => {
			Intro()
			Outro()
		})
	})

	eject()
})
