const fs = require('fs');
const path = require('path');
const bcrypt = require("bcryptjs");
const {validationResult} = require("express-validator");

//const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const usersFilePath = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const userController = {
//Se muestra el formulario de registro
    
	formularioRegistro: function(req, res) {
        res.render("register");

	
    },
    	
	procesoRegistro: (req, res) => {
		const resultadoValidacion = validationResult(req);
		
		if (resultadoValidacion.errors.length > 0){
			return res.render("register", {
				errors: resultadoValidacion.mapped(), //mapped toma un array y lo convierte en objeto literal
				oldData: req.body
			});

		}	else {
			let image
		if(req.files[0].filename != undefined){
			image = req.files[0].filename
		} else {
			image = 'default-image.png'
		}

		
		let lastUser = users[users.length-1]
		console.log(lastUser)
		let newUser = {
			id: lastUser.id + 1,
			first_name: req.body.first_name,
			last_name: req.body.last_name,
			email: req.body.email,
			nacimiento: req.body.nacimiento,
			domicilio: req.body.domicilio,
			dni: req.body.dni,
			contraseña: bcrypt.hashSync(req.body.contraseña, 10),
			image: image
		};
		users.push(newUser)
		console.log(newUser)
		fs.writeFileSync(usersFilePath, JSON.stringify(users, null, ' '));
		res.redirect("/")
		}
	},

	profile: (req, res) => {
		res.render("profile");
	}
}
	
	/* procesoRegistro: (req, res) => {
		let image
		if(req.files[0].filename != undefined){
			image = req.files[0].filename
		} else {
			image = 'default-image.png'
		}

		
		let lastUser = users[users.length-1]
		console.log(lastUser)
		let newUser = {
			id: lastUser.id + 1,
			first_name: req.body.first_name,
			last_name: req.body.last_name,
			email: req.body.email,
			nacimiento: req.body.nacimiento,
			domicilio: req.body.domicilio,
			dni: req.body.dni,
			contraseña: bcrypt.hashSync(req.body.contraseña, 10),
			image: image
		};
		users.push(newUser)
		console.log(newUser)
		fs.writeFileSync(usersFilePath, JSON.stringify(users, null, ' '));
		res.redirect("/")
	} */



module.exports = userController;