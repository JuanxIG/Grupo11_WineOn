const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController")

// ruta que muestra todos los productos
router.get("/", productController.products)

//ruta que muestra el formulario para agregar un producto y procesar el formulario
router.get("/agregar", productController.showAdd)
router.post("/agregar/:id", productController.addProduct)

//ruta que lleva al detalle de un producto
router.get("/detail/:id", productController.detail);

//ruta que muestra el formulario de edicion de un producto y procesar el formulario
router.get("/editar/:id", productController.formProduct)
router.put("/editar/:id", productController.editProduct)

//ruta que elimina un producto
router.delete("/editar/:id", productController.deleteProduct)

module.exports = router;