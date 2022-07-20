import { createContext, reportBuildTime, useContext, warnsEmptyObjects } from '@osbjs/tiny-osbjs'
import { clearOutputFolder } from '@osbjs/txtgen-tiny-osbjs'
import HideBg from './components/HideBg'
import Vig from './components/Vig'
import Bridge from './scenes/Bridge'
import Chorus1 from './scenes/Chorus1'
import Chorus2 from './scenes/Chorus2'
import Chorus3 from './scenes/Chorus3'
import Intro from './scenes/Intro'
import Outro from './scenes/Outro'
import { PostChorus2 } from './scenes/PostChorus2'
import PostChorus3 from './scenes/PostChorus3'
import PreChorus3 from './scenes/PreChorus3'
import Verse1 from './scenes/Verse1'
import Verse2 from './scenes/Verse2'
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
			Verse1()
			Chorus1()
			Verse2()
			Chorus2()
			PostChorus2()
			Bridge()
			PreChorus3()
			Chorus3()
			PostChorus3()
			Outro()
		})
	})

	eject(end)
})
