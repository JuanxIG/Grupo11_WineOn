const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController")


const path = require('path')
const multer = require('multer')
const {body} = require ("express-validator");
// ************ Multer ************ 
var storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null, 'public/images/users')
    },
    filename: function(req,file,cb){
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
var upload = multer({storage: storage})

// ************ Validator ************ 
const validaciones = [
    body("first_name").notEmpty().withMessage("Ingresá tu nombre"),
    body("last_name").notEmpty().withMessage("Ingresá tu apellido"),
    body("email").notEmpty().withMessage("Ingresá tu email").bail()
                 .isEmail().withMessage("ingresá un formato de correo válido. Ej.: tucorreo@email"),
    body("nacimiento").notEmpty().withMessage("Seleccioná tu fecha de nacimiento"),
    body("domicilio").notEmpty().withMessage("Ingresá tu domicilio"),
    body("dni").notEmpty().withMessage("Ingresá tu DNI"),
    body("contraseña").notEmpty().withMessage("Ingresá una contraseña"),
    body("confirma_contraseña").notEmpty().withMessage("Confirmá tu contraseña"),
    body("imagen").custom((value, {req}) => {
        let extensionesAceptadas = [".jpeg", ".png"]
        if (!extensionesAceptadas.includes(path.extname(req.file.originalname))) {
            throw new Error("Las extensiones del archivo permitidas son '.jpeg' y '.png'");
        }
        return true;
    })
]

//ruta que muestra el register y procesar el registro
router.get("/register", userController.formularioRegistro)
router.post('/register', upload.single("imagen"), validaciones, userController.procesoRegistro); 

router.get("/profile", userController.profile);

/*** Crear producto 
router.get('/create', userController.showAdd); 

//ruta que lleva al detalle de un producto
router.get("/detail/:id", userController.detail);

//ruta que muestra el login y procesar el usuario logueado
router.get("/detail/:id/editar", userController.formProduct);
router.put("/detail/:id/editar", userController.editProduct);

//ruta que elimina el usuario
router.delete("/detail/:id/editar/eliminar", userController.deleteProduct);
***/ 
module.exports = router;