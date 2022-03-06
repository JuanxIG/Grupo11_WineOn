const path = require('path')
const {body} = require ("express-validator");

const validaciones = [
    body("first_name").notEmpty().withMessage("Ingresá tu nombre").bail()
                      .isLength({ min: 2 }).withMessage("El nombre debe tener al menos 2 caracteres").bail()
                      .isAlpha().withMessage("Solo se permiten caracteres alfabéticos"),
    body("last_name").notEmpty().withMessage("Ingresá tu apellido").bail()
                     .isLength({ min: 2 }).withMessage("El apellido debe tener al menos 2 caracteres").bail()
                     .isAlpha().withMessage("Solo se permiten caracteres alfabéticos")
                     ,
    body("email").notEmpty().withMessage("Ingresá tu email").bail()
                 .isEmail().withMessage("ingresá un formato de correo válido. Ej.: tucorreo@email.com"),
    body("nacimiento").notEmpty().withMessage("Seleccioná tu fecha de nacimiento"),
    body("domicilio").notEmpty().withMessage("Ingresá tu domicilio").bail()
                     .isAlphanumeric().withMessage("Solo se permiten caracteres alfanuméricos"),
    body("dni").notEmpty().withMessage("Ingresá tu DNI").bail()
               .isNumeric().withMessage("Solo se permiten valores numéricos"),
    body("contraseña").notEmpty().withMessage("Ingresá una contraseña").bail()
                      .isLength({ min: 8 }).withMessage("La contraseña debe tener al menos 8 caracteres"),
            
    body("confirma_contraseña").notEmpty().withMessage("Confirmá tu contraseña")
                               
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
         if(req.file) { 
            let extensionesAceptadas = [".jpeg", ".png", ".jpg", ".gif"]
        
            if (!extensionesAceptadas.includes(path.extname(req.file.originalname))) {
                throw new Error("Las extensiones del archivo permitidas son '.jpeg', '.jpg', '.png' y '.gif'");
            } 
         }
        return true;
    }) 
];

module.exports = validaciones;