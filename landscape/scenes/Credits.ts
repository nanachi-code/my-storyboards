import { fade } from '@osbjs/tiny-osbjs'
import { createText, useTxtGenContext } from '@osbjs/txtgen-tiny-osbjs'
import { HinaMinchoContext } from '../utils/txtGenContext'

export default function Credits() {
	useTxtGenContext(HinaMinchoContext)

	createText('afloat storage', 'Background', 'Centre', { x: 320, y: 120 }, () => {
		// fade()
	})
}
