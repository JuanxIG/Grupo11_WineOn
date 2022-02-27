const fs = require('fs');
const path = require('path'); 
const bcrypt = require("bcryptjs");
const {validationResult} = require("express-validator");
const db = require('../../database/models');



const userFilePath = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(userFilePath, 'utf-8'));


//const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const userController = {
//Se muestra el formulario de registro
    
	formularioRegistro: function(req, res) {
        res.render("register");
    },

	/* generarId: (req, res) => {
    
        let ultimoUsuario = users.pop();
        if (ultimoUsuario) {
             return ultimoUsuario.id + 1;
        }
        return 1;
    }, */

	procesoRegistro: (req, res) => {
		const resultadoValidacion = validationResult(req);
		console.log(req.file.filename);
		//validacion de campos de registro (si estan o no completos)
		if (resultadoValidacion.errors.length > 0){
			return res.render("register", {
				errors: resultadoValidacion.mapped(), //mapped toma un array y lo convierte en objeto literal
				oldData: req.body
			});
		}
            //validacion de email existente
			db.Usuario.findOne({
				where: {
					mail: req.body.email
				}
			})
				.then(function(email) {
					if (email) {
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
						let img;
						if (!req.file) {
							img = null
						} else {
							img = req.file.filename
						}
						console.log(img)
						db.Usuario.create({
							first_name: req.body.first_name,
							last_name: req.body.last_name,
							mail: req.body.email,
							nacimiento: req.body.nacimiento,
							domicilio: req.body.domicilio,
							dni: req.body.dni,
							contrasenia: bcrypt.hashSync(req.body.contraseña, 10),
							imagen: img
						});	
        			}
					res.redirect("login");
        		
						
				})
 	
    },

	login: function (req, res){
        res.render("login")
    },

	procesoLogin: (req,res) =>{
		//validacion de email existente
		db.Usuario.findOne({
			where: {
				mail: req.body.email
			}
		})
			.then(function(usuarioEmail) {
				if (usuarioEmail) {
					let passwordOk = bcrypt.compareSync(req.body.password, usuarioEmail.contrasenia);
					if (passwordOk){
						/* delete usuarioLoguearse.contraseña */
						req.session.usuarioLogueado = usuarioEmail; //seteado de SESSION
						
						if(req.body.remember_me){
							res.cookie("emailUsuario", req.body.email, { maxAge: 72000 * 10}) /* seteado de COOKIE */
						}
		
						return res.redirect("/user/" + req.session.usuarioLogueado. id + "/profile")
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



			})
    },

	list:(req,res) =>{
		res.render('user_list', {
			users
		})
	},
	
	profile: (req, res) => {
		console.log(req.session.usuarioLogueado);
		return res.render("profile", {
			user: req.session.usuarioLogueado
		});
	},

	formEdit: (req,res)=>{
		db.Usuario.findByPk(req.params.id)
			.then(function(usuario){
				res.render("user_edit", {usuario: usuario})
			})
	 	
				
	},

	edit:(req,res)=>{
		 let img;
		if (!req.file) {
			img = null
		} else {
			img = req.file.filename
		} 
		db.Usuario.update({
			first_name: req.body.first_name,
			last_name: req.body.last_name,
			mail: req.body.email,
			nacimiento: req.body.nacimiento,
			domicilio: req.body.domicilio,
			dni: req.body.dni,
			imagen: img
		}, {
			where: {
				dni: req.params.id
			}
		});	

		res.redirect("/user/" + req.params.id + "/profile")

	},
	
	logout: (req, res) => {
		res.clearCookie("emailUsuario");
		req.session.destroy();
		return res.redirect("login");
	}


}




module.exports = userController;