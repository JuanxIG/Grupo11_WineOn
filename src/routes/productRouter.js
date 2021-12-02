const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController")

//ruta que muestra el formulario para agregar un producto
router.get("/productos/agregar", productController.addProduct)

//ruta que lleva al detalle de un producto
router.get("/productos/:id", productController.showProduct);

//ruta que muestra el formulario de edicion de un producto
router.get("/productos/:id/editar", productController.formProduct)

//ruta que procesa la informacion y agrega el producto
router.put("/productos/editar/:id", productController.editProduct)

module.exports = router;