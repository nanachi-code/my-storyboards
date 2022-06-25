export default (sb: () => void) => {
	console.clear()
	console.log('Start rebuilding...')
	const startTime = Date.now()

	sb()
    
	console.log(`Done in ${(Date.now() - startTime) / 1000} s.`)
}
