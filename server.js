const net = require("net");
const config = require("./config.json")
const users = require("./users.json")
const randomColor = require("./randomColor.js")
const Login = require("./login.js")

const prepareData = require("./prepareData.js")
const User = require("./user.js")



class Server {


	constructor() {
		console.log("server");

		this.data = NaN
		
		this.users = []

		this.server = net.createServer(this.clientConnected)

		this.server.listen(config.port, config.ip)
	}

	greetingInfo = (user) => {
		let greetingInfo = "<--- Hello on server! --->"
		user.connection.write(`${greetingInfo}\n`)	
		user.connection.write("login: ")

	}

	sendToUsers = (user, data) => {
		for (var i = this.users.length - 1; i >= 0; i--) {

			let escCode = '\r\x1b[K';
			
			if(this.users[i].login !== user.login){
				let str = `${escCode}>${user.loginColoured()}${user.reset}: ${data}\n${this.users[i].loginColoured()}${user.reset} --> : `
				this.users[i].connection.write(str)

			}else{
				user.connection.write(`${escCode}${user.loginColoured()}${user.reset} --> :`)

			}
	
		}

	}


	removeUser = (user) => {
		console.log(`user: ${user.loginColoured()} disconnected!`)
			
		var index = this.users.indexOf(user)
		this.users.splice(index, 1)

	}

	prepareData = (data) => {
		data = data.toString("utf-8")

		if(data.endsWith("\n")){
			data = data.substring(0, data.length-1)
		}

		if(data.toString("utf-8").length == 0){
			return false
		}

		return data
	}

	clientConnected = (conn) => {
		console.log('client connected!');

		let user = new User();
		user.connection = conn


		this.greetingInfo(user)

		user.connection.on("data", function(data){
			
			data = this.prepareData(data)
			
			const login = new Login(this.users)

			if(config.usePasswords){
				login.loginUserPass(data, user)
			}else{
				login.loginUserNoPass(data, user)
			}


			data = user.countMsgs(data)		
			if(data !== ""){

				console.log("process")
				console.log(data.length)
			}

			this.sendToUsers(user, data)


		}.bind(this))
	
		user.connection.on("end", (connection) => {
			this.removeUser(user)
			this.sendToUsers(user, `${user.color}<<  USER: ${user.login} left a chat  >>${user.reset}`)
		})

	}


}

module.exports = new Server()
