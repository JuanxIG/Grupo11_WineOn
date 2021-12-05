const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController")

// ruta que muestra todos los productos
router.get("/productos", productController.products)

//ruta que muestra el formulario para agregar un producto y procesar el formulario
router.get("/productos/agregar", productController.showAdd)
router.post("/productos/agregar/:id", productController.addProduct)

//ruta que lleva al detalle de un producto
router.get("/productos/:id", productController.showProduct);

//ruta que muestra el formulario de edicion de un producto y procesar el formulario
router.get("/productos/editar/:id", productController.formProduct)
router.put("/productos/editar/:id", productController.editProduct)

//ruta que elimina un producto
router.delete("/productos/editar/:id", productController.deleteProduct)

module.exports = router;