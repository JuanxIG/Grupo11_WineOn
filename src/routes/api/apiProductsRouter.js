const express = require('express');
const router = express.Router();
const apiProductsController = require('../../controllers/api/apiProductsController');

//Rutas
//Lista de usuarios
router.get('/', apiProductsController.list)

//Ulitmo Producto
/* router.get('/lastProduct', apiProductsController.ultimo) */

//Detalle del usuario
router.get('/:id', apiProductsController.detail)


module.exports = router;