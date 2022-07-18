import { createContext, reportBuildTime, useContext, warnsEmptyObjects } from '@osbjs/tiny-osbjs'
import { clearOutputFolder, ejectAllTextImages } from '@osbjs/txtgen-tiny-osbjs'
import HideBg from './components/HideBg'
import Vig from './components/Vig'
import Chorus3 from './scenes/Chorus3'
import Intro from './scenes/Intro'
import Outro from './scenes/Outro'
import PostChorus3 from './scenes/PostChorus3'
import PreChorus3 from './scenes/PreChorus3'
import eject from './utils/eject'
import { AuthenticContext, SazanamiMinchoContext, SazanamiMinchoBigContext } from './utils/txtGenContext'

reportBuildTime((end) => {
	useContext(createContext())
	warnsEmptyObjects()

	clearOutputFolder(SazanamiMinchoContext)
	clearOutputFolder(SazanamiMinchoBigContext)
	clearOutputFolder(AuthenticContext)

	HideBg(() => {
		Vig(() => {
			Intro()
			PreChorus3()
			Chorus3()
			PostChorus3()
			Outro()
		})
	})

	eject(end)
})
