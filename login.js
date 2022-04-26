const config = require("./config.json")
const users = require("./users.json")
const randomColor = require("./randomColor.js")
// const userList = require("./userList.js")


class Login  {

	constructor(users) {
		this.users = users
	}



	loginUserPass = (data, user) => {

		const failed = false;

		if(user.isLogged){
			return true
		}		
		if(user.login !== "" && user.password === ""){
			user.password = data

			let userFromJson = users[user.login];

			if (typeof userFromJson === "undefined"){
				user.connection.write(`/// no such user: ${user.login}, login failed\n\n`)
				user.connection.write("login: ")
				user.login = "";
				user.password = "";
				return false
			}


			if (user.password ===userFromJson.password){
				user.isLogged = true;
				user.connection.write(`/// logged as:  ${user.login}\n\n`)


				this.users.push(user)

				data = ` <-- user ${user.login} joined a chat! -->`

				user.color = userFromJson.color
				// user.loginColoured = `${userFromJson.color}${user.login}${user.reset}`

				return true

			}else{
				user.login = "";
				user.password = "";
				let escCode = '\r\x1b[K';
				user.connection.write(`<--- login failed --->\n`)
				user.connection.write("login: ")
				return false

			}
		}

		if(user.login === "" && user.password === ""){

			user.login = data
			user.connection.write("password: ")


		}
		user.ip = user.connection.remoteAddress
		user.port = user.connection.remotePort
		user.setConnectionTime(user)
		user.colorParse(user)


		return false;

		}	
		
		loginUserNoPass = (data, user) => {
			if(!user.isLogged){
				user.login = data;
				user.color = randomColor();
				user.isLogged = true;
				user.password = false;
				user.ip = user.connection.remoteAddress
				user.port = user.connection.remotePort
				
				this.users.push(user)

			}
			user.setConnectionTime(user)
			user.colorParse(user)

	}


}

module.exports = Login