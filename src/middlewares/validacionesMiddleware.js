const path = require('path')
const {body} = require ("express-validator");

const validaciones = [
    body("first_name").notEmpty().withMessage("Ingresá tu nombre"),
    body("last_name").notEmpty().withMessage("Ingresá tu apellido"),
    body("email").notEmpty().withMessage("Ingresá tu email").bail()
                 .isEmail().withMessage("ingresá un formato de correo válido. Ej.: tucorreo@email"),
    body("nacimiento").notEmpty().withMessage("Seleccioná tu fecha de nacimiento"),
    body("domicilio").notEmpty().withMessage("Ingresá tu domicilio"),
    body("dni").notEmpty().withMessage("Ingresá tu DNI"),
    body("contraseña").notEmpty().withMessage("Ingresá una contraseña"),
    body("confirma_contraseña").notEmpty().withMessage("Confirmá tu contraseña").bail()
    .custom((confirma_contraseña, {req}) => {
        const password = req.body.contraseña
        // Verifico que las contraseñas sean las mismas
        if(password != confirma_contraseña){
          throw new Error('Las contraseñas deben ser las mismas')
        } else {
            return true
        }
      }),
     body("imagen").custom((value, {req}) => {
        let extensionesAceptadas = [".jpeg", ".png", ".jpg"]
        
        if (!extensionesAceptadas.includes(path.extname(req.file.originalname))) {
            throw new Error("Las extensiones del archivo permitidas son '.jpeg', '.jpg' y '.png'");
        }
        return true;
    }) 
];

module.exports = validaciones;