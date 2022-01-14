const fs = require('fs');
const path = require('path'); 
const bcrypt = require("bcryptjs");
const {validationResult} = require("express-validator");


//const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const usersFilePath = path.join(__dirname, '../data/users.json'); 
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8', null, " "));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const userController = {
//Se muestra el formulario de registro
    
	formularioRegistro: function(req, res) {
        res.render("register");

	
    },

	generarId: (req, res) => {
    
        let ultimoUsuario = users.pop();
        if (ultimoUsuario) {
             return ultimoUsuario.id + 1;
        }
        return 1;
    },

	procesoRegistro: (req, res) => {
		const resultadoValidacion = validationResult(req);
		
		//validacion de campos de registro (si estan o no completos)
		if (resultadoValidacion.errors.length > 0){
			return res.render("register", {
				errors: resultadoValidacion.mapped(), //mapped toma un array y lo convierte en objeto literal
				oldData: req.body
			});
		}
            //validacion de email existente
			let usuarioEnDB = users.find(usuario => usuario.email === req.body.email);
			if (usuarioEnDB) {
				return res.render("register", {
					errors: {
						email: {
							msg: "Este email ya está registrado"
						}
					},
					oldData: req.body
				})
			
			} else {
						//creacion de usuario
						let lastUser = users[users.length-1]
        				let nuevoUsuario = {
        			    id: lastUser.id + 1,
        			    first_name: req.body.first_name,
						last_name: req.body.last_name,
						email: req.body.email,
						nacimiento: req.body.nacimiento,
						domicilio: req.body.domicilio,
						dni: req.body.dni,
						contraseña: bcrypt.hashSync(req.body.contraseña, 10),
						image: req.file.filename
        			}
        		
				users.push(nuevoUsuario);
        		fs.writeFileSync(usersFilePath, JSON.stringify(users, null, " "));
				res.redirect("login");
	}
    },

	login: function (req, res){
        res.render("login")
    },

    procesoLogin: (req,res) =>{
		//validacion de email existente
		let usuarioLoguearse = users.find(usuario => usuario.email === req.body.email);
		
		if (usuarioLoguearse) {
			let passwordOk = bcrypt.compareSync(req.body.password, usuarioLoguearse.contraseña);
			if (passwordOk){
				/* delete usuarioLoguearse.contraseña */
				req.session.usuarioLogueado = usuarioLoguearse;
				
				if(req.body.remember_me){
					res.cookie("emailUsuario", req.body.email, { maxAge: 72000 * 10}) /* COOKIE */
				}

				return res.redirect("profile")
			}
			return res.render("login", {
				errors: {
					email: {
						msg: "el email o la contraseña son inválidos"
					}
				}
			});
			}
			
			return res.render("login", {
				errors: {
					email: {
						msg: "No se encuentra este email"
					}
				}
			});
    },
	
	profile: (req, res) => {
		console.log(req.cookies.emailUsuario) /* COOKIES */
		
		return res.render("profile", {
			user: req.session.usuarioLogueado
		});
	},
	
	logout: (req, res) => {
		res.clearCookie("emailUsuario");
		req.session.destroy();
		return res.redirect("login");
	}


}




module.exports = userController;