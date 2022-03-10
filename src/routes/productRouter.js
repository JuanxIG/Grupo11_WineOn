const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController")

// ************ Middlewares ************ 
const upload = require("../middlewares/multerProductsMiddleware");
const authMiddleware = require ("../middlewares/authMiddleware");
const validacionesProducto = require ("../middlewares/validacionesProducto");


// ruta que muestra todos los productos
router.get("/", productController.products)

//ruta que muestra el formulario para agregar un producto y procesar el formulario
router.get("/agregar",authMiddleware,productController.showAdd)
router.post("/agregar", upload.single("image"), validacionesProducto, productController.addProduct); 


//ruta que lleva al detalle de un producto
router.get("/detail/:id", productController.detail);

//ruta que muestra el formulario de edicion de un producto y procesar el formulario
router.get("/detail/:id/editar", authMiddleware,productController.formProduct);
router.post("/detail/:id/editar", upload.any(), productController.editProduct);

//editar imagen
router.get("/detail/:id/editar/imagen", authMiddleware,productController.formularioImagen);
router.put("/detail/:id/editar/imagen", upload.any(), productController.editarImagen);

//ruta que elimina un producto
router.delete("/detail/:id/editar/eliminar", productController.deleteProduct);

module.exports = router;