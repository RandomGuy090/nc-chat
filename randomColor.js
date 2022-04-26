let randomColor = () => {
	const getRandom = (min, max) => {
		return Math.floor(Math.random() * (max - min) + min) 
	} 

	return( 
	   `\x1b[38;2;${getRandom(100, 255)};${getRandom(100, 255)};${getRandom(100, 255)}m`

		)
}
module.exports = randomColor


