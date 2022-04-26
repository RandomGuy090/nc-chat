const prepareData = (data) => {
	data = data.toString("utf-8")

	if(data.endsWith("\n")){
		data = data.substring(0, data.length-1)
	}

	if(data.toString("utf-8").length == 0){
		return false
	}

	return data
			

}

module.exports = prepareData