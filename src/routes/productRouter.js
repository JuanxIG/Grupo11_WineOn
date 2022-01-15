const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController")

// ************ Middlewares ************ 
const upload = require("../middlewares/multerProductsMiddleware");
const authMiddleware = require ("../middlewares/authMiddleware");


// ruta que muestra todos los productos
router.get("/", productController.products)

//ruta que muestra el formulario para agregar un producto y procesar el formulario
router.get("/agregar", authMiddleware,productController.showAdd)
router.post('/agregar', upload.single("image"), productController.addProduct); 

/*** Crear producto ***/ 
router.get('/create', authMiddleware,productController.showAdd); 

//ruta que lleva al detalle de un producto
router.get("/detail/:id", productController.detail);

//ruta que muestra el formulario de edicion de un producto y procesar el formulario
router.get("/detail/:id/editar", authMiddleware,productController.formProduct);
router.put("/detail/:id/editar", upload.any(), productController.editProduct);

//ruta que elimina un producto
router.delete("/detail/:id/editar/eliminar", productController.deleteProduct);

module.exports = router;