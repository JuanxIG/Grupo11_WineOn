const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController")


const path = require('path')
const multer = require('multer')
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


//ruta que muestra el register y procesar el registro
router.get("/register", userController.FormularioRegistro)
router.post('/register', upload.any(), userController.Registro); 

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