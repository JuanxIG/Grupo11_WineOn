const express = require("express");
const router = express.Router();
// ************ Controlador ************ 
const userController = require("../controllers/userController")


// ************ Middlewares ************ 
const upload = require("../middlewares/multerUsersMiddleware")
const validaciones = require ("../middlewares/validacionesMiddleware");
const guestMiddleware = require ("../middlewares/guestMiddleware");
const authMiddleware = require ("../middlewares/authMiddleware");

//ruta que muestra el register y procesar el registro
//router.get("/register", guestMiddleware, userController.formularioRegistro);
router.get("/register", userController.formularioRegistro);
router.post('/register', upload.single("imagen"), validaciones, userController.procesoRegistro); 

//formulario de login
router.get("/login",  guestMiddleware, userController.login);
//procesar el login
router.post("/login", userController.procesoLogin);

//router.get("/profile", authMiddleware, userController.profile);
router.get("/:id/profile", userController.profile);

router.get("/list", userController.list);

router.get("/:id/profile/edit", userController.formEdit);
router.put("/:id/profile/edit",  userController.edit);

router.get("/logout", userController.logout);




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