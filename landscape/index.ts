import { createContext, reportBuildTime, useContext, warnsEmptyObjects } from '@osbjs/tiny-osbjs'
import { clearOutputFolder } from '@osbjs/txtgen-tiny-osbjs'
import HideBg from './components/HideBg'
import Vig from './components/Vig'
import Bridge from './sequences/Bridge'
import Chorus1 from './sequences/Chorus1'
import Chorus2 from './sequences/Chorus2'
import Chorus3 from './sequences/Chorus3'
import Intro from './sequences/Intro'
import Outro from './sequences/Outro'
import { PostChorus2 } from './sequences/PostChorus2'
import PostChorus3 from './sequences/PostChorus3'
import PreChorus3 from './sequences/PreChorus3'
import Verse1 from './sequences/Verse1'
import Verse2 from './sequences/Verse2'
import eject from './utils/eject'
import { AuthenticContext, SazanamiMinchoBigContext, SazanamiMinchoContext } from './utils/txtGenContext'

reportBuildTime((end) => {
	useContext(createContext())
	warnsEmptyObjects()

	// clearOutputFolder(SazanamiMinchoContext)
	// clearOutputFolder(SazanamiMinchoBigContext)
	// clearOutputFolder(AuthenticContext)

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
