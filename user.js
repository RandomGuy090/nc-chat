const config = require("./config.json")


class User{

	login = "";
	password = "";
	isLogged = false;

	color = "";
	reset = "\u001b[0m";

	ip = "";
	port = false;

	connectionTime = false;
	connection = false;

	loginColoured = () => {
		let str =  `${this.color}${this.login}${this.reset}`
		str = str.replace("\\u001b", '\u001b')
		return str
	}
	
	messagesCount = 0

	setConnectionTime = () => {
		if(!this.connectionTime){
			this.connectionTime = new Date().getTime()
		}
	}

	colorParse = () => {
		this.color = this.color.replace("\\u001b", '\u001b')

	}

	countMsgs = (data) => {
		this.messagesCount++;
		if((this.messagesCount < 2 && config.usePasswords) || (this.messagesCount < 1 && !config.usePasswords) ){
			data = "";
			return false

		}else if((this.messagesCount == 2 && this.usePasswords) || (this.messagesCount == 1 && !config.usePasswords)){
			data = (` ${this.color} << USER ${	this.login} joined the room >> ${this.reset}`)	
		}
	return data
	}

}

module.exports = User